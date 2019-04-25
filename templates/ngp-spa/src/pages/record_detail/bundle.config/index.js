import fields from './fields';

export default {
  identity: 'record_detail',
  config: {
    title: '履历详情',
    dataSetKey: 'TMPM_FullSet', // 数据源配置
    primaryFieldKey: 'TMPM_Record_Id',
    fields,
  },
  routes: [
    {
      key: 'record_edit',
      name: '履历编辑',
      type: 'SlideIn',
      url: '/record_edit',
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
    },
  },
};
