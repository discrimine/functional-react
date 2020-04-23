import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function EventCard(props) {
  const { event } = props;
  const { cover, title, description, id, members, category, location, start_date: startDate } = event;
  const eventDate = new Date(startDate).toLocaleDateString();

  return (
    <div className="card-container col-4" style={{ marginTop: '15px' }}>
      <div className="card">
        <img src={cover} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{`${description.slice(0, 100)}...`}</p>
          <div className="card-bottom container">
            <div className="row align-items-end justify-content-between">
              <div className="card-bottom-link">
                <Link className="btn btn-link btn-sm" to={`/event/${id}`}>
                  More
                </Link>
              </div>
              <div className="card-bottom-info" style={{ fontSize: '0.875rem', textAlign: 'right' }}>
                <span>members: {members.length || 0}</span> <br />
                <span>date: {eventDate}</span> <br />
                <span>category: {category.title || ''}</span> <br />
                <span>location: {location || ''}</span> <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    start_date: PropTypes.string.isRequired,
    category: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.string.isRequired,
  }),
};

EventCard.defaultProps = {
  event: {},
};
