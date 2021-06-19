import React, { useRef, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import useAuth from "../../hooks/auth";
import Notification from "../../components/Notification";
import Button from "../../components/Button";
import { doAuthedRequest as doRequest } from "../../api/core";

export default function FilesNewFolder() {
  const [error, setError] = useState(undefined);
  const folderNameRef = useRef(undefined);
  const history = useHistory();
  const route = useRouteMatch();
  const { user } = useAuth();

  const path = route.url.substring(route.path.length - 1);
  const handleSubmit = (e) => {
    const folderName = folderNameRef.current.value;
    e.preventDefault();
    setError(undefined);

    if (folderName.length === 0) {
      setError("Missing folder name");
      return;
    }

    const finalPath = `${path}${path === "" ? "" : "/"}${folderName}`;
    doRequest(`/folders/${user.username}/${finalPath}`, { method: "POST" })
      .then((res) => {
        if (res.ok) {
          history.push(`/files/browse/${finalPath}`);
          return;
        }
        res.json().then((json) => setError(json.error));
      });
  };

  return (
    <>
      {error
        ? (
          <Notification
            text={error}
            kind="error"
            timeout={5000}
            onTimeout={() => setError(false)}
          />
        ) : undefined}
      <form id="container-files-upload" onSubmit={handleSubmit}>
        <h1>Create new folder</h1>
        <input
          className="input"
          ref={folderNameRef}
          type="text"
          placeholder="Folder name"
          name="folder_name"
        />
        <Button name="Create" kind="success" type="submit" />
      </form>
    </>
  );
}
