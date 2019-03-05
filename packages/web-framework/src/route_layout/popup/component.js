import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';

const styles = {
  mask: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(55, 55, 55, .6)',
    height: '100%',
    zIndex: 1000,
  },
  wrapper: {
    position: 'relative',
    width: 'auto',
    margin: '0 auto',
    top: 100,
    paddingBottom: 24,
  },
  popup: {
    position: 'relative',
    backgroundColor: '#fff',
    border: 0,
    borderRadius: 4,
    backgroundClip: 'padding-box',
    boxShadow: '0 2px 8px rgba(0, 0, 0, .2)',
  },
};

/**
 * 合并 popup 样式
 * @param {object} propsStyle 从props传递的样式
 */
const getPopupStyle = (screenWidth, screenHeight, propsStyle) => {
  const defaultStyle = {
    width: 590,
    height: 500,
  };
  const style =
    typeof propsStyle === 'object' ? { ...defaultStyle, ...propsStyle } : { ...defaultStyle };
  // 计算高度
  let top = 100;
  let { height } = style;
  const dHeight = screenHeight - 100;
  if (dHeight <= style.height) {
    if (screenHeight >= height) {
      top = (screenHeight - height) / 2;
    } else {
      top = 0;
      height = screenHeight;
    }
  }

  // 计算left
  let left = 0;
  if (screenWidth > style.width) {
    left = (screenWidth - style.width) / 2;
  }
  return {
    style: {
      ...style,
      height,
      left,
    },
    top,
  };
};

/**
 * Popup 效果弹框，目前支持如下props属性
 *
 *  onClose:关闭弹框的回调函数；
 *  maskClosable:点击蒙层是否允许关闭，默认为true；
 *  style:指定弹框样式，默认为{width: 600,height: 500}；
 * @class Popup
 * @extends {Component}
 */
class Comp extends Component {
  constructor(props) {
    super(props);
    this.handleClickMask = this.handleClickMask.bind(this);
  }

  handleClickMask() {
    const { maskClosable, onClose } = this.props;
    if (!maskClosable) {
      return;
    }

    if (onClose) {
      onClose();
    }
  }

  render() {
    const { children, classes } = this.props;
    // 模态框样式计算
    const popupStyle = getPopupStyle(window.innerWidth, window.innerHeight, this.props.style);

    return (
      <div className={classes.mask} onClick={this.handleClickMask}>
        <div className={classes.wrapper} style={{ top: popupStyle.top }}>
          <div className={classes.popup} style={{ ...popupStyle.style }}>
            <div style={{ height: '100%' }} onClick={e => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Comp.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  maskClosable: PropTypes.bool,
  onClose: PropTypes.func,
  style: PropTypes.object,
};

export default withStyles(styles)(Comp);
