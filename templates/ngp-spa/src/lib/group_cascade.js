export function groupCascade(fields = [], groupConfigs = {}, groupCascades = [], data = {}) {
  console.log('-------------------groupCascade');
  let groups = {
    ...groupConfigs,
  };

  groupCascades.forEach(cascade => {
    // 同一个类别在字段中最多出现一次
    const groupField = fields.find(field => field.groupKey === cascade.masterGroupKey);

    // 没有主控制字段，则返回所有的类型
    if (!groupField) {
      return;
    }

    let group = groups[cascade.slaveGroupKey] || [];

    const fieldValue = data[groupField.key];
    const masterTypeCascade = cascade.cascadeConfig.find(
      config => config.masterTypeKey === fieldValue,
    );

    // 匹配级联，slaveGroup的typeList使用配置的slaveTypeKeys过滤
    if (masterTypeCascade) {
      group = group.filter(type => masterTypeCascade.slaveTypeKeys.indexOf(type.key) !== -1);
      groups = Object.assign(groups, {
        [cascade.slaveGroupKey]: group,
      });
    } else {
      // 不匹配级联时，slaveGroup的typeList为空
      group = [];
      groups = Object.assign(groups, {
        [cascade.slaveGroupKey]: group,
      });
    }
  });

  return fields.map(field => {
    if (field.groupKey) {
      return {
        ...field,
        types: groups[field.groupKey] ? groups[field.groupKey] : [],
      };
    }
    return field;
  });
}

// TODO 考虑多选的情况
export function getChangedValues(fields, data) {
  console.log('-------------------getChangedValues');
  const changedValues = [];

  fields.forEach(field => {
    const value = data[field.key];
    if (field.groupKey && value) {
      let oldValue = value;
      let newValue = [];
      if (!Array.isArray(oldValue)) {
        oldValue = oldValue.split(',');
      }
      oldValue.forEach(item => {
        const type = field.types.find(type => type.key === item);
        if (type) {
          newValue.push(type.key);
        }
      });

      newValue = newValue.length > 0 ? newValue.join(',') : undefined;

      if (value !== newValue) {
        changedValues.push({
          key: field.key,
          value: newValue,
        });
      }
    }
  });

  return changedValues;
}
