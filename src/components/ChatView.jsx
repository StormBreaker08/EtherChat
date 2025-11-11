import React from "react";
import MessageList from "./Messages/MessageList";
import MessageInput from "./MessageInput";

export default function ChatView(props) {
  const { webrtc, roomCode, onDisconnect } = props;

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      backgroundColor: "white",
      borderBottom: "1px solid #e5e7eb",
      padding: "1rem",
      textAlign: "center",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#4f46e5",
      margin: 0,
    },
    subtitle: {
      fontSize: "0.875rem",
      color: "#6b7280",
      margin: "0.25rem 0 0 0",
    },
    messagesArea: {
      flex: 1,
      overflowY: "auto",
      padding: "1rem",
    },
    inputArea: {
      padding: "1rem",
      backgroundColor: "white",
      borderTop: "1px solid #e5e7eb",
    },
    button: {
      padding: "0.5rem 1rem",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.875rem",
      marginTop: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>EtherChat - {roomCode}</h1>
        <p style={styles.subtitle}>
          {webrtc.isConnected ? "✅ Connected" : "❌ Disconnected"}
        </p>
        <button style={styles.button} onClick={onDisconnect}>
          Leave Chat
        </button>
      </div>
      <div style={styles.messagesArea}>
        <MessageList messages={webrtc.messages} />
      </div>
      <div style={styles.inputArea}>
        <MessageInput
          sendMessage={webrtc.sendMessage}
          sendTyping={webrtc.sendTyping}
          sendVoiceMessage={webrtc.sendVoiceMessage}
        />
      </div>
    </div>
  );
}