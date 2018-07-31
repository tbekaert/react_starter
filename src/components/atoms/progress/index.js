import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, lifecycle, mapProps } from 'recompose';

import './index.css';

const Progress = ({ type, value, size, style, className, onRef, createRoundPath }) => (
  <div className={ className } style={ style } ref={ onRef }>
    {
      type === 'linear' ?
        <span className="progress__indicator"></span> :
        <svg className="progress__indicator" viewBox={`0 0 ${size} ${size}`}>
          { createRoundPath('progress__indicator__bg') }
          { createRoundPath('progress__indicator__value') }
        </svg>
    }
    <span className="progress__text">
      { value }
      {
        type === 'linear' ?
          <React.Fragment>%</React.Fragment> :
          <sup>%</sup>
      }
    </span>
  </div>
);

Progress.propTypes = {
  type: PropTypes.oneOf(['linear', 'round']).isRequired,
  value: PropTypes.number,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  createRoundPath: PropTypes.func,
  onRef: PropTypes.func
};

const enhance = compose(
  withHandlers(() => {
    let svg = null;
    const getPath = (bs, sw) => [
      `M ${(bs / 2) + (sw / 2)} ${  0 + (sw / 2)}`,
      `A ${(bs / 2)} ${(bs / 2)} 0 0 1 ${bs + (sw / 2)}       ${(bs / 2) + (sw / 2)}`,
      `A ${(bs / 2)} ${(bs / 2)} 0 0 1 ${(bs / 2) + (sw / 2)} ${bs + (sw / 2)}`,
      `A ${(bs / 2)} ${(bs / 2)} 0 0 1 ${  0 + (sw / 2)}      ${(bs / 2) + (sw / 2)}`,
      `A ${(bs / 2)} ${(bs / 2)} 0 0 1 ${(bs / 2) + (sw / 2)} ${  0 + (sw / 2)}`
    ];

    return {
      onRef: () => (r) => (svg = r),
      animateSvg: () => () => {
        setTimeout(element => { element.classList.add('animate'); }, 250, svg);
      },
      getPathLength: ({ strokeWidth, baseWidth }) => () => {
        let p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('d', getPath(baseWidth, strokeWidth));
        return p.getTotalLength();
      },
      createRoundPath: ({ strokeWidth, baseWidth }) => (className) => 
        <path className={ className } strokeWidth={ strokeWidth } d={ getPath(baseWidth, strokeWidth) } />
    };
  }),
  lifecycle({
    componentDidMount(){
      this.props.animateSvg();
    }
  }),
  mapProps(props => {
    let value = parseInt(props.value, 10);
    let strokeLength = props.type === 'round' ? props.getPathLength() : 0;

    return {
      type: props.type,
      value: value,
      size: props.baseWidth + props.strokeWidth,
      style: {
        ...props.style,
        '--value': value/100,
        ...(props.type === 'round' ? {
          '--strokeLength': strokeLength,
          '--baseWidth': `${props.baseWidth}px`,
          '--strokeValue': (1 - (value / 100)) * strokeLength
        } : {

        })
      },
      className: [
        ...(props.className || '').split(' '),
        `progress progress--${props.type}`
      ].join(' '),
      onRef: props.onRef,
      createRoundPath: props.createRoundPath
    };
  })
);

export default enhance(Progress);