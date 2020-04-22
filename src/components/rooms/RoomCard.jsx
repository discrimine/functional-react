import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RoomCard(props) {
    const { room } = props;
    const { title, description, cover, category, creator, id } = room;
    return (
        <div className="room-container col-5">
            <h3 className="text-center">{title}</h3>
            <img src={cover} alt="cover" />
            <p className="mt-3">{description}</p>
            Category: <span className="badge badge-info">{category.title}</span>
            <p>Creator: {creator.nick}</p>
            <Link to={`/room/${id}`} className="d-block p-2 bg-primary text-white text-center">
                Read more
            </Link>
        </div>
    );
}

RoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        creator: PropTypes.shape({
            nick: PropTypes.string.isRequired,
        }),
        category: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};
