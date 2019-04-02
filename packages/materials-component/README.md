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

根据字段配置（fields）解析对应数据（data）生成展示，可以用于业务对象详细属性的展示等

```js
import FieldDisplay from '@ixinwu-ngp/materials-component/field_display';
```

Props

| Name         | Type                   | Default | Description                                              |
| :----------- | :--------------------- | :------ | :------------------------------------------------------- |
| fields       | []                     | []      | fields 配置                                              |
| data         | {}                     | {}      | 业务对象数据，属性 key 需要与 fields 配置每项的 key 对应 |
| onFieldClick | function(field, value) |         | 可点击字段的回调，value 是 data[field.key]               |

fields 每项配置说明

| Prop        | Type          | Default | Description                                                                                                   |
| :---------- | :------------ | :------ | :------------------------------------------------------------------------------------------------------------ |
| key         | string        |         | 标识                                                                                                          |
| text        | string        |         | 标签                                                                                                          |
| displayType | string        |         | 展示方式，默认使用 TextFormat 组件展示，可配置为：'number' \| 'datetime' \| 'groupType'                       |
| groupKey    | string        |         | 关联的类别 Key， displayType 设置为 groupType 时有效                                                          |
| visible     | boolean       | false   | 是否显示                                                                                                      |
| clickable   | boolean       | false   | 是否可点击交互，触发 FieldDisplay 组件的 onFieldClick 属性配置的方法                                          |
| colspan     | number        | 1       | 占据单位宽度数量                                                                                              |
| format      | string        |         | 展示格式，如果 displayType 为 datetime，格式定义参考 moment，如果 displayType 为 number，格式定义参考 numeral |
| inValid     | string        |         | 无效数据展示                                                                                                  |
| component   | ReactComponet |         | 自定义展示组件，有三个属性:value 是 data[field.key] ,field,data                                               |

### FieldForm

根据字段配置（fields）解析对应数据（data）生成编辑表单，可用于实现业务对象创建和编辑功能

```js
import FieldForm from '@ixinwu-ngp/materials-component/field_form';
```

Props

| Name           | Type | Default | Description                                              |
| :------------- | :--- | :------ | :------------------------------------------------------- |
| fields         | []   | []      | fields 配置                                              |
| data           | {}   | {}      | 业务对象数据，属性 key 需要与 fields 配置每项的 key 对应 |
| fieldRelations | []   | []      | 字段关联配置                                             |
| groupCascades  | []   | []      | 类别级联配置                                             |

fields 每项配置说明

| Prop        | Type          | Default | Description                                                                                                   |
| :---------- | :------------ | :------ | :------------------------------------------------------------------------------------------------------------ |
| key         | string        |         | 标识                                                                                                          |
| text        | string        |         | 标签                                                                                                          |
| displayType | string        |         | 展示方式，默认使用 Input 组件编辑，可配置为：'number' \| 'datetime' \| 'groupType'                            |
| groupKey    | string        |         | 关联的类别 Key， displayType 设置为 groupType 时有效                                                          |
| visible     | boolean       | false   | 是否显示                                                                                                      |
| colspan     | number        | 1       | 占据单位宽度数量                                                                                              |
| format      | string        |         | 展示格式，如果 displayType 为 datetime，格式定义参考 moment，如果 displayType 为 number，格式定义参考 numeral |
| component   | ReactComponet |         | 自定义表单组件，有两个属性:field,data                                                                         |

fieldRelations 配置

```js
[
  {
    // 主字段Key
    masterFieldKey: 'aaa__type',
    // 从字段Key的范围（被控制的字段Key数组）
    slaveRangeFieldKeys: [
      'aaa__type1Field1',
      'aaa__type1Field2',
      'aaa__type2Field1',
      'aaa__type2Field2',
      // ...
    ],
    // 具体的关联配置
    relationConfig: [
      {
        // 当字段的数据值为type_1时，显示slaveFieldKeys对应的字段，其他被控制的字段Key数组中对应的字段不显示
        masterTypeKey: 'type_1',
        slaveFieldKeys: [
          'aaa__type1Field1',
          'aaa__type1Field2',
          //...
        ],
      },
      // ...
    ],
  },
  // ...
];
```

groupCascades 配置

