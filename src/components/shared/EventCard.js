import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard(props) {
  const event = props.event || {};
  const eventDate = new Date(event.start_date).toLocaleDateString();

  return (
    <div className="card-container col-4" style={{marginTop: "15px"}}>
      <div className="card ">
        <img src={event.cover} className="card-img-top" alt={event.title}/>
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">{event.description.slice(0, 100) + '...'}</p>
          <div className="card-bottom container">
            <div className="row align-items-end justify-content-between">
              <div className="card-bottom-link">
                <Link className="btn btn-link btn-sm" to={'/event/' + event.id}>More</Link>
              </div>
              <div className="card-bottom-info" style={{fontSize: "0.875rem", textAlign: 'right'}}>
                <span>members: {event.members.length || 0}</span> <br />
                <span>date: {eventDate}</span> <br />
                <span>category: {event.category.title || ''}</span> <br />
                <span>location: {event.location || ''}</span> <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}