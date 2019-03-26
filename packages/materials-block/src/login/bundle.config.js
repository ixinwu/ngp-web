export default {
  key: 'template-app',
  identity: 'login',
  settings: {
    title: 'Template App',
    fetchAuth: () => {
      throw new Error('login block must config fetchAuth api');
    },
  },
  mapState: (state, ownProps) => ({
    ...state[ownProps.identity],
  }),
  models: {
    logStatus: {
      defaultValue: false,
    },
  },
  handles: {},
};
