import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, mapProps } from 'recompose';

import './index.css';

const Stars = ({ style, className, getTemplate, isND }) => {

  return (
    <div className={ className } style={ style }>
      {
        isND ?
          <p className="no-margin fz-14 lh-1_2 text-gray-darker fw-700 size-100p">ND</p> :
          <React.Fragment>
            { getTemplate('text-gray-light') }
            <div className="scoring__hover">
              { getTemplate('text-yellow') }
            </div>
          </React.Fragment>
      }
    </div>
  );
};

Stars.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  getTemplate: PropTypes.func,
  isND: PropTypes.bool
};

const enhance = compose(
  withHandlers(() => ({
    getTemplate: ({ scoring: { divisor }}) => (color) =>
      (new Array(divisor)).fill().map((s, i) =>
        <svg key={ i } className={ `w-2 h-2 ${color}` }><use xlinkHref="#icon-star" /></svg>
      )
  })),
  mapProps(props => ({
    style: props.scoring && props.scoring.dividend > 0 ? {
      '--value': `${props.scoring.dividend * 100 / props.scoring.divisor}%`,
      'width': props.scoring.dividend === 0 ? '80px' : 'auto'
    } : { 'width': '80px' },
    className: [...(props.className || '').split(' '), 'scoring--stars'].join(' '),
    getTemplate: props.getTemplate,
    isND: !props.scoring || (props.scoring && props.scoring.dividend === 0)
  }))
);

export default enhance(Stars);