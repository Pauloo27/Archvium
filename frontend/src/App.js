import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <h1>nav</h1>
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
