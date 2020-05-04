import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorBlockUser(props) {
  return <div className="alert alert-danger">
    {props.error}
  </div>
}

ErrorBlockUser.propTypes = {
  error: PropTypes.string.isRequired,
};
