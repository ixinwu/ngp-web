import apiService from '../lib/api_service';
import { paramConverter } from '../lib/dynamic';
import { sliceListData, createDataSetListMockData, formatDataSetData } from './utils';
import groups from './mock_data/groups';

const SCOPE_MOCK = true;

export function fetchGetDataSetListData(dataSetKey, fields, params) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/queryDynamicListPageData',
    params: paramConverter.toListPramas({
      dataSetKey,
      params,
      fields,
    }),
    // mock: SCOPE_MOCK,
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
    list: data.data,
  }));
}

export function fetchGetDataSetData(dataSetKey, fields, id) {
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

export function fetchAddDataSetData(dataSetKey, fields, values) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/insertDynamicData',
    params: paramConverter.toAddParams({
      dataSetKey,
      values,
      fields,
    }),
    // mock: SCOPE_MOCK,
    mockData: {},
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchEditDataSetData(params) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/updateDynamicData',
    params,
    mock: SCOPE_MOCK,
    mockData: {},
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchDeleteDataSetData(dataSetKey, keys) {
  const fetchOptions = {
    method: 'POST',
    url: '/api/DynamicData/deleteDynamicData',
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
    url: '/group/groupTypes',
    params: {
      groupKey,
    },
    mock: SCOPE_MOCK,
    mockData: groups[groupKey],
  };

  return apiService.fetchJsonApi(fetchOptions);
}
