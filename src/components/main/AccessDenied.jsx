import React from 'react';
import { useHistory } from 'react-router-dom';

import { IMAGES_PATH } from '../../constants/urls';

export default function AccessDenied() {
  const history = useHistory();

  function goBack() {
    history.push('/home');
  }

  return (
    <div className="container">
      <div className="column col-8 offset-2">
        <h1 className="text-center my-5"> Error: 403 Forbidden </h1>
        <img src={IMAGES_PATH + '403.png'} alt="403" />
        <div className="my-4 text-center">
          <div className="alert alert-warning" role="alert">
            Sorry, access to this resource on the server is denied.
            Either check the URL, or go <span onClick={goBack} className="alert-link button-link pointer">home.</span>
          </div>
        </div>
      </div>      
    </div>
  );
}
