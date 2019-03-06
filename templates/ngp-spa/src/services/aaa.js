import apiService from '../lib/api_service';
import { isMock } from './utils';
import aaaList from './mock_data/aaa_list';
import aaa from './mock_data/aaa';

const SCOPE_MOCK = true;

// 替换整个文件的Aaa/aaa为业务对象，之后可以把这行注释删除
export function fetchGetAaaListData(params) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    return apiService
      .mockFetch(params, {
        count: 30,
        list: aaaList,
      })
      .then(data => ({
        ...data,
        list: data.list.map(item => ({
          ...item,
          menuRange: item.menuRange ? item.menuRange.split(',') : [],
        })),
      }));
  }

  return apiService
    .fetchAppJsonApi({
      method: 'POST',
      url: '/aaa/aaaList',
      data: params,
    })
    .then(data => ({
      ...data,
      list: data.list.map(item => ({
        ...item,
        menuRange: item.menuRange ? item.menuRange.split(',') : [],
      })),
    }));
}

export function fetchGetAaa(id) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch({ key: id }, aaa);
  }

  return apiService.fetchAppJsonApi({
    method: 'POST',
    url: '/aaa/get',
    data: { key: id },
  });
}

export function fetchAddAaa(params) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch(params, {});
  }

  return apiService.fetchAppJsonApi({
    method: 'POST',
    url: '/aaa/add',
    data: params,
  });
}

export function fetchEditAaa(params) {
  const MOCK = undefined;
  if (isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch(params, {});
  }

  return apiService.fetchAppJsonApi({
    method: 'POST',
    url: '/aaa/edit',
    data: params,
  });
}
