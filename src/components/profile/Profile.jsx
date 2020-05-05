import React, { useEffect, useState } from 'react';
import { GET_EVENTS_URL, PROFILE_URL, ROOMS_URL } from '../../constants/urls';
import defaultOptionsAuth from '../shared/defaultOptionsAuth';

import Spinner from '../shared/Spinner';
import EventCard from '../shared/EventCard';
import RoomCard from '../shared/RoomCard';

export default function Profile(props) {
  const [user, setUserData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const [rooms, setRooms] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(fetchUserData, []);

  function getUserEntities(userEntity, allEntity) {
    let arrIds = userEntity.map((ue) => ue.id);
    return allEntity.filter((e) => arrIds.includes(e.id));
  }

  function fetchEvents(userEvents) {
    fetch(GET_EVENTS_URL)
      .then((response) => response.json())
      .then((data) => {
        let result = getUserEntities(userEvents, data.events);
        setEvents(result|| []);
        setIsLoaded(true);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setIsLoaded(true);
      })
  }

  function fetchRooms(userRooms) {
    fetch(ROOMS_URL)
      .then(response => response.json())
      .then(data => {
        let result = getUserEntities(userRooms, data.rooms);
        setRooms(result || []);
        setIsLoaded(true);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

   function fetchUserData() {
      fetch(PROFILE_URL, defaultOptionsAuth())
        .then((response) => response.json())
        .then((data) => {
          if(!data.error){
            fetchEvents(data.events);
            fetchRooms(data.rooms);
            setUserData(data || {});
          }
          setIsLoaded(true);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
          setIsLoaded(true);
        });
  }

  function gender(val) {
    let gender = '';
    switch (val) {
      case 1:
        gender = 'male';
        break;
      case 2:
        gender = 'female';
        break;
      default:
        gender = 'other';
    }
    return gender;
  }

  function Profile() {
    if(props.isLoggedIn) {
      return <div className="row justify-content-center">
        <div className="col-6 align-self-center">
          <h1 className="text-center">Profile</h1>
          <div className="row">
            <div className="col-12 text-center">
              {user.avatar ? <img src={user.avatar} alt="avatar"/> : ''}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-right">
              Nick
            </div>
            <div className="col-6 text-left">
              {user.nick || '-'}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-right">
              First name
            </div>
            <div className="col-6 text-left">
              {user.first_name || '-'}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-right">
              Last name
            </div>
            <div className="col-6 text-left">
              {user.last_name || '-'}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-right">
              Email
            </div>
            <div className="col-6 text-left">
              {user.email || '-'}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-right">
              Date of birth
            </div>
            <div className="col-6 text-left">
              {user.birth_date || '-'}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-right">
              Gender
            </div>
            <div className="col-6 text-left">
              {gender(user.gender) || '-'}
            </div>
          </div>
        </div>
      </div>
    } else {
      return <h1 className="text-center">401 Unauthorized</h1>;
    }
  }

  function Rooms(props) {
    return <div className="row border-dark rounded-lg my-3 py-3 shadow bg-white">
      <h2 className="col-12"> Rooms </h2>
      {props.rooms.map(room => <RoomCard key={room.id} room={room} />)}
    </div>
  }

  function Events(props) {
    return <div className="row border-dark rounded-lg my-3 py-3 shadow bg-white">
      <h2 className="col-12"> Events </h2>
      {props.events.map(event => <EventCard event={event} key={event.id} />)}
    </div>
  }

  return !isLoaded
  ? ( <Spinner /> )
  : ( <div className="container mt-3">
      <Profile />
      {events.length > 0 ? <Events events={events}/> : ''}
      {rooms.length > 0 ? <Rooms rooms={rooms}/> : ''}
    </div> );
}
