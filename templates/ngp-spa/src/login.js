import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ngp, { createClient } from '@ixinwu-ngp/web-framework';
import loginBlock from '@ixinwu-ngp/materials-block/login';
import apiService from './lib/api_service';
import { fetchAuth } from './services/auth';

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

client.render(document.getElementById('root'), loginBlock.bundle, {
  ...loginBlock.config,
  settings: { ...loginBlock.config.settings, fetchAuth },
});
