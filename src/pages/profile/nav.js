import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { compose, mapProps } from 'recompose';

const Nav = ({ attr, links, isAuthenticated }) => (
  <React.Fragment>
    {
      links.map((link, index) => (
        <p key={ index.toString() }>
          <NavLink
            { ...attr }
            exact
            to={{
              isAuthenticated,
              pathname: link.url
            }}
          >
            { link.text }
          </NavLink>
        </p>
      ))
    }
  </React.Fragment>
);


Nav.propTypes = {
  attr: PropTypes.object,
  links: PropTypes.array,
  isAuthenticated: PropTypes.bool
};

const enhance = compose(
  withRouter,
  connect(
    state => ({
      translate: getTranslate(state.locale),
      isAuthenticated: state.auth.isAuthenticated
    })
  ),
  mapProps(({translate: t, ...props}) => ({
    ...props,
    attr: {
      className: 'curp text-gray-darker h-text-primary-dark',
      activeClassName: 'text-primary h-text-primary'
    },
    links: [
      {
        url: `/${ t('routes.profile.index') }`,
        text: t('profile.index.title')
      },
      {
        url: `/${ t('routes.profile.index') }/${ t('routes.profile.settings') }`,
        text: t('profile.settings.title')
      }
    ]
  }))
);

export default enhance(Nav);