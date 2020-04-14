import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/main/Header';
import Main from './components/main/Main';
import Rooms from './components/rooms/Rooms';
import Events from './components/events/Events';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
      
        <Switch>
          <Route path="/home" component={Main} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/events" component={Events} />
          <Redirect from='/' to='/home'/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
