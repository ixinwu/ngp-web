import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ngp, { createClient } from '@ixinwu-ngp/web-framework';
import apiService from './lib/api_service';
import { pageBundleLoaders, pageConfigLoaders } from './pages';
import appBundle from './app';
import appConfig from './app/bundle.config';

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
  pageBundleLoaders,
  pageConfigLoaders,
  config: {
    apiConfig,
  },
});

client.render(document.getElementById('root'), appBundle, appConfig);
