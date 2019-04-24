import { message } from 'antd';
import moment from 'moment';
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

    const params = {
      dataSetKey,
      fields: fields
        .filter(
          field => field.visible && values[field.key] !== null && values[field.key] !== undefined,
        )
        .map(field => {
          let value = values[field.key];
          if (moment.isMoment(value)) {
            value = value.format('YYYY-MM-DDTmm:hh:ss');
          }

          return {
            fieldKey: field.key,
            value,
          };
        }),
    };

    yield call(fetchAddDataSetData, params);

    message.success('操作成功！');
  } catch (e) {
    message.error(e.message || '操作失败！');
  }
}
