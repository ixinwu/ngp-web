import { generateWhereDsl } from './helpers';

export const paramConverter = {
  toDsl: ({ dataSetKey, params, fields, resourceKey }) => {
    const result = {
      pageSize: params.pageSize,
      pageNumber: params.pageNumber,
      likeValue: params.likeValue,
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

    const whereExpression = generateWhereDsl(fields, params);

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
};
