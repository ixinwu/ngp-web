import { message } from 'antd';
import { call, all, modify } from '@ixinwu-ngp/web-core';
import { fetchGetGroupTypeData, fetchAddDataSetData } from '../../services/dynamic';

// 初始化页面数据
export function* initPage(props) {
  const { fields } = props;
  try {
    const callMap = {};
    // 获取field的group定义
    fields.forEach(field => {
      // TODO 根据实际业务进行修改
      if (field.groupKey && field.groupKey !== 'typeGroup') {
        callMap[field.groupKey] = call(fetchGetGroupTypeData, field.groupKey);
      }
    });
    const { ...groups } = yield all(callMap);

    return {
      ...groups,
    };
  } catch (e) {
    message.error(e.message || '页面初始化失败！');
  }
}

const setData = (setters, identity, value) => setters[identity].data(value);

export function* submit(props, values) {
  const {
    identity,
    dataSetKey,
    fields,
  } = props;
  try {
    yield modify(setData, identity, values);

    yield call(fetchAddDataSetData, dataSetKey, fields, values);

    message.success('操作成功！');
  } catch (e) {
    message.error(e.message || '操作失败！');
  }
}
