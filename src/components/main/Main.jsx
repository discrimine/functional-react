import React, { useEffect, useState } from 'react';

import EventCard from '../shared/EventCard';
import RoomCard from '../shared/RoomCard';
import Spinner from '../shared/Spinner';
import { EVENTS_URL, ROOMS_URL } from '../../constants/urls';

export default function Main() {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [rooms, setRooms] = useState([]);

  function fetchEvents() {
    fetch(EVENTS_URL + '?page=1')
      .then(response => response.json())
      .then(data => {
        setEvents(data.events.slice(0, 3) || []);
        setIsLoaded(false);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setIsLoaded(false);
      })
  };

  useEffect(() => {
    fetch(ROOMS_URL + '/filter?page=1')
      .then(response => response.json())
      .then(data => {
        setRooms(data.rooms.slice(0, 3) || []);
        fetchEvents();
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setIsLoaded(false);
      });
  }, []);

  return isLoaded
  ? ( <Spinner /> )
  : (
    <div className="container">
      <h1 className="col-12 text-center my-4">Moments Matter</h1>
      <div className="row border-dark rounded-lg my-3 py-3 shadow bg-white">
        <h2 className="col-12"> Latest events </h2>
        {events.map((event, index) => <EventCard event={event} key={index} />)}
      </div>
      <div className="row border-dark rounded-lg my-4 py-3 shadow bg-white">
        <h2 className="col-12"> Latest rooms </h2>
        {rooms.map(room => <RoomCard key={room.id} room={room} />)}
      </div>
    </div>
  );
}
