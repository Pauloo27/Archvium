import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button.css";

export default function Button({
  name, type, kind, to, onClick,
}) {
  const btn = (
    <button
      type={type}
      onClick={onClick}
      className={`button button-${kind}`}
    >
      {name}
    </button>
  );

  if (to) { return (<Link to={to}>{btn}</Link>); }

  return btn;
}
