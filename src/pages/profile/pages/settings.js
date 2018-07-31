import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, mapProps } from 'recompose';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { updateParameter } from '../../../stores/parameters';

const Settings = ({ translate: t, me, parameters, onChangeCheckbox }) => (
  <React.Fragment>
    <h2 className="no-margin mgb-1_5">{ t('profile.settings.title') }</h2>
    <div className="flex align-start-stretch layout-wrap">
      <input type="checkbox" id="viewCounter" name="viewCounter" onChange={ onChangeCheckbox } defaultChecked={ parameters.viewCounter }/>
      <label htmlFor="viewCounter" className="mgr-1">
        <svg className="w-2 h-2"><use xlinkHref="#icon-check" /></svg>
        Afficher le compteur sur le dashboard
      </label>
    </div>
  </React.Fragment>
);

Settings.propTypes = {
  me: PropTypes.object,
  parameters: PropTypes.object,
  onChangeCheckbox: PropTypes.func
};

const enhance = compose(
  connect(
    state => ({
      translate: getTranslate(state.locale),
      parameters: state.parameters
    }),
    dispatch => bindActionCreators({
      updateParameter
    }, dispatch)
  ),
  withHandlers(() => ({
    onChangeCheckbox: ({ updateParameter }) => (e) =>  { updateParameter({ [e.target.name]: e.target.checked }); }
  })),
  mapProps(({ translate, me, parameters, onChangeCheckbox }) => ({
    translate,
    me,
    parameters,
    onChangeCheckbox
  }))
);

export default enhance(Settings);