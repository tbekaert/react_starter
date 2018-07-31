import React from 'react';
import PropTypes from 'prop-types';

import { compose, withHandlers, lifecycle, mapProps } from 'recompose';

import './index.css';

const Prompt = ({ title, children, onOK, onNOK, ok_label, nok_label, onPromptRef }) => (
  <div className="prompt" ref={ onPromptRef }>
    <div className="prompt__inner bg-white shadow__long bd-radius pg-1">
      <h3 className="no-margin mgb-1">{ title }</h3>
      { children }
      <div className="flex align-start-center">
        <button className="button primary small mgr-0_5" onClick={ onOK }>{ ok_label }</button>
        <button className="button primary light small" onClick={ onNOK }>{ nok_label }</button>
      </div>
    </div>
  </div>
);

Prompt.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.element), PropTypes.element ]),
  onOK: PropTypes.func,
  onNOK: PropTypes.func,
  ok_label: PropTypes.string,
  nok_label: PropTypes.string,
  onPromptRef: PropTypes.func
};

const enhance = compose(
  withHandlers(({ callback }) => {
    let $prompt;
    let openPrompt = () => ( $prompt.classList.add('show') );
    let closePrompt = () => ( $prompt.classList.remove('show') );

    return {
      onOK: () => () => { closePrompt(); callback(); },
      onNOK: () => () => closePrompt(),
      openPrompt: () => () => openPrompt(),
      onPromptRef: ({ onRef }) => (r) => {
        $prompt = r;
        onRef(openPrompt);
      }
    };
  }),
  lifecycle({
    componentWillReceiveProps(nextProps){
      if(nextProps.forceOpen){
        this.props.openPrompt();
      }
    }
  }),
  mapProps(props => ({
    title: props.title,
    children: props.children,
    onOK: props.onOK,
    onNOK: props.onNOK,
    ok_label: props.ok_label,
    nok_label: props.nok_label,
    onPromptRef: props.onPromptRef
  }))
);

export default enhance(Prompt);