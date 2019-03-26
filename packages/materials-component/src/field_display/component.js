import React, { Component } from 'react';
import { withStyles } from '@ixinwu-ngp/web-styles';
import DatetimeFormat from '../datetime_format';
import NumberFormat from '../number_format';
import TextFormat from '../text_format';
import TypeFormat from '../type_format';
import FieldGrid from '../field_grid';

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

class FieldList extends Component {
  handleClick = (field, value) => {
    const { onFieldClick } = this.props;
    if (onFieldClick) {
      onFieldClick(field, value);
    }
  };

  generateComponent = field => {
    const { classes, data } = this.props;
    const value = data[field.key];
    let component;
    if (field.component) {
      component = <field.component value={value} data={data} field={field} />;
    } else {
      switch (field.displayType) {
        case 'datetime':
          component = (
            <DatetimeFormat
              value={value}
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
              types={field.types}
              inValid={field.inValid}
              {...field.props}
            />
          );
          break;
        default:
          component = <TextFormat value={value} inValid={field.inValid} {...field.props} />;
      }

      if (field.clickable) {
        component = (
          <span
            className={classes.clickable}
            onClick={() => {
              this.handleClick(field, value);
            }}
          >
            {component}
          </span>
        );
      }
    }

    return component;
  };

  render() {
    const { classes, fields } = this.props;

    const items = fields
      .filter(field => field.visible)
      .map(field => ({
        ...field,
        colspan: field.colspan || 1,
        display: (
          <div key={field.key} className={classes.container}>
            <div className={classes.label}>{field.text}：</div>
            <div className={classes.comp}>{this.generateComponent(field)}</div>
          </div>
        ),
      }));
    const Layout = this.props.layout || FieldGrid;
    return <Layout fields={items} />;
  }
}

export default withStyles(styles)(FieldList);
