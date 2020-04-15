import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";

export default function Header() {

  const currentLocation = useLocation().pathname || '/';
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="nav-link" to="/">
        <img src="/logo192.png" width="50" height="50" className="d-inline-block align-top" alt=""></img>
      </Link>
      <div className="collapse navbar-collapse justify-content-between">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={"nav-link " + (currentLocation === '/rooms' ? 'active' : '' )}
              to="/rooms">Rooms
            </Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link " + (currentLocation === '/events' ? 'active' : '' )}
              to="/events">Events
            </Link>
          </li>
        </ul>
        
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={"nav-link " + (currentLocation === '/login' ? 'active' : '' )}
              to="/login">Log In
            </Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link border border-success rounded-pill " + (currentLocation === '/signup' ? 'active' : '' )}
              to="/signup">Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}