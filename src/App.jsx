import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/main/Header';
import Main from './components/main/Main';
import Rooms from './components/rooms/Rooms';
import Events from './components/events/Events';
import Login from './components/users/Login';
import Signup from './components/users/Signup';
import Event from './components/events/Event';
import Room from './components/rooms/Room';

import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/home" component={Main} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/events" component={Events} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/event/:id" component={Event} />
          <Route path="/room/:id" component={Room} />
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
