import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "../styles/Header.css";

export default function Header() {
  return (
    <header id="main-header">
      <Link to={"/"}>
        <span id="app-name">Archvium</span>
      </Link>
      <Button name="Login" type="success" to="/login" />
    </header>
  );
}
