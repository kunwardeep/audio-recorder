import { useRef, useCallback, useState } from "react";

interface IUseRecorder {
  recordingHandler: (data: Blob) => void;
  settings: {
    recordingTimeSlice: number;
  };
}

// TODO: Check how will this work across multiple browsers and multiple tabs
// TODO: Handle if the permissions are removed
const useRecorder = ({ recordingHandler, settings }: IUseRecorder) => {
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [streamAvailable, setStreamAvailable] = useState(false);

  const handleDataAvailable = useCallback(
    (event: BlobEvent) => {
      if (event.data.size > 0) {
        recordingHandler(event.data);
      }
    },
    [recordingHandler]
  );

  const captureAudio = useCallback(() => {
    const capture = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaStreamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(settings.recordingTimeSlice);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.onstop = handleOnStop;
        mediaRecorderRef.current.onpause = handleOnPause;
        mediaRecorderRef.current.onstart = handleOnStart;
        mediaRecorderRef.current.onresume = handleOnResume;
        mediaRecorderRef.current.onerror = handleOnError;
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
    capture();
  }, [handleDataAvailable, settings.recordingTimeSlice]);

  const handleOnStop = () => {
    console.log("useRecorder- stopped");
    setStreamAvailable(false);
  };

  const handleOnPause = () => {
    console.log("useRecorder- paused");
  };

  const handleOnStart = () => {
    console.log("useRecorder- start");
    setStreamAvailable(true);
  };

  const handleOnResume = () => {
    console.log("useRecorder- resume");
  };

  const handleOnError = () => {
    console.log("useRecorder- error");
  };

  const startRecording = useCallback(() => {
    captureAudio();
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current?.start();
    }
  }, [captureAudio]);

  const stopRecording = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaRecorderRef.current = null;
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    }
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
    }
  }, []);

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
