import React, { useCallback, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Button";
import Notification from "../components/Notification";
import { doRequest } from "../api/core";
import "../styles/PageRegister.css";

export default function PageLogin() {
  const [usernameRef, passRef] = [useRef(0), useRef(0)];

  const [error, setError] = useState(undefined);

  const history = useHistory();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const body = JSON.stringify({
      username: usernameRef.current.value,
      password: passRef.current.value,
    });

    doRequest("/auth/login", { method: "POST", body, headers: { "Content-Type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          setError(undefined);
          history.push("/");
          res.json().then((json) => {
            sessionStorage.setItem("token", JSON.stringify(json));
          });
          return;
        }
        res.json().then((json) => setError(json.error ?? json.errors
          .map((err) => `${err.field}: ${err.error}`).join(" | ")));
      });
  }, [setError]);

  return (
    <main onSubmit={handleSubmit} id="container-register">
      {
        error ? (
          <Notification
            kind="error"
            text={error}
            timeout={5000}
            onTimeout={() => setError(undefined)}
          />
        ) : null
      }
      <h1>Fill the form</h1>
      <form id="register-form">
        <input
          name="username"
          type="text"
          placeholder="Username"
          ref={usernameRef}
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          ref={passRef}
        />
        <span>
          Don&quot;t have a account yet?
          {" "}
          <Link to="/register">Create a new account</Link>
        </span>
        <Button name="Login" kind="success" type="submit" />
      </form>
    </main>
  );
}
