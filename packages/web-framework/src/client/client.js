import React from 'react';
import warning from 'warning';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { withRouter, BrowserRouter as Router } from 'react-router-dom';
import { mount, unmount } from '@ixinwu-ngp/web-core';
import { SheetsRegistry } from 'jss';
import NgpThemeProvider from '@ixinwu-ngp/materials-component/styles/ngp_theme_provider';
import createGenerateClassName from '@ixinwu-ngp/materials-component/styles/create_generate_class_name';
import CssBaseLine from '@ixinwu-ngp/materials-component/css_base_line';
import mountBundle from '../bundle/mount';
import mountBlock from '../block/mount';
import generateReducer from '../utils/generate_reducer';
import ShellApp from './shell';

function getContent({
  sheetsRegistry,
  generateClassName,
  theme,
  sheetsManager,
  store,
  basename,
  appKey,
  getAppConfig,
  AppComp,
}) {
  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <NgpThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <CssBaseLine />
        <Provider store={store}>
          <Router basename={basename}>
            <AppComp appKey={appKey} getAppConfig={getAppConfig} />
          </Router>
        </Provider>
      </NgpThemeProvider>
    </JssProvider>
  );
}

export default class Client {
  constructor(options) {
    this.initialized = false;
    this.container = options.container;
    this.store = options.store;
    this.appKey = options.appKey;
    this.basename = options.basename;
    this.getAppConfig = options.getAppConfig;
    // 页面的配置获取定义和代码加载器
    this.pageBundleLoaders = options.pageBundleLoaders || {};
    this.pageConfigLoaders = options.pageConfigLoaders || {};
    // 缓存，避免多次异步获取代码和配置
    this.pages = {};
  }

  render(container, bundle, config) {
    warning(!this.initialized, 'App has been initialized!');

    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();
    const theme = {};
    const sheetsManager = new Map();
    // 挂载dom点
    this.container = container || this.container;

    if (bundle && config) {
      // custom app
      const AppComp = withRouter(mountBlock(config, bundle));

      render(
        getContent({
          sheetsRegistry,
          generateClassName,
          theme,
          sheetsManager,
          store: this.store,
          basename: this.basename,
          appKey: this.appKey,
          getAppConfig: this.getAppConfig,
          AppComp,
        }),
        this.container,
      );
    } else if (bundle && !config) {
      // custom app
      const AppComp = withRouter(mountBundle(bundle));

      render(
        getContent({
          sheetsRegistry,
          generateClassName,
          theme,
          sheetsManager,
          store: this.store,
          basename: this.basename,
          appKey: this.appKey,
          getAppConfig: this.getAppConfig,
          AppComp,
        }),
        this.container,
      );
    } else {
      // shell app
      const AppComp = withRouter(ShellApp);
      render(
        getContent({
          sheetsRegistry,
          generateClassName,
          theme,
          sheetsManager,
          store: this.store,
          basename: this.basename,
          appKey: this.appKey,
          getAppConfig: this.getAppConfig,
          AppComp,
        }),
        this.container,
      );
    }

    this.initialized = true;
  }

  hydrate(container, bundle, config) {
    warning(!this.initialized, 'App has been initialized!');

    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();
    const theme = {};
    const sheetsManager = new Map();
    // 挂载dom点
    this.container = container || this.container;

    if (bundle && config) {
      // custom app
      const AppComp = withRouter(mountBlock(config, bundle));

      hydrate(
        getContent({
          sheetsRegistry,
          generateClassName,
          theme,
          sheetsManager,
          store: this.store,
          basename: this.basename,
          appKey: this.appKey,
          getAppConfig: this.getAppConfig,
          AppComp,
        }),
        this.container,
      );
    } else if (bundle && !config) {
      // custom app
      const AppComp = withRouter(mountBundle(bundle));

      hydrate(
        getContent({
          sheetsRegistry,
          generateClassName,
          theme,
          sheetsManager,
          store: this.store,
          basename: this.basename,
          appKey: this.appKey,
          getAppConfig: this.getAppConfig,
          AppComp,
        }),
        this.container,
      );
    } else {
      // shell app
      const AppComp = withRouter(ShellApp);
      hydrate(
        getContent({
          sheetsRegistry,
          generateClassName,
          theme,
          sheetsManager,
          store: this.store,
          basename: this.basename,
          appKey: this.appKey,
          getAppConfig: this.getAppConfig,
          AppComp,
        }),
        this.container,
      );
    }

    this.initialized = true;
  }

  registerPage(pageKey, pageCache) {
    this.pages[pageKey] = pageCache;
  }

  // eslint-disable-next-line
  mount(identity, bundle) {
    const { models } = bundle;
    const modelReducers = {};

    if (models) {
      Object.keys(models).forEach(key => {
        modelReducers[key] = generateReducer({
          key,
          defaultValue: models[key].defaultValue,
        });
      });
    }
    return mount(identity, {
      reducers: {
        ...bundle.reducers,
        ...modelReducers,
      },
      handles: bundle.handles,
      sagas: bundle.sagas,
    });
  }

  // eslint-disable-next-line
  unmount(identity) {
    if (identity) {
      unmount(identity);
    }
  }
}
