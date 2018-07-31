import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { compose, mapProps } from 'recompose';

import Progress from '../../atoms/progress';

import './index.css';

const SubHeader = ({
  className,
  image,
  title,
  subtitle,
  goBack,
  scoring,
  progress
}) => (
  <div className={ className }>
    <div className="row align-center-center">
      <div className="column-12 layout-row align-start-center no-width no-white">
        <a className="text-primary h-text-gray" onClick={ goBack }>
          <svg className="horizontal rotate-90 w-3 h-3 sm-mgr-0_5 md-mgr-1_5"><use xlinkHref="#icon-chevron" /></svg>
        </a>
        {
          image &&
            (
              <div className="round bg-primary-light w-8 h-8 md-mgr-1_5 sm-dp-none md-flex">
              </div>
            )
        }
        <div className="flex layout-column">
          { subtitle && <p className="x-small uppercase no-margin no-shadow text-gray-dark mgb-0_25">{subtitle}</p> }
          <p className="h3 no-margin">{title}</p>
        </div>
        { scoring }
        { progress }
      </div>
    </div>
  </div>
);

SubHeader.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  goBack: PropTypes.func,
  scoring: PropTypes.element,
  progress: PropTypes.element
};

const enhance = compose(
  withRouter,
  mapProps(props => ({
    className: [
      ...'size-100p bg-white mgb-1'.split(' '),
      typeof props.image === 'undefined' ? 'pgv-1' : 'pgv-0_5'
    ].join(' '),
    image: props.image,
    title: props.title,
    subtitle: props.subtitle,
    goBack: props.history.goBack,
    scoring: typeof props.scoring !== 'undefined' && props.scoring.divisor > 0 ?
      (
        <React.Fragment>
          <svg className={ `mgl-auto w-2 h-2 text-${props.iconColor} vertical` }><use xlinkHref={ `#icon-${props.icon}` } /></svg>
          <p className="text-gray-darker fw-700 no-margin mgl-1">
            { props.scoring.dividend } / { props.scoring.divisor }
          </p>
        </React.Fragment>
      ) :
      null,
    progress: (
      <React.Fragment>
        {
          typeof props.progress !== 'undefined' && props.progress.divisor > 0 ?
            <Progress
              type="linear"
              value={ props.progress.dividend * 100 / props.progress.divisor}
              className="mgl-auto sm-size-20p md-size-35p"
            /> :
            null
        }
      </React.Fragment>
    )
  }))
);

export default enhance(SubHeader);
