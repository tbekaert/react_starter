import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, mapProps } from 'recompose';

import Input from './input';

const Form = ({ children, className, onSubmit }) => (
  <form
    onSubmit={ onSubmit }
    className={ className }
    noValidate
  >
    { children }
  </form>
);

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node
};

const enhance = compose(
  withHandlers(() => {
    let validates = {};

    return {
      renderChildren: () => (children) =>
        React.Children.map(children, child =>
          (child && child.type === Input) ?
            React.cloneElement(child, {
              onRef: r => { validates[child.props.name] = r; }
            }) :
            child
        ),
      onSubmit: (props) => e => {
        e.preventDefault();
        let inputs =  Array.from(e.target.elements).filter(e => e.tagName !== 'BUTTON');
        inputs.forEach(i => validates[i.name] && validates[i.name](i) );
        let invalids = inputs.filter(i => i.getAttribute('data-hidden') !== 'true' && !i.classList.contains('valid') );
        
        if(invalids.length === 0){
          props.callback(
            inputs.reduce((t, e) => ({
              ...t,
              [e.name]: e.value
            }), {})
          );
        }
      }
    };
  }),
  mapProps(props => ({
    children: props.renderChildren(props.children),
    onSubmit: props.onSubmit,
    className: props.className || ''
  }))
);

export default enhance(Form);