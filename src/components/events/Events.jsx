import React, { useEffect, useState } from 'react';
import EventCard from '../shared/EventCard';
import Spinner from '../shared/Spinner';
import { GET_EVENTS_URL } from '../../constants/urls';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filterOptions, setFilterOptions] = useState(new URLSearchParams());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(fetchEvents, [])

  function handleChange(event) {
    filterOptions.set(event.target.name, event.target.value);
    setFilterOptions(filterOptions);
    fetchEvents();
  }

  function fetchEvents() {
    fetch(GET_EVENTS_URL + '?' + filterOptions)
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

  return !isLoaded
  ? ( <Spinner /> )
  : (
    <div className="container">
      <div className="row align-items-end mt-3">
        <div className="form-group col-2">
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
        <div className="form-group col-3">
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
      </div>
      <div className="row">
        {events.map((event, index) => <EventCard event={event} key={index} />)}
      </div>
    </div>
  );
}
