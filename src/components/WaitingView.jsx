import React from "react";

export default function WaitingView(props) {
  const { roomCode, isInitiator, webrtc, onConnected, onBack } = props;

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    card: {
      maxWidth: "28rem",
      width: "100%",
      backgroundColor: "white",
      borderRadius: "1rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      padding: "2rem",
    },
    center: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontSize: "1.875rem",
      fontWeight: "700",
      color: "#4f46e5",
      marginBottom: "1rem",
      textAlign: "center",
    },
    text: {
      fontSize: "1rem",
      color: "#6b7280",
      marginBottom: "1rem",
      textAlign: "center",
    },
    code: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      backgroundColor: "#f3f4f6",
      padding: "1rem",
      borderRadius: "0.5rem",
      marginBottom: "1.5rem",
      textAlign: "center",
      fontFamily: "monospace",
    },
    spinner: {
      width: "3rem",
      height: "3rem",
      border: "4px solid #e5e7eb",
      borderTop: "4px solid #4f46e5",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "1rem",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.75rem",
      backgroundColor: "#ef4444",
      color: "white",
      fontWeight: "600",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>
      <div style={styles.card}>
        <div style={styles.center}>
          <div style={styles.spinner}></div>
          <h1 style={styles.title}>
            {isInitiator ? "Room Created" : "Joining Room"}
          </h1>
          <p style={styles.text}>
            {isInitiator
              ? "Share this code with your peer"
              : "Waiting for peer to connect"}
          </p>
          <div style={styles.code}>{roomCode}</div>

          <p style={{ ...styles.text, fontSize: "0.875rem", color: "#9ca3af" }}>
            {webrtc.isConnected
              ? "✅ Peer connected! Redirecting..."
              : "⏳ Waiting for peer connection..."} 
          </p>

          <button style={styles.button} onClick={onBack}>
            Cancel & Go Back
          </button>
        </div>
      </div>
    </div>
  );
}