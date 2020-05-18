import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/main/Header';
import Main from './components/main/Main';
import Rooms from './components/rooms/Rooms';
import Events from './components/events/Events';
import Login from './components/users/Login';
import Signup from './components/users/Signup';
import Event from './components/events/Event';
import Room from './components/rooms/Room';
import Profile from './components/profile/Profile';
import AddEvent from './components/events/AddEvent';
import AddRoom from './components/rooms/AddRoom';
import NotFound from './components/main/NotFound';
import AccessDenied from './components/main/AccessDenied';
import ProfileEdit from './components/profile/ProfileEdit';

import './App.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Switch>
          <Route path="/home" component={Main} />
          <Route path="/rooms" component={() => <Rooms isLoggedIn={isLoggedIn} />} />
          <Route path="/events" component={() => <Events isLoggedIn={isLoggedIn} />} />
          <Route path="/login" component={() => <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" component={() => <Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/event/:id" component={Event} />
          <Route path="/room/:id" component={Room} />
          <Route path="/profile" component={Profile} />
          <Route path="/profile-edit" component={ProfileEdit} />
          <Route path="/addRoom" component={() => <AddRoom setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/addEvent" component={() => <AddEvent setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/accessDenied" component={AccessDenied} />
          <Redirect from="/" exact to="/home" />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
