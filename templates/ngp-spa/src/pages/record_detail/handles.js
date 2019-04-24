import { message } from 'antd';
import { call, all } from '@ixinwu-ngp/web-core';
import { qsParse } from '@ixinwu-ngp/web-framework';
import { fetchGetDataSetData, fetchGetGroupTypeData } from '../../services/dynamic';

// 获取页面列表数据
export function* getData(props) {
  const {
    dataSetKey,
    fields,
    location: { search },
  } = props;
  try {
    const { aaaId } = qsParse(search) || {};
    const data = yield call(fetchGetDataSetData, dataSetKey, aaaId, fields);

    return {
      data,
    };
  } catch (e) {
    console.log(e);
    message.error(e.message || 'AAA数据获取失败！');
  }
}

// 初始化页面数据
export function* initPage(props) {
  const { fields } = props;
  try {
    const callMap = { result: call(getData, props) };
    // 获取field的group定义
    fields.forEach(field => {
      // TODO 根据实际业务进行修改
      if (field.groupKey && field.groupKey !== 'typeGroup') {
        callMap[field.groupKey] = call(fetchGetGroupTypeData, field.groupKey);
      }
    });
    const { result, ...groups } = yield all(callMap);

    return {
      ...result,
      ...groups,
    };
  } catch (e) {
    message.error(e.message || '页面初始化失败！');
  }
}
