import React from 'react';

import HeaderLink from './HeaderLink';
import { Link } from 'react-router-dom';

export default function Header() {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="nav-link" to="/">
        <img src="/logo192.png" width="50" height="50" className="d-inline-block align-top" alt=""></img>
      </Link>
      <div className="collapse navbar-collapse justify-content-between">
        <ul className="navbar-nav">
          <li className="nav-item">
            <HeaderLink link="rooms" />
          </li>
          <li className="nav-item">
            <HeaderLink link="events" />
          </li>
        </ul>
        
        <ul className="navbar-nav">
          <li className="nav-item">
            <HeaderLink title="Log In" link="login" />
          </li>
          <li className="nav-item">
            <HeaderLink className="nav-link border border-success rounded-pill" title="Sign Up" link="signup" />
          </li>
        </ul>
      </div>
    </nav>
  );
}