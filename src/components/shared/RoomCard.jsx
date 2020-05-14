import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RoomCard(props) {
  const { room } = props;
  const { title, description, cover, category, creator, id } = room;
  return (
    <div className="room-container col-4 mt-3">
      <div className="card">
        <h5 className="text-center card-title mt-2">{title}</h5>
        <img src={cover} alt="cover" />
        <div className="card-body">
          <p className="mt-3">{`${description.slice(0, 120)}...`}</p>
          Category: <span className="badge badge-info">{category.title}</span>
          <p>Creator: {creator.nick}</p>
          <Link to={`/room/${id}`} className="btn btn-primary d-block p-2">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}

RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cover: PropTypes.string,
    creator: PropTypes.shape({
      nick: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
