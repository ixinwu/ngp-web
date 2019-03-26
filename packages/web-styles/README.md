# 样式解决方案

基本思路是使用[JSS](https://github.com/cssinjs/jss)，提供 withStyles 将`classes`属性提供给组件使用

**参考借鉴[Material-UI 的样式解决方案](https://material-ui.com/css-in-js/basics/)，实现源码中也多有参考，在此感谢[Material-UI 团队以及项目的贡献者](https://github.com/mui-org/material-ui/graphs/contributors)**

## API

### NgpThemeProvider

| Name          | Type            | Default | Description                                                                          |
| :------------ | :-------------- | :------ | :----------------------------------------------------------------------------------- |
| children      | node            |         | react 的功能                                                                         |
| sheetsManager | map             |         | 管理页面中加载的样式，避免重复。在使用 ssr 是应该为每一个页面提供一个全新的 Map 对象 |
| theme         | object/function |         | 主题对象，可以使用空对象{}；或者是主体对象的生成方法                                 |

### withStyles

利用 higher-order component 的模式，为 Wrap 的组件增加`classes`和`innerRef`属性

参数：

- `styles` (_Function | Object_): 样式定义，如果需要使用主题变量使用(theme) => {return {...}}签名的函数

示例：

```javascript
import React from 'react';
import { withStyles } from '@ixinwu-ngp/web-styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```
