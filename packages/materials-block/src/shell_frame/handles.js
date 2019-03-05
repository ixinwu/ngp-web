import Cookies from 'js-cookie';
import warning from 'warning';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import { apiService } from '@ixinwu-ngp/web-framework';

export function* init({ dataConfigs }) {
  try {
    const config = dataConfigs.userInfo;

    let userInfo = {};
    if (config) {
      userInfo = yield apiService.fetchAppJsonApi({
        method: 'POST',
        url: config ? config.apiUrl : '/getUserInfo',
      });
    }

    return {
      userInfo,
    };
  } catch (error) {
    message.error('用户信息获取失败');
    warning(!error, error.message || '用户信息获取失败');
    return null;
  }
}

export function logout() {
  Cookies.remove('token');
  window.location.href = `${window.location.origin}/login`;
}
