import React, { useCallback, useRef, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Notification from "../../components/Notification";
import { doAuthedRequest as doRequest } from "../../api/core";
import Button from "../../components/Button";
import "../../styles/PageFilesUpload.css";

export default function PageFilesUpload() {
  const fileRef = useRef(undefined);
  const [error, setError] = useState(false);
  const history = useHistory();
  const route = useRouteMatch();

  const path = route.url.substring(route.path.length - 1);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData();
    setError(undefined);

    if (fileRef.current.files.length === 0) {
      setError("Missing file");
      return;
    }

    // TODO: more than one file
    const file = fileRef.current.files[0];
    const targetFolder = path === "" ? [] : path.split("/");
    formData.append("file", file);
    formData.append("file_name", file.name.replaceAll(" ", "_"));
    formData.append("target_folder", JSON.stringify(targetFolder));

    doRequest("/files/", { method: "POST", body: formData })
      .then((res) => {
        if (res.ok) {
          history.push(`/files/browse/${path}`);
          return;
        }
        res.json().then((json) => setError(json.error));
      });
  });

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
        <h1>Upload a file</h1>
        <input
          className="input"
          ref={fileRef}
          type="file"
          placeholder="File to upload"
          name="file"
        />
        <Button name="Upload" kind="success" type="submit" />
      </form>
    </>
  );
}
