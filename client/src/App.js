import React, { useEffect, useState } from "react";
import axios from "axios";
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

function App() {
  return (
    <Switch>
      <Route path="/" component={MainMenu} exact />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/register" component={Register} />
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/global-stats" component={GlobalStats} />
      <Route path="/game-view" component={GameView} />
      <PrivateRoute path="/multiplayer" component={LobbyMultiplayer} />
      <PrivateRoute path="/account" component={Account} />
      <PrivateRoute path="/multiplayer/game-lobby" component={JoinRoom} />
      <PrivateRoute path="/multiplayer/create-room" component={CreateRoom} />
    </Switch>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const [isAuth, setAuth] = useState(true);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/verify")
      .then(() => {
        setLoading(false);
        setAuth(true);
      })
      .catch(() => {
        setLoading(false);
        setAuth(false);
      });
  }, []);
  if (isLoading) return <div>loading...</div>;
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
    axios
      .get("http://localhost:3000/auth/verify")
      .then(() => {
        setLoading(false);
        setAuth(true);
      })
      .catch(() => {
        setLoading(false);
        setAuth(false);
      });
  }, []);
  if (isLoading) return <div>loading...</div>;
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