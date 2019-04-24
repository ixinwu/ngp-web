import apiService from '../lib/api_service';
import currentUser from './mock_data/current_user';

const SCOPE_MOCK = true;

export function fetchAuth(userName, password) {
  const MOCK = undefined;
  if (apiService.isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch(
      { userName, password },
      {
        token: `${userName}__${password}`,
      },
    );
  }

  return apiService.fetchJsonApi({
    url: `${apiService.apiConfig.AUTH_HOST}/jwt/token`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params: {
      userName,
      password,
    },
  });
}

export function fetchGetCurrentUserInfo() {
  const MOCK = undefined;
  if (apiService.isMock(SCOPE_MOCK, MOCK)) {
    return apiService.mockFetch(null, currentUser);
  }

  return apiService.fetchAppJsonApi({
    method: 'POST',
    url: '/user/getUserByContext',
  });
}
