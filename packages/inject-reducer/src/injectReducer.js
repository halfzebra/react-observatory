import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Why hoist-non-react-statics: https://github.com/reactjs/react-redux/issues/276
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

/**
 * High-Order Component that dynamically injects a reducer.
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

/**
 * High-Order Component that dynamically injects a reducer.
 *
 * @param key {string} A key of the reducer
 * @param reducer {function} reducer A reducer that will be injected
 * @return {function(*)} HOC with a reducer.
 */
export default (key, reducer) => WrappedComponent => {
  class ReducerInjector extends Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired
    };
    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(key, reducer);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
