import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import { compose } from 'recompose';

import { connect } from 'react-redux';

import { getLocalizeRoutes } from '../../modules/router';
import routes from '../../lang/routes';

import asyncComponent from '../../modules/AsyncComponent';

import './index.css';

import Nav from './nav';
const Index = asyncComponent(() => import('./pages/index'));
const Settings = asyncComponent(() => import('./pages/settings'));

const Profile = ({ me, match }) => (
  <div className="row align-center-center sm-mgt-2 md-mgt-3 lg-mgt-4">
    <div className="column-12 no-width flex layout-row">
      <div className="flex-none pgt-2 pgr-1">
        <Nav />
      </div>
      <div className="flex-auto pgl-1">
        <div className="flex layout-column size-100p sm-pgv-1 md-pgv-2 sm-pgh-1 md-pgh-2 lg-pgh-3 mgb-0_5 bg-white bd-radius shadow">
          <Switch>
            {
              getLocalizeRoutes({
                locales: [''],
                Component: Index,
                basename: match.url,
                isPrivate: false,
                props: { me: me },
                isExact: true
              })
            }
            {
              getLocalizeRoutes({
                locales: routes.profile.settings,
                Component: Settings,
                basename: `${match.url}/`,
                isPrivate: false,
                props: { me: me }
              })
            }
          </Switch>
        </div>
      </div>
    </div>
  </div>
);

Profile.propTypes = {
  me: PropTypes.object
};

const enhance = compose(
  connect(
    state => ({
      me: state.me
    })
  )
);

export default enhance(Profile);