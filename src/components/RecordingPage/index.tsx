import React, { useState, useCallback } from "react";
import Recorder from "../Recorder";
import Notes from "../Notes";
import AudioPlayer from "../AudioPlayer";
import { useIndexedDBAudio } from "../../hooks/useIndexedDBAudio";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import useTranscribeAudio from "../../hooks/useTranscribeAudio";

const UserDetail = styled.div`
  padding: 10px;
  font-size: medium;
  font-size: medium;
`;

const CurrentUserRecordBoundary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 300px;
`;

const AudioBlobDisplay = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const CurrentUserRecord = ({
  audioBlob,
  transcribeAudioHandler,
  errorTranscribing,
}: {
  audioBlob: Blob | undefined;
  transcribeAudioHandler: (blob: Blob) => void;
  errorTranscribing: Error | undefined;
}) => {
  const startTranscribe = useCallback(() => {
    audioBlob && transcribeAudioHandler(audioBlob);
  }, [audioBlob, transcribeAudioHandler]);

  return (
    <CurrentUserRecordBoundary>
      <UserDetail>
        <b>Patient ID</b> 1
      </UserDetail>
      <UserDetail>
        <b>Patient Name</b> Robert Smith
      </UserDetail>
      <UserDetail>
        <u>
          <b>Current Recording</b>
        </u>
      </UserDetail>
      <UserDetail>
        {audioBlob ? (
          <AudioBlobDisplay>
            <div>{audioBlob && <AudioPlayer audioBlob={audioBlob} />}</div>

            <TranscribeTextButton startTranscribe={startTranscribe} />
            {errorTranscribing && (
              <div>Error Transcribing errorTranscribing</div>
            )}
          </AudioBlobDisplay>
        ) : (
          "Current recording will be shown here"
        )}
      </UserDetail>
    </CurrentUserRecordBoundary>
  );
};

const RecordingPageHeader = styled.div`
  display: flex;
  gap: 60px;
  padding: 40px;
`;

const TranscribeTextButton = ({
  startTranscribe,
}: {
  startTranscribe: () => void;
}) => {
  const handleOnClick = useCallback(() => {
    startTranscribe();
  }, [startTranscribe]);

  return <Button onClick={handleOnClick}>Transcribe Text</Button>;
};

const RecordingPage = React.memo(() => {
  // We should be able to get userData from a hook
  const [currentNotes, setCurrentNotes] = useState("notes");
  const [voiceNotes, setVoiceNotes] = useState("notes");
  const { transcribeAudioHandler, error: errorTranscribing } =
    useTranscribeAudio(setVoiceNotes);
  // const [recordingLocation, setRecordingLocation] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const { saveAudioFile } = useIndexedDBAudio();

  const saveAudioBlob = useCallback(
    (blob: Blob) => {
      if (blob) {
        setAudioBlob(blob);
        saveAudioFile(Date.now().toString(), blob);
      }
    },
    [saveAudioFile]
  );

  const saveNotes = useCallback((notes: string) => {
    console.log("Saving notes...", notes);
  }, []);

  return (
    <div>
      <RecordingPageHeader>
        <Recorder saveAudioBlob={saveAudioBlob} />
        <CurrentUserRecord
          audioBlob={audioBlob}
          transcribeAudioHandler={transcribeAudioHandler}
          errorTranscribing={errorTranscribing}
        />
      </RecordingPageHeader>
      <Notes
        currentNotes={currentNotes}
        voiceNotes={voiceNotes}
        saveNotes={saveNotes}
      />
    </div>
  );
});

export default RecordingPage;
