import React from "react";
import useStore from "../hooks/store";

export default function PageHome() {
  const user = useStore((state) => state.user);

  if (user === undefined) return <h1>hello</h1>;
  return (
    <h1>
      {user.username}
    </h1>
  );
}
