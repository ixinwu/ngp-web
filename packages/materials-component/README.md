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
| message | string |         | 错误信息    |

### Loading

```js
import Loading from '@ixinwu-ngp/materials-component/loading';
```

Props

| Name    | Type   | Default             | Description |
| :------ | :----- | :------------------ | :---------- |
| message | string |                     | 提示信息    |
| size    | string | small/default/large | 组件大小    |

### DateFormat

日期时间格式化组件，使用 moment 对日期/日期字符串进行转换和格式化

```js
import DateFormat from '@ixinwu-ngp/materials-component/date_format';
```

Props

| Name    | Type                         | Default               | Description    |
| :------ | :--------------------------- | :-------------------- | :------------- |
| value   | string\|date\|moment\|number |                       | 输入时间       |
| format  | string                       | 'YYYY-MM-DD HH:mm:ss' | 时间格式       |
| inValid | string                       | '--'                  | 无效时展示内容 |

### NumberFormat

数字格式化组件，使用 numeral 对数字进行转换和格式化

```js
import NumberFormat from '@ixinwu-ngp/materials-component/number_format';
```

Props

| Name    | Type   | Default | Description    |
| :------ | :----- | :------ | :------------- |
| value   | number |         | 输入数字       |
| format  | string | '0,0'   | 数字格式       |
| inValid | string | '--'    | 无效时展示内容 |

### TextFormat

文本格式化，处理空文本显示

```js
import TextFormat from '@ixinwu-ngp/materials-component/text_format';
```

Props

| Name    | Type   | Default | Description    |
| :------ | :----- | :------ | :------------- |
| value   | string |         | 输入文本       |
| inValid | string | '--'    | 无效时展示内容 |

### TypeFormat

类别格式化，通过 key 显示对应的文本名称

```js
import DateFormat from '@ixinwu-ngp/materials-component/date_format';
```

Props

| Name    | Type   | Default | Description                                        |
| :------ | :----- | :------ | :------------------------------------------------- |
| value   | string |         | 类别 key                                           |
| types   | []     | []      | 类别定义，每项格式为:{key: 'key1', text: '文本 1'} |
| inValid | string | '--'    | 无效时展示内容                                     |

### NumberRangePicker

数值区间选择

```js
import NumberRangePicker from '@ixinwu-ngp/materials-component/number_range_format';
```

Props

| Name      | Type                                      | Default   | Description                                                |
| :-------- | :---------------------------------------- | :-------- | :--------------------------------------------------------- |
| value     | [number, number]                          | []        | 输入值                                                     |
| onChange  | function([number, number])                | []        | 数值变化时的回调                                           |
| formatter | function(value: number \| string): string | -         | 指定输入框展示值的格式                                     |
| parser    | function(string): number                  | -         | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 |
| min       | number                                    | -Infinity | 最小值                                                     |
| max       | number                                    | Infinity  | 最大值                                                     |

### FieldDisplay

### FieldForm

### FieldGrid

### ListSearch

### ListTable
