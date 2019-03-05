export default {
  key: '<%= appKey %>',
  identity: 'app',
  config: {
    title: '<%= appName %>',
    menus: [
      {
        key: 'aaa_list',
        icon: 'ordered-list',
        name: 'AAA列表',
        url: '/aaa_list',
      },
    ],
  },
  data: {
    mapState: (state, ownProps) => ({
      ...state[ownProps.identity],
      apiConfig: state.apiConfig,
      routeHistory: state.routeHistory,
      menus: ownProps.menus.map(item => ({
        ...item,
        id: item.key,
        pageKey: item.pageKey || item.key,
      })),
    }),
    models: {
      status: {
        defaultValue: 'loading',
      },
      statusTip: {
        defaultValue: '',
      },
      selectedMenuIds: {
        defaultValue: [],
      },
      openMenuIds: {
        defaultValue: [],
      },
      childRouteConfigs: {
        defaultValue: [],
      },
      user: {
        defaultValue: {},
      },
    },
  },
  handles: {},
};
