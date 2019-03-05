import React, { Component } from 'react';
import { Input, InputNumber, Col } from 'antd';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';

const styles = {};

const InputGroup = Input.Group;

class NumberRangePicker extends Component {
  handleLeftChange = left => {
    this.triggerChange({ left });
  };

  handleRightChange(right) {
    this.triggerChange({ right });
  }

  triggerChange(changedValues) {
    const { onChange, value = [] } = this.props.onChange;
    const values = Object.assign(
      {
        left: value[0],
        right: value[1],
      },
      changedValues,
    );
    if (onChange) {
      onChange([values.left, values.right]);
    }
  }

  render() {
    const { formatter, parser, min, max, size, value = [] } = this.props;

    const [left, right] = value;

    return (
      <InputGroup>
        <Col span={11} style={{ padding: 0 }}>
          <InputNumber
            placeholder="起始数值"
            value={left}
            formatter={formatter}
            parser={parser}
            min={min}
            max={right}
            size={size}
            onChange={this.handleLeftChange}
            style={{ width: '100%', margin: 0 }}
          />
        </Col>
        <Col span={2} style={{ textAlign: 'center', padding: 0 }}>
          ~
        </Col>
        <Col span={11} style={{ padding: 0 }}>
          <InputNumber
            placeholder="结束数值"
            value={right}
            formatter={formatter}
            parser={parser}
            min={left}
            max={max}
            size={size}
            onChange={this.handleRightChange}
            style={{ width: '100%', margin: 0 }}
          />
        </Col>
      </InputGroup>
    );
  }
}

export default withStyles(styles)(NumberRangePicker);
