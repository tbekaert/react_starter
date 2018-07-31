import React from 'react';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';

import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const Index = ({ translate: t, me }) => (
  <React.Fragment>
    <h2 className="no-margin mgb-1_5">{ t('profile.index.title') }</h2>
    <h3>{ t('profile.index.infos.title') }</h3>
    <ul>
      <li><strong>{ t('profile.index.infos.firstName') } : </strong>{ me.firstname }</li>
      <li><strong>{ t('profile.index.infos.lastName') } : </strong>{ me.lastname }</li>
    </ul>
  </React.Fragment>
);

Index.propTypes = {
  me: PropTypes.object
};

const enhance = compose(
  connect(state => ({
    translate: getTranslate(state.locale)
  })),
  mapProps(({
    translate,
    me
  }) => ({
    translate,
    me
  }))
);

export default enhance(Index);