import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RoomCard from '../shared/RoomCard';
import Spinner from '../shared/Spinner';
import { ROOMS_URL } from '../../constants/urls';

export default function Rooms(props) {
  const [rooms, setRooms] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filterOptions, setFilterOptions] = useState(new URLSearchParams());
  const history = useHistory();

  useEffect(fetchRooms, []);

  function fetchRooms() {
    fetch(ROOMS_URL + '?' + filterOptions)
      .then(response => response.json())
      .then(data => {
        setRooms(data.rooms || []);
        setLoader(false);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setLoader(false);
      });
  }

  function handleChange(event) {
    filterOptions.set(event.target.name, event.target.value);
    setFilterOptions(filterOptions);
    fetchRooms();
  }

  function clearFilter() {
    for (let key of filterOptions.keys()) {
      filterOptions.delete(key)
    }
    setFilterOptions(filterOptions);
    fetchRooms();
  }

  function addRoom() {
    if (props.isLoggedIn) {
      history.push('/addRoom');
    } else {
      toast.error('You need to Log In or Sign Up to add new room', {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  }

  return loader
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
          <label>Rating</label>
          <input
            type="text"
            className="form-control"
            name="rating"
            value={filterOptions.get('rating') || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-1">
          <button type="submit" onClick={clearFilter} className="btn btn-primary">Clear</button>
        </div>
        <div className="form-group col-2 d-flex justify-content-end border-left" style={{borderLeft: '1px solid rgba(0, 0, 0, 0.125)'}}>
          <button type="submit" onClick={addRoom} className="btn btn-success text-light">Add Room</button>
        </div>
        
      </div>
      <div className="row">
        
      </div>
      <div className="row">
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

Rooms.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
