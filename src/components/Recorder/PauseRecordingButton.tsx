import React from "react";
import { IconButton } from "@zendeskgarden/react-buttons";
import { ReactComponent as PauseIcon } from "@zendeskgarden/svg-icons/src/16/pause-fill.svg";
import { PAUSE_RECORDING_BUTTON_TESTID } from "./dataTestIds";

const PauseRecordingButton = React.memo(
  ({
    handlePauseClick,
    isPaused,
  }: {
    isPaused: boolean | undefined;

    handlePauseClick: () => void;
  }) => {
    return (
      <IconButton
        data-testid={PAUSE_RECORDING_BUTTON_TESTID}
        onClick={handlePauseClick}
        aria-label="primary leaf"
        isPrimary={isPaused}
        isPill={true}
        isDanger={isPaused}
        isBasic={false}
      >
        <PauseIcon />
      </IconButton>
    );
  }
);

export default PauseRecordingButton;
