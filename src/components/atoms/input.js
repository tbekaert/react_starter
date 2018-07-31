import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, lifecycle, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const Input = ({ input, className, span, svg }) =>
  svg ?
    (
      <label className={ `${className} input-group search` }>
        { input }
        <button type="submit">
          <svg><use xlinkHref={ `#icon-${svg}` }/></svg>
        </button>
      </label>
    ) :
    (
      <label className={ className }>
        { span }
        { input }
      </label>
    );

Input.propTypes = {
  input: PropTypes.element,
  span: PropTypes.element,
  className: PropTypes.string,
  svg: PropTypes.string
};

const enhance = compose(
  connect(
    state => ({
      translate: getTranslate(state.locale)
    })
  ),
  withHandlers(({ validations, required, type, translate: t }) => {
    let typePattern = {
      email: /(^([A-Z|a-z|0-9](\.|_|\+){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$)|^$/,
      tel: /(^(0|\+33)[0-9]{9}$)|^$/
    };

    validations = [
      ...(validations || []),
      ...[
        required ? {
          pattern: /^.+$/,
          error: required
        } : false,
        t(`input_errors.${type}`) && typePattern[type] && {
          pattern: typePattern[type],
          error: t(`input_errors.${type}`)
        }  
      ].filter(v => v)
    ];

    let validate = element => {
      let errors = validations.map(v => !v.pattern.test(element.value) ? v.error : false).filter(e => e).join('\n');
      let parent = element.parentNode;
      parent.classList.toggle('error', errors !== '');
      parent.setAttribute('data-error', errors);
      element.classList.toggle('valid', !errors);
    };

    return {
      onKeyUp: () => e => {
        !e.target.classList.contains('pristine') && validate(e.target);
        e.target.classList.remove('pristine');
      },
      onKeyPress: (props) => e => {
        props.maxlength && e.target.value.length >= props.maxlength && e.preventDefault();
      },
      validate: () => (element) => {
        validate(element);
      },
      extract: (props) => ({
        type,
        name,
        disabled,
        required,
        defaultValue,
        placeholder
      }) => ({
        type,
        name,
        disabled,
        required: required ? true : false,
        defaultValue,
        placeholder,
        'data-hidden': props.hide || props.type === 'hidden'
      })
    };
  }),
  lifecycle({
    componentDidMount(){
      this.props.onRef && this.props.onRef(this.props.validate);
    },
    componentWillUnmount(){
      this.props.onRef && this.props.onRef(null);
    }
  }),
  mapProps(props => ({
    input: (<input { ...props.extract(props) } className="pristine" onKeyUp={ props.onKeyUp } onKeyPress={ props.onKeyPress } onChange={ props.onKeyUp } />),
    span: props.required ?
      ( <span>{ props.label }</span> ) :
      ( <span data-optionnal>{ props.label }</span> ),
    className: [
      'flex',
      'layout-column',
      ...(props.className ? props.className : 'mgb-1').split(' '),
      (props.type === 'hidden' || props.hide) && ' dp-none'
    ].join(' '),
    svg: props.svg
  }))
);

export default enhance(Input);