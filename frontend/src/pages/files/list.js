import React from "react";
import Button from "../../components/Button";

export default function PageFilesList() {
  return (
    <>
      <h1>Listing is not included in the free tier, please upload instead</h1>
      <Button name="Upload" kind="success" to="/files/upload" />
    </>
  );
}
