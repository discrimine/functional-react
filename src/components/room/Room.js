import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Spinner from '../shared/Spinner/Spinner';
import { ROOMS_URL } from '../../constants/urls';
import './room.scss';

export default function Room(props) {
  const [room, setRoom] = useState(null);
  const { id } = props.match.params;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(`${ROOMS_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRoom(data || []);
        setTimeout(() => setLoader(false), 1000);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      })
  }, [id]);

  return (
     loader ?
      <Spinner />
      :
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-3 mt-3">{room.title}</h2>
            <div className="text-center mb-5" >
            <StarRatings
              rating={room.roomRating}
              starRatedColor="blue"
              numberOfStars={5}
              name='rating'
              starDimension="30px"
            />
            <Link
              to="/signup"
              type="button"
              className="btn btn-primary"
              style={{marginTop: '-20px', fontSize: '24px', float: 'right'}}
            >
                JOIN ROOM
            </Link>
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
              <b>Members({room.members.length}/{room.members_limit}): </b>
              {room.members.map((member, index) => (
                <Link to={`/profile/${member.id}`} key={member.id}>
                  {member.nick}
                  {index + 1 === room.members.length ? '' : ', '}
                </Link> 
              ))}
            </p>
            <p className="mt-3"><b>Description:</b> {room.description}</p>
            <div className="row">
          <div className="col-12">
          <h4 className="font-weight-bolder font-italic">Related events</h4>
          <div className="row">
            {room.event.map(event => (
              <Link to={`/event/${event.id}`} className="event-container col-4" key={event.id}>
                  <img src={event.cover} alt="cover" className="w-100" />
                  <h5 className="mt-2">{event.title}</h5>
                  <p>{event.description}</p> 
              </Link>
            ))}
          </div>
          </div>
        </div>
          </div>
          <div className="col-4">
            <h4 className="font-weight-bolder font-italic">Latest posts</h4>
            {room.posts.map(post => (
              <div key={post.id} className="post-container">
                <h5 style={{backgroundImage:`url(${post.cover})`}}>{post.title}</h5>
                <p>{post.description}</p> 
              </div>
            ))}
            <h4 className="font-weight-bolder font-italic">Latest feeds</h4>
            {room.feeds.map(feed => (
              <div key={feed.id} className="post-container">
                <h5 style={{backgroundImage:`url(${feed.cover})`}}>{feed.title}</h5>
                <p>{feed.description}</p> 
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}