import typeGroups from '../../../constants/type_group';
import fields from './fields';

export default {
  identity: 'record_add',
  config: {
    title: '履历列表',
    dataSetKey: 'TMPM_FullSet', // 数据源配置
    primaryFieldKey: 'TMPM_Record_Id',
    fields,
  },
  routes: [
    {
      key: 'record_add',
      name: '履历新建',
      type: 'Popup',
      url: '/record_add',
    },
    {
      key: 'record_edit',
      name: '履历编辑',
      type: 'SlideIn',
      url: '/record_edit',
    },
    {
      key: 'record_detail',
      name: '履历详情',
      url: '/record_detail',
    },
  ],
  data: {
    mapState: (state, ownProps) => ({
      ...state[ownProps.identity],
    }),
    models: {
      params: {
        defaultValue: {
          pageNumber: 1,
          pageSize: 20,
          sortField: '',
          sortDirection: '',
          likeValue: null, // 数据源模糊匹配的参数，如果config中fuzzy为false则不会传递
        },
      },
      selectedPrimaryKeys: {
        defaultValue: [],
      },
      dataLoading: {
        defaultValue: false,
      },
      data: {
        defaultValue: {
          count: 0,
          data: [],
        },
      },
      typeGroup: {
        defaultValue: typeGroups, // 使用硬编码的方式初始化分类定义
      },
      statusGroup: {
        defaultValue: [], // 在页面加载时使用接口初始化分类定义
      },
    },
  },
};
