import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getTranslate } from 'react-localize-redux';
import { compose } from 'recompose';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../../lang/routes';

import asyncComponent from '../AsyncComponent';
import PrivateRoute from './PrivateRoute';

const AsyncLogin = asyncComponent(() => import('../../pages/login'));
const AsyncNoMatch = asyncComponent(() => import('../../pages/404'));
const AsyncHome = asyncComponent(() => import('../../pages/home'));
const AsyncProfile = asyncComponent(() => import('../../pages/profile'));

const AsyncStyleguide = asyncComponent(() => import('../../pages/styleguide'));

export const getLocalizeRoutes = ({ locales, Component, isPrivate = false, isExact = false, basename = '/', props = {} }) =>
  locales.map( (locale, index) => 
    isPrivate ?
      <PrivateRoute
        key={ `${locale}-${index.toString()}` }
        path={ `${ basename }${ locale }` }
        component={ Component }
        props={ props }
        exact={ isExact }
      /> :
      <Route
        path={ `${ basename }${ locale }` }
        key={ `${locale}-${index.toString()}` }
        render={ p => <Component { ...p } { ...props } /> }
        exact={ isExact }
      />
  );

const Router = ({ translate: t }) => (
  <Switch>
    <Route exact path="/" component={AsyncHome} />

    {
      getLocalizeRoutes({
        locales: routes.profile.index,
        Component: AsyncProfile,
        isPrivate: true
      })
    }
    {
      getLocalizeRoutes({
        locales: routes.styleguide,
        Component: AsyncStyleguide
      })
    }
    {
      getLocalizeRoutes({
        locales: routes.login,
        Component: AsyncLogin
      })
    }

    <Route component={AsyncNoMatch} />
  </Switch>
);

const enhance = compose(
  withRouter,
  connect( state => ({
    translate: getTranslate(state.locale)
  }))
);

export default enhance(Router);
