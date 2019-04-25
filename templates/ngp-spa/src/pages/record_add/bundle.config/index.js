import fields from './fields';

export default {
  identity: 'record_add',
  config: {
    title: '新建履历',
    dataSetKey: 'TMPM_FullSet', // 数据源配置
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
    },
  },
};
