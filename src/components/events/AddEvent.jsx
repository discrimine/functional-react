import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useCustomForm from  '../hooks/FormHooks';
import defaultOptionsAuth from '../shared/defaultOptionsAuth';
import { EVENT_URL, CATEGORY_URL } from '../../constants/urls';

export default function AddEvent() {
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);
  const {inputs, handleInputChange} = useCustomForm();
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchCategories();
    try {
      setUserId(JSON.parse(localStorage.getItem('currentUser')).id);
    } catch (error) {
      console.log(error);
      history.push('/accessDenied');
    } 
  }, [history]);

  function fetchCategories() {
    fetch(CATEGORY_URL)
      .then(response => response.json())
      .then((categories) => {
        setCategories(categories || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addEvent() {
    const { title, description, location, category_id, members_limit } = inputs;

    // TODO: doesn't work, be issue with start date
    fetch(EVENT_URL, {
        ...defaultOptionsAuth(),
        method: 'POST',
        body: JSON.stringify({
          title: title,
          creator_id: userId,
          category_id,
          description,
          location,
          permission: 0,
          members_limit,
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          history.push(`event/${response.id}`);
        } else {
          const errors = response.error.errors;
          const errorsArray = [];
          for (let error in errors) {
            errorsArray.push(errors[error]);
          }
          setFormErrors(errorsArray);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function cancel() {
    history.goBack();
  }

  return (
    <div className="col-2 offset-5 ">
      <h2 className="my-3 text-center">New Event</h2>
      { formErrors.length
      ? <div className="alert alert-danger"> { formErrors.map((err, key) => <p key={key}> { err } </p>) } </div>
      : '' }
      <div className="column justify-content-center">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category_id" defaultValue="" onChange={handleInputChange} className="form-control">
            <option value=""  disabled hidden>Select category</option>
            { categories.map((category, key) => {
              return <option key={key} value={category.id}> { category.title } </option>;
            }) }
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            onChange={handleInputChange}
            className="form-control"
            rows="3">
          </textarea>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Members limit</label>
          <input
            type="number"
            name="members_limit"
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group d-flex justify-content-between">
          <button onClick={cancel} className="btn btn-danger">Cancel</button>
          <button onClick={addEvent} className="btn btn-success">Add</button>
        </div>
      </div>
    </div>
  );
}
