import React, { useEffect } from "react";
import "../styles/Notification.css";

export default function Notification({
  text, kind, timeout, onTimeout,
}) {
  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, []);

  return (
    <div className={`container-notification container-notification-${kind}`}>
      {text}
    </div>
  );
}
