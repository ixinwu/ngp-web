export default {
  key: 'template-app',
  identity: 'login',
  config: {
    title: 'Template App',
    fetchAuth: () => {
      throw new Error('login block must config fetchAuth api');
    },
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
