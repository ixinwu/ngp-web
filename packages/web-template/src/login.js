import { createClient } from '@ixinwu-ngp/web-framework';
import loginBundle from './login/index';
import loginConfig from './login/bundle.config';

// 初始化应用
const client = createClient({
  config: {
    apiConfig: {
      HOST: window.HOST,
      APP_HOST: window.APP_HOST,
      AUTH_HOST: window.AUTH_HOST,
    },
  },
});

client.render(document.getElementById('root'), loginBundle, loginConfig);
