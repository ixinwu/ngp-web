export default {
  key: '<%= appKey %>',
  identity: 'login',
  config: {
    title: '<%= appName %>',
  },
  data: {
    mapState: (state, ownProps) => ({
      ...state[ownProps.identity],
    }),
    models: {
      logStatus: {
        defaultValue: false,
      },
    },
  },
  handles: {},
};
