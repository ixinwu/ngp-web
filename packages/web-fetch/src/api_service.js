import fetch from 'isomorphic-fetch';
import { stringify } from 'qs';
import warning from 'warning';

class FetchError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
  }
}

class FetchDataError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'FetchDataError';
    this.status = status;
  }
}

// 请求状态检查
const fetchChecker = response => {
  if (!response.ok) {
    return Promise.reject(new FetchError('', response.status));
  }
  return response;
};

// response ReadableStream解析
const streamParser = res => res.json();

// 数据解析处理
const dataParser = data => {
  if (data.status !== 1) {
    return Promise.reject(new FetchDataError(data.message, data.status));
  }

  return data.data;
};

// 错误梳理
const errorHandler = error => Promise.reject(error);

export class ApiService {
  constructor(config) {
    this.apiConfig = config || {};

    this.mock = false;
    this.fetch = fetch;
    this.fetchChecker = fetchChecker;
    this.streamParser = streamParser;
    this.dataParser = dataParser;
    this.errorHandler = errorHandler;
  }

  fetchJsonApi(config) {
    const { HOST } = this.apiConfig;

    const {
      url: fetchUrl,
      params,
      method = 'POST',
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      credentials,
    } = config;

    warning(fetchUrl, '请求url错误');
    warning(
      ['GET', 'DELETE', 'POST', 'PUT'].indexOf(method) !== -1,
      `${fetchUrl}请求方式错误，必须使用GET/POST/PUT/DELETE`,
    );

    // 补全请求路径
    let url = fetchUrl;
    if (url.indexOf('//') === -1) {
      url = HOST + url;
    }

    // 处理请求参数
    let body;
    if (method.toLocaleUpperCase() === 'GET') {
      const search = stringify(params);
      if (search) {
        url += `?${search}`;
      }
    } else {
      body = JSON.stringify(params);
    }

    let request;
    if (credentials) {
      request = this.fetch(url, {
        method,
        headers,
        body,
        credentials,
      });
    } else {
      request = this.fetch(url, {
        method,
        headers,
        body,
      });
    }

    return request
      .then(this.fetchChecker)
      .then(this.streamParser)
      .then(this.dataParser)
      .catch(this.errorHandler);
  }

  mockFetch(params, mockData) {
    return new Promise(resolve => {
      console.log({
        token: this.token,
        params,
      });
      setTimeout(() => {
        resolve(mockData);
      }, 500);
    });
  }

  isMock(scopeMock, mock) {
    if (mock === undefined || mock === null) {
      if (scopeMock === undefined || scopeMock === null) {
        return this.mock;
      }
      return scopeMock;
    }
    return mock;
  }

  setMock(mock) {
    this.mock = mock;
  }

  setFetchChecker(fetchChecker) {
    this.fetchChecker = fetchChecker;
  }

  setStreamParser(streamParser) {
    this.streamParser = streamParser;
  }

  setDataParser(dataParser) {
    this.dataParser = dataParser;
  }

  setErrorHandler(errorHandler) {
    this.errorHandler = errorHandler;
  }

  setApiConfig(config) {
    this.apiConfig = Object.assign(this.apiConfig, config);
  }

  setToken(token) {
    if (token) {
      this.token = token;
    }
    return this.token;
  }
}

const apiService = new ApiService();

export default apiService;
