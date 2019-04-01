# 功能区块

业务沉淀形成的功能区块，比如登录、不同类型页面的页头、工具条、表单等等

<!-- TOC -->

- [功能区块](#功能区块)
  - [配置说明](#配置说明)
  - [使用方式](#使用方式)
  - [开发说明](#开发说明)
  - [区块列表](#区块列表)
    - [Login](#login)

<!-- /TOC -->

## 配置说明

| Name     | Type     | Description                                                                                                                               |
| :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| identity | String   | 挂载到 store 上的标识                                                                                                                     |
| settings | Object   | 静态属性配置，每个属性对应一个 react 组件的 prop                                                                                          |
| models   | Object   | 动态属性配置，每个属性`mapState`连接到 react 组件的 prop，具体定义参考[web-framework 的 models 定义](../web-framework/README.md#modelsjs) |
| mapState | Function | mapStateToProps，与 react-redux 的 connect 中使用的一致                                                                                   |
| routes   | Array    | 区块的子路由配置，具体定义参考[web-framework 的路由定义](../web-framework/README.md#单项路由定义)                                         |

## 使用方式

1. 按应用使用

```js
import '@babel/polyfill';
import ngp, { createClient } from '@ixinwu-ngp/web-framework';
import loginBlock from '@ixinwu-ngp/materials-block/login';
import { fetchAuth } from './services';

// ... 省略代码

// 初始化应用
const client = createClient({
  config: {
    apiConfig,
  },
});

client.render(
  document.getElementById('root'),
  // Login区块代码
  loginBlock.bundle,
  // Login区块的配置，根据业务调整配置
  {
    ...loginBlock.config,
    settings: {
      ...loginBlock.config.settings,
      fetchAuth, // 配置Login区块需要配置的auth服务接口
    },
  },
);
```

2. 按页面使用

```js
// pages/index.js, 页面统一关联
import aaaList from './aaa_list/bundle';
import aaaListConfig from './aaa_list/bundle.config';
// 假设我们使用xxx区块
import xxxBlock from '@ixinwu-ngp/materials-block/xxx';

const createGetPageConfig = config => pageKey => {
  console.log(`获取[[${pageKey}]]的页面配置`);

  return new Promise(resolve => resolve(config));
};

export const pageBundleLoaders = {
  aaa_list: aaaList,
  // 页面的代码bundle直接引用区块的代码bundle
  page_x: xxxBlock.bundle,
};

export const pageConfigLoaders = {
  aaa_list: createGetPageConfig(aaaListConfig),
  // 页面的配置基于区块的配置进行自定义
  page_x: createGetPageConfig({
    ...xxxBlock.config,
    settings: {
      // 定义静态属性配置
      // ...
    },
    // 修改其他配置
  }),
};
```

3. 按模块使用

```js
import React, { Component } from 'react';
import { mountBlock, unmountBlock } from '@ixinwu-ngp/web-framework';
import { withStyles } from '@ixinwu-ngp/web-styles';
// 假设我们使用xxx和yyy区块
import xxxBlock from '@ixinwu-ngp/materials-block/xxx';
import yyyBlock from '@ixinwu-ngp/materials-block/yyy';
import styles from './styles';

class MediaSetting extends Component {
  constructor(props) {
    super(props);

    this.xxx = mountBundle(xxxBlock.bundle, {
      // 自定义配置
      ...xxxBlock.config,
      // ...
    });
    this.yyy = mountBundle(yyyBlock.bundle, {
      // 自定义配置
      ...yyyBlock.config,
      // ...
    });
  }

  componentWillUnmount() {
    // 不使用时在store上清除挂载
    unmountBlock(xxxBlock);
    unmountBlock(yyyBlock);
  }

  handleClick = e => {
    this.props.updateTabIndex(e.key);
  };

  render() {
    const { classes, tabIndex } = this.props;
    const XXX = this.xxx;
    const YYY = this.yyy;
    return (
      <div className={classes.container}>
        <XXX />
        <YYY />
      </div>
    );
  }
}

export default withStyles(styles)(XXX);
```

## 开发说明

> 样式方案参考[@ixinwu-ngp/web-styles](../web-styles/README.md)

antd 的组件使用按照以下方式，手动引用组件和对应样式

```js
import Form from 'antd/lib/form';
import 'antd/lib/form/style';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';
```

## 区块列表

### Login

登录区块的详细配置

```js
export default {
  // 标识
  identity: 'login',
  // 静态配置
  settings: {
    // 标题
    title: 'Template App',
    // 登录认证接口
    fetchAuth: () => {
      throw new Error('login block must config fetchAuth api');
    },
  },
  // 动态配置
  models: {
    // 登录实时状态，true表示登录中
    logStatus: {
      defaultValue: false,
    },
  },
  // mapStateToProps配置
  mapState: (state, ownProps) => ({
    ...state[ownProps.identity],
  }),
};
```
