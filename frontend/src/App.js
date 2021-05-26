import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Page404 from "./pages/404";
import PageLogin from "./pages/login";
import PageRegister from "./pages/register";
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
          <PageLogin />
        </Route>
        <Route path="/register" exact >
          <PageRegister />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Router>
  );
}
