import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, props, ...rest }) => (
  <Route
    {...rest}
    render={p =>
      p.location.isAuthenticated ? (
        <Component {...p} { ...props } />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: p.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  props: PropTypes.object
};

export default PrivateRoute;
