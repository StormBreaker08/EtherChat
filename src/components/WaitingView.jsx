import React, { useState, useEffect } from "react";
import useWebRTC from "../hooks/useWebRTC";

export default function WaitingView({ roomCode, isInitiator, onConnected, onBack }) {
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const { connectionStatus: status, peerConnectionRef } = useWebRTC(roomCode);

  useEffect(() => {
    setConnectionStatus(status);
    // only proceed to chat when peer SDP exchange is done or data channel is open
    if (connectionStatus === "peer-connected" || connectionStatus === "data-channel-open") {
      setTimeout(() => onConnected(), 250);
    }
  }, [status, onConnected]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Waiting for peer...</h2>
      <p>Room Code: <strong>{roomCode}</strong></p>
      <p>Status: <strong>{connectionStatus}</strong></p>
      <button onClick={onBack} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Back to Home
      </button>
    </div>
  );
}