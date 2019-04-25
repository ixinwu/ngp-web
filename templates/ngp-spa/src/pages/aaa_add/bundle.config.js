import typeGroups from '../../constants/type_group';
import ObjectCascader from '../../components/object_cascader';

const cConfig = {
  dataSetKey: 'dataSet1', // 数据源配置
  primaryFieldKey: 'ccc__id',
  nameFieldKey: 'ccc__name',
  fields: [
    {
      key: 'ccc__id',
      text: 'CCCId',
    },
    {
      key: 'ccc__name',
      text: 'CCC名称',
      visible: true,
      searchable: true,
    },
  ],
};

const bConfig = {
  dataSetKey: 'dataSet1', // 数据源配置
  primaryFieldKey: 'bbb__id',
  nameFieldKey: 'bbb__name',
  fields: [
    {
      key: 'bbb__id',
      text: 'BBBId',
    },
    {
      key: 'bbb__name',
      text: 'BBB名称',
      searchable: true,
      visible: true,
    },
    {
      key: 'ccc__id',
      text: 'CCCId',
      searchable: true,
      config: cConfig,
    },
  ],
};

export default {
  key: 'aaa_add',
  identity: 'aaaAdd',
  config: {
    title: 'AAA新建',
    dataSetKey: 'dataSet1', // 数据源配置
    fields: [
      {
        key: 'aaa__name',
        text: '名称',
        visible: true,
        // 参照antd的Form文档检验规则
        options: {
          rules: [
            {
              required: true,
              message: '必填',
            },
          ],
        },
      },
      {
        key: 'bbb__id',
        text: 'BBBId',
        component: ObjectCascader,
        // colspan: 2,
        visible: true,
        config: bConfig,
      },
      {
        key: 'bbb__name',
        text: 'BBB名称',
      },
      {
        key: 'ccc__id',
        text: 'CCCId',
        component: ObjectCascader,
        visible: true,
        config: cConfig,
      },
      {
        key: 'ccc__name',
        text: 'CCC名称',
      },
      {
        key: 'aaa__count',
        text: '数量',
        displayType: 'number',
        visible: true,
      },
      {
        key: 'aaa__type',
        text: '类型',
        displayType: 'groupType',
        showTotal: true,
        visible: true,
        groupKey: 'typeGroup',
      },
      {
        key: 'aaa__status',
        text: '状态',
        displayType: 'groupType',
        visible: true,
        groupKey: 'statusGroup',
      },
      {
        key: 'aaa__createTime',
        text: '创建时间',
        displayType: 'datetime',
        format: 'YYYY-MM-DD',
        visible: true,
      },
      {
        key: 'aaa__createByDept',
        text: '创建人部门Id',
        displayType: 'department',
      },
      {
        key: 'aaa__createByDept__name',
        text: '创建人部门',
        displayType: 'department',
        colspan: 2,
        visible: true,
      },
      {
        key: 'aaa__createBy',
        text: '创建人Id',
        displayType: 'employee',
      },
      {
        key: 'aaa__createBy__name',
        text: '创建人',
        displayType: 'employee',
        visible: true,
      },
    ],
  },
  routes: [],
  data: {
    mapState: (state, ownProps) => ({
      ...state[ownProps.identity],
    }),
    models: {
      data: {
        defaultValue: {},
      },
      typeGroup: {
        defaultValue: typeGroups, // 使用硬编码的方式初始化分类定义
      },
      statusGroup: {
        defaultValue: [], // 在页面加载时使用接口初始化分类定义
      },
    },
  },
  handles: {},
};
