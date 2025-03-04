import styled from "styled-components";
import { useCallback, useState } from "react";
import RecordingTime from "./RecordingTime";
import StartRecordingButton from "./StartRecordingButton";
import PauseRecordingButton from "./PauseRecordingButton";

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

const Recorder = () => {
  const defaultLabel = "Recording not started";
  const pausedLabel = "Recording paused";
  const stoppedLabel = "Recording stopped";
  const startedLabel = "Recording started";

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [label, setLabel] = useState(defaultLabel);

  const handleRecordingClick = useCallback(() => {
    setIsPaused(false);
    setIsRecording(!isRecording);
    if (label === defaultLabel || label === stoppedLabel) {
      setLabel(startedLabel);
    }
    if (label === startedLabel || label === pausedLabel) {
      setLabel(stoppedLabel);
    }
  }, [isRecording, label]);

  const handlePauseClick = useCallback(() => {
    if (label === startedLabel) {
      setLabel(pausedLabel);
    }
    if (label === pausedLabel) {
      setLabel(startedLabel);
    }
    setIsPaused(!isPaused);
  }, [isPaused, label]);

  const CurrentState = styled.span`
    padding: 10px;
    border-radius: 50px;
    background-color: #ffffff;
  `;

  return (
    <RecorderBoundary>
      <RecordingTime pauseTimer={isPaused} startTimer={isRecording} />
      <CurrentState>{label}</CurrentState>
      <StartRecordingButton
        handleRecordingClick={handleRecordingClick}
        isRecording={isRecording}
      />
      {isRecording && (
        <PauseRecordingButton
          handlePauseClick={handlePauseClick}
          isPaused={isPaused}
        />
      )}
    </RecorderBoundary>
  );
};

export default Recorder;
