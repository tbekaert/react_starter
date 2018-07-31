import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { compose, lifecycle } from 'recompose';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { check } from '../../stores/me.mock';

import SVG from 'react-inlinesvg';

import svgSprite from '../../assets/svg/sprite.svg';

import Header from '../../components/molecules/header';
import LoadIndicator from '../../components/atoms/loadIndicator';
import AlertBox from '../../components/atoms/alertBox';
import Router from '../../modules/router';
import Toasts from '../../components/atoms/toasts';

const App = ({ isLoading, error, toasts, location: { pathname } }) => (
  <main>
    <SVG src={ svgSprite } wrapper={ React.createFactory('div') } uniquifyIDs={ false } />
    <Header />

    <LoadIndicator isLoading={ isLoading } size={ 75 } />
    {
      error && pathname !== '/login'  &&
        <div className="row">
          <div className="column-12">
            <AlertBox type="alert" />
          </div>
        </div>
    }
      
    <Router />

    <Toasts toasts={ toasts } />
  </main>
);

App.propTypes = {
  toasts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  pathname: PropTypes.string
};

const enhance = compose(
  withRouter,
  connect(
    state => ({
      toasts: state.toasts,
      isLoading: state.isLoading,
      isAuthenticated: state.auth.isAuthenticated,
      error: state.error
    }),
    dispatch => bindActionCreators(
      { check },
      dispatch
    )
  ),
  lifecycle({
    componentWillMount(){
      if(!this.props.isAuthenticated){ this.props.check(); }
    }
  })
);

export default enhance(App);
