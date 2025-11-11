import React from "react";

export default function SystemMessage({ message }) {
  if (!message) return null;
  const { text, timestamp } = message;
  return (
    <div className="message system-message">
      <div className="message-body">{text}</div>
      <div className="message-meta">{new Date(timestamp).toLocaleTimeString()}</div>
    </div>
  );
}