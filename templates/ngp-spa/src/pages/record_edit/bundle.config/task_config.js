import projectConfig from './project_config';

export default {
  dataSetKey: 'TMPM_FullSet', // 数据源配置
  primaryFieldKey: 'TMPM_Task_Id',
  nameFieldKey: 'TMPM_Task_Name',
  fields: [
    {
      key: 'TMPM_Task_Id',
      text: '任务Id',
    },
    {
      key: 'TMPM_Task_Name',
      text: '任务名称',
      visible: true,
      searchable: true,
    },
    {
      key: 'TMPM_Task_ProjectId',
      text: '任务项目Id',
      searchable: true,
      config: projectConfig,
    },
  ],
};
