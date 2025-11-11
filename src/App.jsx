import React, { useState } from "react";
import HomeView from "./components/HomeView";
import WaitingView from "./components/WaitingView";
import ChatView from "./components/ChatView";
import useWebRTC from "./hooks/useWebRTC";

export default function App() {
  const [view, setView] = useState("home"); // "home" | "waiting" | "chat"
  const [roomCode, setRoomCode] = useState("");
  const [isInitiator, setIsInitiator] = useState(false);
  const webrtc = useWebRTC();

  const handleCreateRoom = async () => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    setRoomCode(code);
    setIsInitiator(true);
    setView("waiting");
    // Create offer as initiator
    const sdp = await webrtc.createOffer();
    console.log("Offer created:", sdp);
  };

  const handleJoinRoom = async (code) => {
    if (!code.trim()) {
      alert("Please enter a room code");
      return;
    }
    setRoomCode(code);
    setIsInitiator(false);
    setView("waiting");
  };

  const handleConnected = () => {
    setView("chat");
  };

  const handleBackToHome = () => {
    setView("home");
    setRoomCode("");
  };

  return (
    <div>
      {view === "home" && (
        <HomeView
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
        />
      )}
      {view === "waiting" && (
        <WaitingView
          roomCode={roomCode}
          isInitiator={isInitiator}
          webrtc={webrtc}
          onConnected={handleConnected}
          onBack={handleBackToHome}
        />
      )}
      {view === "chat" && (
        <ChatView
          webrtc={webrtc}
          roomCode={roomCode}
          onDisconnect={handleBackToHome}
        />
      )}
    </div>
  );
}