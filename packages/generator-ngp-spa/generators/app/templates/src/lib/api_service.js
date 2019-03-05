import fetch from 'isomorphic-fetch';
import download from 'downloadjs';
import { ApiService, checkFetchStatus, checkDataStatus } from '@ixinwu-ngp/web-framework';

const apiService = new ApiService();

const getQueryString = params => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
};

const errorHandle = error => {
  if (error.status === 403) {
    const redirect = window.location.href.replace(window.location.origin, '');
    window.location.href = `${window.location.origin}/login.html?redirect=${redirect}`;
  }
  return Promise.reject(error);
};

apiService.setErrorHandle(errorHandle);

apiService.fetchByFormData = ({ url: fetchUrl, formData }) => {
  // 补全请求路径
  let url = fetchUrl;
  if (url.indexOf('//') === -1) {
    url = apiService.apiConfig.APP_HOST + url;
  }
  return fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${apiService.token}`,
    },
  })
    .then(checkFetchStatus)
    .then(res => res.json())
    .then(checkDataStatus)
    .catch(error => Promise.reject(error));
};

apiService.fetchExport = (config, fileName) => {
  const currentConfig = Object.assign({}, apiService.apiConfig, config);
  const {
    url: fetchUrl,
    data: fetchData,
    params: fetchParams,
    APP_HOST,
    method: fetchMethod,
    headers: fetchHeaders,
  } = currentConfig;

  // warning(fetchUrl, '请求url错误');
  const method = fetchMethod.toUpperCase();
  // warning(
  //   ['GET', 'DELETE', 'POST', 'PUT'].indexOf(method) !== -1,
  //   `${fetchUrl}请求方式错误，必须使用GET/POST/PUT/DELETE`,
  // );
  // warning(!(fetchData && fetchParams), `${fetchUrl}请求参数错误，data和params只能使用一个`);

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
    url = APP_HOST + url;
  }

  // 设置请求头
  const headers = Object.assign(
    {
      // Authorization: `Bearer ${apiService.token}`,
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
    // mode: 'no-cors',
  })
    .then(checkFetchStatus)
    .then(res => {
      const headers = {};
      res.headers.forEach((item, key) => {
        headers[key] = item;
      });
      if (headers['content-type'] !== 'application/msexcel') {
        return res.json().then(checkDataStatus);
      }
      return res.blob().then(blob => download(blob, fileName, 'application/msexcel'));
    })
    .catch(error => Promise.reject(error));
};

export default apiService;
