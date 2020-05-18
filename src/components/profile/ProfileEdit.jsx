import React, { useEffect, useState } from 'react';
import { PROFILE_URL, PROFILE_UPDATE_URL } from '../../constants/urls';
import defaultOptionsAuth from '../shared/defaultOptionsAuth';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import Spinner from '../shared/Spinner';

export default function ProfileEdit() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const options = {
    method: 'PUT',
  };

  useEffect(fetchUserData, []);

  function handleInputChange(event) {
    event.persist();
    setUser(user => ({...user, [event.target.name]: event.target.value}));
  }

  function fetchUserData() {
    fetch(PROFILE_URL, defaultOptionsAuth())
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          const userData = {
            first_name: data.first_name,
            last_name: data.last_name,
            nick: data.nick,
            email: data.email,
            birth_date: format(new Date(data.birth_date), 'yyyy-MM-dd') || '',
            gender: data.gender.toString(),
            avatar: data.avatar,
          };
          setUser(userData || {});
        }
        setIsLoaded(true);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setIsLoaded(true);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    user.gender = parseInt(user.gender);
    options.body = JSON.stringify(user);
    fetch(PROFILE_UPDATE_URL, {...options, ...defaultOptionsAuth()})
      .then(response => {
        const data = response.json();
        data.then(res => {
          if (!res.error) {
            history.push('/profile');
          }
          setIsLoaded(true);
        });
      })
      .catch(error => {
        console.error(error);
      })
  };

  return !isLoaded
    ? (<Spinner/>)
    : (<div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-6 align-self-center">
          <h1 className="text-center">Edit Profile</h1>
          <form
            className="register-form"
            onSubmit={handleSubmit}>
            <div className="form-group row">
              <label
                htmlFor="firstName"
                className="col-4 col-form-label">
                First name
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="First name"
                  onChange={handleInputChange}
                  value={user.first_name || ''}/>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="lastName"
                className="col-4 col-form-label">
                Last name
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Last name"
                  onChange={handleInputChange}
                  value={user.last_name || ''}/>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="nick"
                className="col-4 col-form-label">
                Nick name
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="nick"
                  placeholder="Nick"
                  onChange={handleInputChange}
                  value={user.nick || ''}/>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputEmail"
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
                  value={user.email || ''}
                  required/>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="dateOfBirth"
                className="col-4 col-form-label">
                Date of birth
              </label>
              <div className="col-8">
                <input
                  type="date"
                  className="form-control"
                  name="birth_date"
                  onChange={handleInputChange}
                  value={user.birth_date || ''}/>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="gender"
                className="col-4 col-form-label">
                Gender
              </label>
              <div className="col-8">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderMale"
                    onChange={handleInputChange}
                    value="1"
                    checked={user.gender === "1"} />
                  <label
                    className="form-check-label"
                    htmlFor="genderMale">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderFemale"
                    onChange={handleInputChange}
                    value="2"
                    checked={user.gender === "2"}/>
                  <label
                    className="form-check-label"
                    htmlFor="genderFemale">
                    Female
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderOther"
                    onChange={handleInputChange}
                    value="3"
                    checked={user.gender === "3"}/>
                  <label
                    className="form-check-label"
                    htmlFor="genderOther">
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col text-center">
                <button
                  type="submit"
                  className="btn btn-primary">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>);
}
