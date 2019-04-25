import fields from './fields';

export default {
  identity: 'record_edit',
  config: {
    title: '履历编辑',
    dataSetKey: 'TMPM_FullSet', // 数据源配置
    primaryFieldKey: 'TMPM_Record_Id',
    fields,
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
      originalData: {
        defaultValue: {},
      },
    },
  },
};
