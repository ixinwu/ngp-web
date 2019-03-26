import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'antd/lib/alert';
import 'antd/lib/alert/style';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';
import { withStyles } from '@ixinwu-ngp/web-styles';

const styles = {
  container: {
    height: '100%',
    paddingTop: '15%',
  },
};

const Error = ({ message, classes }) => (
  <Row className={classes.container}>
    <Col span={6} offset={9}>
      <Alert message="Error" description={message} type="error" showIcon />
    </Col>
  </Row>
);

Error.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.string,
};

export default withStyles(styles)(Error);
