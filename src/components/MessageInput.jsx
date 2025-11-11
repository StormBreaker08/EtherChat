import React, { useState, useEffect } from "react";
import useAudioRecorder from "../hooks/useAudioRecorder";

export default function MessageInput(props) {
  const sendMessage = props.sendMessage || props.onSend || (() => {});
  const sendTyping = props.sendTyping || props.onTyping || (() => {});
  const [text, setText] = useState("");
  const { isRecording, audioURL, startRecording, stopRecording, resetRecording, getAudioBlob } = useAudioRecorder();

  useEffect(() => {
    if (text && sendTyping) {
      sendTyping(true);
      const t = setTimeout(() => sendTyping(false), 800);
      return () => clearTimeout(t);
    }
  }, [text, sendTyping]);

  function handleSubmit(e) {
    e?.preventDefault();
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText("");
  }

  function toggleRecording() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  function sendVoiceMessage() {
    const blob = getAudioBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    if (props.sendVoiceMessage) {
      props.sendVoiceMessage(url, blob);
    }
    resetRecording();
  }

  return (
    <form className="flex gap-2 p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isRecording}
      />

      {audioURL && (
        <div className="flex items-center gap-2">
          <audio controls src={audioURL} className="h-8" />
          <button
            type="button"
            onClick={() => resetRecording()}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={sendVoiceMessage}
            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Send Voice
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={toggleRecording}
        className={`px-3 py-2 rounded-lg text-white ${
          isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
        aria-label={isRecording ? "stop recording" : "start recording"}
      >
        {isRecording ? "🎤 Stop" : "🎤"}
      </button>

      <button
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        aria-label="send"
      >
        ➤ Send
      </button>
    </form>
  );
}