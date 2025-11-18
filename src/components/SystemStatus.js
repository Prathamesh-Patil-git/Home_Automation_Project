import React from "react";
import "./SystemStatus.css";

export default function SystemStatus({ online }) {
  return (
    <div className="status-bar">
      <span>System {online ? "Online" : "Offline"}</span>
      <span className={`status-dot ${online ? "online" : "offline"}`}></span>
    </div>
  );
}
