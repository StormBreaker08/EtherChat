export const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const parts = [];
    for (let i = 0; i < 3; i++) {
        let part = '';
        for (let j = 0; j < 4; j++) {
            part += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        parts.push(part);
    }
    return parts.join('-');
};

export const initWebRTC = async (isInitiator, onIceCandidate, onConnectionStateChange) => {
    const config = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
        ]
    };

    const peerConnection = new RTCPeerConnection(config);

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            onIceCandidate(event.candidate);
        }
    };

    peerConnection.onconnectionstatechange = () => {
        onConnectionStateChange(peerConnection.connectionState);
    };

    if (isInitiator) {
        // Additional setup for initiator
    }

    return peerConnection;
};

export const setupDataChannel = (peerConnection, onMessage, onOpen, onClose) => {
    const dataChannel = peerConnection.createDataChannel('chat');

    dataChannel.onopen = () => {
        onOpen();
    };

    dataChannel.onmessage = (event) => {
        onMessage(event.data);
    };

    dataChannel.onclose = () => {
        onClose();
    };

    return dataChannel;
};