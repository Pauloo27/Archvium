import React, { useCallback, useRef, useState } from "react";
import Notification from "../../components/Notification";
import { doAuthedRequest as doRequest } from "../../api/core";
import Button from "../../components/Button";
import "../../styles/PageFilesUpload.css";

export default function PageFilesUpload() {
  const fileRef = useRef(undefined);
  const [missingFile, setMissingFile] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData();

    if (fileRef.current.files.length === 0) {
      setMissingFile(true);
      return;
    }

    // TODO: all selected files
    formData.append("file", fileRef.current.files[0]);

    doRequest("/files/", { method: "POST", body: formData });
  });

  return (
    <>
      { missingFile
        ? (
          <Notification
            text="Missing file"
            kind="error"
            timeout={5000}
            onTimeout={() => setMissingFile(false)}
          />
        ) : undefined}
      <form id="container-files-upload" onSubmit={handleSubmit}>
        <h1>Upload a file</h1>
        <input ref={fileRef} type="file" placeholder="File to upload" name="file" />
        <Button name="Upload" kind="success" type="submit" />
      </form>
    </>
  );
}
