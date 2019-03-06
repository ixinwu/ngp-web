import fetch from 'isomorphic-fetch';
import warning from 'warning';
import ref from '../ref';

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

export const checkFetchStatus = response => {
  if (!response.ok) {
    return Promise.reject(new FetchError('', response.status));
  }
  return response;
};

// 检查数据中的状态
export const checkDataStatus = data => {
  if (data.status !== 1) {
    return Promise.reject(new FetchDataError(data.message, data.status));
  }

  return data.data;
};

const getQueryString = params => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
};

export class ApiService {
  constructor(config) {
    this.apiConfig = config || {};

    this.errorHandle = error => {
      if (error.status === 403 && window.location.pathname !== '/login.html') {
        window.location.href = `${window.location.origin}/login.html`;
      }
      return Promise.reject(error);
    };
  }

  setErrorHandle(errorHandle) {
    this.errorHandle = errorHandle;
  }

  setApiConfig(config) {
    this.apiConfig = Object.assign(this.apiConfig, config);
  }

  getToken(username, password) {
    const data = {
      grant_type: 'password',
      client_id: '416AF9083D8146099384C66E5F829F1F',
      client_secret: 'WmVuTWluZENvcmU=',
      username,
      password,
    };
    return fetch(`${this.apiConfig.AUTH_HOST}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getQueryString(data),
    })
      .then(checkFetchStatus)
      .then(res => res.json())
      .catch(error => Promise.reject(error));
  }

  setToken(token) {
    if (token) {
      this.token = token;
    }
    return this.token;
  }

  // 获取静态文件
  // eslint-disable-next-line
  fetchJsonFile(url) {
    return fetch(`${window.location.origin}${url}`)
      .then(response => response.json())
      .then(json => json)
      .catch(error => Promise.reject(error));
  }

  fetchAppJsonApi(config) {
    return this.fetchJsonApi({
      ...config,
      HOST: this.apiConfig.APP_HOST,
    });
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
      let qs = getQueryString(params);
      if (qs) {
        qs = ((url || '').indexOf('?') === -1 ? '?' : '&') + qs;
        url += qs;
      }
    } else if (data) {
      body = JSON.stringify(data);
    }

    return fetch(url, {
      method,
      headers,
      body,
      // credentials: 'include'
    })
      .then(checkFetchStatus)
      .then(res => res.json())
      .then(checkDataStatus)
      .catch(this.errorHandle);
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
}

// 返回一个实例，结合es6的im/export实现单例模式
const apiService = new ApiService();
ref.apiService = apiService;
export default apiService;
