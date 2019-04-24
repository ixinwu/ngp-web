import apiService from '../lib/api_service';
import { sliceListData, createDataSetListMockData, formatDataSetData } from './utils';
import groups from './mock_data/groups';

const SCOPE_MOCK = true;

export function fetchGetDataSetListData(dataSetKey, params, fields) {
  const fetchOptions = {
    method: 'POST',
    url: '/dataSet/list',
    params: {
      dataSetKey,
      ...params,
      fields: fields.map(field => field.key),
    },
    mock: SCOPE_MOCK,
    mockData: () => {
      const data = createDataSetListMockData(fields);

      return {
        count: data.length,
        list: sliceListData(data, params),
      };
    },
  };

  return apiService.fetchJsonApi(fetchOptions).then(data => ({
    ...data,
    list: data.list.map(item => formatDataSetData(item)),
  }));
}

export function fetchGetDataSetData(dataSetKey, id, fields) {
  const fetchOptions = {
    method: 'POST',
    url: '/xxx/yyyy',
    params: { dataSetKey, id, fields },
    mock: SCOPE_MOCK,
    mockData: () => {
      const data = createDataSetListMockData(fields)[0];

      return data;
    },
  };

  return apiService.fetchJsonApi(fetchOptions).then(data => formatDataSetData(data));
}

export function fetchAddDataSetData(params) {
  const fetchOptions = {
    method: 'POST',
    url: '/xxx/yyyy',
    params,
    mock: SCOPE_MOCK,
    mockData: {},
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchEditDataSetData(params) {
  const fetchOptions = {
    method: 'POST',
    url: '/xxx/yyyy',
    params,
    mock: SCOPE_MOCK,
    mockData: {},
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchDeleteDataSetData(dataSetKey, keys) {
  const fetchOptions = {
    method: 'POST',
    url: '/xxx/yyyy',
    params: {
      dataSetKey,
      keys,
    },
    mock: SCOPE_MOCK,
    mockData: {},
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchGetGroupTypeData(groupKey) {
  const fetchOptions = {
    method: 'POST',
    url: '/xxx/yyyy',
    params: {
      groupKey,
    },
    mock: SCOPE_MOCK,
    mockData: groups[groupKey],
  };

  return apiService.fetchJsonApi(fetchOptions);
}
