import React, { useState, useEffect } from "react";
import "./App.css";
import DeviceCard from "./components/DeviceCard";
import SystemStatus from "./components/SystemStatus";
import { FaHome } from "react-icons/fa";

function App() {
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState(null);

  // ------------------------------------------
  // 1️⃣ CONNECT TO WEBSOCKET (one-time)
  // ------------------------------------------
  useEffect(() => {
    const ws = new WebSocket("wss://home-automation-server-fl7d.onrender.com");

    ws.onopen = () => {
      console.log("WebSocket Connected");
      setOnline(true);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setOnline(false);
    };

    ws.onerror = () => {
      console.log("WebSocket Error");
      setOnline(false);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  // ------------------------------------------
  // 2️⃣ CHECK BACKEND STATUS (every 2 sec)
  // ------------------------------------------
  useEffect(() => {
    const checkStatus = () => {
      fetch("https://home-automation-server-fl7d.onrender.com/status")
        .then((res) => res.json())
        .then((data) => setOnline(data.online))
        .catch(() => setOnline(false));
    };

    checkStatus();
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------
  // DEVICE LIST
  // ------------------------------------------
  const devices = [
    { id: "light1", name: "Light 1", icon: "light" },
    { id: "fan", name: "Fan", icon: "fan" },
    { id: "light2", name: "Light 2", icon: "light" },
    { id: "light3", name: "Light 3", icon: "light" },
  ];

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <FaHome className="home-icon" />
        <h1 className="app-title">Home Automation</h1>
      </header>

      {/* SYSTEM STATUS */}
      <SystemStatus online={online} />

      {/* DEVICE CARDS */}
      <div className="device-list">
        {devices.map((d) => (
          <DeviceCard
            key={d.id}
            id={d.id}
            name={d.name}
            icon={d.icon}
            online={online}
            socket={socket}        // <- IMPORTANT
          />
        ))}
      </div>
    </div>
  );
}

export default App;
