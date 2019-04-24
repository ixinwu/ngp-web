import { ApiService } from '@ixinwu-ngp/web-fetch';

const apiService = new ApiService();

const errorHandler = error => {
  if (error.status === 403) {
    const redirect = window.location.href.replace(window.location.origin, '');
    window.location.href = `${window.location.origin}/login.html?redirect=${redirect}`;
  }
  return Promise.reject(error);
};

apiService.setErrorHandler(errorHandler);

export default apiService;
