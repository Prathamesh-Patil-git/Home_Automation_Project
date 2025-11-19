import React, { useState } from "react";
import { FaLightbulb, FaFan } from "react-icons/fa";
import "./DeviceCard.css";

const API = "https://home-automation-server-fl7d.onrender.com";

export default function DeviceCard({ id, name, icon, online }) {
  const [on, setOn] = useState(false);

  const handleToggle = async (state) => {
    if (!online) return;

    try {
      await fetch(`${API}/${id}/${state}`); // <-- FIXED (GET request)
      setOn(state === "on");
    } catch (err) {
      console.log("Error sending command:", err);
    }
  };

  return (
    <div className="device-card">
      <div
        className={`device-icon ${on ? "on" : ""} ${
          icon === "fan" && on ? "fan-on" : ""
        }`}
      >
        {icon === "light" && <FaLightbulb />}
        {icon === "fan" && <FaFan className={on ? "spin" : ""} />}
      </div>

      <div className="device-info">
        <h3>{name}</h3>
      </div>

      <div className="controls">
        <button
          className={`btn on-btn ${on ? "active" : ""}`}
          onClick={() => handleToggle("on")}
        >
          ON
        </button>

        <button
          className={`btn off-btn ${!on ? "active" : ""}`}
          onClick={() => handleToggle("off")}
        >
          OFF
        </button>
      </div>
    </div>
  );
}
