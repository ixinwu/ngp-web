import apiService from '../lib/api_service';
import currentUser from './mock_data/current_user';

const SCOPE_MOCK = true;

export function fetchAuth(userName, password) {
  const fetchOptions = {
    method: 'POST',
    url: '/OAuth/token',
    params: { userName, password },
    mock: SCOPE_MOCK,
    mockData: {
      token: `${userName}__${password}`,
    },
  };

  return apiService.fetchJsonApi(fetchOptions);
}

export function fetchGetCurrentUserInfo() {
  const fetchOptions = {
    method: 'POST',
    url: '/user/currentUser',
    mock: SCOPE_MOCK,
    mockData: currentUser,
  };

  return apiService.fetchJsonApi(fetchOptions);
}
