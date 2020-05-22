import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Spinner from '../shared/Spinner';
import { JOIN_ROOM_URL, LEAVE_ROOM_URL, ROOMS_URL } from '../../constants/urls';
import defaultOptionsAuth from '../shared/defaultOptionsAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './room.scss';

export default function Room(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [room, setRoom] = useState(null);
  const [loader, setLoader] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [error, setError] = useState(false);
  const options = {};
  const toastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: true,
  };
  const userId = JSON.parse(localStorage.getItem('currentUser'))
    ? JSON.parse(localStorage.getItem('currentUser')).id
    : null;

  useEffect(() => {
    fetchRoomData();
  }, []);

  function fetchRoomData() {
    fetch(`${ROOMS_URL}/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setRoom(data);
          setIsMember(data.members.find(member => member.id === userId));
          setError(false);
        }
        setLoader(false);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setError(true);
        setLoader(false);
      });
  }

  function joinRoom() {
    if (props.isLoggedIn) {
      options.method = 'POST';
      options.body = JSON.stringify({entity_id: id});
      fetch(JOIN_ROOM_URL, {...options, ...defaultOptionsAuth()})
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            toast.warning(data.error.errors.message[0], toastOptions);
          } else {
            toast.success('Congratulations! You have just joined this room!', toastOptions);
            fetchRoomData();
          }
        })
        .catch(err => {
          console.error(err);
          setError(true);
          setLoader(false);
        })
    } else {
      toast.error('You need to Log In or Sign Up to join room', {
        position: 'top-center',
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  }

  function leaveRoom() {
    options.method = 'DELETE';
    fetch(`${LEAVE_ROOM_URL}${id}`, {...options, ...defaultOptionsAuth()})
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          toast.warning(data.error.errors.message[0], toastOptions);
        } else {
          toast.success('You have successfully left this room!', toastOptions);
          fetchRoomData();
        }
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoader(false);
      })
  }

  return loader ? (
    <Spinner />
  ) : (
    <div className="container">
      {error ? (
        <h2 className="text-center">ROOM NOT FOUND!</h2>
      ) : (
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-3 mt-3">{room.title}</h2>
            <div className="text-center mb-5">
              <StarRatings
                rating={room.roomRating}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
                starDimension="30px"
              />
            </div>
            <div className="row justify-content-end mt-n5 mb-3">
              {isMember ? (
                <div className="col-3 p-0 text-right">
                  <button
                    onClick={leaveRoom}
                    type="button"
                    className="btn btn-warning"
                    style={{ fontSize: '16px' }}
                  >
                    LEAVE ROOM
                  </button>
                </div>
              ) : (
                <div className="col-2 p-0 text-right pr-3">
                  <button
                    onClick={joinRoom}
                    type="button"
                    className="btn btn-primary"
                    style={{ fontSize: '16px' }}
                  >
                    JOIN ROOM
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-8">
            <img src={room.cover} className="w-100" alt="cover" />
            <p className="mt-5">
              <b>Author: </b> {room.creator.nick}
            </p>
            <p className="mt-2">
              <b>Category: </b>
              <span className="badge badge-info">{room.category.title}</span>
            </p>
            <p className="mt-2">
              <b>
                Members({room.members.length}/{room.members_limit}):{' '}
              </b>
              {room.members.length
                ? room.members.map((member, index) => (
                    <Link to={`/profile/${member.id}`} key={member.id}>
                      {member.nick}
                      {index + 1 === room.members.length ? '' : ', '}
                    </Link>
                  ))
                : 'there are no members :('}
            </p>
            <p className="mt-3">
              <b>Description:</b> {room.description}
            </p>
            <div className="row">
              <div className="col-12">
                <h4 className="font-weight-bolder font-italic">Related events</h4>
                <div className="row">
                  {room.event.length ? (
                    room.event.map(event => (
                      <Link to={`/event/${event.id}`} className="event-container col-4" key={event.id}>
                        <img src={event.cover} alt="cover" className="w-100" />
                        <h5 className="mt-2">{event.title}</h5>
                        <p>{event.description}</p>
                      </Link>
                    ))
                  ) : (
                    <div className="col-12">there are no events :(</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <h4 className="font-weight-bolder font-italic">Latest posts</h4>
            {room.posts.length ? (
              room.posts.map(post => (
                <div key={post.id} className="post-container">
                  <h5 style={{ backgroundImage: `url(${post.cover})` }}>{post.title}</h5>
                  <p>{post.description}</p>
                </div>
              ))
            ) : (
              <div>there are no posts :(</div>
            )}

            <h4 className="font-weight-bolder font-italic">Latest feeds</h4>
            {room.feeds.length ? (
              room.feeds.map(feed => (
                <div key={feed.id} className="post-container">
                  <h5 style={{ backgroundImage: `url(${feed.cover})` }}>{feed.title}</h5>
                  <p>{feed.description}</p>
                </div>
              ))
            ) : (
              <div>there are no feeds :(</div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
