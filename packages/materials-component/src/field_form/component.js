import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@ixinwu-ngp/web-framework';
import Form from 'antd/lib/form';
import 'antd/lib/form/style';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style';
import Select from 'antd/lib/select';
import 'antd/lib/select/style';
import { fieldRelation } from '../utils/field_relation';
import { groupCascade, getChangedValues } from '../utils/group_cascade';
import FieldGrid from '../field_grid';

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

class FieldForm extends Component {
  componentDidUpdate() {
    const { getFieldsValue, setFieldsValue } = this.props.form;
    const values = getFieldsValue();
    const changedGroupValues = getChangedValues(this.fields, values);

    if (changedGroupValues.length > 0) {
      const groupValues = {};
      changedGroupValues.forEach(item => {
        groupValues[item.key] = item.value;
      });
      setFieldsValue(groupValues);
    }
  }

  getValidateFields = () => {
    return this.props.form.validateFields;
  };

  generateComponent = field => {
    const data = this.props.data || {};
    let component;
    if (field.component) {
      component = <field.component field={field} data={data} />;
      return component;
    }

    switch (field.displayType) {
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
    const { fields, groups, fieldRelations, groupCascades } = this.props;
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    this.fields = groupCascade(fields, groups, groupCascades, values);
    const displayFields = fieldRelation(this.fields, fieldRelations, values);
    // const displayFields = fields;
    const items = displayFields
      .filter(field => field.visible)
      .map(field => ({
        ...field,
        display: (
          <Form.Item key={field.key} label={field.text}>
            {getFieldDecorator(field.key, field.options || {})(this.generateComponent(field))}
          </Form.Item>
        ),
        colspan: field.colspan || 1,
      }));
    const Layout = this.props.layout || FieldGrid;
    return (
      <Form layout="vertical">
        <Layout fields={items} />
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
  })(FieldForm),
);
