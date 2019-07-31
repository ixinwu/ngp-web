import React from 'react';
import warning from 'warning';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { SheetsRegistry } from 'jss';
import { NgpThemeProvider, createGenerateClassName } from '@ixinwu-ngp/web-styles';
import CssBaseLine from '@ixinwu-ngp/materials-component/css_base_line';
import Shell from './component';

function getContent({
  sheetsRegistry,
  generateClassName,
  theme,
  sheetsManager,
  store,
  basename,
  appKey,
  identity,
  init,
  initConfig,
  initComponent,
}) {
  const InitComponent = initComponent;
  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <NgpThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <CssBaseLine />
        <Provider store={store}>
          <Router basename={basename}>
            <InitComponent
              appKey={appKey}
              basename={basename}
              identity={identity}
              init={init}
              initConfig={initConfig}
            />
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
    this.init = options.init;
    this.initConfig = options.initConfig || {};
    this.initComponent = options.initComponent || Shell;
  }

  render(container, identity) {
    warning(identity, 'Can not start app without block!');
    warning(!this.initialized, 'App has been initialized!');

    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName({ productionPrefix: 'ngp' });
    const theme = {};
    const sheetsManager = new Map();
    // 挂载dom点
    this.container = container || this.container;

    render(
      getContent({
        sheetsRegistry,
        generateClassName,
        theme,
        sheetsManager,
        store: this.store,
        basename: this.basename,
        appKey: this.appKey,
        identity,
        init: this.init,
        initConfig: this.initConfig,
        initComponent: this.initComponent,
      }),
      this.container,
    );

    this.initialized = true;
  }
}
