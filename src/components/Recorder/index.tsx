import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
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

const CurrentState = styled.span`
  padding: 10px;
  border-radius: 50px;
  background-color: #ffffff;
`;

const defaultLabel = "Recording not started";
const pausedLabel = "Recording paused";
const stoppedLabel = "Recording stopped";
const startedLabel = "Recording started";

const Recorder = React.memo(
  ({ saveAudioBlob }: { saveAudioBlob: (blob: Blob) => void }) => {
    const [beginRecording, setBeginRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [label, setLabel] = useState(defaultLabel);
    const audioChunksRef = useRef<Array<Blob>>([]);
    // const transcribeAudioChunks = useCallback((data: Blob) => {
    //   console.log("Lets Transcribe");
    // }, []);

    const recordingHandler = useCallback((data: Blob) => {
      audioChunksRef.current.push(data);
      console.log("handle recording");
    }, []);

    const {
      error,
      streamAvailable,
      startRecording,
      stopRecording,
      pauseRecording,
      resumeRecording,
      // eslint-disable-next-line @arthurgeron/react-usememo/require-usememo
    } = useRecorder({
      recordingHandler: recordingHandler,
      settings: { recordingTimeSlice: 5000 },
    });

    useEffect(() => {
      if (!streamAvailable && audioChunksRef.current.length > 0) {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        saveAudioBlob(audioBlob);
        audioChunksRef.current = [];
      }
    }, [saveAudioBlob, streamAvailable]);

    const handleRecordingClick = useCallback(() => {
      // TODO: To many conditionals. Simplify this
      // TODO: Handle labels - currently broken
      setIsPaused(false);
      setBeginRecording(!beginRecording);

      if (!beginRecording) {
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
    }, [beginRecording, label, stopRecording, startRecording, streamAvailable]);

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

    return (
      <RecorderBoundary>
        <RecordingTime
          pauseTimer={isPaused}
          startTimer={beginRecording && streamAvailable}
        />
        <CurrentState>{label}</CurrentState>
        <StartRecordingButton
          handleRecordingClick={handleRecordingClick}
          isRecording={beginRecording && streamAvailable}
        />
        {beginRecording && streamAvailable && (
          <PauseRecordingButton
            handlePauseClick={handlePauseClick}
            isPaused={isPaused}
          />
        )}
      </RecorderBoundary>
    );
  }
);

export default Recorder;
