import React, { Component } from 'react';
import { qsStringify, withStyles } from '@ixinwu-ngp/web-framework';
import FieldDisplay from '@ixinwu-ngp/materials-component/field_display';
import styles from './styles';

class AAADetail extends Component {
  componentDidMount() {
    this.props.initPage();
  }

  handleFieldClick = field => {
    if (field.key === 'aaa__name') {
      const { history, pagePath, data } = this.props;
      history.push({
        pathname: `${pagePath}/aaa_edit`,
        search: qsStringify({ aaaId: data.aaa__id }),
      });
    }
  };

  render() {
    const { classes, title, fields: fieldConfigs, data } = this.props;

    // 为大小分类（枚举）字段绑定选择数据
    const fields = fieldConfigs.map(fieldConfig => {
      if (fieldConfig.displayType === 'groupType') {
        return {
          ...fieldConfig,
          types: this.props[fieldConfig.groupKey] || [],
        };
      }
      return fieldConfig;
    });

    return (
      <div className={classes.container}>
        <div className={classes.header}>{title}</div>
        <div className={classes.body}>
          <FieldDisplay
            fields={fields}
            data={data}
            onFieldClick={this.handleFieldClick}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AAADetail);
