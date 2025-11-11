// src/hooks/useWebRTC.js

import { useCallback, useEffect, useRef, useState } from "react";
import { initWebRTC, setupDataChannel } from "../utils/webrtc";

const DEFAULT_CONFIG = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function useWebRTC(isInitiator) {
  const pcRef = useRef(null);
  const dcRef = useRef(null);
  const localCandidatesRef = useRef([]);
  const remoteCandidatesRef = useRef([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [peerTyping, setPeerTyping] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [localSDP, setLocalSDP] = useState(null);
  const [localCandidates, setLocalCandidates] = useState([]);
  const [remoteCandidates, setRemoteCandidates] = useState([]);

  const pushMessage = useCallback(
    (msg) => {
      setMessages((m) => [...m, msg]);
    },
    [setMessages]
  );

  const setupPeerConnection = useCallback(() => {
    if (pcRef.current) return pcRef.current;

    const pc = new RTCPeerConnection(DEFAULT_CONFIG);
    pcRef.current = pc;

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        localCandidatesRef.current.push(e.candidate);
        setLocalCandidates([...localCandidatesRef.current]);
      }
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState || pc.iceConnectionState;
      setIsConnected(state === "connected" || state === "completed");
    };

    pc.ondatachannel = (ev) => {
      const channel = ev.channel;
      attachDataChannel(channel);
    };

    return pc;
  }, []);

  const attachDataChannel = useCallback(
    (channel) => {
      dcRef.current = channel;

      channel.onopen = () => {
        setIsConnected(true);
      };
      channel.onclose = () => {
        setIsConnected(false);
      };
      channel.onmessage = (ev) => {
        try {
          const parsed = JSON.parse(ev.data);
          if (!parsed || typeof parsed !== "object") return;

          if (parsed.type === "text") {
            pushMessage({
              id: parsed.id || makeId(),
              type: "text",
              text: parsed.text,
              from: "peer",
              timestamp: parsed.timestamp || Date.now(),
            });
          } else if (parsed.type === "typing") {
            setPeerTyping(parsed.value === true);
          } else if (parsed.type === "system") {
            pushMessage({
              id: parsed.id || makeId(),
              type: "system",
              text: parsed.text,
              from: "system",
              timestamp: Date.now(),
            });
          }
        } catch (err) {
          // non-JSON or binary payload; ignore for now
        }
      };
    },
    [pushMessage]
  );

  const createDataChannel = useCallback(
    (pc) => {
      if (!pc) return null;
      try {
        const dc = pc.createDataChannel("etherchat");
        attachDataChannel(dc);
        return dc;
      } catch (e) {
        return null;
      }
    },
    [attachDataChannel]
  );

  const createOffer = useCallback(async () => {
    const pc = setupPeerConnection();
    createDataChannel(pc);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    // wait a short moment for ICE candidates to gather
    setLocalSDP(pc.localDescription ? pc.localDescription.sdp : offer.sdp);
    return pc.localDescription ? pc.localDescription.sdp : offer.sdp;
  }, [setupPeerConnection, createDataChannel]);

  const handleOffer = useCallback(
    async (offerSDP) => {
      const pc = setupPeerConnection();
      const offerDesc = { type: "offer", sdp: offerSDP };
      await pc.setRemoteDescription(offerDesc);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      setLocalSDP(pc.localDescription ? pc.localDescription.sdp : answer.sdp);
      return pc.localDescription ? pc.localDescription.sdp : answer.sdp;
    },
    [setupPeerConnection]
  );

  const handleAnswer = useCallback(
    async (answerSDP) => {
      if (!pcRef.current) return;
      const answerDesc = { type: "answer", sdp: answerSDP };
      await pcRef.current.setRemoteDescription(answerDesc);
    },
    [pcRef]
  );

  const addRemoteCandidate = useCallback(
    async (cand) => {
      if (!cand) return;
      remoteCandidatesRef.current.push(cand);
      setRemoteCandidates([...remoteCandidatesRef.current]);
      if (pcRef.current) {
        try {
          await pcRef.current.addIceCandidate(cand);
        } catch (e) {
          // ignore invalid candidate errors
        }
      }
    },
    [pcRef]
  );

  const sendMessage = useCallback(
    (text) => {
      const payload = {
        type: "text",
        id: makeId(),
        text,
        timestamp: Date.now(),
      };
      if (dcRef.current && dcRef.current.readyState === "open") {
        dcRef.current.send(JSON.stringify(payload));
        pushMessage({ ...payload, from: "me" });
      } else {
        // fallback: queue message locally as system notification
        pushMessage({
          id: makeId(),
          type: "system",
          text: "Not connected — message queued locally.",
          from: "system",
          timestamp: Date.now(),
        });
      }
    },
    [pushMessage]
  );

  const sendTyping = useCallback(
    (value = true) => {
      const payload = { type: "typing", value: !!value };
      if (dcRef.current && dcRef.current.readyState === "open") {
        dcRef.current.send(JSON.stringify(payload));
      }
    },
    [dcRef]
  );

  useEffect(() => {
    return () => {
      // cleanup
      try {
        if (dcRef.current) {
          dcRef.current.close();
        }
        if (pcRef.current) {
          pcRef.current.close();
        }
      } catch (e) {}
      pcRef.current = null;
      dcRef.current = null;
    };
  }, []);

  return {
    // state
    messages,
    isConnected,
    peerTyping,
    showVoiceSettings,
    setShowVoiceSettings,

    // SDP / ICE helpers
    localSDP,
    localCandidates,
    remoteCandidates,
    createOffer,
    handleOffer,
    handleAnswer,
    addRemoteCandidate,

    // actions
    sendMessage,
    sendTyping,
  };
}