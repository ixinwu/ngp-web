import moment from 'moment';
import constantGroups from '../constants';
import mockGroups from './mock_data/groups';

export function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sliceListData(list, { pageNumber, pageSize }) {
  const start = (pageNumber - 1) * pageSize;
  const end = Math.min(list.length, start + pageSize);
  return list.slice(start, end);
}

const groups = {
  ...constantGroups,
  ...mockGroups,
};

export function formatDataSetData(data) {
  const nd = {};
  data.forEach(prop => {
    nd[prop.key] = prop.value;
  });
  return nd;
}

export function createDataSetListMockData(fields) {
  const data = [];
  const count = randomInt(10, 100);

  for (let i = 0; i < count; i += 1) {
    const item = [];
    fields.forEach(field => {
      switch (field.displayType) {
        case 'number':
          item.push({
            key: field.key,
            value: randomFloat(0, 1000000),
          });
          break;
        case 'datetime':
          item.push({
            key: field.key,
            value: moment()
              .subtract('d', i)
              .format('YYYY-MM-DDTHH:mm:ss'),
          });
          break;
        case 'groupType': {
          const group = groups[field.groupKey];
          item.push({
            key: field.key,
            value: group[randomInt(0, group.length - 1)].key,
          });
          break;
        }
        case 'text':
        case 'department':
        case 'employee':
          item.push({
            key: field.key,
            value: `${field.key}_${i + 1}`,
          });
          break;
        default:
          item.push({
            key: field.key,
            value: `${field.key}_${i + 1}`,
          });
          break;
      }
    });

    data.push(item);
  }

  return data;
}
