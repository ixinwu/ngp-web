import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';

const styles = {
  root: {
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
};

function Logo({ classes, title }) {
  return (
    <div className={classes.root}>
      <Icon className={classes.icon} type="cloud" />
      {title}
    </div>
  );
}

Logo.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
};

export default withStyles(styles)(Logo);
