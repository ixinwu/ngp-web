import typeGroups from '../../constants/type_group';

export default {
  key: 'aaa_detail',
  identity: 'aaaDetail',
  config: {
    title: 'AAA详情',
    dataSetKey: 'dataSet1', // 数据源配置
    fields: [
      {
        key: 'aaa__id',
        text: 'Id',
      },
      {
        key: 'aaa__name',
        text: '名称',
        clickable: true,
        visible: true,
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
        displayType: 'user',
      },
      {
        key: 'aaa__createBy__name',
        text: '创建人',
        displayType: 'user',
        visible: true,
      },
    ],
  },
  routes: [
    {
      key: 'aaa_edit',
      name: 'AAA编辑',
      type: 'SlideIn',
      url: '/aaa_edit',
    },
  ],
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
