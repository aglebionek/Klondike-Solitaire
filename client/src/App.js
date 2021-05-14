import React from "react";
import "./App.css";
import MainMenu from "./Components/MainMenu/MainMenu";
import Login from "./Components/Login/Login";
import { Switch, Route } from "react-router-dom";
import Settings from "./Components/Settings";
import GlobalStats from "./Components/GlobalStats/Stats";
import GameView from "./Components/GameView/GameView";
import LobbyMultiplayer from "./Components/Mutiplayer/LobbyMultiplayer";
import Account from "./Components/Account/Account";
import Test from "./Components/Test";
import Game1 from "./Components/App";

function App() {
  return (
    <Switch>
      <Route path="/" component={MainMenu} exact />
      <Route path="/login" component={Login} />
      <Route path="/settings" component={Settings} />
      <Route path="/global-stats" component={GlobalStats} />
      <Route path="/game-view" component={GameView} />
      <Route path="/multiplayer" component={LobbyMultiplayer} />
      <Route path="/account" component={Account} />
      <Route path="/test" component={Test} />
      <Route path="/aa" component={Game1} />
    </Switch> 
  );
}

export default App;
