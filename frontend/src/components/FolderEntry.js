import React from "react";
import { Link } from "react-router-dom";

export default function FolderEntry({ file }) {
  const path = file.path.split("/").slice(2).join("/");
  if (file.isDir) {
    return (
      <Link to={path}>
        <p>
          &gt;
          {file.name}
        </p>
      </Link>
    );
  }
  return (
    <p>
      *
      {file.name}
    </p>
  );
}
