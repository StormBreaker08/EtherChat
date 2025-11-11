import React from "react";

export default function TextMessage({ message }) {
  if (!message) return null;
  const { text, from, timestamp } = message;
  return (
    <div className={`message text-message ${from === "me" ? "me" : "peer"}`}>
      <div className="message-body">{text}</div>
      <div className="message-meta">{new Date(timestamp).toLocaleTimeString()}</div>
    </div>
  );
}