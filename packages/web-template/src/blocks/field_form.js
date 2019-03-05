import React, { Component } from 'react';
import moment from 'moment';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';
import { Form, Input, InputNumber, DatePicker, Select } from 'antd';
import ObjectCascader from '../components/object_cascader';
import fieldRelation from '../lib/field_relation';

const { MonthPicker } = DatePicker;
const { Option } = Select;

const styles = () => {
  return {
    container: {
      display: 'flex',
      marginBottom: 20,
    },
    label: {
      flex: '0 0 100px',
      justifyContent: 'flex-end',
      // textAlign: 'right',
      display: 'flex',
      alignItems: 'center',
    },
    comp: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
  };
};

class FieldComponent extends Component {
  componentDidUpdate() {
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    console.log(values);
  }

  getValidateFields = () => {
    return this.props.form.validateFields;
  };

  generateComponent = field => {
    const data = this.props.data || {};
    let component;
    if (field.component) {
      component = <field.component field={field} data={data} />;
    }

    switch (field.displayType) {
      case 'object': {
        component = <ObjectCascader field={field} data={data} />;
        break;
      }
      case 'number':
        component = (
          <InputNumber
            style={{ width: '100%' }}
            placeholder={field.placeholder || `请选择${field.text}`}
            {...field.props}
          />
        );
        break;
      case 'datetime': {
        const format = field.format || 'YYYY-MM-DD';
        const selectDate = format.search(/[Dd]/g) !== -1;
        component = selectDate ? (
          <DatePicker
            style={{ width: '100%' }}
            placeholder={field.placeholder || `请选择${field.text}`}
            {...field.props}
          />
        ) : (
          <MonthPicker
            style={{ width: '100%' }}
            placeholder={field.placeholder || `请选择${field.text}`}
            {...field.props}
          />
        );
        break;
      }
      case 'groupType': {
        const types = field.types || [];
        component = (
          <Select
            allowClear
            placeholder={field.placeholder || `请选择${field.text}`}
            {...field.props}
          >
            {types.map(type => (
              <Option key={type.key} value={type.key}>
                {type.text}
              </Option>
            ))}
          </Select>
        );
        break;
      }
      default:
        component = (
          <Input placeholder={field.placeholder || `请输入${field.text}`} {...field.props} />
        );
    }

    return component;
  };

  render() {
    const { fields, fieldRelations } = this.props;
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    const displayFields = fieldRelation(fields, fieldRelations, values);
    // const displayFields = fields;
    return (
      <Form layout="vertical">
        {this.props.render(
          displayFields
            .filter(field => field.visible)
            .map(field => ({
              ...field,
              display: (
                <Form.Item key={field.key} label={field.text}>
                  {getFieldDecorator(field.key, field.options || {})(this.generateComponent(field))}
                </Form.Item>
              ),
              colspan: field.colspan || 1,
            })),
        )}
      </Form>
    );
  }
}

export default withStyles(styles)(
  Form.create({
    mapPropsToFields(props) {
      const fields = props.fields || {};
      const data = props.data || {};

      const formFields = {};
      fields
        .filter(field => field.visible)
        .forEach(field => {
          let value = data[field.key];
          if (field.displayType === 'datetime' && value !== null && value !== undefined) {
            value = moment(value);
          }
          formFields[field.key] = Form.createFormField({
            value,
          });
        });
      return formFields;
    },
  })(FieldComponent),
);
