import React from 'react';
import TextMessage from './TextMessage';
import VoiceMessage from './VoiceMessage';
import SystemMessage from './SystemMessage';

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => {
        switch (msg.type) {
          case 'text':
            return <TextMessage key={msg.id} message={msg} />;
          case 'voice':
            return <VoiceMessage key={msg.id} message={msg} />;
          case 'system':
            return <SystemMessage key={msg.id} message={msg} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default MessageList;