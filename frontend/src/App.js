import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { doAuthedRequest as doRequest } from "./api/core";
import Header from "./components/Header";
import Page404 from "./pages/404";
import PageLogin from "./pages/login";
import PageRegister from "./pages/register";
import PageHome from "./pages/home";
import useStore from "./hooks/store";
import "./styles/theme.css";
import "./styles/App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const update = useStore((state) => state.update);
  const token = useStore((state) => state.token);

  // load token from sessionStorage
  useEffect(() => {
    const loadedToken = sessionStorage.getItem("token");

    if (loadedToken === null) {
      setLoaded(true);
      return;
    }

    update("token", JSON.parse(loadedToken));
  }, [update]);

  useEffect(() => {
    if (token === undefined) return;
    doRequest("/users/@me", {})
      .then((res) => {
        if (res.status === 200) {
          res.json().then((json) => {
            update("user", json);
            setLoaded(true);
          });
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
        <Route path="/login" exact>
          <PageLogin />
        </Route>
        <Route path="/register" exact>
          <PageRegister />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Router>
  );
}
