import moment from 'moment';
import { generateListWhereDsl } from './helpers';

export const paramConverter = {
  toListPramas: ({ dataSetKey, params, fields, resourceKey }) => {
    const result = {
      pageSize: params.pageSize,
      pageNumber: params.pageNumber,
    };

    const requestData = {
      dataSetKey,
      // 过滤掉名称生成的字段
      queryFieldKeys: fields
        .filter(item => {
          const nameRegx = /__Name$/g;
          const d = !nameRegx.test(item.key);

          return d;
        })
        .map(item => item.key),
    };

    const whereExpression = generateListWhereDsl(fields, params);

    if (resourceKey) {
      requestData.resourceKey = resourceKey;
    }

    if (params.sortField && params.sortDirection) {
      requestData.sortExpression = `${
        params.sortField
      } ${params.sortDirection.toLocaleUpperCase()}`;
    }

    if (whereExpression) {
      requestData.whereExpression = whereExpression;
    }

    result.requestData = requestData;

    return result;
  },
  toAddParams: ({ dataSetKey, fields, values, resourceKey }) => {
    const result = {
      dataSetKey,
    };

    result.operateFields = fields
      .filter(
        field => field.visible && values[field.key] !== null && values[field.key] !== undefined,
      )
      .map(field => {
        let value = values[field.key];
        if (moment.isMoment(value)) {
          value = value.format('YYYY-MM-DDTmm:hh:ss');
        }

        return {
          fieldKey: field.key,
          value,
        };
      });

    if (resourceKey) {
      result.resourceKey = resourceKey;
    }

    return result;
  },
};
