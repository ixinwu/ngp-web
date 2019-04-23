import { ApiService } from '@ixinwu-ngp/web-framework';

const apiService = new ApiService();

const errorHandle = error => {
  if (error.status === 403) {
    const redirect = window.location.href.replace(window.location.origin, '');
    window.location.href = `${window.location.origin}/login.html?redirect=${redirect}`;
  }
  return Promise.reject(error);
};

apiService.setErrorHandle(errorHandle);

export default apiService;
