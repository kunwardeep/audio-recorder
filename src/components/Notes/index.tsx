import React, { ChangeEvent, useCallback, useState } from "react";
import { Field, Textarea } from "@zendeskgarden/react-forms";
import styled from "styled-components";

interface INotes {
  currentNotes: string;
  voiceNotes?: string;
  saveNotes: (val: string) => void;
}

const NotesBoundary = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-content: space-between;
  width: 100%;
  gap: 20px;
`;

const StyledField = styled(Field)`
  flex-grow: 1;
`;

const Notes = React.memo(({ currentNotes, voiceNotes, saveNotes }: INotes) => {
  const [clinicNotes, setClinicNotes] = useState(currentNotes);

  const handleClinicalNotes = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setClinicNotes(event.target.value);
    },
    []
  );
  const handleOnBlur = useCallback(() => {
    console.log("sss", clinicNotes);
    saveNotes(clinicNotes);
  }, [clinicNotes, saveNotes]);

  return (
    <NotesBoundary>
      <StyledField>
        <Field.Label>Clinical Notes</Field.Label>
        <Textarea
          onBlur={handleOnBlur}
          onChange={handleClinicalNotes}
          value={clinicNotes}
          isResizable
          minRows={40}
          maxRows={100}
        />
      </StyledField>
      <StyledField>
        <Field.Label>Voice Notes</Field.Label>
        <Textarea value={voiceNotes} isResizable minRows={40} maxRows={100} />
      </StyledField>
    </NotesBoundary>
  );
});

export default Notes;
