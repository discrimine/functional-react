import React from 'react';
import { useHistory } from 'react-router-dom';

import { IMAGES_PATH } from '../../constants/urls';

export default function NotFound() {
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <div className="container">
      <div className="column col-8 offset-2">
        <h1 className="text-center my-5"> Error: 404 Page Not Found </h1>
        <img src={IMAGES_PATH + '404.png'} />
        <div className="my-4 text-center">
        <div class="alert alert-warning" role="alert">
          Sorry, the page you're looking for cannot be accessed.
          Either check the URL, or go <a onClick={goBack} href="#" class="alert-link">back.</a>
        </div>
        </div>
      </div>      
    </div>
  );
}
