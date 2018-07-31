import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose';

import { getTranslate } from 'react-localize-redux';

import queryString from 'query-string';

import { submit } from '../../stores/auth.mock';
import { check } from '../../stores/me.mock';

import Input from '../../components/atoms/input.js';
import Form from '../../components/atoms/form.js';
import AlertBox from '../../components/atoms/alertBox.js';

import './index.css';

const Login = ({
  translate: t,
  isLoading,
  isAuthenticated,
  error,
  message,
  params,
  section,
  onUpdateSection,
  onSubmit,
  from,
  buttonClassName,
  backLinkClassName
}) =>
  isAuthenticated ?
    <Redirect to={ { ...from, isAuthenticated: isAuthenticated } } /> :
    <section className="login flex layout-column sm-align-start-center md-align-center-center bg-primary">
      {
        !isLoading &&
          <div className="row layout-column align-center-center sm-mgt-2 md-mgv-3 pgh-1">
            <section className="sm-column-12 md-column-8 lg-column-4 bg-white pg-1">
              <Form callback={ onSubmit } className="flex layout-column size-90">
                {
                  ( error && section === 'login' ) && (
                    <AlertBox type="alert" message={ t(`login.error.${error}`) } className="mgb-1" />
                  )
                }
                {
                  ( message && !error && section !== 'login' ) && (
                    <AlertBox type="success" message={ message } className="mgb-1" />
                  )
                }
                {
                  ( section === 'new' && !message ) && (
                    <Input
                      type="hidden"
                      name="token"
                      label=""
                      defaultValue={params.token}
                    ></Input>
                  )
                }
                {
                  ( section !== 'new' ) && (
                    <Input
                      type="text"
                      name="username"
                      label={ t(`login.form.username.${section}`) }
                      placeholder={ t('login.form.username.placeholder') }
                      required={ t('input_errors.required') }
                      defaultValue={params.username}
                    ></Input>
                  )
                }
                {
                  ( section === 'login' || ( section === 'new' && !message ))  && (
                    <Input
                      type="password"
                      name="password"
                      className={ [ section !== 'new' && 'mgb-0_5' ].join('') }
                      label={ t(`login.form.password.${section}`) }
                      placeholder={ t('login.form.password.placeholder') }
                      required={ t('input_errors.required') }
                    ></Input>
                  )
                }
                {
                  ( section === 'login' ) && (
                    <p className="small pgl-0_5">
                      <a onClick={ e => onUpdateSection('reset') }>
                        { t('login.lostPassword') }
                      </a>
                    </p>
                  )
                }
                <button type="submit" className={ buttonClassName }>
                  { t(`login.submit.${section}`) }
                </button>
                {
                  ( section !== 'login') && (
                    <a className={ backLinkClassName } onClick={ e => onUpdateSection('login') }>
                      <svg className="w-1 h-1 rotate-180 mgr-0_25"><use xlinkHref="#icon-arrow"/></svg>
                      { t(`login.backToLogin.${section}`) }
                    </a>
                  )
                }
              </Form>
            </section>
          </div>
      }
    </section>;

Login.propTypes = {
  check: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  message: PropTypes.string,
  me: PropTypes.object,
  params: PropTypes.object,
  section: PropTypes.string,
  onUpdateSection: PropTypes.func,
  onSubmit: PropTypes.func,
  from: PropTypes.object,
  buttonClassName: PropTypes.string,
  backLinkClassName: PropTypes.string
};

const enhance = compose(
  connect(
    state => ({
      translate: getTranslate(state.locale),
      isLoading: state.isLoading,
      error: state.error,
      isAuthenticated: state.auth.isAuthenticated,
      message: state.auth.message,
      me: state.me
    }),
    dispatch => bindActionCreators(
      {
        submit,
        check
      },
      dispatch
    )
  ),
  withState('params', 'updateParams', {}),
  withState('section', 'updateSection', ''),
  withHandlers(() => ({
    onUpdateParams: ({ updateParams }) => params => updateParams(p => params),
    onUpdateSection: ({ updateSection }) => section => updateSection(s => section),
    onSubmit: ({ submit, section, translate }) => data => submit(data, section, translate(`login.success.${section}`))
  })),
  lifecycle({
    componentWillMount(){
      let{
        check,
        location,
        onUpdateParams,
        isAuthenticated
      } = this.props;

      if(!isAuthenticated){ check(); }

      onUpdateParams(queryString.parse(location.search));
    },
    componentWillUpdate(nextProps){
      let { params, section, onUpdateSection } = this.props;
      let { params: newParams, section: newSection, message, location, history } = nextProps;
      
      if(Object.keys(params).length === 0){
        newSection = newParams.token ? 'new' : newParams.username ? 'reset' : 'login';
        if(section !== newSection){ onUpdateSection(newSection); }
      }

      if(location.search && (newSection === 'login' || message)){
        history.replace(location.pathname, { ...location, search: undefined });
      }
    }
  }),
  mapProps(({
    location: { state },
    section,
    message,
    ...props
  }) => ({
    ...props,
    section,
    from: state && state.from ? state.from : {
      pathname: '/'
    },
    buttonClassName: [
      ...('button primary light'.split(' ')),
      section === 'new' && message && 'dp-none'
    ].join(' '),
    backLinkClassName: [
      ...('text small flex align-start-center'.split(' ')),
      ( section === 'new' && message ) ? 'mgt-0_5' : 'mgt-1_5'
    ].join(' ')
  }))
);

export default enhance(Login);
