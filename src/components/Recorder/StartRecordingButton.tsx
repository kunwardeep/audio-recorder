import React from "react";
import { IconButton } from "@zendeskgarden/react-buttons";
import { ReactComponent as RecordIcon } from "@zendeskgarden/svg-icons/src/16/record-fill.svg";

const StartRecordingButton = React.memo(
  ({
    handleRecordingClick,
    isRecording,
  }: {
    isRecording: boolean;

    handleRecordingClick: () => void;
  }) => {
    return (
      <IconButton
        onClick={handleRecordingClick}
        aria-label="primary leaf"
        isPrimary={isRecording}
        isPill={isRecording}
        isDanger={isRecording}
      >
        <RecordIcon />
      </IconButton>
    );
  }
);

export default StartRecordingButton;
