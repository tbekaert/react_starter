import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, lifecycle, mapProps } from 'recompose';

import './index.css';

/** Usage
 * <LazyImage src={ String } alt={ String } width={ Number } height={ Number } className={ String } />
 */

const LazyImage = ({ alt, style, className, onRef }) => (
  <div className={ className } style={ style }>
    <img
      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
      alt={ alt }
      ref={ onRef } />
  </div>
);

LazyImage.propTypes = {
  alt: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onRef: PropTypes.func
};

const enhance = compose(
  withHandlers(() => {
    let image = null;
    let observer = null;
    let src = null;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const fetchImage = url =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    
    const loadImage = () => {
      fetchImage(src)
        .then(() => {
          image.src = src;
          image.parentNode.classList.add('loaded');
        })
        .catch(() => {
          if(image){
            image.src = '';
            image.parentNode.classList.add('error');
          }
        });
      if(observer){
        observer.disconnect();
        observer = null;
      }
    };
    
    const handleIntersection = entries => {
      entries.forEach(entry => {
        (entry.intersectionRatio > 0) && loadImage(this);
      });
    };

    return {
      onRef: () => (r) => (image = r),
      setObserver: (props) => () => {
        src = props.src;
        if ('IntersectionObserver' in window) { observer = new IntersectionObserver(handleIntersection, options); }
      },
      checkObserver: () => (src) => {
        observer ? observer.observe(image) : loadImage(src);
      }
    };
  }),
  lifecycle({
    componentWillMount(){
      this.props.setObserver();
    },
    componentDidMount(){
      this.props.checkObserver(this.props.src);
    }
  }),
  mapProps(props => ({
    alt: props.alt,
    style: {
      '--ratio': `${(props.height / props.width) * 100}%`,
      'width': props.width,
    },
    className: [...(props.className || '').split(' '), 'lazy-image'].join(' '),
    onRef: props.onRef
  }))
);

export default enhance(LazyImage);