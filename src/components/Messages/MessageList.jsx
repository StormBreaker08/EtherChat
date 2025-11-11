import React from "react";
import TextMessage from "./TextMessage";
import VoiceMessage from "./VoiceMessage";
import SystemMessage from "./SystemMessage";

export default function MessageList({ messages = [] }) {
  return (
    <div className="message-list">
      {messages.map((msg) => {
        if (!msg || !msg.type) return null;
        if (msg.type === "text") {
          return <TextMessage key={msg.id || msg.timestamp} message={msg} />;
        }
        if (msg.type === "voice") {
          return <VoiceMessage key={msg.id || msg.timestamp} message={msg} />;
        }
        // default / system
        return <SystemMessage key={msg.id || msg.timestamp} message={msg} />;
      })}
    </div>
  );
}