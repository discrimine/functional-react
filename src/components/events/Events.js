import React, { useEffect, useState } from 'react';

import EventCard from '../shared/EventCard';
import { getEventUrl } from '../../constants/Api';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filterOptions, setFilterOptions] = useState(new URLSearchParams());

  useEffect(fetchEvents, [])

  function handleChange(event) {
    filterOptions.set(event.target.name, event.target.value);
    setFilterOptions(filterOptions);
    fetchEvents();
  }

  function fetchEvents() {
    fetch(getEventUrl + '?' + filterOptions)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events || []);
      })
      .catch((err) => {
        console.error(err);
      })
  };

  return (
    <div className="container">
      <div className="row align-items-center mt-3">
        <div className="form-group col-3">
          <label>Count of members</label>
          <input type="text" className="form-control" name="members" onChange={handleChange}/>
        </div>
        <div className="form-group col-3">
          <label>Date</label>
          <input type="date" className="form-control" name="date" onChange={handleChange}/>
        </div>
        <div className="form-group col-3">
          <label>Category</label>
          <input type="text" className="form-control" name="category" onChange={handleChange}/>
        </div>
        <div className="form-group col-3">
          <label>Location</label>
          <input type="text" className="form-control" name="location" onChange={handleChange}/>
        </div>
      </div>
      <div className="row">
        {events.map((event, index) => <EventCard event={event} key={index} />)}
      </div>
    </div>
  );
}