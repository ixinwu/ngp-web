import React, { Component } from 'react';
import { withStyles } from '@ixinwu-ngp/web-styles';
import { Button } from 'antd';
import FieldForm from '@ixinwu-ngp/materials-component/field_form';
import styles from './styles';

class AAAEdit extends Component {
  componentDidMount() {
    this.props.initPage();
  }

  handleOk = () => {
    const validateFields = this.form.getValidateFields();
    validateFields((err, values) => {
      if (!err) {
        const { submit, onBackToParent } = this.props;
        submit(values).then(() => {
          onBackToParent();
        });
      }
    });
  };

  handleCancel = () => {
    const { onBackToParent } = this.props;
    onBackToParent();
  };

  render() {
    const {
      classes,
      title,
      fields: fieldConfigs,
      data,
      fieldRelations,
      groupCascades,
    } = this.props;

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

    // 获取字段涉及的类别组
    const groups = {};
    fieldConfigs.forEach(fieldConfig => {
      if (fieldConfig.displayType === 'groupType') {
        groups[fieldConfig.groupKey] = this.props[fieldConfig.groupKey];
      }
    });

    return (
      <div className={classes.container}>
        <div className={classes.header}>{title}</div>
        <div className={classes.body}>
          <FieldForm
            fields={fields}
            fieldRelations={fieldRelations}
            groupCascades={groupCascades}
            groups={groups}
            data={data}
            wrappedComponentRef={form => {
              this.form = form;
            }}
          />
        </div>
        <div className={classes.footer}>
          <Button type="primary" onClick={this.handleOk}>
            确定
          </Button>
          <Button onClick={this.handleCancel}>取消</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AAAEdit);
