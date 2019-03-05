import React from 'react';
import PropTypes from 'prop-types';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style';
import withStyles from '../styles/with_styles';

const styles = {
  container: {
    position: 'absolute',
    top: '50%',
    marginTop: '-100px',
    width: '100%',
  },
  inner: {
    width: '100%',
    height: '100px',
  },
};

const Loading = ({ message, size, classes }) => (
  <div className={classes.container}>
    <Spin size={size} tip={message}>
      <div className={classes.inner} />
    </Spin>
  </div>
);

Loading.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.string,
  size: PropTypes.string,
};

export default withStyles(styles)(Loading);
