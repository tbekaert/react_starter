import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const NoMatch = ({ translate: t }) => (
  <section className="row">
    <div className="column-12 pgv-2 bg-white shadow bd-radius mgt-2">
      <div className="flex layout-column align-center-center text-center">
        <h1 className="no-shadow fz-72 text-primary">{ t('noMatch.title') }</h1>
        <p>{ t('noMatch.content') }</p>
      </div>
    </div>
  </section>
);

NoMatch.propTypes = {
  translate: PropTypes.func
};

const enhance = compose (
  connect(
    state => ({
      translate: getTranslate(state.locale)
    })
  )
);

export default enhance(NoMatch);
