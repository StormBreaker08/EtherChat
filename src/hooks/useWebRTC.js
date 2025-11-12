import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SIGNALING_SERVER = process.env.REACT_APP_SIGNALING_SERVER || 'http://localhost:5000';

export default function useWebRTC(roomCode) {
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const remoteUserIdRef = useRef(null);
  const messageHandlerRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useEffect(() => {
    if (!roomCode) return;

    console.log('Connecting to signaling server:', SIGNALING_SERVER);
    socketRef.current = io(SIGNALING_SERVER);

    socketRef.current.on('connect', () => {
      console.log('Connected to signaling server, joining room:', roomCode);
      // only signaling server connected (not peer)
      setConnectionStatus('signaling-connected');
      socketRef.current.emit('join-room', roomCode);
    });

    socketRef.current.on('user-joined', async (data) => {
      console.log('User joined:', data.userId);
      remoteUserIdRef.current = data.userId;
      setConnectionStatus('peer-found');
      await createOffer(data.userId);
    });

    socketRef.current.on('offer', async (data) => {
      console.log('Received offer from:', data.from);
      remoteUserIdRef.current = data.from;
      await handleOffer(data.from, data.offer);
    });

    socketRef.current.on('answer', async (data) => {
      console.log('Received answer from:', data.from);
      await handleAnswer(data.answer);
    });

    socketRef.current.on('ice-candidate', async (data) => {
      try {
        await peerConnectionRef.current?.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from signaling server');
      setConnectionStatus('disconnected');
    });

    // NOTE: do NOT disconnect here so the connection (and data channel) survives view changes
    return () => {
      // keep socket open so peer connection/data channel persist when components unmount
      // if you want to explicitly close: call closeConnection() from UI
    };
  }, [roomCode]);

  const createPeerConnection = () => {
    if (peerConnectionRef.current) return peerConnectionRef.current;

    const config = {
      iceServers: [
        { urls: ['stun:stun.l.google.com:19302'] }
      ]
    };

    const pc = new RTCPeerConnection(config);

    pc.onicecandidate = (event) => {
      if (event.candidate && remoteUserIdRef.current) {
        socketRef.current?.emit('ice-candidate', {
          to: remoteUserIdRef.current,
          candidate: event.candidate
        });
      }
    };

    // When this side is the answerer, receive the data channel created by the offerer
    pc.ondatachannel = (event) => {
      const dc = event.channel;
      console.log('Data channel received (answerer).');
      setupDataChannel(dc);
      peerConnectionRef.current.dataChannel = dc;
    };

    peerConnectionRef.current = pc;
    return pc;
  };

  const createOffer = async (userId) => {
    try {
      const pc = createPeerConnection();

      const dc = pc.createDataChannel('chat');
      console.log('Created data channel (offerer).');
      setupDataChannel(dc);
      pc.dataChannel = dc;

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socketRef.current?.emit('offer', {
        to: userId,
        offer: offer
      });
      setConnectionStatus('waiting-answer');
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const handleOffer = async (from, offer) => {
    try {
      const pc = createPeerConnection();
      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socketRef.current?.emit('answer', {
        to: from,
        answer: answer
      });
      // peer completed SDP exchange (answerer side)
      setConnectionStatus('peer-connected');
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      // offerer received answer — peer SDP exchange completed
      setConnectionStatus('peer-connected');
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const sendMessage = (text) => {
    const dc = peerConnectionRef.current?.dataChannel || peerConnectionRef.current?.dataChannel;
    if (dc && dc.readyState === 'open') {
      dc.send(text);
      return true;
    } else {
      console.warn('Data channel not open. Message not sent.');
      return false;
    }
  };

  const registerMessageHandler = (handler) => {
    messageHandlerRef.current = handler;
  };

  const closeConnection = () => {
    try {
      peerConnectionRef.current?.close();
      socketRef.current?.disconnect();
      peerConnectionRef.current = null;
      socketRef.current = null;
      setConnectionStatus('disconnected');
    } catch (e) {
      console.warn('Error closing connection', e);
    }
  };

  const setupDataChannel = (dc) => {
    dc.onopen = () => {
      console.log('Data channel open');
      // fully connected for data channel messaging
      setConnectionStatus('data-channel-open');
    };
    dc.onclose = () => {
      console.log('Data channel closed');
      setConnectionStatus('connected');
    };
    dc.onmessage = (evt) => {
      console.log('Data channel message received:', evt.data);
      if (typeof messageHandlerRef.current === 'function') {
        messageHandlerRef.current(evt.data);
      }
    };
  };

  return {
    connectionStatus,
    peerConnectionRef,
    sendMessage,
    registerMessageHandler,
    closeConnection
  };
}