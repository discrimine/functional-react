import React, { useState, useEffect } from 'react';
import RoomCard from '../shared/RoomCard';
import Spinner from '../shared/Spinner';
import { ROOMS_URL } from '../../constants/urls';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(ROOMS_URL)
      .then(response => response.json())
      .then(data => {
        setRooms(data.rooms || []);
        setTotalRooms(data.roomCount || 0);
        setLoader(false);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setLoader(false);
      });
  }, []);

  return loader
  ? ( <Spinner /> )
  : (
    <div className="container">
      <div className="row">
        <p>Total: {totalRooms}</p>
      </div>
      <div className="row">
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
