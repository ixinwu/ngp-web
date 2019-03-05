import message from 'antd/lib/message';
import 'antd/lib/message/style';
import Cookies from 'js-cookie';
import { call, modify } from '@ixinwu-ngp/web-core';
import apiService from '../lib/api_service';
import { fetchAuth } from '../services';

const setLogStatus = (setters, status) => setters.login.logStatus(status);

export function init(props) {
  apiService.setApiConfig(props.apiConfig);
}

export function* login(props, userName, password) {
  try {
    yield modify(setLogStatus, true);
    const token = yield call(fetchAuth, userName, password);

    Cookies.set('token', token);
    apiService.setToken(token);
    yield modify(setLogStatus, false);

    window.location.href = window.location.origin;
  } catch (e) {
    yield modify(setLogStatus, false);
    message.error(e.message || '登录失败');
  }
}
