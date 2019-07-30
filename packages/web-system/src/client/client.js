import React from 'react';
import warning from 'warning';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { SheetsRegistry } from 'jss';
import { NgpThemeProvider, createGenerateClassName } from '@ixinwu-ngp/web-styles';
import CssBaseLine from '@ixinwu-ngp/materials-component/css_base_line';
import BlockContainer from '../block/loader';
import RouteContext from '../context/route';
import ParentContext from '../context/parent';

function getContent({
  sheetsRegistry,
  generateClassName,
  theme,
  sheetsManager,
  store,
  basename,
  appKey,
  identity,
}) {
  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <NgpThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <CssBaseLine />
        <Provider store={store}>
          <Router basename={basename}>
            <RouteContext.Provider value={{ path: basename }}>
              <ParentContext.Provider value={() => {}}>
                <BlockContainer identity={identity} appKey={appKey} />
              </ParentContext.Provider>
            </RouteContext.Provider>
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
      }),
      this.container,
    );

    this.initialized = true;
  }
}
