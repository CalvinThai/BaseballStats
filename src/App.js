import React from 'react';
import logo from './logo.svg';
import './App.css';
import {styles} from "./styles";
import Team from './Team'
import Roster from './Roster'
import Player from './Player'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className ="App">
        <Switch>
          {//<Route path ="/"  exact component = {Team} />}
          }
          <Route path ="/" exact component = {Team} />
          <Route path = "/team/:id" exact component = {Roster}/>
          <Route path = "/team/:id/player/:playerid" component = {Player}/>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
