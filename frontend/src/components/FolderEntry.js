import React from "react";
import { Link } from "react-router-dom";
import { doAuthedRequest as doRequest } from "../api/core";
import "../styles/FolderEntry.css";

export default function FolderEntry({ file }) {
  const path = file.path.split("/").slice(2).join("/");

  const handleDownload = () => {
    doRequest(`/files/download${file.path}`).then((res) => {
      res.blob().then((b) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.target = "_blank";
        a.click();
      });
    });
  };

  const asFile = () => (
    <>
      {// <Link to="/files/info/" className="folder-entry-link">//
      }
      <span className="material-icons-outlined folder-entry-icon">
        description
      </span>
      {file.name}
      {// </Link>
      }
      <button
        onClick={handleDownload}
        className="material-icons-outlined folder-entry-icon folder-entry-download"
      >
        file_download
      </button>
    </>
  );

  const asDir = () => (
    <Link to={path} className="folder-entry-link">
      <span className="material-icons-outlined folder-entry-icon">
        folder
      </span>
      {file.name}
    </Link>
  );

  return (
    <div className="folder-entry-container">
      {file.isDir ? asDir() : asFile() }
    </div>
  );
}
