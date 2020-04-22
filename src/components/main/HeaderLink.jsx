import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

export default function HeaderLink(props) {
    let { title, link } = props;
    const { className: classNameProp } = props;
    title = title || link[0].toUpperCase() + link.slice(1);
    link = link ? `/${link}` : '';
    const currentLocation = useLocation().pathname || '/';
    const classlist = (classNameProp || '') + (currentLocation === link ? ' active' : '');

    return (
        <Link className={`nav-link ${classlist}`} to={link}>
            {title}
        </Link>
    );
}

HeaderLink.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string.isRequired,
    className: PropTypes.string,
};

HeaderLink.defaultProps = {
    title: '',
    className: '',
};
