import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import RecordingTime from "./RecordingTime";
import StartRecordingButton from "./StartRecordingButton";
import PauseRecordingButton from "./PauseRecordingButton";
import useRecorder from "../../hooks/useRecorder";
import React from "react";
import { RECORDING_STATE_LABEL_TESTID } from "./dataTestIds";
import useSpeechWebSocket from "../../hooks/useSpeechWebSocket";

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

const CurrentStateLabel = styled.span`
  padding: 10px;
  border-radius: 50px;
  background-color: #ffffff;
`;

const LABELS = {
  DEFAULT: "Recording not started",
  PAUSED: "Recording paused",
  RESUME: "Recording resumed",
  STOPPED: "Recording stopped",
  STARTED: "Recording started",
  ERROR: "Unable to record",
};

const PAUSE_BUTTON = "PAUSE_BUTTON_CLICKED";
const RECORD_BUTTON = "RECORD_BUTTON_CLICKED";

const Recorder = React.memo(
  ({
    saveAudioBlob,
    saveVoiceNotes,
  }: {
    saveAudioBlob: (blob: Blob) => void;
    saveVoiceNotes: (val: string) => void;
  }) => {
    const [beginRecording, setBeginRecording] = useState(false);
    const [isRecording, setIsRecording] = useState<boolean | undefined>(
      undefined
    );
    const [isPaused, setIsPaused] = useState<boolean | undefined>(undefined);
    const [label, setLabel] = useState(LABELS.DEFAULT);
    const audioChunksRef = useRef<Array<Blob>>([]);

    const {
      startWebSocket,
      sendBlob: sendBlobWs,
      closeWebSocket,
      transcript,
    } = useSpeechWebSocket("ws://localhost:8080");

    const {
      blob,
      error,
      streamAvailable,
      startRecording,
      stopRecording,
      pauseRecording,
      resumeRecording,
      // eslint-disable-next-line @arthurgeron/react-usememo/require-usememo
    } = useRecorder({
      settings: { recordingTimeSlice: 200 },
    });

    useEffect(() => {
      saveVoiceNotes(transcript);
    }, [saveVoiceNotes, transcript]);

    useEffect(() => {
      if (blob) {
        audioChunksRef.current.push(blob);
        console.log("Handle the recording chunks,and send blob");
        sendBlobWs(blob);
      }
    }, [blob, sendBlobWs]);

    useEffect(() => {
      error && setLabel(LABELS.ERROR);
    }, [error]);

    useEffect(() => {
      if (beginRecording && streamAvailable) {
        startWebSocket();
        setIsRecording(true);
      } else {
        setIsRecording(false);
      }
    }, [beginRecording, startWebSocket, streamAvailable]);

    useEffect(() => {
      if (!streamAvailable && audioChunksRef.current.length > 0) {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        saveAudioBlob(audioBlob);
        audioChunksRef.current = [];

        closeWebSocket();
      }
    }, [closeWebSocket, saveAudioBlob, sendBlobWs, streamAvailable]);

    const updateLabel = useCallback(
      (buttonClicked: typeof PAUSE_BUTTON | typeof RECORD_BUTTON) => {
        switch (buttonClicked) {
          case RECORD_BUTTON:
            setLabel(isRecording ? LABELS.STOPPED : LABELS.STARTED);
            break;
          case PAUSE_BUTTON:
            if (isRecording) {
              setLabel(isPaused ? LABELS.RESUME : LABELS.PAUSED);
            }
            break;
          default:
            break;
        }
      },
      [isPaused, isRecording]
    );

    const handleRecordingClick = useCallback(() => {
      if (isRecording) {
        stopRecording();
        setBeginRecording(false);
        setIsPaused(undefined);
      } else {
        startRecording();
        setBeginRecording(true);
      }
      updateLabel(RECORD_BUTTON);
    }, [isRecording, stopRecording, startRecording, updateLabel]);

    const handlePauseClick = useCallback(() => {
      setIsPaused(!isPaused);
      isPaused ? resumeRecording() : pauseRecording();
      updateLabel(PAUSE_BUTTON);
    }, [isPaused, pauseRecording, resumeRecording, updateLabel]);

    return (
      <RecorderBoundary>
        <RecordingTime
          //fix this timer
          pauseTimer={isPaused ?? true}
          startTimer={beginRecording && streamAvailable}
        />
        <CurrentStateLabel data-testid={RECORDING_STATE_LABEL_TESTID}>
          {label}
        </CurrentStateLabel>
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
  }
);

export default Recorder;
