import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@ixinwu-ngp/web-styles';
import Form from 'antd/lib/form';
import 'antd/lib/form/style';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style';
import Select from 'antd/lib/select';
import 'antd/lib/select/style';
import NumberRangePicker from '../number_range_picker';

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
    const data = this.props.data || {};
    if (field.component) {
      return <field.component field={field} data={data} />;
    }
    let component;

    switch (field.displayType) {
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
      const fields = props.fields || [];
      const data = props.data || {};

      const formFields = {};
      fields.forEach(field => {
        let value = data[field.key];
        if (field.displayType === 'datetime') {
          if (value === null || value === undefined) {
            value = [];
          } else if (!Array.isArray(value)) {
            value = [value];
          }

          if (value[0]) {
            value[0] = moment(value[0]);
          }
          if (value[1]) {
            value[1] = moment(value[1]);
          }
        } else if (field.displayType === 'number') {
          if (value === null || value === undefined) {
            value = [];
          } else if (!Array.isArray(value)) {
            value = [value];
          }
        }
        formFields[field.key] = Form.createFormField({
          value,
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
