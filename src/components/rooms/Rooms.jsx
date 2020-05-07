import React, { useState, useEffect } from 'react';
import RoomCard from '../shared/RoomCard';
import Spinner from '../shared/Spinner';
import { ROOMS_URL } from '../../constants/urls';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [loader, setLoader] = useState(true);
  const [filterOptions, setFilterOptions] = useState(new URLSearchParams());

  useEffect(fetchRooms, []);

  function fetchRooms() {
    fetch(ROOMS_URL + '?' + filterOptions)
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

  return loader
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
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={filterOptions.get('category') || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-1">
          <button type="submit" onClick={clearFilter} className="btn btn-primary">Clear</button>
        </div>
      </div>
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
