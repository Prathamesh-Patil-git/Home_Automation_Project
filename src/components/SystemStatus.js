import "./SystemStatus.css";

export default function SystemStatus({ online }) {
  return (
    <div className="status-box">
      <span>{online ? "System Online" : "System Offline"}</span>
      <span
        className="status-dot"
        style={{ background: online ? "green" : "red" }}
      ></span>
    </div>
  );
}
