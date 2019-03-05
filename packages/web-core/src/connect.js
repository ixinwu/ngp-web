import { connectAdvanced } from 'react-redux';
import defaultMapDispatchToPropsFactories from './react-dedux/connect/mapDispatchToProps';
import defaultMapStateToPropsFactories from './react-dedux/connect/mapStateToProps';
import defaultMergePropsFactories from './react-dedux/connect/mergeProps';
import shallowEqual from './react-dedux/utils/shallowEqual';
import defaultSelectorFactory from './selector_factory';

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps

  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (let i = factories.length - 1; i >= 0; i -= 1) {
    const result = factories[i](arg);
    if (result) return result;
  }

  return (dispatch, options) => {
    throw new Error(
      `Invalid value of type ${typeof arg} for ${name} argument when connecting component ${
        options.wrappedComponentName
      }.`,
    );
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
export function createConnect({
  connectHOC = connectAdvanced,
  mapStateToPropsFactories = defaultMapStateToPropsFactories,
  mapDispatchToPropsFactories = defaultMapDispatchToPropsFactories,
  mergePropsFactories = defaultMergePropsFactories,
  selectorFactory = defaultSelectorFactory,
} = {}) {
  return function connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    {
      pure = true,
      areStatesEqual = strictEqual,
      areOwnPropsEqual = shallowEqual,
      areStatePropsEqual = shallowEqual,
      areMergedPropsEqual = shallowEqual,
      ...extraOptions
    } = {},
  ) {
    const initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    const initMapDispatchToProps = match(
      mapDispatchToProps,
      mapDispatchToPropsFactories,
      'mapDispatchToProps',
    );
    const initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, {
      // used in error messages
      methodName: 'nephalemConnect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: name => `NephalemConnect(${name})`,

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps,
      initMapDispatchToProps,
      initMergeProps,
      pure,
      areStatesEqual,
      areOwnPropsEqual,
      areStatePropsEqual,
      areMergedPropsEqual,

      // any extra options args can override defaults of connect or connectAdvanced
      ...extraOptions,
    });
  };
}

export default createConnect();

// import React, { Component } from 'react';
// import { connect as reduxConnect } from 'react-redux';

// const getDisplayName = name => `ConnectAdvanced(${name})`;

// function ppHOCFactory({ identity, ...handleTriggers }) {
//   return function ppHOC(WrappedComponent) {
//     const wrappedComponentName =
//       WrappedComponent.displayName || WrappedComponent.name || 'Component';

//     const displayName = getDisplayName(wrappedComponentName);

//     // eslint-disable-next-line
//     class PP extends Component {
//       render() {
//         const newProps = {
//           identity,
//         };

//         Object.keys(handleTriggers).forEach(key => {
//           newProps[key] = (...args) => {
//             return handleTriggers[key](identity, this.props, ...args);
//           };
//         });

//         return <WrappedComponent {...this.props} {...newProps} />;
//       }
//     }

//     PP.WrappedComponent = WrappedComponent;
//     PP.displayName = displayName;

//     return PP;
//   };
// }

// export default function connect(...args) {
//   return Comp => props => {
//     const ConnectComp = reduxConnect(...args)(Comp);
//     return ppHOCFactory(props)(ConnectComp);
//     // const PPComp = ppHOCFactory(props)(Comp);
//     // return reduxConnect(...args)(PPComp);
//   };
// }

// export default function connect(config) {
//   return Comp => {
//     return ppHOCFactory(config)(Comp);
//   };
// }
