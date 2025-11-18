import React, { useState } from "react";
import { FaLightbulb, FaFan } from "react-icons/fa";
import "./DeviceCard.css";

export default function DeviceCard({ id, name, icon }) {
  const [on, setOn] = useState(false);

  return (
    <div className="device-card">
      
      {/* ICON SECTION */}
      <div className={`device-icon 
          ${on && icon === "light" ? "light-on" : ""} 
          ${on && icon === "fan" ? "fan-on" : ""}`}>
        
        {icon === "light" && <FaLightbulb />}
        
        {icon === "fan" && (
          <FaFan className={on ? "fan-spin" : ""} />
        )}

      </div>


      {/* TEXT INFO */}
      <div className="device-info">
        <h3>{name}</h3>
        <p>ID: {id}</p>
      </div>

      {/* BUTTONS */}
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
