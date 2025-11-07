import React, { useState } from 'react';

const MessageInput = ({ sendMessage, isRecording, startRecording, stopRecording, messageInput, setMessageInput }) => {
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="flex gap-3 items-end">
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className={`p-3 rounded-full transition shadow-md flex items-center justify-center ${
            isRecording ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          title="Hold to record voice message"
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition shadow-md flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;