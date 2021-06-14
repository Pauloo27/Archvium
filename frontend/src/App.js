import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import { doAuthedRequest as doRequest } from "./api/core";
import Header from "./components/Header";
import Guest from "./components/Guest";
import Authed from "./components/Authed";
import Page404 from "./pages/404";
import PageLogin from "./pages/login";
import PageRegister from "./pages/register";
import PageFilesList from "./pages/files/list";
import PageFilesUpload from "./pages/files/upload";
import PageHome from "./pages/home";
import useStore from "./hooks/store";
import "./styles/theme.css";
import "./styles/App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const update = useStore((state) => state.update);
  const token = useStore((state) => state.token);

  useStore.subscribe(() => setLoaded(true), (state) => state.user);

  // load token from sessionStorage
  useEffect(() => {
    const loadedToken = sessionStorage.getItem("token");
    if (loadedToken === null) {
      update("user", null);
    }

    update("token", JSON.parse(loadedToken));
  }, [update]);

  useEffect(() => {
    if (!token) return;
    doRequest("/users/@me", {})
      .then((res) => {
        if (res.status === 200) {
          res.json().then((json) => update("user", json));
        }
      });
  }, [token]);

  if (!loaded) return "Loading...";

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <PageHome />
        </Route>
        <Route path="/files/browse" exact>
          <Authed forceRedirect>
            <PageFilesList />
          </Authed>
        </Route>
        <Route path="/files/upload" exact>
          <Authed forceRedirect>
            <PageFilesUpload />
          </Authed>
        </Route>
        <Route path="/login" exact>
          <Guest forceRedirect>
            <PageLogin />
          </Guest>
        </Route>
        <Route path="/register" exact>
          <Guest forceRedirect>
            <PageRegister />
          </Guest>
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Router>
  );
}
