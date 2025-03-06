import React from "react";
import { IconButton } from "@zendeskgarden/react-buttons";
import { ReactComponent as RecordIcon } from "@zendeskgarden/svg-icons/src/16/record-fill.svg";
import { START_RECORDING_BUTTON_TESTID } from "./dataTestIds";

const StartRecordingButton = React.memo(
  ({
    handleRecordingClick,
    isRecording,
  }: {
    isRecording: boolean | undefined;

    handleRecordingClick: () => void;
  }) => {
    return (
      <IconButton
        data-testid={START_RECORDING_BUTTON_TESTID}
        onClick={handleRecordingClick}
        aria-label="start "
        isBasic={false}
        isPrimary={isRecording}
        isPill={true}
        isDanger={isRecording}
      >
        <RecordIcon />
      </IconButton>
    );
  }
);

export default StartRecordingButton;
