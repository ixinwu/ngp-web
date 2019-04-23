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

    this.fetch = fetch;
    this.fetchChecker = fetchChecker;
    this.streamParser = streamParser;
    this.dataParser = dataParser;
    this.errorHandler = errorHandler;
  }

  fetchJsonApi(config) {
    const currentConfig = Object.assign({}, this.apiConfig, config);
    const {
      url: fetchUrl,
      data: fetchData,
      params: fetchParams,
      HOST,
      method: fetchMethod,
      headers: fetchHeaders,
    } = currentConfig;

    warning(fetchUrl, '请求url错误');
    const method = fetchMethod.toUpperCase();
    warning(
      ['GET', 'DELETE', 'POST', 'PUT'].indexOf(method) !== -1,
      `${fetchUrl}请求方式错误，必须使用GET/POST/PUT/DELETE`,
    );
    warning(!(fetchData && fetchParams), `${fetchUrl}请求参数错误，data和params只能使用一个`);

    let params;
    let data;
    if (['GET', 'DELETE'].indexOf(method) !== -1) {
      params = fetchParams || fetchData;
    }
    if (['POST', 'PUT'].indexOf(method) !== -1) {
      data = fetchData;
      params = fetchParams;
    }

    // 补全请求路径
    let url = fetchUrl;
    if (url.indexOf('//') === -1) {
      url = HOST + url;
    }

    // 设置请求头
    const headers = Object.assign(
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      fetchHeaders,
    );

    // 处理请求参数
    let body;
    if (params) {
      const search = stringify(params);
      if (search) {
        url += `?${search}`;
      }
    } else if (data) {
      body = JSON.stringify(data);
    }

    return this.fetch(url, {
      method,
      headers,
      body,
      // credentials: 'include'
    })
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

// 返回一个实例，结合es6的im/export实现单例模式
const apiService = new ApiService();
export default apiService;
