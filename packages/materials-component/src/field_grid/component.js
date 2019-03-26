import React, { Component } from 'react';
import { withStyles } from '@ixinwu-ngp/web-styles';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';

const styles = {
  container: {},
};

class FieldGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      span: 6,
    };

    this.ref = React.createRef();
    this.width = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.rerender);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const columns = [1, 2, 3, 4, 6, 8, 12, 24];
      let index = 0;
      let column = columns[index];
      while (column * 350 + index * 20 < snapshot && index < columns.length) {
        index += 1;
        column = columns[index];
      }

      // eslint-disable-next-line
      this.setState(prevState => ({
        ...prevState,
        span: 24 / column,
      }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.rerender);
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.fields !== this.props.fields || this.windowResized) {
      this.windowResized = false;
      const { width } = this.ref.current.getBoundingClientRect();
      if (width !== this.width) {
        this.width = width;
        return width;
      }
    }

    return null;
  }

  rerender = () => {
    this.windowResized = true;
    this.forceUpdate();
  };

  render() {
    const { classes, fields } = this.props;
    return (
      <div ref={this.ref} className={classes.container}>
        <Row gutter={20}>
          {fields.map(field => {
            const span = Math.min(24, field.colspan * this.state.span);
            return <Col key={field.key} span={span}>{field.display}</Col>;
          })}
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(FieldGrid);
