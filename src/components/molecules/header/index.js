import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { compose, mapProps } from 'recompose';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getTranslate, getLanguages } from 'react-localize-redux';

import LazyImage from '../../../components/atoms/lazyImage';
import imgUrl from '../../../utils/imgUrl.js';

import Input from '../../../components/atoms/input.js';

import { logout } from '../../../stores/auth.mock';
import { setLanguage } from '../../../lang';

import './index.css';

const Header = ({
  translate: t,
  languages,
  setLanguage,
  me,
  isLoading,
  isAuthenticated,
  location,
  history,
  logout
}) => {
  return (
    <header className="size-100p bg-primary pgv-0_5">
      <div className="row align-center-center">
        <div className="column-4 no-width">
          {
            isAuthenticated && (
              <form>
                <Input
                  type="text"
                  name="query"
                  label=""
                  className="dark mgb-0"
                  placeholder={ t('nav.search') }
                  svg="arrow"
                ></Input>
              </form>
            )
          }
        </div>
        <div className="column-4 no-width text-center">
          <NavLink
            className="text-white fw-700 underline"
            to={{ pathname: '/', isAuthenticated: isAuthenticated }}
            exact
            activeClassName="text-white fw-400"
          >
            LOGO
          </NavLink>
        </div>
        <div className="column-4 no-width flex layout-row align-end-center header__profile">
          <React.Fragment>
            <div className="header__profile__trigger">
              <span className="bg-primary-light round w-5 h-5 mgr-0_5">
                <LazyImage src={ `${ imgUrl({ ...me.image, width: '80', height: '80' }) }?portrait` } alt={ me.username } width={ 80 } height={ 80 } className="round" />
              </span>
              <svg className="text-white w-2 h-2"><use xlinkHref="#icon-chevron"/></svg>
            </div>
            <div className="header__profile__submenu pg-1">
              <div className="flex align-spacebetween-center size-100p bdb-1-gray-light pgb-0_5 mgb-1">
                <h3 className="no-margin">Menu</h3>
                <p className="x-small no-shadow no-margin uppercase">
                  { languages.map( (language, languageIndex) =>
                    <a
                      key={ languageIndex.toString() }
                      onClick={ e => setLanguage(language.code) }
                      className={ language.active ? 'text-primary' : 'text-gray-dark h-text-primary' }
                    >
                      { language.code }
                    </a>
                  ).reduce((t, l, i) =>
                    [
                      ...t,
                      l,
                      i === 0 && ( <span className="fw-400 text-gray" key={ `language-${i.toString()}` }> - </span> )
                    ], []
                  ).filter(l => l) }
                </p>
              </div>
              <p className="no-margin mgb-0_5">
                <NavLink
                  className="" 
                  to={{ pathname: `/${ t('routes.profile.index') }/`, isAuthenticated: isAuthenticated }}
                  activeClassName="underline"
                >
                  { t('nav.profile.index') }
                </NavLink> 
              </p>
              <p className="no-margin">
                <NavLink
                  className="" 
                  to={{ pathname: `/${ t('routes.styleguide') }/`, isAuthenticated: isAuthenticated }} 
                  activeClassName="underline"
                >
                  { t('nav.styleguide') }
                </NavLink> 
              </p>
              {
                isAuthenticated ? (
                  <p className="no-margin mgt-1"><a className="text-primary-dark h-text-primary" onClick={ e => logout(() => history.push('/')) }>{ t('nav.logout') }</a></p>
                ) : (
                  <p className="no-margin mgt-1">
                    <Link
                      to={{
                        pathname: '/login',
                        state: { from: location }
                      }}
                      className="text-primary-dark h-text-primary"
                    >
                      { t('nav.login') }
                    </Link>
                  </p>
                )
              }
            </div>
          </React.Fragment>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  translate: PropTypes.func,
  languages: PropTypes.array,
  setLanguage: PropTypes.func,
  me: PropTypes.object,
  isLoading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object,
  logout: PropTypes.func,
};

const enhance = compose(
  withRouter,
  connect(
    state => ({
      translate: getTranslate(state.locale),
      languages: getLanguages(state.locale),
      me: state.me,
      isLoading: state.isLoading,
      isAuthenticated: state.auth.isAuthenticated,
      logout: state.auth.logout
    }),
    dispatch => bindActionCreators({ logout, setLanguage }, dispatch)
  ),
  mapProps(props => ({
    translate: props.translate,
    languages: props.languages,
    setLanguage: props.setLanguage,
    me: props.me,
    isLoading: props.isLoading,
    isAuthenticated: props.isAuthenticated,
    location: props.location,
    history: props.history,
    logout: props.logout
  }))
);

export default enhance(Header);
