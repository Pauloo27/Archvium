import React, { useCallback, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Button";
import Notification from "../components/Notification";
import { doRequest } from "../api/core";
import "../styles/PageRegister.css";

export default function PageRegister() {
  const [usernameRef, emailRef, passRef, rePassRef] = [useRef(0), useRef(0), useRef(0), useRef(0)];

  const [error, setError] = useState(undefined);

  const history = useHistory();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (rePassRef.current.value !== passRef.current.value) {
      setError("Password doesn't match");
      return;
    }

    const body = JSON.stringify({
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    });

    doRequest("/auth/register", { method: "POST", body, headers: { "Content-Type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          setError(undefined);
          history.push("/login");
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
          name="email"
          type="email"
          placeholder="E-mail"
          ref={emailRef}
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          ref={passRef}
        />
        <input
          name="repeat password"
          type="password"
          placeholder="Repeat password"
          ref={rePassRef}
        />
        <span>
          Already have a account?
          {" "}
          <Link to="/login">Log in</Link>
        </span>
        <Button name="Register" kind="success" type="submit" />
      </form>
    </main>
  );
}
