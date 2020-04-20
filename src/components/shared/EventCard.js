import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard(props) {
  const event = props.event || {};

  return (
    <div className="card-container col-4" style={{marginTop: "15px"}}>
      <div className="card ">
        <img src={event.cover} className="card-img-top" alt={event.title}/>
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">{event.description.slice(0, 100) + '...'}</p>
          <Link className="btn btn-primary" to={'/event/' + event.id}> More information </Link>
        </div>
      </div>
    </div>
  );
}