import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';

const styles = {
  container: {
    backgroundColor: '#fff',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '30%',
    minWidth: 400,
    zIndex: 1000,
    borderLeft: '1px solid @border-color',
    overflowY: 'auto',
    transition: 'transform 1s ease-out',
    boxShadow: 'rgba(0, 0, 0, 0.14902) -2px 2px 4px',
  },
};

class Comp extends Component {
  handleClickOutside(e) {
    if (document.getElementById('root').contains(e.target)) {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  render() {
    const { children, style, classes } = this.props;

    return (
      <div className={classes.container} style={style}>
        {children}
      </div>
    );
  }
}

Comp.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  onClose: PropTypes.func,
  style: PropTypes.object,
};

export default withStyles(styles)(enhanceWithClickOutside(Comp));
