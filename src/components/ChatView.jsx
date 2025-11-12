import React, { useState, useEffect, useRef } from "react";
import useWebRTC from "../hooks/useWebRTC";

export default function ChatView({ roomCode, onDisconnect }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const { sendMessage, registerMessageHandler, connectionStatus } = useWebRTC(roomCode);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    // register incoming message handler
    registerMessageHandler((text) => {
      setMessages(prev => [...prev, { text, sender: "peer", timestamp: new Date() }]);
    });
  }, [registerMessageHandler]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const ok = sendMessage(messageText);
    if (ok) {
      setMessages(prev => [...prev, { text: messageText, sender: "you", timestamp: new Date() }]);
      setMessageText("");
    } else {
      alert("Peer not connected yet.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Chat - Room: {roomCode}</h2>
      <p>Status: {connectionStatus}</p>

      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px", marginBottom: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "10px", textAlign: msg.sender === "you" ? "right" : "left" }}>
            <p style={{ background: msg.sender === "you" ? "#007bff" : "#e9ecef", padding: "8px 12px", borderRadius: "5px", display: "inline-block", color: msg.sender === "you" ? "white" : "black" }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={handleSendMessage} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Send
        </button>
      </div>

      <button onClick={onDisconnect} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Disconnect
      </button>
    </div>
  );
}