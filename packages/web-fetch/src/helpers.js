import moment from 'moment';

export function generateListWhereDsl(fields, values) {
  const dsls = [];

  fields.forEach(field => {
    const value = values[field.key];
    const displayType = field.displayType || 'text';
    if (value !== null && value !== undefined && value !== '') {
      switch (displayType) {
        case 'number': {
          let [left, right] = value || [];
          left = Number.parseFloat(left, 10);
          right = Number.parseFloat(right, 10);
          let dsl = '';
          if (!Number.isNaN(left)) {
            dsl += `${field.key} >= ${left}`;
          }
          if (!Number.isNaN(right)) {
            dsl += ` && ${field.key} <= ${right}`;
          }
          if (dsl !== '') {
            dsls.push(dsl);
          }
          break;
        }
        case 'datetime': {
          let [left, right] = value || [];
          left = moment(left);
          right = moment(right);
          let dsl = '';
          if (left.isValid()) {
            dsl += `${field.key} >= ${left.format('YYYY-MM-DDTHH:mm:ss')}`;
          }
          if (right.isValid()) {
            dsl += ` && ${field.key} <= ${right.format('YYYY-MM-DDTHH:mm:ss')}`;
          }
          dsls.push(dsl);
          break;
        }
        case 'employee':
        case 'department':
        case 'groupType': {
          let vs = value || []; // value为0的情况会跳过
          if (!Array.isArray(vs)) {
            vs = vs.split(',');
          }
          let inSets = '';

          vs.forEach(v => {
            if (v !== null && v !== undefined && v !== '') {
              inSets += `'${v}',`;
            }
          });

          // 去掉最后一个逗号
          if (inSets.length > 0) {
            inSets = inSets.slice(0, inSets.length - 1);
          }

          if (inSets !== '') {
            dsls.push(`${field.key} IN (${inSets})`);
          }
          break;
        }
        case 'text': {
          dsls.push(`${field.key} LIKE '${value}'`);
          break;
        }
        default:
      }
    }
  });

  // 处理模糊搜索
  const fuzzyFileds = fields.filter(field => field.fuzzy);

  if (values.fuzzySearch && fuzzyFileds.length > 0) {
    const fuzzyDsl = [];
    fuzzyFileds.forEach(field => {
      fuzzyDsl.push(`${field.key} LIKE '${values.fuzzySearch}'`);
    });
    dsls.push(`(${fuzzyDsl.join(' || ')})`);
  }

  return dsls.join(' && ');
}
