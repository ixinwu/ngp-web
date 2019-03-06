const isDate = obj => Object.prototype.toString.call(obj) === '[object Date]';

const isRegex = obj => Object.prototype.toString.call(obj) === '[object RegExp]';

// export const camelCaseStr = str => str.replace(/[_.-](\w|$)/g, (match, m1) => m1.toUpperCase());
export const underscoreStr = str => str.replace(/[A-Z](?=\w)/g, match => `_${match.toLowerCase()}`);
export const camelCaseStr = str => str.replace(/^[A-Z](?![A-Z])/g, match => match.toLowerCase());

const walk = (obj, convert) => {
  if (!obj || typeof obj !== 'object') return obj;
  if (isDate(obj) || isRegex(obj)) return obj;
  if (Array.isArray(obj)) return obj.map(item => walk(item, convert));

  return Object.keys(obj).reduce((acc, key) => {
    const camel = convert(key);
    acc[camel] = walk(obj[key], convert);
    return acc;
  }, {});
};

// export const camelCaseObj = obj => walk(obj, camelCaseStr);
export const underscoreObj = obj => walk(obj, underscoreStr);
export const camelCaseObj = obj => walk(obj, camelCaseStr);
