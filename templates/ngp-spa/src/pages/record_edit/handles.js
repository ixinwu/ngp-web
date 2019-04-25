import { message } from 'antd';
import moment from 'moment';
import { call, all, modify } from '@ixinwu-ngp/web-core';
import { qsParse } from '@ixinwu-ngp/web-framework';
import {
  fetchGetDataSetData,
  fetchGetGroupTypeData,
  fetchEditDataSetData,
} from '../../services/dynamic';

// 获取页面列表数据
export function* getData(props) {
  const {
    dataSetKey,
    primaryFieldKey,
    fields,
    location: { search },
  } = props;
  try {
    const { recordId } = qsParse(search) || {};
    const data = yield call(fetchGetDataSetData, dataSetKey, fields, primaryFieldKey, recordId);

    return {
      originalData: { ...data },
      data,
    };
  } catch (e) {
    console.error(e);
    message.error(e.message || '履历数据获取失败！');
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

const setData = (setters, identity, value) => setters[identity].data(value);

export function* submit(props, values) {
  const {
    identity,
    dataSetKey,
    primaryFieldKey,
    fields,
    originalData,
    location: { search },
  } = props;
  try {
    yield modify(setData, identity, values);
    const { recordId } = qsParse(search) || {};

    const changedFields = fields
      .filter(field => field.visible)
      .filter(field => {
        const value = values[field.key];
        if (moment.isMoment(value)) {
          return !value.isSame(moment(originalData[field.key]));
        }

        return originalData[field.key] !== values[field.key];
      });

    if (changedFields.length < 1) {
      message.warning('没有修改数据');
      return;
    }

    // const params = {
    //   dataSetKey,
    //   primaryKey: recordId,
    //   fields: changedFields.map(field => {
    //     let value = values[field.key];
    //     if (moment.isMoment(value)) {
    //       value = value.format('YYYY-MM-DDTmm:hh:ss');
    //     }

    //     return {
    //       fieldKey: field.key,
    //       value,
    //       originalValue: originalData[field.key],
    //     };
    //   }),
    // };

    yield call(
      fetchEditDataSetData,
      dataSetKey,
      changedFields,
      values,
      originalData,
      primaryFieldKey,
      recordId,
    );

    message.success('操作成功！');
  } catch (e) {
    message.error(e.message || '操作失败！');
  }
}
