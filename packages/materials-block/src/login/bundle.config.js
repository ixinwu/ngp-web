export default {
  // 标识
  identity: 'login',
  // 静态配置
  settings: {
    // 标题
    title: 'Template App',
    // 登录认证接口
    fetchAuth: () => {
      throw new Error('login block must config fetchAuth api');
    },
  },
  // 动态配置
  models: {
    // 登录实时状态，true表示登录中
    logStatus: {
      defaultValue: false,
    },
  },
  // mapStateToProps配置
  mapState: (state, ownProps) => ({
    ...state[ownProps.identity],
  }),
};
