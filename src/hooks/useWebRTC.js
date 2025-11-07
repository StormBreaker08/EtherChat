// src/hooks/useWebRTC.js

import { useEffect, useRef, useState } from 'react';
import { initWebRTC, setupDataChannel } from '../utils/webrtc';

const useWebRTC = (isInitiator) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const peerConnection = useRef(null);
  const dataChannel = useRef(null);

  useEffect(() => {
    const setupConnection = async () => {
      peerConnection.current = await initWebRTC(isInitiator);
      setupDataChannel(dataChannel.current, setMessages, setIsConnected);
    };

    setupConnection();

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [isInitiator]);

  return { isConnected, messages, setMessages };
};

export { useWebRTC };