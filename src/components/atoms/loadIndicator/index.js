import React from 'react';
import PropTypes from 'prop-types';

import { compose, mapProps } from 'recompose';

import './index.css';

const LoadIndicator = ({ style, className, classNameInner }) => {
  return (
    <div className={ className }>
      <div className={ classNameInner } style={ style }>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

LoadIndicator.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  classNameInner: PropTypes.string
};

const enhance = compose(
  mapProps(props => ({
    style: { width: props.size },
    className: [
      'loadIndicator',
      props.isLoading && 'show'
    ].join(' '),
    classNameInner: [
      'loadIndicator__inner',
      props.color,
      ...(props.className || '').split(' ')
    ].join(' ')
  }))
);

export default enhance(LoadIndicator);