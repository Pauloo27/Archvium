import React from "react";
import useAuth from "../hooks/auth";
import useStore from "../hooks/store";
import Button from "../components/Button";

export default function PageHome() {
  const user = useStore((state) => state.user);
  const { isGuest } = useAuth();

  if (isGuest) {
    return (
      <>
        <h1>hello</h1>
        <h3>
          If you want to see more just login, the admin password is your name
          and birthday, all caps.
        </h3>
      </>
    );
  }
  return (
    <>
      <h1>
        Hello
        {" "}
        {user.username}
      </h1>
      <Button to="/files/browse/" kind="success" name="See your files" />
    </>
  );
}
