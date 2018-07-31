import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, withState } from 'recompose';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getTranslate } from 'react-localize-redux';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { increment, decrement } from '../../stores/counter.example';

import './index.css';

const Home = ({ translate: t, me, isAuthenticated, parameters, counter, onIncrement, onDecrement, isIncrementing }) => (
  <section className="home row align-center-center sm-mgt-2 md-mgt-3 lg-mgt-4">
    <div className="column-12 no-width flex layout-column size-100p sm-pgv-1 md-pgv-2 sm-pgh-1 md-pgh-2 lg-pgh-3 mgb-0_5 bg-white bd-radius shadow">
      <h1 className="no-shadow text-center flex align-spacebetween-center">
        <span>{ t('dashboard.title') }</span>
        <span className="text-gray h3 no-margin">{ t('dashboard.greeting', { name: me.username || '' } )}</span>
      </h1>
      { (!isAuthenticated || (isAuthenticated && parameters.viewCounter)) &&
        <React.Fragment>
          <h3>{ t('dashboard.counter') }</h3>
          <p className="flex align-start-center">
            <span className="flex align-center-center fz-28 lh-1 fw-700 text-white bg-primary h-bg-primary-dark anim-all no-select curp w-4 h-4" onClick={ onDecrement }>-</span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" timeout={ 250 } key={ counter }>
                <span key="counter" className={ `${isIncrementing ? 'incrementing' : 'decrementing'} w-4 h-4`}>{ counter }</span>
              </CSSTransition>
            </TransitionGroup>
            <span className="flex align-center-center fz-28 lh-1 fw-400 text-white bg-primary h-bg-primary-dark anim-all no-select curp w-4 h-4" onClick={ onIncrement }>+</span>
          </p>
          <div className="flex align-start-center">
          </div>
        </React.Fragment>
      }
    </div>
  </section>
);

Home.propTypes = {
  me: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  parameters: PropTypes.object,
  counter: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  isIncrementing: PropTypes.bool
};

const enhance = compose(
  connect(
    state => ({
      translate: getTranslate(state.locale),
      me: state.me,
      isAuthenticated: state.auth.isAuthenticated,
      parameters: state.parameters,
      counter: state.counter
    }),
    dispatch => bindActionCreators({
      increment,
      decrement
    }, dispatch)
  ),
  withState('isIncrementing', 'updateIsIncrementing', undefined),
  withHandlers(({ updateIsIncrementing }) => ({
    onIncrement: ({ increment }) => () => { updateIsIncrementing(o => true); increment(); },
    onDecrement: ({ decrement }) => () => { updateIsIncrementing(o => false); decrement(); }
  }))
);

export default enhance(Home);
