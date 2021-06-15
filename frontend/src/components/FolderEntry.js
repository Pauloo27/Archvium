import React from "react";
import { Link } from "react-router-dom";
import "../styles/FolderEntry.css";

export default function FolderEntry({ file }) {
  const path = file.path.split("/").slice(2).join("/");
  if (file.isDir) {
    return (
      <Link to={path} className="folder-entry-link">
        <p className="folder-entry">
          <span className="material-icons-outlined folder-entry-icon">
            folder
          </span>
          {file.name}
        </p>
      </Link>
    );
  }
  return (
    <p className="folder-entry">
      <span className="material-icons-outlined folder-entry-icon">
        description
      </span>
      {file.name}
    </p>
  );
}