```js
[
  {
    // 主类型key
    masterGroupKey: 'typeGroup',
    // 从类型Key
    slaveGroupKey: 'stageGroup',
    // 具体的级联配置
    cascadeConfig: [
      {
        // 当关联主类型的字段值为type_1时，关联从类型的字段的类型可选key集合为['stage_1', 'stage_2', 'stage_3']
        masterTypeKey: 'type_1',
        slaveTypeKeys: ['stage_1', 'stage_2', 'stage_3'],
      },
      // ...
    ],
  },
  // ...
];
```

### FieldGrid

[FieldDisplay](#FieldDisplay)和[FieldForm](#FieldForm)默认布局组件，组件会根据容器 DOM 的实际宽度计算每项（field）的单位宽度

```js
import FieldGrid from '@ixinwu-ngp/materials-component/field_grid';
```

Props

| Name   | Type | Default | Description |
| :----- | :--- | :------ | :---------- |
| fields | []   | []      | fields 配置 |

fields 每项配置说明

| Prop    | Type                | Default | Description            |
| :------ | :------------------ | :------ | :--------------------- |
| key     | string              |         | field 的标识           |
| display | string \| ReactNode |         | field 的对应的展示方式 |
| colspan | number              | 1       | field 占据单位宽度数量 |

### ListSearch

根据字段配置（fields）生成搜索表单，可用于实现业务列表的查询功能

```js
import FieldForm from '@ixinwu-ngp/materials-component/field_form';
```

Props

| Name   | Type | Default | Description                                              |
| :----- | :--- | :------ | :------------------------------------------------------- |
| fields | []   | []      | fields 配置                                              |
| data   | {}   | {}      | 业务对象数据，属性 key 需要与 fields 配置每项的 key 对应 |

fields 每项配置说明

| Prop        | Type          | Default | Description                                                                        |
| :---------- | :------------ | :------ | :--------------------------------------------------------------------------------- |
| key         | string        |         | 标识                                                                               |
| text        | string        |         | 标签                                                                               |
| displayType | string        |         | 展示方式，默认使用 Input 组件编辑，可配置为：'number' \| 'datetime' \| 'groupType' |
| groupKey    | string        |         | displayType 为 groupType 时有效，关联的类别 Key                                    |
| showTotal   | boolean       | false   | displayType 为 groupType 时有效，下拉列表是否显示“全部”选项                        |
| searchable  | boolean       | false   | 是否可作为查询条件，在 ListSearch 组件中只展示 searchable 为 true 的字段           |
| colspan     | number        | 1       | 占据单位宽度数量                                                                   |
| component   | ReactComponet |         | 自定义表单组件，有两个属性:field,data                                              |

### ListTable

根据字段配置（fields）生成数据表格，可用于实现业务列表的数据列表展示

```js
import ListTable from '@ixinwu-ngp/materials-component/list_table';
```

Props

| Name        | Type                           | Default | Description  |
| :---------- | :----------------------------- | :------ | :----------- |
| fields      | []                             | []      | fields 配置  |
| onCellClick | function(field, value, record) |         | 字段点击回调 |

其他属性与 antd 的 Table 组件相同

fields 每项配置说明

| Prop        | Type                   | Default | Description                                                                                                   |
| :---------- | :--------------------- | :------ | :------------------------------------------------------------------------------------------------------------ |
| key         | string                 |         | 标识                                                                                                          |
| text        | string                 |         | 标签                                                                                                          |
| displayType | string                 |         | 展示方式，默认使用 TextFormat 组件展示，可配置为：'number' \| 'datetime' \| 'groupType'                       |
| groupKey    | string                 |         | 关联的类别 Key， displayType 设置为 groupType 时有效                                                          |
| visible     | boolean                | false   | 是否显示                                                                                                      |
| clickable   | boolean                | false   | 是否可点击交互，触发 ListTable 组件的 onCellClick 属性配置的方法                                              |
| format      | string                 |         | 展示格式，如果 displayType 为 datetime，格式定义参考 moment，如果 displayType 为 number，格式定义参考 numeral |
| inValid     | string                 |         | 无效数据展示                                                                                                  |
| render      | function(value,record) |         | 自定义列展示，与 antd 的 Table 组件中 Column 的 render 定义相同                                               |
| component   | ReactComponet          |         | 自定义展示组件，有三个属性:value,field,record                                                                 |
