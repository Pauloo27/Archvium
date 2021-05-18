import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button.css";

export default function Button({name, type, to}) {
  const btn = (
    <button 
      className={`button button-${type}`}
    >
      {name}
    </button>
  );

  if (to) 
    return (<Link to={to} >{btn}</Link>);

  return btn;
}
