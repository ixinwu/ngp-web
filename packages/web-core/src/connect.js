import { connect } from 'react-redux';
import core from './core';

function ngpConnect(mapStateToProps, mapDispatchToProps, mergeProps, options) {
  let mergePropsWrapper;

  if (typeof mergeProps === 'function') {
    mergePropsWrapper = (stateProps, dispatchProps, ownProps) => {
      const mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      // 保存identity对应的props
      if (ownProps && ownProps.identity) {
        core.identityProps[ownProps.identity] = mergedProps;
      }
      return mergedProps;
    };
  } else {
    mergePropsWrapper = (stateProps, dispatchProps, ownProps) => {
      const mergedProps = { ...ownProps, ...stateProps, ...dispatchProps };
      // 保存identity对应的props
      if (ownProps && ownProps.identity) {
        core.identityProps[ownProps.identity] = mergedProps;
      }
      return mergedProps;
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergePropsWrapper,
    options,
  );
}

export default ngpConnect;
