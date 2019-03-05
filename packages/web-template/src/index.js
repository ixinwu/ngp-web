import { createClient } from '@ixinwu-ngp/web-framework';
import { pageBundleLoaders, pageConfigLoaders } from './pages';
import appBundle from './app';
import appConfig from './app/bundle.config';

// 初始化应用
const client = createClient({
  pageBundleLoaders,
  pageConfigLoaders,
  config: {
    apiConfig: {
      HOST: window.HOST,
      APP_HOST: window.APP_HOST,
      AUTH_HOST: window.AUTH_HOST,
    },
  },
});

client.render(document.getElementById('root'), appBundle, appConfig);
