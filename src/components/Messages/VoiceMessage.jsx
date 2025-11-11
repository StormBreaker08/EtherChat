import React from "react";

export default function VoiceMessage({ message }) {
  if (!message) return null;
  const { url, from, timestamp, text } = message;
  return (
    <div className={`message voice-message ${from === "me" ? "me" : "peer"}`}>
      {url ? (
        <audio controls src={url} />
      ) : (
        <div className="message-body">{text || "Voice message"}</div>
      )}
      <div className="message-meta">{new Date(timestamp).toLocaleTimeString()}</div>
    </div>
  );
}