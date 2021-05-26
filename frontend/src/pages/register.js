import React, { useCallback, useRef } from "react";
import Button from "../components/Button";
import "../styles/PageRegister.css";

export default function PageRegister() {
  const [usernameRef, emailRef, passwordRef] = [useRef(0), useRef(0), useRef(0)];


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);
  });

  return (
    <main onSubmit={handleSubmit} id="container-register">
      <h1>Fill the form</h1>
      <form id="register-form">
        <input 
          name="username" type="text" placeholder="Username" ref={usernameRef} 
          autoComplete="off"
        />
        <input 
          name="email" type="email" placeholder="E-mail" ref={emailRef} 
          autoComplete="off"
        />
        <input
          name="password" type="password" placeholder="Password" ref={passwordRef} 
        />
        <Button name="Register" kind="success" type="submit" />
      </form>
    </main>
  );
}
