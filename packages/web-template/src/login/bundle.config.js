export default {
  key: 'template-app',
  identity: 'login',
  config: {
    title: 'Template App',
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
