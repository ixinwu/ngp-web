import React, { Component } from 'react';
import { Table } from 'antd';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';
import DatetimeFormat from '../components/datetime_format';
import NumberFormat from '../components/number_format';
import TextFormat from '../components/text_format';
import TypeFormat from '../components/type_format';

const styles = theme => {
  const t = {
    'link-color': '#1E9FF2',
    'border-color': '#e8e8e8',
    ...theme,
  };
  return {
    clickable: {
      color: t['link-color'],
      cursor: 'pointer',
    },
  };
};

class ListTable extends Component {
  handleClick = (field, value, record) => {
    const { onCellClick } = this.props;
    if (onCellClick) {
      onCellClick(field, value, record);
    }
  };

  generateColumnRender = (field, value, record) => {
    const { classes } = this.props;
    let component;
    switch (field.displayType) {
      case 'datetime':
        component = (
          <DatetimeFormat
            value={value}
            record={record}
            format={field.format}
            inValid={field.inValid}
            {...field.props}
          />
        );
        break;
      case 'number':
        component = (
          <NumberFormat
            value={value}
            record={record}
            format={field.format}
            inValid={field.inValid}
            {...field.props}
          />
        );
        break;
      case 'groupType':
        component = (
          <TypeFormat
            value={value}
            record={record}
            types={field.types}
            inValid={field.inValid}
            {...field.props}
          />
        );
        break;
      default:
        component = (
          <TextFormat value={value} record={record} inValid={field.inValid} {...field.props} />
        );
    }

    if (field.clickable) {
      component = (
        <span
          className={classes.clickable}
          onClick={() => {
            this.handleClick(field, value, record);
          }}
        >
          {component}
        </span>
      );
    }
    return component;
  };

  generateColumn = field => {
    const column = {
      ...field,
      title: field.text,
      key: field.key,
      dataIndex: field.key,
      width: field.width,
    };

    if (field.render) {
      column.render = field.render;
    } else if (field.component) {
      column.render = (value, record) => (
        <field.component value={value} record={record} field={field} />
      );
    } else {
      column.render = (value, record) => this.generateColumnRender(field, value, record);
    }

    return column;
  };

  render() {
    const { fields, ...rest } = this.props;
    const columns = fields.filter(field => field.visible).map(this.generateColumn);

    return <Table columns={columns} {...rest} />;
  }
}

export default withStyles(styles)(ListTable);
