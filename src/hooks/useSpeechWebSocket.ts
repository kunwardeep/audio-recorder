import { useState, useEffect, useRef, useCallback } from "react";

interface WebSocketMessage {
  transcript?: string;
}

interface UseSpeechWebSocketReturn {
  startWebSocket: () => void;
  sendBlob: (blob: Blob) => void;
  closeWebSocket: () => void;
  transcript: string;
  loading: boolean;
  error: Error | null;
}

const useSpeechWebSocket = (wsUrl: string): UseSpeechWebSocketReturn => {
  const [transcript, setTranscript] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // const blobRef = useRef<Blob[]>([]);

  const startWebSocket = useCallback(() => {
    setLoading(true);
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("---WebSocket connected");
      setLoading(false);
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      try {
        console.log("IN MESSAGE");
        const data: WebSocketMessage = JSON.parse(event.data);
        if (data.transcript) {
          console.log("transcript------", data.transcript);
          setTranscript(data.transcript);
          // setTranscript((prev) => `${prev} ${data.transcript}`);
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };

    socketRef.current.onerror = (event: Event) => {
      console.error("WebSocket Error:", event);
      setError(new Error("WebSocket encountered an error"));
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket closed");
    };
  }, [wsUrl]);

  const sendBlob = useCallback((blob: Blob) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("Sending Blob");
      socketRef.current.send(blob);
    } else {
      console.error("WebSocket is not open");
    }
  }, []);

  const closeWebSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  }, []);

  useEffect(() => {
    return () => {
      console.log("Unloading");
      closeWebSocket();
    };
  }, [closeWebSocket]);

  return {
    startWebSocket,
    sendBlob,
    closeWebSocket,
    transcript,
    loading,
    error,
  };
};

export default useSpeechWebSocket;
