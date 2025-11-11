import React from "react";

export default function HomeView(props) {
  const onCreateRoom = props.onCreateRoom || (() => {});
  const onJoinRoom = props.onJoinRoom || (() => {});
  const [roomCode, setRoomCode] = React.useState("");

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
    icon: {
      width: "5rem",
      height: "5rem",
      background: "linear-gradient(135deg, #60a5fa 0%, #4f46e5 100%)",
      borderRadius: "0.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.875rem",
      marginBottom: "1.5rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "2.25rem",
      fontWeight: "700",
      color: "#4f46e5",
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#6b7280",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    buttonPrimary: {
      width: "100%",
      padding: "1rem",
      borderRadius: "0.75rem",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      fontWeight: "600",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      transition: "opacity 0.2s",
    },
    buttonSecondary: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.75rem",
      backgroundColor: "#f3f4f6",
      color: "#374151",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.2s",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "2px solid #f3f4f6",
      borderRadius: "0.75rem",
      fontSize: "1rem",
      boxSizing: "border-box",
      transition: "all 0.2s",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      margin: "0.5rem 0",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#e5e7eb",
    },
    dividerText: {
      fontSize: "0.875rem",
      color: "#9ca3af",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
      marginTop: "2rem",
    },
    featureCard: {
      padding: "1rem",
      borderRadius: "0.75rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    featureIcon: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
    featureText: {
      fontWeight: "500",
      fontSize: "0.875rem",
      color: "#374151",
    },
  };

  const featureCards = [
    { icon: "🔒", label: "End-to-End Encrypted", color: "#dbeafe" },
    { icon: "⚡", label: "Peer-to-Peer Direct", color: "#e0e7ff" },
    { icon: "👥", label: "100% Anonymous", color: "#fce7f3" },
    { icon: "🔐", label: "No Data Stored", color: "#fee2e2" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.center}>
          <div style={styles.icon}>💬</div>
          <h1 style={styles.title}>EtherChat</h1>
          <p style={styles.subtitle}>
            Private peer-to-peer messaging. No servers. No tracking.
          </p>

          <div style={{ width: "100%", space: "1rem" }}>
            <button
              onClick={onCreateRoom}
              style={styles.buttonPrimary}
              onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Create New Room
            </button>

            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <div style={styles.dividerText}>or</div>
              <div style={styles.dividerLine}></div>
            </div>

            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="Enter room code (e.g., ABC)"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
              onBlur={(e) => (e.target.style.borderColor = "#f3f4f6")}
            />

            <button
              onClick={() => onJoinRoom(roomCode)}
              style={{ ...styles.buttonSecondary, marginTop: "0.75rem" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
            >
              Join Room
            </button>
          </div>

          <div style={styles.grid}>
            {featureCards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.featureCard,
                  backgroundColor: card.color,
                }}
              >
                <div style={styles.featureIcon}>{card.icon}</div>
                <div style={styles.featureText}>{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}