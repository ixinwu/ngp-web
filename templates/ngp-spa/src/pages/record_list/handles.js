import { message, Modal } from 'antd';
import { call, modify, all } from '@ixinwu-ngp/web-core';
import {
  fetchGetDataSetListData,
  fetchDeleteDataSetData,
  fetchGetGroupTypeData,
} from '../../services/dynamic';

const setDataLoading = (state, identity, value) => state[identity].dataLoading(value);
const setParams = (state, identity, value) => state[identity].params(value);

/**
 * 业务handle
 * @param {Object} props 与react组件中的this.props相同，是调用handle是的一个拷贝
 */
export function* getListData(props) {
  const { identity, dataSetKey, params, fields } = props;
  try {
    yield modify(setDataLoading, identity, true);
    const { pageSize, pageNumber } = params;
    const data = yield call(fetchGetDataSetListData, dataSetKey, fields, params);

    return {
      dataLoading: false,
      selectedUserIds: [],
      data: {
        ...data,
        data: (data.list || []).map((item, index) => ({
          ...item,
          index: index + 1 + pageSize * (pageNumber - 1),
        })),
      },
    };
  } catch (e) {
    console.error(e);
    yield modify(setDataLoading, identity, false);
    message.error(e.message || '履历数据获取失败！');
  }
}

// 初始化页面数据
export function* initPage(props) {
  const { fields } = props;
  try {
    const callMap = { result: call(getListData, props) };
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

// 查询变化
export function* paramsChange(props, params) {
  const { identity } = props;
  try {
    yield modify(setParams, identity, params);
    return yield call(getListData, {
      ...props,
      params: {
        ...props.params,
        ...params,
      },
    });
  } catch (e) {
    message.error(e.message || 'AAA数据获取失败！');
  }
}

export function setSelectedPrimaryKeys(props, selectedPrimaryKeys) {
  return {
    selectedPrimaryKeys,
  };
}

export function* deleteData(props, selectedPrimaryKeys) {
  const { dataSetKey } = props;
  try {
    if (!selectedPrimaryKeys || !selectedPrimaryKeys.length) {
      message.warning('请选择要操作的AAA数据');
      return;
    }

    let content = '确认删除该AAA数据？';
    if (selectedPrimaryKeys.length > 1) {
      content = `确认删除这${selectedPrimaryKeys.length}条AAA数据？`;
    }
    const confirmResult = yield new Promise(resolve => {
      // eslint-disable-line
      Modal.confirm({
        title: '提示信息：',
        content,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          resolve(true);
        },
        onCancel() {
          resolve(false);
        },
      });
    });

    if (!confirmResult) return;

    yield call(fetchDeleteDataSetData, dataSetKey, selectedPrimaryKeys);
    message.success('操作成功');
    return yield call(getListData, props);
  } catch (e) {
    console.error(e.message);
    message.error('操作失败');
  }
}
