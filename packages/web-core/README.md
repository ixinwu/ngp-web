# 前端核心

对前端开发抽象形成 View，reducer，handle 三个主要概念的开发模式

<!-- TOC -->

- [前端核心](#前端核心)
  - [基础概念](#基础概念)
    - [identity](#identity)
    - [pack](#pack)
      - [reducers](#reducers)
      - [handles](#handles)
      - [sagas](#sagas)
  - [API](#api)
    - [core](#core)
      - [core.store](#corestore)
    - [configureStore](#configurestore)
    - [mount](#mount)
    - [unmount](#unmount)
    - [connect](#connect)
    - [modify](#modify)
  - [使用说明](#使用说明)
  - [LICENSE](#license)

<!-- /TOC -->

## 基础概念

- identity
- pack

### identity

identity 是数据挂载在 store 上的标识 key，必须是全局唯一的，**不管在业务模式中的层级关系如何，挂载到 store 上之后只有一层，这样可以方便获取和更新，直接来说就是是 List 的形式，而不是 Tree 的形式，保证复杂度不会几何级增加**

### pack

pack 是挂载在 store 时 identity 对应的内容的具体定义，包括 reducers，handles 和 sagas：

#### reducers

store 中具体数据载体的定义，挂载之后会默认生成更新 reducer 的 action，也支持按照原生 redux action 的定义

```javascript
// 最简单的reducer定义，更新reducer的action系统会自动生成
export function xxxReducer(state = []) {
  return state;
}

// redux reducer
export function xxxReducer(state = [], action) {
  switch (action.type) {
    case 'XXX_UPDATE':
      return action.paylod;
    default:
      return state;
  }
}
```

#### handles

handle 是业务逻辑流程，比如初始化页面的流程，获取数据的流程等等，都可以通过定义 handle 完成，主要包括 reducer 数据更新的流程

handle 的基本形式是 generator 函数，与 store 的交互借鉴了 redux-saga 的思想，redux-saga 的 api 在里面都可以使用

> 更新 reducer 通过 setter 定义 reducer 的更新器，结合 modify 使用，使用与 redux-saga 的 `select` API 相似，具体参考下面的代码和[API](#modify)

```javascript
import { call, modify, all } from '@ixinwu-ngp/web-core';

/**
 * handle中定义业务setter，通过指定identity与reducer key来更新
 * @param {Object} setters 挂载reducer时在store上自动生成的
 * @param {String} identity reducer标识
 * @param {*} value reducer对应的更新数据
 */
const setDataLoading = (setters, identity, value) => setters[identity].dataLoading(value);

/**
 * 业务handle
 * @param {Object} props 调用handle时this.props的一个拷贝
 * @param {String} objId 传递的自定义参数
 */
export function* xxxHandle(props, objId) {
  const { identity } = props;
  try {
    // 结合modify使用setter，更新identity下挂载的指定reducer
    yield modify(setDataLoading, identity, true);
    // 其他业务逻辑
    ...
  } catch (e) {
    yield modify(setDataLoading, identity, false);
    ...
  }
}

/**
 * 初始化页面handle
 * @param {Object} props 调用handle时this.props的一个拷贝
 * @param {String} objId 传递的自定义参数
 */
export function* initPage(props, objId) {
  try {
    const result = yield call(getListData, props, objId);

    // 直接返回更新当前identity下挂载的reducers
    return {
      ...result,
    };
  } catch (e) {
    ...
  }
}
```

#### sagas

原生的 redux-saga

## API

### core

获取全局实例（单例）

```javascript
import core from '@ixinwu-ngp/web-core';
```

#### core.store

获取 store 实例

```javascript
import core from '@ixinwu-ngp/web-core';

const store = core.store;
```

> 除了 redux 提供的 api 之外还有：
> - injectReducers(identity, reducers)
> - removeReducers(identity)
> - injectSaga(identity, saga, ...args)
> - removeSaga(identity)

### configureStore

配置 store

```javascript
import { configureStore } from '@ixinwu-ngp/web-core';

// 各项参数与redux的createStore相同，以单个对象的不同属性传入
const store = configureStore({
  // init reducers
  reducers,
  // init state
  initialState,
  // init middleware
  middlewares,
});
```

### mount

挂载 pack

```javascript
import { mount } from '@ixinwu-ngp/web-core';

/**
 * @param {String} identity
 * @param {Object} pack 结构为{ reducers = {...}, handles = {...}, sagas = {...} }
 */
mount(identity, pack);
});
```

### unmount

卸载 pack

```javascript
import { unmount } from '@ixinwu-ngp/web-core';

/**
 * @param {String} identity
 */
unmount(identity, pack);
});
```

### connect

连接 React View、reducers 数据和 handles

使用方式与 react-dedux 的`connect`使用相同，处理一下事务：

- 将 reducer 的数据通过 props 绑定到 React View（react-redux 的功能）
- 将 handles 通过 props 绑定到 React View
- 将 React View 的 props 作为 handle 的第一个参数[props](#handles)传入

```javascript
import { connect } from '@ixinwu-ngp/web-core';
```

### modify

更新 reducer 数据

通过 modify 结合定义 setter 实现，参考代码：

```javascript
// handles.js
import { modify } from '@ixinwu-ngp/web-core';

/**
 * handle中定义业务setter，通过指定identity与reducer key来更新
 * @param {Object} setters 挂载reducer时在store上自动生成的
 * @param {String} identity reducer标识
 * @param {*} value reducer对应的更新数据
 */
const aaaReducerSetter = (setters, identity, value) => setters[identity].aaaReducer(value);

export function* xxxHandle(props, objId) {
  const { identity } = props;
  try {
    // 结合modify使用setter，更新identity下挂载的指定reducer
    yield modify(setDataLoading, identity, true);
    // 其他业务逻辑
    ...
  } catch (e) {
    yield modify(setDataLoading, identity, false);
    ...
  }
}
```

## 使用说明

这个包实现的是redex、react-redux和redux-saga的封装，并没有封装react，按照[API](#API)的说明结合react可以更加方便的开发

更推荐的方式是使用[@ixinwu-ngp/web-framework](https://github.com/zhuoluo-hq/web-framework)，基于这个包的功能进行了使用封装，快速构建应用

## LICENSE

[MIT](./LICENSE.md)
