import React, { Component } from 'react';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';
import { Form, Row, Col, Input, DatePicker, Select } from 'antd';
import NumberRangePicker from '../components/number_range_picker';
import ObjectCascader from '../components/object_cascader';

const { RangePicker } = DatePicker;
const { Option } = Select;

const styles = {
  container: {},
  row: {
    '& $label': {
      alignItems: 'flex-start',
    },
  },
  item: {
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

class ListSearch extends Component {
  onChange = () => {};

  generateComponent = field => {
    if (field.component) {
      return <field.component field={field} />;
    }
    let component;

    switch (field.displayType) {
      case 'object': {
        const data = this.props.data || {};
        component = <ObjectCascader field={field} data={data} />;
        break;
      }
      case 'number':
        component = <NumberRangePicker {...field.props} />;
        break;
      case 'datetime': {
        const format = field.format || 'YYYY-MM-DD';
        const showTime = format.search(/[Hms]/g) !== -1;
        component = <RangePicker format={format} showTime={showTime} {...field.props} />;
        break;
      }
      case 'groupType': {
        const types = [...(field.types || [])];
        if (field.showTotal && types.length > 0) {
          types.splice(0, 0, {
            key: types.map(type => type.key).join(','),
            text: '全部',
          });
        }
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
    const { classes, fields } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className={classes.container}>
        <Row>
          {fields
            .filter(field => field.searchable)
            .map(field => {
              const colspan = field.colspan || 1;
              return (
                <Col key={field.key} span={6 * colspan} className={classes.item}>
                  <div className={classes.label}>{field.text}：</div>
                  <div className={classes.comp}>
                    {getFieldDecorator(field.key, {})(this.generateComponent(field))}
                  </div>
                </Col>
              );
            })}
        </Row>
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
      fields.forEach(field => {
        formFields[field.key] = Form.createFormField({
          value: data[field.key],
        });
      });
      return formFields;
    },
    onValuesChange(props, changedValues) {
      if (props.onChange) {
        props.onChange(changedValues);
      }
    },
  })(ListSearch),
);
