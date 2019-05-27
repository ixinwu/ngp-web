import moment from 'moment';
import { generateListWhereDsl } from './helpers';

export const paramConverter = {
  toPagingListPramas: ({ dataSetKey, params, fields, paramFields, resourceKey }) => {
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

    const whereExpression = generateListWhereDsl(paramFields || fields, params);

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
  toListPramas: ({ dataSetKey, params, fields, paramFields, resourceKey }) => {
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

    const whereExpression = generateListWhereDsl(paramFields || fields, params);

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

    return requestData;
  },
  toInsertParams: ({ dataSetKey, fields, values, resourceKey }) => {
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
  toSingleDataParams: ({ dataSetKey, fields, primaryFieldKey, primaryFieldValue, resourceKey }) => {
    const result = {
      dataSetKey,
      whereExpression: `${primaryFieldKey} = '${primaryFieldValue}'`,
    };

    result.queryFieldKeys = fields
      .filter(item => {
        const nameRegx = /__Name$/g;
        const d = !nameRegx.test(item.key);

        return d;
      })
      .map(item => item.key);

    if (resourceKey) {
      result.resourceKey = resourceKey;
    }

    return result;
  },
  toUpdateParams: ({
    dataSetKey,
    fields,
    values,
    originalData,
    primaryFieldKey,
    primaryFieldValue,
    resourceKey,
  }) => {
    const result = {
      dataSetKey,
      whereExpressions: [`${primaryFieldKey} = '${primaryFieldValue}'`],
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
          originalValue: originalData[field.key],
        };
      });

    if (resourceKey) {
      result.resourceKey = resourceKey;
    }

    return result;
  },
  toDeleteParams: ({ dataSetKey, primaryFieldKey, primaryFieldValues, resourceKey }) => {
    let inSets = '';

    primaryFieldValues.forEach(value => {
      inSets += `'${value}',`;
    });

    // 去掉最后一个逗号
    if (inSets.length > 0) {
      inSets = inSets.slice(0, inSets.length - 1);
    }

    const result = {
      dataSetKey,
      whereExpressions: [`${primaryFieldKey} IN (${inSets})`],
    };

    if (resourceKey) {
      result.resourceKey = resourceKey;
    }

    return result;
  },
};
