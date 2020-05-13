import React, { useState } from 'react';
import { LOGIN_URL } from '../../constants/urls';
import { useHistory } from 'react-router';
import useCustomForm from '../hooks/FormHooks';
import ErrorBlockUser from './ErrorBlockUser';

export default function Login(props) {

  const history = useHistory();
  const {inputs, handleInputChange} = useCustomForm();
  const [errorMessage, setErrorMessage] = useState('');
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    options.body = JSON.stringify(inputs);
    fetch(LOGIN_URL, options)
      .then(response => {
        const data = response.json();
        data.then(res => {
          if (res.token) {
            localStorage.setItem('currentUser', JSON.stringify(res));
            props.setIsLoggedIn(true);
            history.push('/home');
          } else {
            setErrorMessage(res.error.errors.password ? res.error.errors.password[0] : res.error.errors.message[0]);
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-6 align-self-center">
          <h1 className="text-center">Log In</h1>
          <form
            className="register-form"
            onSubmit={handleSubmit}>
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
                  name="email"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                  value={inputs.email || ''}
                  required/>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputPassword"
                className="col-4 col-form-label">
                Password
              </label>
              <div className="col-8">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={inputs.password || ''}
                  required/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-8 offset-4">
                { errorMessage ? <ErrorBlockUser error={errorMessage}/> : null }
              </div>
            </div>
            <div className="form-group row">
              <div className="col text-center">
                <button
                  type="submit"
                  className="btn btn-primary">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
