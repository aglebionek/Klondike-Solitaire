import React from "react";
import "./App.css";
import MainMenu from "./Components/MainMenu/MainMenu";
import Login from "./Components/Login/Login";
import { Switch, Route } from 'react-router-dom';
import Settings from "./Components/Settings";
import GlobalStats from "./Components/GlobalStats/Stats";
import GameView from "./Components/GameView/GameView";
import LobbyMultiplayer from "./Components/Mutiplayer/LobbyMultiplayer";
import CreateRoom from './Components/CreateRoom/CreateRoom';
import Account from "./Components/Account/Account";

function App() {

  return (
    <Switch>
      <Route path="/" component={MainMenu} exact />
      <Route path="/login" component={Login} />
      <Route path="/settings" component={Settings} />
      <Route path="/global-stats" component={GlobalStats} />
      <Route path="/game-view" component={GameView} />
      <Route path="/multiplayer/create-room" component={CreateRoom} />
      <Route path="/multiplayer" component={LobbyMultiplayer} />
      <Route path="/account" component={Account} />
      
    </Switch>
  );
}

export default App;
