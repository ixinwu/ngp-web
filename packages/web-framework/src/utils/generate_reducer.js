export default function generateReducer(config) {
  let reducer;

  if (typeof config === 'function') {
    reducer = config;
  }

  if (typeof config === 'object') {
    reducer = (state = config.defaultValue) => {
      return state;
    };

    const name = config.key || 'generateReducer';

    Object.defineProperty(reducer, 'name', { value: name, writable: false });
    Object.defineProperty(reducer, 'displayName', { value: name, writable: false });
  }

  return reducer;
}
