import React from 'react';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const AlertBox = ({ message, className}) => (
  <div className={ className }>
    <p className="no-margin">{ message }</p>
  </div>
);

AlertBox.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string
};

let enhance = compose(
  connect(
    state => ({
      translate: getTranslate(state.locale)
    })
  ),
  mapProps(props => ({
    message: props.message || props.translate('errors.default'),
    className: [
      'pg-0_5',
      ...(props.className || '').split(' '),
      ...(props.type === 'alert' ? 'bg-alert-muted text-alert bd-1-alert' : '').split(' '),
      ...(props.type === 'success' ? 'bg-success-muted bd-1-success' : '').split(' ')
    ].join(' ')
  }))
);

export default enhance(AlertBox);