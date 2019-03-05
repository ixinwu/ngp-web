function addFieldKeys(keys, addKeys) {
  addKeys.forEach(key => {
    if (keys.indexOf(key) === -1) {
      keys.push(key);
    }
  });

  return keys;
}

function exceptFieldKeys(keys, exceptKeys) {
  const newKeys = [];
  keys.forEach(key => {
    if (exceptKeys.indexOf(key) === -1) {
      newKeys.push(key);
    }
  });

  return newKeys;
}

export function fieldRelation(fields = [], fieldRelations = {}, data = {}) {
  let hiddenFieldKeys = [];

  // 遍历字段是否满足字段关联配置
  fields.forEach(field => {
    const fieldRelation = fieldRelations[field.key];
    // 没有配置直接返回
    if (!fieldRelation) return;

    if (hiddenFieldKeys.indexOf(field.key) !== -1) {
      hiddenFieldKeys = addFieldKeys(hiddenFieldKeys, fieldRelation.slaveRangeFieldKeys);
      return;
    }

    const fieldValue = !data[field.key] ? [] : data[field.key].split(',');
    // 检查字段当前值的关联配置
    let showFieldKeys = [];

    fieldValue.forEach(value => {
      const relationConfig = fieldRelation.relationConfig[value];
      if (relationConfig) {
        showFieldKeys = addFieldKeys(showFieldKeys, relationConfig.slaveFieldKeys);
      }
    });

    hiddenFieldKeys = addFieldKeys(
      hiddenFieldKeys,
      exceptFieldKeys(fieldRelation.slaveRangeFieldKeys, showFieldKeys),
    );
  });

  return fields.filter(field => hiddenFieldKeys.indexOf(field.key) === -1 && field.visible);
}
