import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import defaultOptionsAuth from '../shared/defaultOptionsAuth';
import { EVENT_URL, COMMENTS_URL, NO_AVATAR_PATH, JOIN_EVENT_URL, LEAVE_EVENT_URL } from '../../constants/urls';
import Spinner from '../shared/Spinner';
import useCustomForm from '../hooks/FormHooks';
import './event.scss';
import { toast } from 'react-toastify';

export default function Event(props) {
  const [event, setEvent] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const {inputs, handleInputChange} = useCustomForm();
  const [pageBottom, setPageBottom] = useState({});
  const [isMember, setIsMember] = useState(false);

  const eventId = props.match.params.id;
  const isUserLogged = props.isLoggedIn;
  const options = {};
  const toastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: true,
  };
  const userId = JSON.parse(localStorage.getItem('currentUser'))
    ? JSON.parse(localStorage.getItem('currentUser')).id
    : null;

  useEffect(fetchEvent, []);

  function fetchEvent() {
    fetch(EVENT_URL + eventId)
      .then((response) => response.json())
      .then((data) => {
        getComments();
        setEvent(data || {});
        setIsMember(data.members.find(member => member.id === userId));
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  };

  function scrollToBottom() {
    pageBottom.scrollIntoView({ behavior: 'smooth' });
  }

  function getComments() {
    fetch(`${COMMENTS_URL}?entity_id=${eventId}&entity_type=event`)
      .then((response) => response.json())
      .then((comments) => {
        setComments(comments);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addComment() {
    const userId = JSON.parse(localStorage.getItem('currentUser')).id;
    fetch(`${COMMENTS_URL}/add`, {
        method: 'POST',
        ...defaultOptionsAuth(),
        body: JSON.stringify({
          entity_id: eventId,
          entity_type: 'event',
          user_id: userId,
          text: inputs.commentText,
          is_banned: '0',
        }),
      })
      .then(() => {
        getComments();
        scrollToBottom();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function joinEvent() {
    if (props.isLoggedIn) {
      options.method = 'POST';
      options.body = JSON.stringify({entity_id: eventId});
      fetch(JOIN_EVENT_URL, {...options, ...defaultOptionsAuth()})
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            toast.warning(data.error.errors.message[0], toastOptions);
          } else {
            toast.success('Congratulations! You have just joined this room!', toastOptions);
            fetchEvent();
          }
        })
        .catch(err => {
          console.error(err);
        })
    } else {
      toast.error('You need to Log In or Sign Up to join room', {
        position: 'top-center',
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  }

  function leaveEvent() {
    options.method = 'DELETE';
    fetch(`${LEAVE_EVENT_URL}${eventId}`, {...options, ...defaultOptionsAuth()})
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          toast.warning(data.error.errors.message[0], toastOptions);
        } else {
          toast.success('You have successfully left this room!', toastOptions);
          fetchEvent();
        }
      })
      .catch(err => {
        console.error(err);
      })
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
        </div>
        <div className="row justify-content-end mt-n5 mb-3">
          {isMember ? (
            <div className="col-3 p-0 text-right">
              <button
                onClick={leaveEvent}
                type="button"
                className="btn btn-warning"
                style={{ fontSize: '16px' }}
              >
                LEAVE EVENT
              </button>
            </div>
          ) : (
            <div className="col-2 p-0 text-right pr-3">
              <button
                onClick={joinEvent}
                type="button"
                className="btn btn-primary"
                style={{ fontSize: '16px' }}
              >
                JOIN EVENT
              </button>
            </div>
          )}
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
                <textarea name="commentText" onChange={handleInputChange} className="col-11"></textarea>
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
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { setPageBottom(el); }}>
          </div>
        </div>
      </div>
    );
}

Event.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

