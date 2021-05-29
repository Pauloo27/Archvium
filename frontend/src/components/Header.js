import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Authed from "./Authed";
import Guest from "./Guest";
import useAuth from "../hooks/auth";
import "../styles/Header.css";

export default function Header() {
  const auth = useAuth();

  return (
    <header id="main-header">
      <Link to="/">
        <span id="app-name">Archvium</span>
      </Link>
      <Authed>
        <Button name="Logout" kind="error" onClick={auth.logout} type="button" />
      </Authed>
      <Guest>
        <Button name="Login" kind="success" to="/login" type="button" />
      </Guest>
    </header>
  );
}
