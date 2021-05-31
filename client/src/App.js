import React, { useEffect, useState } from "react";
import "./App.css";
import MainMenu from "./Components/MainMenu/MainMenu";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Switch, Route, Redirect } from "react-router-dom";
import Settings from "./Components/Settings";
import GlobalStats from "./Components/GlobalStats/Stats";
import GameView from "./Components/GameView/GameView";
import LobbyMultiplayer from "./Components/Mutiplayer/LobbyMultiplayer";
import CreateRoom from "./Components/Mutiplayer/CreateRoom/CreateRoom";
import JoinRoom from "./Components/Mutiplayer/JoinRoom/JoinRoom";
import Account from "./Components/Account/Account";
import Authors from "./Components/Authors/Authors";
import AppInfo from "./Components/AppInfo/AppInfo";
import Spinner from "./Components/Spinner/Spinner";
import agent from './agent/agent.js';

function App() {  
  window.soundManager.setup({debugMode: false});

  const [eff, setEffect] = useState(100);
  const [vol, setVolume] = useState(100);
  const userId = 10;
  
  useEffect(() => {
      agent.get(`settings/${userId}`).then(({ data }) => {
        const { volume, effect } = data;
        setEffect(effect);
        setVolume(volume);
      });
    }, []);


  
  return (
    <Switch>
      <Route exact path="/" component={() => <MainMenu effect={eff}  /> } />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/register" component={Register} />
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/global-stats" component={() => <GlobalStats effect={eff}/> } />
      <Route path="/game-view" component={() => <GameView effect={eff} volume={vol}  /> } />
      <PrivateRoute path="/multiplayer" component={LobbyMultiplayer} />
      <PrivateRoute path="/account" component={() => <Account effect={eff}/> } />
      <PrivateRoute path="/game-lobby" component={JoinRoom} />
      <PrivateRoute path="/create-room" component={CreateRoom} />
      <Route path="/app-info" component={AppInfo} />
      <Route path="/authors" component={Authors} />
    </Switch>
  );
}


function PrivateRoute({ component: Component, ...rest }) {
  const [isAuth, setAuth] = useState(true);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
      agent.get("auth/verify")
      .then(() => {
        setLoading(false);
        setAuth(true);
      })
      .catch(() => {
        setLoading(false);
        setAuth(false);
      });
  }, []);
  if (isLoading) return (
    <Spinner></Spinner>
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function AuthRoute({ component: Component, ...rest }) {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
      agent.get("auth/verify")
      .then(() => {
        setLoading(false);
        setAuth(true);
      })
      .catch(() => {
        setLoading(false);
        setAuth(false);
      });
  }, []);
  if (isLoading) return (
    <Spinner></Spinner>
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default App;