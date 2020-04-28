import React, { useState } from 'react';
import { SIGNUP_URL } from '../../constants/urls';
import useCustomForm from '../hooks/FormHooks';
import { useHistory } from 'react-router-dom';

export default function Signup(props) {
  const history = useHistory();
  const {inputs, handleInputChange} = useCustomForm();
  const [errorMessage, setErrorMessage] = useState('');
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      options.body = JSON.stringify(inputs);
      fetch(SIGNUP_URL, options)
        .then(response => {
          const data = response.json();
          data.then(res => {
            if(res.token){
              localStorage.setItem('currentUser', JSON.stringify(res));
              props.setIsLoggedIn(true);
              history.push('/profile')
            } else {
              setErrorMessage(res.error.errors.message[0]);
            }
          });
        })
        .catch(error => {
          console.error(error);
        })
    }
  };

  function ErrorBlock(props) {
    return <div className="alert alert-danger mt-3" role="alert">
      {props.error}
    </div>
  }

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-6 align-self-center">
          <h1 className="text-center">Sign Up</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group row">
              <label
                htmlFor="inputEmail1"
                className="col-4 col-form-label">
                Email address
              </label>
              <div className="col-8">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail1"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                  value={inputs.email || ''}
                  required/>
                { errorMessage ? <ErrorBlock error={errorMessage}/> : null }
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-4 col-form-label">Password</label>
              <div className="col-8">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={inputs.password || ''}
                  required/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputConfirmPassword" className="col-4 col-form-label">Confirm
                password</label>
              <div className="col-8">
                <input
                  type="password"
                  className="form-control"
                  id="inputConfirmPassword"
                  placeholder="Confirm password"
                  name="confpass"
                  onChange={handleInputChange}
                  value={inputs.confpass || ''}
                  required/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col text-center">
                <button type="submit" disabled={inputs.password !== inputs.confpass}
                        className="btn btn-primary">Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
