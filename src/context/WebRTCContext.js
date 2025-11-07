import React, { createContext, useContext, useState, useRef } from 'react';

const WebRTCContext = createContext();

export const WebRTCProvider = ({ children }) => {
    const [roomCode, setRoomCode] = useState('');
    const [messages, setMessages] = useState([]);
    const peerConnection = useRef(null);
    const dataChannel = useRef(null);

    // Add any additional state and functions related to WebRTC here

    return (
        <WebRTCContext.Provider value={{ roomCode, setRoomCode, messages, setMessages, peerConnection, dataChannel }}>
            {children}
        </WebRTCContext.Provider>
    );
};

export const useWebRTC = () => {
    return useContext(WebRTCContext);
};