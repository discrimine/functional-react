import React, { useEffect, useState } from 'react';
import { GET_EVENT_URL } from '../../constants/urls';
import StarRatings from 'react-star-ratings';
import Spinner from '../shared/Spinner';
import { useHistory } from "react-router-dom";

export default function Event(props) {
  const [event, setEvent] = useState({});
  const history = useHistory();
  const eventId = props.match.params.id;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(fetchEvent, [])

  function fetchEvent() {
    fetch(GET_EVENT_URL + eventId)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data || {});
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      })
  };

  function joinEvent() {
    // TODO: join, if user logged
    history.push('/login');
  }

  return !isLoaded
    ? ( <Spinner /> )
    : (<div className="container">
        <div className="row">
          <h2 className="mb-3 mt-3 col-12 text-center">{event.title}</h2>
          <div className="col-4 mb-3 text-center offset-4">
            <StarRatings
              rating={event.eventRating}
              starRatedColor="#e9c545"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
            />
          </div>
          <div className="col-1 offset-3"> <button type="button" onClick={joinEvent} className="btn btn-success">Join!</button> </div>
        </div>
        <div className="row">
          <div className="col-7"><img src={event.cover} alt={event.title}/></div>
          <div className="col-5">
            <p><b>date:</b> {new Date(event.start_date).toUTCString()}</p>
            <p><b>location:</b> {event.location}</p>
            <p><b>description:</b> {event.description}</p>
          </div>
        </div>
        {event.media.length
          ? <div className="row">
              {event.media.map((media, key) => {
                return <div className="col-3 mt-3" key={key}> <img src={media.key} alt=""/> </div>
              })}
            </div>
          : ''
        }
      </div>
    );
}