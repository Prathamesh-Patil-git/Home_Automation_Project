import React from "react";
import "./App.css";
import DeviceCard from "./components/DeviceCard";
import SystemStatus from "./components/SystemStatus";
import { FaHome } from "react-icons/fa";

function App() {
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
        <div className="header-content">
          <FaHome className="home-icon" />
          <h1 className="app-title">Home Automation</h1>
        </div>
      </header>

      {/* SYSTEM STATUS */}
      <SystemStatus online={true} />

      {/* DEVICE LIST */}
      <div className="device-list">
        {devices.map((d) => (
          <DeviceCard key={d.id} id={d.id} name={d.name} icon={d.icon} />
        ))}
      </div>

    </div>
  );
}

export default App;
