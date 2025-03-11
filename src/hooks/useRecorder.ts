import { useRef, useCallback, useState, useEffect } from "react";

interface IUseRecorder {
  settings: {
    recordingTimeSlice: number;
  };
}

const useRecorder = ({ settings }: IUseRecorder) => {
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [streamAvailable, setStreamAvailable] = useState(false);
  const [blob, setBlob] = useState<Blob>();

  const handleOnStop = () => {
    console.log("useRecorder - stopped");
    setStreamAvailable(false);
  };

  const handleOnPause = () => console.log("useRecorder - paused");
  const handleOnStart = () => {
    console.log("useRecorder - started");
    setStreamAvailable(true);
  };
  const handleOnResume = () => console.log("useRecorder - resumed");
  const handleOnError = (event: Event) =>
    console.error("useRecorder - error", event);

  const handleDataAvailable = useCallback((event: BlobEvent) => {
    if (event.data.size > 0) {
      setBlob(event.data);
    }
  }, []);

  const captureAudio = useCallback(async () => {
    try {
      // const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleOnStop;
      mediaRecorder.onpause = handleOnPause;
      mediaRecorder.onstart = handleOnStart;
      mediaRecorder.onresume = handleOnResume;
      mediaRecorder.onerror = handleOnError;

      mediaRecorder.start(settings.recordingTimeSlice);

      mediaRecorderRef.current = mediaRecorder;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Errored while getting permission", err);
        setError(err);
      } else {
        console.error("Unknown error occurred", err);
      }
    }
  }, [handleDataAvailable, settings.recordingTimeSlice]);

  const startRecording = useCallback(() => {
    captureAudio();
  }, [captureAudio]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  const pauseRecording = useCallback(() => {
    mediaRecorderRef.current?.pause();
  }, []);

  const resumeRecording = useCallback(() => {
    mediaRecorderRef.current?.resume();
  }, []);

  useEffect(() => {
    // This should cleanup on unmount
    return () => stopRecording();
  }, [stopRecording]);

  return {
    blob,
    streamAvailable,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  };
};

export default useRecorder;
