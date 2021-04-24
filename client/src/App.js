import React from "react";
import "./App.css";
import MainMenu from "./Components/MainMenu/MainMenu";
import Login from "./Components/Login/Login";
import { Switch, Route } from 'react-router-dom';
import Settings from "./Components/Settings";
import GlobalStats from "./Components/GlobalStats/Stats";

function App() {

  return (
    <Switch>
      <Route path="/" component={MainMenu} exact />
      <Route path="/login" component={Login} />
      <Route path="/settings" component={Settings} />
      <Route path="/global-stats" component={GlobalStats} />
    </Switch>
  );
}

export default App;
