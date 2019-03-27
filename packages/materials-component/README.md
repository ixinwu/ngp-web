# NGP 组件库

<!-- TOC -->

- [NGP 组件库](#ngp-组件库)
  - [风格](#风格)
  - [开发说明](#开发说明)
  - [API](#api)
    - [CssBaseline](#cssbaseline)
    - [Error](#error)
    - [Loading](#loading)
    - [DateFormat](#dateformat)
    - [NumberFormat](#numberformat)
    - [TextFormat](#textformat)
    - [TypeFormat](#typeformat)
    - [NumberRangePicker](#numberrangepicker)
    - [FieldDisplay](#fielddisplay)
    - [FieldForm](#fieldform)
    - [FieldGrid](#fieldgrid)
    - [ListSearch](#listsearch)
    - [ListTable](#listtable)

<!-- /TOC -->

## 风格

当前基础组件库使用的是[ant.design 组件库](https://ant.design/docs/react/introduce-cn)，风格基于 ant.design 的设计语言封装实现

## 开发说明

> 样式方案参考[@ixinwu-ngp/web-styles](../web-styles/README.md)

antd的组件使用按照以下方式，手动引用组件和对应样式

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

## API

### CssBaseline

屏蔽浏览器的样式差异，修改 css 盒模型为 border-box

```js
import CssBaseLine from '@ixinwu-ngp/materials-component/css_base_line';
```

### Error

```js
import Error from '@ixinwu-ngp/materials-component/error';
```

Props

| Name    | Type   | Default | Description |
| :------ | :----- | :------ | :---------- |
| message | String | null    | 错误信息    |

### Loading

```js
import Loading from '@ixinwu-ngp/materials-component/loading';
```

Props

| Name    | Type   | Default             | Description |
| :------ | :----- | :------------------ | :---------- |
| message | String | null                | 提示信息    |
| size    | String | small/default/large | 组件大小    |

### DateFormat

### NumberFormat

### TextFormat

### TypeFormat

### NumberRangePicker

### FieldDisplay

### FieldForm

### FieldGrid

### ListSearch

### ListTable