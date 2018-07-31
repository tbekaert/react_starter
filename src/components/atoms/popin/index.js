import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, lifecycle, mapProps } from 'recompose';

import './index.css';

const Popin = ({ children, className, style, shouldDisableClose, onPopinRef }) => (
  <div className={ className } ref={ onPopinRef }>
    <div className="popin__inner" style={ style }>
      { children }
    </div>
    {
      !shouldDisableClose && (
        <span className="close pg-0_25 round">
          <svg className="w-4 h-4"><use xlinkHref="#icon-close"/></svg>
        </span>
      )
    }
  </div>
);

Popin.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  style: PropTypes.object,
  shouldDisableClose: PropTypes.bool,
  onPopinRef: PropTypes.func
};

const enhance = compose(
  withHandlers((props) => {
    let isOpen = props.forceOpen || false;
    let $popin = undefined;

    let close = () => {
      if(!props.disableClose){
        isOpen = false;
        $popin.classList.remove('show');
        document.body.style.overflow = 'unset';
      }
    };
    let open = () => {
      isOpen = true;
      $popin.classList.add('show');
      document.body.style.overflow = 'hidden';
    };

    let clickHandler = e => {
      if(e.target.classList.contains('popin') || e.target.classList.contains('close')){
        close();
      }
    };

    return {
      getIsOpen: () => () => isOpen,
      onPopinRef: ({ onRef }) => ($el) => {
        $popin = $el;
        
        onRef(open);
        $popin && $popin.addEventListener('click', clickHandler);
      },
      getPopinElement: () => () => $popin,
      removeHandler: () => () => {
        $popin && $popin.removeEventListener('click', clickHandler);
      }
    };
  }),
  lifecycle({
    componentWillMount(){
      document.body.style.overflow = this.props.getIsOpen() ? 'hidden' : 'unset';
    },
    componentWillUnmount(){
      this.props.removeHandler();
    }
  }),
  mapProps(props => ({
    children: props.children,
    style: {
      ...(props.width ? {
        maxWidth: `${props.width}px`
      } : {})
    },
    className: [
      'popin',
      `bg-${props.bgColor || 'bg-primary'}`,
      props.getIsOpen() && 'show'
    ].filter(c => c).join(' '),
    shouldDisableClose: props.disableClose || false,
    onPopinRef: props.onPopinRef
  }))
);

export default enhance(Popin);