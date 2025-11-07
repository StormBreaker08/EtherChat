import React, { useEffect } from 'react';
import { useWebRTC } from '../hooks/useWebRTC';
import MessageInput from './MessageInput';
import VoiceSettings from './VoiceSettings';
import MessageList from './Messages/MessageList';

const ChatView = () => {
  const { messages, isConnected, peerTyping, sendMessage, showVoiceSettings, setShowVoiceSettings } = useWebRTC();

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages arrive
    const messagesEnd = document.getElementById('messagesEnd');
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <div>
            <h2 className="font-semibold text-gray-800">Anonymous User</h2>
            <p className="text-xs text-gray-500">
              {isConnected ? 'Connected via WebRTC' : 'Connecting...'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            🔒 Encrypted
          </div>
          <button 
            onClick={() => {/* Leave room logic */}}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
          >
            Leave Room
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <MessageList messages={messages} />
        {peerTyping && <div className="typing-indicator">...</div>}
        <div id="messagesEnd" />
      </div>

      {showVoiceSettings && <VoiceSettings />}

      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <MessageInput sendMessage={sendMessage} setShowVoiceSettings={setShowVoiceSettings} />
      </div>
    </div>
  );
};

export default ChatView;