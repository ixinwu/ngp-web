import React from 'react';
import { configureStore } from '@ixinwu-ngp/web-core';
import defaultConfig from '../client/config';
import defaultReducers from '../redux/reducers';
import defaultSagas from '../redux/sagas';
import generateReducer from '../utils/generate_reducer';
import mountBundle from '../bundle/mount';
import NgpThemeProvider from '../styles/ngp_theme_provider';
import createGenerateClassName from '../styles/create_generate_class_name';
import CssBaseLine from '@ixinwu-ngp/materials-component/css_base_line';
import ReactDOMServer from 'react-dom/server';
import { withRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';

export default function createServer(appBundle, pageRender, options) {
  return (req, res) => {
    const { models = {}, config = {}, sagas = {}, reducers = {}, middlewares = [] } = options;
    // 初始化 state
    const initialState = {
      ...defaultConfig,
      ...config,
    };

    const modelReducers = {};

    if (models) {
      Object.keys(models).forEach(key => {
        modelReducers[key] = generateReducer({
          key,
          defaultValue: models[key].defaultValue,
        });
      });
    }

    const store = configureStore({
      // rootHOR
      // init reducers
      reducers: {
        ...defaultReducers,
        ...reducers,
        ...modelReducers,
      },
      // init state
      initialState,
      // init middleware
      middlewares,
    });

    const context = {};
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();
    const theme = {};
    const sheetsManager = new Map();
    const AppComp = withRouter(mountBundle(appBundle));
    const appWithRouter = (
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <NgpThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <CssBaseLine />
          <Provider store={store}>
            <StaticRouter basename={options.basename} location={req.url} context={context}>
              <AppComp appKey={options.appKey} getAppConfig={options.getAppConfig} />
            </StaticRouter>
          </Provider>
        </NgpThemeProvider>
      </JssProvider>
    );
    const html = ReactDOMServer.renderToString(appWithRouter);
    const css = sheetsRegistry.toString();

    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const sagaPromises = [];
    const initSagas = {
      ...defaultSagas,
      ...sagas,
    };
    Object.keys(initSagas).forEach(key => sagaPromises.push(store.runSaga(initSagas[key]).done));
    Promise.all(sagaPromises).then(() => {
      const preloadedState = store.getState();
      res.send(pageRender(html, css, preloadedState));
      res.end();
    });

    store.close();
  };
}
