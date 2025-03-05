import { useRef, useState } from "react";

interface IUseRecorder {
  transcribeAudioChunks: (data: Blob) => void;
  recordingHandler: (data: Blob) => void;
  settings: {
    recordingTimeSlice: number;
  };
}

// TODO: Check how will this work across multiple browsers and multiple tabs
// TODO: Handle if the permissions are removed
const useRecorder = ({
  transcribeAudioChunks,
  recordingHandler,
  settings,
}: IUseRecorder) => {
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [streamAvailable, setStreamAvailable] = useState(false);

  const captureAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start(settings.recordingTimeSlice);
      mediaRecorderRef.current = mediaRecorder;
      mediaStreamRef.current = stream;
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      setStreamAvailable(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Errored while getting permission NotAllowedError: Permission denied

        console.log("Errored while getting permission", err);
        setError(err);
      } else {
        // TODO Do better validation and understand the types of errors
        console.log("Unsure of the error. Needs more investigation", err);
      }
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      // audioChunksRef.current.push(event.data);
      recordingHandler(event.data);
      transcribeAudioChunks(event.data);
    }
  };

  const startRecording = () => {
    captureAudio();
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current?.start();
    }
  };

  const stopRecording = () => {
    if (mediaStreamRef.current) {
      mediaRecorderRef.current = null;
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
    }
  };

  return {
    streamAvailable,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  };
};

export default useRecorder;
