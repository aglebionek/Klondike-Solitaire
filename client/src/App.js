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
  const [eff, setEffect] = useState(JSON.parse(localStorage.getItem('guestEffect')) ?? 20);
  const [, setVolume] = useState(JSON.parse(localStorage.getItem('guestMusic')) ?? 20);
  const [, setCardSet] = useState(2); 
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    if(userId !== 0){
      agent.get(`settings/${userId}`).then(({ data }) => {
        const { cardset_id, volume, effect } = data;
        setCardSet(cardset_id);
        setEffect(effect);
        setVolume(volume);
      });
    }
      agent.get("auth/verify")
      .then(() => {
        localStorage.setItem('isLogged', true);
      })
      .catch(() => {
        localStorage.setItem('isLogged', false);
        localStorage.setItem('userId', 0);
      });
    }, [userId], );
  
 
  
  return (
    <Switch>
      <Route exact path="/" component={() => <MainMenu effect={eff}  /> } />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/register" component={Register} />
      <Route path="/settings" component={() => <Settings ID={userId}  /> } />
      <PrivateRoute path="/global-stats" component={() => <GlobalStats effect={eff}/> } />
      <Route path="/game-view" component={() => <GameViewRoute /> } />
      <PrivateRoute path="/multiplayer" component={() => <LobbyMultiplayer userId={userId} /> } />
      <PrivateRoute path="/account" component={() => <Account effect={eff} userId={userId}/> } />
      <PrivateRoute path="/game-lobby" component={JoinRoom} />
      <PrivateRoute path="/create-room" component={() => <CreateRoom userId={userId} /> } />
      <Route path="/app-info" component={AppInfo} />
      <Route path="/authors" component={Authors} />
    </Switch>
  );
}

function GameViewRoute({ component: Component, ...rest }) {
  const [isLoading, setLoading] = useState(true);
  const [eff, setEffect] = useState(JSON.parse(localStorage.getItem('guestEffect')) ?? 20);
  const [vol, setVolume] = useState(JSON.parse(localStorage.getItem('guestMusic')) ?? 20);
  const [cardset, setCardSet] = useState(2); 
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('userId')) ?? 0);
  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    if(userId !== 0){
      agent.get(`settings/${userId}`).then(({ data }) => {
        const { cardset_id, volume, effect } = data;
        setCardSet(cardset_id);
        setEffect(effect);
        setVolume(volume);
      });
    }
      agent.get("auth/verify")
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [userId], );
  if (isLoading) return (
    <Spinner></Spinner>
  );
  return (
    <Route
      {...rest}
      render={(props) =>       
        <GameView effect={eff} volume={vol}  cardset_id={cardset}/> 
      }
          />
        );
  };


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