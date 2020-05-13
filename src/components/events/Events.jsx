import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EventCard from '../shared/EventCard';
import Spinner from '../shared/Spinner';
import { EVENTS_URL } from '../../constants/urls';

export default function Events(props) {
  const [events, setEvents] = useState([]);
  const [filterOptions, setFilterOptions] = useState(new URLSearchParams());
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  useEffect(fetchEvents, [])

  function handleChange(event) {
    filterOptions.set(event.target.name, event.target.value);
    setFilterOptions(filterOptions);
    fetchEvents();
  }

  function fetchEvents() {
    fetch(EVENTS_URL + '?' + filterOptions)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events || []);
        setIsLoaded(true);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setIsLoaded(true);
      })
  };

  function clearFilter() {
    for (let key of filterOptions.keys()) {
      filterOptions.delete(key)
    }
    setFilterOptions(filterOptions);
    fetchEvents();
  }

  function addEvent() {
    if (props.isLoggedIn) {
      history.push('/addEvent');
    } else {
      toast.error('You need to Log In or Sign Up to add new event', {
        position: 'top-center',
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  }

  return !isLoaded
  ? ( <Spinner /> )
  : (
    <div className="container">
      <div className="row align-items-end mt-3">
        <div className="form-group col-1">
          <label>Members</label>
          <input
            type="text"
            className="form-control"
            name="members"
            value={filterOptions.get('members') || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={filterOptions.get('date') || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-3">
          <label>Category</label>
          <input type="text"
            className="form-control"
            name="category"
            value={filterOptions.get('category') || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-2">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={filterOptions.get('location') || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-1">
          <button type="submit" onClick={clearFilter} className="btn btn-primary">Clear</button>
        </div>
        <div className="form-group col-2 d-flex justify-content-end border-left" style={{borderLeft: '1px solid rgba(0, 0, 0, 0.125)'}}>
          <button type="submit" onClick={addEvent} className="btn btn-success text-light">Add Event</button>
        </div>
      </div>
      <div className="row">
        {events.map((event, index) => <EventCard event={event} key={index} />)}
      </div>
      <ToastContainer />
    </div>
  );
}

Events.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
