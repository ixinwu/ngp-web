import { stringify, parse } from 'qs';

export const qsStringify = obj => {
  return stringify(obj);
};

export const qsParse = search => {
  let str = search;
  if (!str) {
    return {};
  }

  if (str.indexOf('?') === 0) {
    str = str.substring(1, str.length);
  }

  return parse(str);
};
