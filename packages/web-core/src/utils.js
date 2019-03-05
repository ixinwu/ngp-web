import { takeLatest, call, put, all } from 'redux-saga/effects';
import core from './core';

// 尝试修复replaceReducer的warning
export function createRootReducer(reducers) {
  return (state = Object.create(null), action) => {
    const result = Object.create(null);

    Object.keys(reducers).forEach(stateKey => {
      const reducer = reducers[stateKey];
      result[stateKey] = reducer(state[stateKey], action);
    });

    return result;
  };
}

function createReducerPredicate(identity) {
  return action => action.identity === identity;
}

function createFilteredReducer(reducerFunction, reducerPredicate) {
  return (state, action) => {
    const isInitializationCall = state === undefined;
    const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
    return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
  };
}

export function wrapReducer(fn, identity, reducerKey) {
  const wrappedReducer = (state, action) => {
    let actionKey;
    if (identity) {
      actionKey = `${identity}/${reducerKey}`;
    } else {
      actionKey = `/${reducerKey}`;
    }

    if (action.type === actionKey) {
      return action.payload;
    }
    if (action.type === identity && reducerKey in action.payload) {
      // return action.payload[reducerKey] === undefined || action.payload[reducerKey] === null ?
      //   state : action.payload[reducerKey];
      return action.payload[reducerKey];
    }

    if (identity) {
      const reducerPredicate = createReducerPredicate(identity);
      return createFilteredReducer(fn, reducerPredicate)(state, action);
    }

    return fn(state, action);
  };

  // Object.defineProperty(f, 'name', { value: actionKey, writable: false });

  return wrappedReducer;
}

export function generateReducerGetter(getState, identity, reducerKey) {
  return function reducerGetter() {
    if (identity) {
      return getState()[identity][reducerKey];
    }
    return getState()[reducerKey];
  };
}

export function generateReducerSetter(dispatch, identity, reducerKey) {
  let actionKey;
  if (identity) {
    actionKey = `${identity}/${reducerKey}`;
  } else {
    actionKey = `/${reducerKey}`;
  }
  return function reducerSetter(payload) {
    return dispatch({
      type: actionKey,
      payload,
    });
  };
}

export function createBlockSaga(sagas) {
  return function* blockSaga() {
    yield all(sagas.map(saga => saga()));
  };
}

export function createHandleTrigger(dispatch, identity, handleKey) {
  return function handleTrigger(...args) {
    dispatch({
      type: `${identity}/${handleKey}`,
      payload: args,
    });
  };
}

export function createHandleSaga(fn, identity, handleKey) {
  return function* handleSaga() {
    yield takeLatest(`${identity}/${handleKey}`, function* worker(action) {
      const payload = yield call(fn, identity, ...action.payload);

      if (!payload) return;
      yield put({
        type: identity,
        payload,
      });
    });
  };
}

export function wrapHandle(fn, identity, handleKey, dispatch) {
  let resolveFunc;
  let rejectFunc;
  let promise;

  return {
    trigger: (...args) => {
      dispatch({
        type: `${identity}/${handleKey}`,
        payload: args,
      });

      if (!promise) {
        promise = new Promise((resolve, reject) => {
          resolveFunc = resolve;
          rejectFunc = reject;
        });
      }

      return promise;
    },
    saga: function* handleSaga() {
      yield takeLatest(`${identity}/${handleKey}`, function* worker(action) {
        try {
          // TODO 检查是否存在key重名
          const props = core.identityProps[identity];
          const triggers = core.bundles[identity].handleTriggers;

          const payload = yield call(
            fn,
            {
              ...props,
              ...triggers,
            },
            ...action.payload,
          );

          if (payload) {
            yield put({
              type: identity,
              payload,
            });
          }
          if (promise && resolveFunc) {
            resolveFunc();
            resolveFunc = null;
            promise = null;
          }
        } catch (e) {
          if (promise && rejectFunc) {
            rejectFunc(e);
            rejectFunc = null;
            promise = null;
          }
        }
      });
    },
  };
}
