export default {
  dataSetKey: 'TMPM_FullSet', // 数据源配置
  primaryFieldKey: 'TMPM_Project_Id',
  nameFieldKey: 'TMPM_Project_Name',
  fields: [
    {
      key: 'TMPM_Project_Id',
      text: '项目Id',
    },
    {
      key: 'TMPM_Project_Name',
      text: '项目名称',
      searchable: true,
      visible: true,
    },
  ],
};
