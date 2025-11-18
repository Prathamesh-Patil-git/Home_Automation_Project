import React, { useState } from "react";
import { FaLightbulb, FaFan } from "react-icons/fa";
import "./DeviceCard.css";

export default function DeviceCard({ id, name, icon }) {
  const [on, setOn] = useState(false);

  return (
    <div className="device-card">
      {/* Icon Section */}
      <div className="device-icon">
        {icon === "light" && (
          <FaLightbulb className={on ? "light-on" : ""} />
        )}

        {icon === "fan" && (
          <FaFan className={on ? "spin fan-on" : ""} />
        )}
      </div>

      {/* Device Text */}
      <div className="device-info">
        <h3>{name}</h3>
        <p>ID: {id}</p>
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          className={`btn on-btn ${on ? "active" : ""}`}
          onClick={() => setOn(true)}
        >
          ON
        </button>

        <button
          className={`btn off-btn ${!on ? "active" : ""}`}
          onClick={() => setOn(false)}
        >
          OFF
        </button>
      </div>
    </div>
  );
}
