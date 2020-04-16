import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

export default function HeaderLink(props) {
  const title = props.title || props.link[0].toUpperCase() + props.link.slice(1);
  const link = props.link ? '/' + props.link : '';
  const currentLocation = useLocation().pathname || '/';
  const classlist = (props.className || '') + (currentLocation === link ? ' active' : '' )

  return (
    <Link
      className={
        "nav-link "
        + classlist}
      to={link}>{title}
    </Link>
  );
}