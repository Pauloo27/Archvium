import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { doAuthedRequest as doRequest } from "../../api/core";
import useAuth from "../../hooks/auth";
import Page404 from "../404";
import FolderEntry from "../../components/FolderEntry";

export default function PageFilesList() {
  const route = useRouteMatch();
  // route.path looks like /files/browse/*, -2 removes both / and *
  const path = route.url.substring(route.path.length - 1);

  const [files, setFiles] = useState(undefined);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    doRequest(`/folders/index/${user.username}/${path}`, {})
      .then((res) => {
        if (res.status === 404 || res.status === 400) { return setFiles(null); }
        if (res.status === 200) res.json().then(setFiles);
      });
  }, [user, path, setFiles]);

  if (files === undefined) return "loading...";
  if (files === null) return <Page404 />;

  return (
    <>
      <h1>
        Files at
        {" "}
        /
        {path}
      </h1>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <FolderEntry file={file} />
          </li>
        ))}
      </ul>
    </>
  );
}
