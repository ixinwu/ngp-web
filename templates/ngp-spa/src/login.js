import '@babel/polyfill';
import ngp, { createClient } from '@ixinwu-ngp/web-framework';
import apiService from './lib/api_service';
import loginBundle from './login/index';
import loginConfig from './login/bundle.config';

const apiConfig = {
  HOST: window.HOST,
  APP_HOST: window.APP_HOST,
  AUTH_HOST: window.AUTH_HOST,
};

// 配置api服务
apiService.setApiConfig(apiConfig);
ngp.apiService = apiService;

// 初始化应用
const client = createClient({
  config: {
    apiConfig,
  },
});

client.render(document.getElementById('root'), loginBundle, loginConfig);
