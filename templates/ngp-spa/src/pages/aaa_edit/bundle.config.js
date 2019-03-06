import typeGroups from '../../constants/type_group';

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
  key: 'aaa_edit',
  identity: 'aaaEdit',
  config: {
    title: 'AAA编辑',
    dataSetKey: 'dataSet1', // 数据源配置
    fields: [
      {
        key: 'aaa__id',
        text: 'Id',
      },
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
        displayType: 'object',
        colspan: 2,
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
        displayType: 'object',
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
        key: 'aaa__stage',
        text: '阶段',
        displayType: 'groupType',
        visible: true,
        groupKey: 'stageGroup',
      },
      {
        key: 'aaa__createTime',
        text: '创建时间',
        displayType: 'datetime',
        format: 'YYYY-MM-DD',
        visible: true,
      },
      {
        key: 'aaa__dept',
        text: '所属部门Id',
        displayType: 'department',
        visible: true,
      },
      {
        key: 'aaa__dept__name',
        text: '所属部门',
        displayType: 'department',
      },
      {
        key: 'aaa__principal',
        text: '负责人Id',
        displayType: 'user',
        visible: true,
      },
      {
        key: 'aaa__principal__name',
        text: '负责人',
        displayType: 'user',
      },
      {
        key: 'aaa__type1Field1',
        text: '类型1显示的字段1',
        visible: true,
      },
      {
        key: 'aaa__type1Field2',
        text: '类型1显示的字段2',
        visible: true,
      },
      {
        key: 'aaa__type2Field1',
        text: '类型2显示的字段1',
        visible: true,
      },
      {
        key: 'aaa__type2Field2',
        text: '类型2显示的字段2',
        visible: true,
      },
    ],
    fieldRelations: [
      {
        masterFieldKey: 'aaa__type',
        slaveRangeFieldKeys: [
          'aaa__type1Field1',
          'aaa__type1Field2',
          'aaa__type2Field1',
          'aaa__type2Field2',
        ],
        relationConfig: [
          {
            masterTypeKey: 'type_1',
            slaveFieldKeys: ['aaa__type1Field1', 'aaa__type1Field2'],
          },
          {
            masterTypeKey: 'type_2',
            slaveFieldKeys: ['aaa__type2Field1', 'aaa__type2Field2'],
          },
          {
            masterTypeKey: 'type_3',
            slaveFieldKeys: [],
          },
        ],
      },
    ],
    groupCascades: [
      {
        masterGroupKey: 'typeGroup',
        slaveGroupKey: 'stageGroup',
        cascadeConfig: [
          {
            masterTypeKey: 'type_1',
            slaveTypeKeys: [
              'stage_1',
              'stage_2',
              'stage_3',
            ],
          },
          {
            masterTypeKey: 'type_1',
            slaveTypeKeys: [
              'stage_4',
              'stage_5',
              'stage_6',
            ],
          },
        ],
      },
      {
        masterGroupKey: 'stageGroup',
        slaveGroupKey: 'statusGroup',
        cascadeConfig: [
          {
            masterTypeKey: 'stage_1',
            slaveTypeKeys: [
              'status_1',
              'status_2',
            ],
          },
          {
            masterTypeKey: 'stage_2',
            slaveTypeKeys: [
              'status_3',
            ],
          },
        ],
      },
    ],
  },
  routes: [],
  data: {
    mapState: (state, ownProps) => ({
      ...state[ownProps.identity],
    }),
    models: {
      originalData: {
        defaultValue: {},
      },
      data: {
        defaultValue: {},
      },
      typeGroup: {
        defaultValue: typeGroups, // 使用硬编码的方式初始化分类定义
      },
      statusGroup: {
        defaultValue: [], // 在页面加载时使用接口初始化分类定义
      },
      stageGroup: {
        defaultValue: [], // 在页面加载时使用接口初始化分类定义
      },
    },
  },
  handles: {},
};
