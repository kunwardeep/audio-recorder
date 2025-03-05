import styled from "styled-components";
import { useCallback, useState } from "react";
import RecordingTime from "./RecordingTime";
import StartRecordingButton from "./StartRecordingButton";
import PauseRecordingButton from "./PauseRecordingButton";
import useRecorder from "../../hooks/useRecorder";
import React from "react";

const RecorderBoundary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  width: 200px;
  height: 200px;
  background-color: #b8b6b670;
  border: 3px solid;
  border-color: #ddd9d9;
`;

const defaultLabel = "Recording not started";
const pausedLabel = "Recording paused";
const stoppedLabel = "Recording stopped";
const startedLabel = "Recording started";

const Recorder = React.memo(() => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [label, setLabel] = useState(defaultLabel);

  // const recordingUrlRef = useRef<string | undefined>(undefined);
  const transcribeAudioChunks = (data: Blob) => {
    console.log("Lets Transcribe");
  };

  const recordingHandler = (data: Blob) => {
    console.log("handle recording");
  };

  // audioType: "audio/wav",

  const {
    error,
    streamAvailable,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useRecorder({
    transcribeAudioChunks: transcribeAudioChunks,
    recordingHandler: recordingHandler,
    settings: { recordingTimeSlice: 500 },
  });

  const handleRecordingClick = useCallback(() => {
    // TODO: To many conditionals. Simplify this
    setIsPaused(false);
    setIsRecording(!isRecording);

    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    if (streamAvailable) {
      if (label === defaultLabel || label === stoppedLabel) {
        setLabel(startedLabel);
      }
      if (label === startedLabel || label === pausedLabel) {
        setLabel(stoppedLabel);
      }
    }
  }, [error, isRecording, label, stopRecording, startRecording]);

  const handlePauseClick = useCallback(() => {
    // TODO: To many conditionals. Simplify this
    if (label === startedLabel) {
      setLabel(pausedLabel);
    }
    if (label === pausedLabel) {
      setLabel(startedLabel);
    }
    setIsPaused(!isPaused);
    if (isPaused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
  }, [isPaused, label, pauseRecording, resumeRecording]);

  const CurrentState = styled.span`
    padding: 10px;
    border-radius: 50px;
    background-color: #ffffff;
  `;

  return (
    <RecorderBoundary>
      <RecordingTime
        pauseTimer={isPaused}
        startTimer={isRecording && streamAvailable}
      />
      <CurrentState>{label}</CurrentState>
      <StartRecordingButton
        handleRecordingClick={handleRecordingClick}
        isRecording={isRecording && streamAvailable}
      />
      {isRecording && streamAvailable && (
        <PauseRecordingButton
          handlePauseClick={handlePauseClick}
          isPaused={isPaused}
        />
      )}
    </RecorderBoundary>
  );
});

export default Recorder;
