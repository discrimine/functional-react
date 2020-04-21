import React, {useState, useEffect} from 'react';
import RoomCard from './RoomCard';
import Spinner from '../shared/Spinner/Spinner';
import { ROOMS_URL } from '../../constants/urls';
import './rooms.scss';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    fetch(ROOMS_URL)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.rooms || []);
        setTotalRooms(data.roomCount || 0);
        setTimeout(() => setLoader(false), 1000);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      })
  }, []);

  return (
    loader ?
      <Spinner />
      :
      <div className="container">
        <div className="row">
          <p>Total: {totalRooms}</p>
        </div>
        <div className="row">
          {rooms.map(room => <RoomCard key={room.id} room={room}/>)}
        </div>
      </div>
  );
}