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

import ObjectCascader from '../../../components/object_cascader';
import projectConfig from './project_config';
import taskConfig from './task_config';

export default [
  {
    key: 'TMPM_Record_Id',
    text: 'Id',
  },
  {
    key: 'TMPM_Record_Name',
    text: '履历名称',
    clickable: true,
    searchable: true,
    visible: true,
  },
  {
    key: 'TMPM_Record_TaskId',
    text: '履历任务Id',
    component: ObjectCascader,
    colspan: 2,
    config: taskConfig,
    visible: true,
  },
  {
    key: 'TMPM_Record_ProjectId',
    text: '履历项目Id',
    component: ObjectCascader,
    config: projectConfig,
    visible: true,
  },
  {
    key: 'TMPM_Project_Id',
    text: '项目Id',
  },
  {
    key: 'TMPM_Project_Name',
    text: '项目名称',
  },
  {
    key: 'TMPM_Task_Id',
    text: '任务Id',
  },
  {
    key: 'TMPM_Task_Name',
    text: '任务名称',
  },
];
