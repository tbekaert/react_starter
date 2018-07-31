import React from 'react';
import PropTypes from 'prop-types';

import Toast from './toast';

import './index.css';

const Toasts = ({ toasts }) =>
  toasts.length > 0 && (
    <div className='toasts'>
      {
        toasts.map((toast, toastIndex) => (
          <Toast toast={ toast } key={ toastIndex.toString() } />
        ))
      }
    </div>
  );

Toasts.propTypes = {
  toasts: PropTypes.array
};

export default Toasts;