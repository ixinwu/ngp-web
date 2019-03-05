import apiService from '../lib/api_service';
import { isMock, sliceListData, createDataSetListMockData, formatDataSetData } from './utils';
import groups from './mock_data/groups';

const SCOPE_MOCK = true;

export function fetchGetDataSetListData(dataSetKey, params, fields) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    const data = createDataSetListMockData(fields);
    return apiService
      .mockFetch(
        {
          dataSetKey,
          ...params,
          fields: fields.map(field => field.key),
        },
        {
          count: data.length,
          list: sliceListData(data, params),
        },
      )
      .then(data => ({
        ...data,
        list: data.list.map(item => formatDataSetData(item)),
      }));
  }

  return apiService
    .fetchAppJsonApi({
      method: 'POST',
      url: '/dataSet/list',
      data: {
        dataSetKey,
        ...params,
        fields: fields.map(field => field.key),
      },
    })
    .then(data => ({
      ...data,
      list: data.list.map(item => formatDataSetData(item)),
    }));
}

export function fetchGetDataSetData(dataSetKey, id, fields) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    const data = createDataSetListMockData(fields)[0];
    return apiService
      .mockFetch({ dataSetKey, id, fields }, data)
      .then(data => formatDataSetData(data));
  }

  return apiService
    .fetchAppJsonApi({
      method: 'POST',
      url: '/xxx/yyyy',
      data: { dataSetKey, id, fields },
    })
    .then(data => formatDataSetData(data));
}

export function fetchAddDataSetData(params) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch(params, {});
  }

  return apiService.fetchAppJsonApi({
    method: 'POST',
    url: '/xxx/yyyy',
    data: params,
  });
}

export function fetchEditDataSetData(params) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch(params, {});
  }

  return apiService.fetchAppJsonApi({
    method: 'POST',
    url: '/user/editUserInfo',
    data: params,
  });
}

export function fetchDeleteDataSetData(dataSetKey, keys) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch(
      {
        dataSetKey,
        keys,
      },
      {},
    );
  }

  return apiService.fetchAppJsonApi({
    method: 'POST',
    url: '/dataSet/delete',
    data: {
      dataSetKey,
      keys,
    },
  });
}

export function fetchGetGroupTypeData(groupKey) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch(
      {
        groupKey,
      },
      groups[groupKey],
    );
  }

  return apiService.fetchAppJsonApi({
    method: 'POST',
    url: '/user/editUserInfo',
    data: { groupKey },
  });
}
