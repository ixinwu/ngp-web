/**
 * field配置属性
 * @property {string} key 字段标识
 * @property {string} text 字段的展示文本
 * @property {string} groupKey 字段的关联的group标识
 * @property {string} displayType 字段的展示类型
 * @default text datetime number boolean department employee groupType
 * @property {primary} searchable 是否可搜索 @default false
 * @property {boolean} searchable 是否可搜索 @default false
 * @property {boolean} visible 是否展示 @default false
 * @property {boolean} clickable 是否可操作 @default false
 * @property {string} format 展示格式
 * @property {string} inValid 无效数据展示内容
 * @property {object} options
 * @property {object} props
 */
import typeGroups from '../../constants/type_group';
import ObjectCascader from '../../components/object_cascader';

const cConfig = {
  dataSetKey: 'dataSet1', // 数据源配置
  primaryFieldKey: 'ccc__id',
  nameFieldKey: 'ccc__name',
  fields: [
    {
      key: 'ccc__id',
      text: 'CCCId',
    },
    {
      key: 'ccc__name',
      text: 'CCC名称',
      visible: true,
      searchable: true,
    },
  ],
};

const bConfig = {
  dataSetKey: 'dataSet1', // 数据源配置
  primaryFieldKey: 'bbb__id',
  nameFieldKey: 'bbb__name',
  fields: [
    {
      key: 'bbb__id',
      text: 'BBBId',
    },
    {
      key: 'bbb__name',
      text: 'BBB名称',
      searchable: true,
      visible: true,
    },
    {
      key: 'ccc__id',
      text: 'CCCId',
      searchable: true,
      config: cConfig,
    },
  ],
};

export default {
  key: 'aaa_list',
  identity: 'aaaList',
  config: {
    title: 'AAA列表',
    dataSetKey: 'dataSet1', // 数据源配置
    primaryFieldKey: 'aaa__id',
    fields: [
      {
        key: 'aaa__id',
        text: 'Id',
      },
      {
        key: 'aaa__name',
        text: '名称',
        clickable: true,
        searchable: true,
        visible: true,
      },
      {
        key: 'bbb__id',
        text: 'BBBId',
        component: ObjectCascader,
        // colspan: 2,
        // searchable: true,
        config: bConfig,
      },
      {
        key: 'bbb__name',
        text: 'BBB名称',
        visible: true,
      },
      {
        key: 'ccc__id',
        text: 'CCCId',
        component: ObjectCascader,
        // searchable: true,
        config: cConfig,
      },
      {
        key: 'ccc__name',
        text: 'CCC名称',
        visible: true,
      },
      {
        key: 'aaa__count',
        text: '数量',
        displayType: 'number',
        searchable: true,
        visible: true,
      },
      {
        key: 'aaa__type',
        text: '类型',
        displayType: 'groupType',
        showTotal: true,
        searchable: true,
        visible: true,
        groupKey: 'typeGroup',
      },
      {
        key: 'aaa__status',
        text: '状态',
        displayType: 'groupType',
        searchable: true,
        visible: true,
        groupKey: 'statusGroup',
      },
      {
        key: 'aaa__createTime',
        text: '创建时间',
        displayType: 'datetime',
        format: 'YYYY-MM-DD',
        searchable: true,
        visible: true,
      },
      {
        key: 'aaa__createByDept',
        text: '创建人部门Id',
        displayType: 'department',
      },
      {
        key: 'aaa__createByDept__name',
        text: '创建人部门',
        displayType: 'department',
        visible: true,
      },
      {
        key: 'aaa__createBy',
        text: '创建人Id',
        displayType: 'employee',
      },
      {
        key: 'aaa__createBy__name',
        text: '创建人',
        displayType: 'employee',
        visible: true,
      },
    ],
  },
  routes: [
    {
      key: 'aaa_add',
      name: 'AAA新建',
      type: 'Popup',
      url: '/aaa_add',
    },
    {
      key: 'aaa_edit',
      name: 'AAA编辑',
      type: 'SlideIn',
      url: '/aaa_edit',
    },
    {
      key: 'aaa_detail',
      name: 'AAA详情',
      url: '/aaa_detail',
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
          sortField: 'name',
          sortDirection: 'asc',
          likeValue: null, // 数据源模糊匹配的参数，如果config中fuzzy为false则不会传递
          searchFields: [], // 字段查询条件
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
