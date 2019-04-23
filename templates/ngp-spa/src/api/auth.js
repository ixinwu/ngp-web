import apiService from '../lib/api_service';

export function fetchAuth(userName, password) {
  return apiService.fetchJsonApi({
    url: `${apiService.apiConfig.AUTH_HOST}/jwt/token`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      userName,
      password,
    },
    mock: true,
    mockResponse: {},
    mockData: {},
    mockOptions: {},
  });
}
