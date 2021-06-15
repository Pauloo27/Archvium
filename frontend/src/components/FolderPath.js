import React from "react";
import { Link } from "react-router-dom";

export default function FolderPath({ path }) {
  const folders = path.split("/");

  const separator = (
    <span className="material-icons-outlined">
      arrow_forward_ios
    </span>
  );

  const renderFolder = (folder, i) => (
    <Link
      to={`/files/browse/${folders.slice(0, i + 1).join("/")}`}
      key={folder}
    >
      {folder}
    </Link>
  );

  return (
    <h1>
      <Link to="/files/browse/" className="material-icons-outlined no-decoration margin-main">
        home
      </Link>
      {folders.map(renderFolder).reduce((prev, curr) => [prev, separator, curr])}
    </h1>
  );
}
