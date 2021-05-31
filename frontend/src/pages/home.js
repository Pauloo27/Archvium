import React from "react";
import useAuth from "../hooks/auth";
import useStore from "../hooks/store";

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
    <h1>
      I see you are
      {" "}
      {user.username}
      {" "}
      nice
    </h1>
  );
}
