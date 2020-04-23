import React, { useEffect, useState } from 'react';
import EventCard from '../shared/EventCard';

export default function Events() {
  const [events, setEvents] = useState([]);
  const url = 'http://localhost:3001/api/event/filter';

  useEffect(() => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setEvents(data.events || []);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        {events.map(event => (
          <EventCard event={event} />
        ))}
      </div>
    </div>
  );
}
