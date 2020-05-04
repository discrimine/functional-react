import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_EVENT_URL, GET_COMMENTS_URL, NO_AVATAR_PATH } from '../../constants/urls';
import StarRatings from 'react-star-ratings';
import Spinner from '../shared/Spinner';
import { useHistory } from "react-router-dom";
import './event.scss';

export default function Event(props) {
  const [event, setEvent] = useState({});
  const history = useHistory();
  const eventId = props.match.params.id;
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState([]);

  // TODO: set logged user checking, while implementing comments adding
  const isUserLogged = false;

  useEffect(fetchEvent, [])

  function fetchEvent() {
    fetch(GET_EVENT_URL + eventId)
      .then((response) => response.json())
      .then((data) => {
        getComments();
        setEvent(data || {});
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function getComments() {
    fetch(`${GET_COMMENTS_URL}?entity_id=${eventId}&entity_type=event`)
      .then((response) => response.json())
      .then((comments) => {
        setComments(comments);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addComment() {
    // TODO: implement comments adding
    console.log('added!');
  }

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
        <div className="mt-2">
          {event.media.length
            ? <div className="row">
                {event.media.map((media, key) => {
                  return <div className="col-3 mt-3 gallery-img" key={key}> <img src={media.key} alt="gallery"/> </div>
                })}
              </div>
            : ''
          }
        </div>
        <div className="mt-4">
          <h3>Comments</h3>
          <div className="column mt-3">
            <div className="column shadow-sm p-3 my-3 bg-white rounded">
              <div className="d-flex">
                <div className="col-1 d-flex align-items-center justify-content-center p-2">
                  <img height="50" width="50" src={NO_AVATAR_PATH} alt="User"/>
                </div>
                <textarea className="col-11"></textarea>
              </div>
              <div className="d-flex mt-2 justify-content-end">
                {isUserLogged
                  ? <button type="button" onClick={addComment} className="btn btn-primary">Send</button>
                  :
                  <div>
                    <Link to="/login">Log In</Link>&nbsp;
                    <span>or</span>&nbsp;
                    <Link to="/signup">Sign Up</Link>&nbsp;
                    <span>to leave new comments</span>
                  </div>
                }
              </div>
            </div>
            {comments.length
              ? comments.map((comment, key) => {
                const authorNick = comment.author.nick || 'Noname';
                const authorAvatar = comment.author.avatar || NO_AVATAR_PATH;
                return (
                  <div className="comment-card shadow-sm p-3 mb-3 rounded" key={key}>
                    <div className="row">
                      <div className="col-2 author-data">
                        <div className="column">
                          <div align="center" className="w-100">{authorNick}</div>
                          <div className="d-flex justify-content-center">
                            <img height="50" width="50" src={authorAvatar} alt={authorNick}/>
                          </div>
                        </div>
                        
                      </div>
                      <div className="col-10">
                        { comment.text }
                      </div>
                    </div>
                  </div>
                )
              })
              : <div>There are no comments yet :(</div>
            }
          </div>
        </div>
      </div>
    );
}