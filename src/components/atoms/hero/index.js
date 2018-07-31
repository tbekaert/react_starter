import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, lifecycle, mapProps } from 'recompose';

import './index.css';

const Hero = ({ className, style, children, onRef }) => (
  <div className={ className } style={ style } ref={ onRef }>
    { children }
  </div>
);

Hero.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onRef: PropTypes.func
};

const enhance = compose(
  withHandlers(() => {
    let hero = null;
    let bs = null;

    return {
      onRef: () => (r) => (hero = r),
      resetBS: () => () => {
        bs.calculate();
        bs.update();
      },
      setBS: () => () => {
        bs = window.basicScroll.create({
          elem: hero,
          from: '0',
          to: hero.getBoundingClientRect().top + hero.offsetHeight,
          direct: true,
          props: {
            '--bg-pos': {
              from: '50%',
              to: '40%',
            }
          }
        });
        bs.start();
      }
    };
  }),
  lifecycle({
    componentDidMount(){
      this.props.setBS();
      window.addEventListener('resize', this.props.resetBS);
    },
    componentWillUnMount(){
      window.removeEventListener('resize', this.props.resetBS);
    }
  }),
  mapProps(props => ({
    style: { backgroundImage: `url(${props.url})` },
    className: [...(props.className || '').split(' '), 'hero'].join(' '),
    children: props.children,
    onRef: props.onRef
  }))
);

export default enhance(Hero);