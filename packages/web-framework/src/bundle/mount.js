import warning from 'warning';
import { mount as coreMount } from '@ixinwu-ngp/web-core';
import generateReducer from '../utils/generate_reducer';
import connect from './connect';

export default function mount(bundle) {
  const { identity, models = {} } = bundle;

  warning(identity, 'block config need identity');
  warning(bundle.view, 'block bundle need view');

  const modelReducers = {};
  Object.keys(models).forEach(key => {
    modelReducers[key] = generateReducer({
      key,
      defaultValue: models[key].defaultValue,
    });
  });

  const { handleTriggers } = coreMount(identity, {
    reducers: {
      ...bundle.reducers,
      ...modelReducers,
    },
    sagas: bundle.sagas,
    handles: bundle.handles,
  });

  return connect({
    identity,
    handleTriggers,
  })(bundle.view);
}
