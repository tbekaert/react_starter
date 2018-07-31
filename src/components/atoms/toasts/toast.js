import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { getTranslate } from 'react-localize-redux';
import { removeToast } from '../../../stores/toasts';

import './index.css';

const Toast = ({ translate: t, toastType, onClick }) => (
  <div className="toast bg-white shadow bd-radius mgb-1 pgv-1 pgl-1 pgr-2">
    <p className="no-margin mgb-0_5 h3 text-primary-dark">{ t(`toasts.${toastType}.title`) }</p>
    <p className="no-margin text-primary-dark">{ t(`toasts.${toastType}.text`) }</p>
    <span className="toast__close" onClick={ onClick }>x</span>
  </div>
);

Toast.propTypes = {
  toastType: PropTypes.string,
  onClick: PropTypes.func
};

const enhance = compose(
  connect(
    state => ({
      translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({
      removeToast
    }, dispatch)
  ),
  withHandlers(() => ({
    onClick: (props) => () =>{
      props.removeToast(props.toast.id);
    }
  })),
  mapProps(props => ({
    translate: props.translate,
    onClick: props.onClick,
    toastType: props.toast.type
  }))
);

export default  enhance(Toast);