import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import "./styles/theme.css";
import "./styles/App.css";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <h1>home</h1>
        </Route>
        <Route path="/login" exact >
          <h1>login</h1>
        </Route>
        <Route path="/register" exact >
          <h1>register</h1>
        </Route>
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
}
