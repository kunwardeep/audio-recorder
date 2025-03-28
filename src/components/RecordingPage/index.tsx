import React, { useState, useCallback, useEffect } from "react";
import Recorder from "../Recorder";
import Notes from "../Notes";
import AudioPlayer from "../AudioPlayer";
import { useIndexedDBAudio } from "../../hooks/useIndexedDBAudio";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import useTranscribeAudio from "../../hooks/useTranscribeAudio";
import { ICustomerData } from "../../types";

const UserDetail = styled.div`
  padding: 10px;
  font-size: medium;
  font-size: medium;
`;

const CurrentUserRecordBoundary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 300px;
`;

const AudioBlobDisplay = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const DisplayError = styled.div`
  width: 500px;
`;

const CurrentUserRecord = ({
  userData,
  audioBlob,
  saveVoiceNotes,
}: {
  userData: ICustomerData;
  audioBlob: Blob | undefined;
  saveVoiceNotes: (val: string) => void;
}) => {
  const {
    transcribeAudioHandler,
    error: errorTranscribing,
    data: transcribedData,
  } = useTranscribeAudio();

  useEffect(() => {
    transcribedData && saveVoiceNotes(transcribedData);
  }, [saveVoiceNotes, transcribedData]);

  const startTranscribe = useCallback(() => {
    audioBlob && transcribeAudioHandler(audioBlob);
  }, [audioBlob, transcribeAudioHandler]);

  return (
    <CurrentUserRecordBoundary>
      <UserDetail>
        <b>Patient ID</b> {userData.id}
      </UserDetail>
      <UserDetail>
        <b>Patient Name</b> {userData.name}
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
          </AudioBlobDisplay>
        ) : (
          "Current recording will be shown here"
        )}
      </UserDetail>
      {errorTranscribing && (
        <DisplayError>
          <b>Error Transcribing</b> {errorTranscribing.message}
        </DisplayError>
      )}
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

const RecordingPage = React.memo(
  ({ userData }: { userData: ICustomerData }) => {
    const [currentNotes, setCurrentNotes] = useState("notes");
    const [voiceNotes, setVoiceNotes] = useState("notes");

    const [audioBlob, setAudioBlob] = useState<Blob>();
    const { saveAudioFile } = useIndexedDBAudio(userData.id);

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
      setCurrentNotes(notes);
      console.log("Saving notes...", notes);
    }, []);

    const saveVoiceNotes = useCallback((notes: string) => {
      setVoiceNotes(notes);
      console.log("Saving voice notes...", notes);
    }, []);

    return (
      <div>
        <RecordingPageHeader>
          <Recorder
            saveAudioBlob={saveAudioBlob}
            saveVoiceNotes={saveVoiceNotes}
          />
          <CurrentUserRecord
            userData={userData}
            audioBlob={audioBlob}
            saveVoiceNotes={saveVoiceNotes}
          />
        </RecordingPageHeader>
        <Notes
          currentNotes={currentNotes}
          voiceNotes={voiceNotes}
          saveNotes={saveNotes}
        />
      </div>
    );
  }
);

export default RecordingPage;
