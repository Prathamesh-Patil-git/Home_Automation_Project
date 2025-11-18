import React, { useState, useEffect } from "react";
import { FaLightbulb, FaFan } from "react-icons/fa";
import "./DeviceCard.css";

export default function DeviceCard({ id, name, icon, online, socket }) {
  const [on, setOn] = useState(false);

  // Receive real-time updates from WebSocket
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);

        // When backend broadcasts update
        if (data.type === "update" && data.device === id) {
          setOn(data.state === "on");
        }

        // When backend sends initial state
        if (data.type === "init" && data.devices[id]) {
          setOn(data.devices[id] === "on");
        }

      } catch (error) {
        console.log("Invalid WS message:", error);
      }
    };
  }, [socket, id]);

  // Send ON/OFF command via WebSocket
  const handleToggle = (state) => {
    if (!online) return;

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "set",
          device: id,
          state: state,
        })
      );
    }

    setOn(state === "on"); // instant UI update
  };

  return (
    <div className="device-card">
      {/* ICON */}
      <div
        className={`device-icon ${on ? "on" : ""} ${
          icon === "fan" && on ? "fan-on" : ""
        }`}
      >
        {icon === "light" && <FaLightbulb />}
        {icon === "fan" && <FaFan className={on ? "spin" : ""} />}
      </div>

      {/* INFO */}
      <div className="device-info">
        <h3>{name}</h3>
      </div>


      {/* BUTTONS */}
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
