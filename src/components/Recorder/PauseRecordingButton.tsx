import React from "react";
import { IconButton } from "@zendeskgarden/react-buttons";
import { ReactComponent as PauseIcon } from "@zendeskgarden/svg-icons/src/16/pause-fill.svg";

const PauseRecordingButton = React.memo(
  ({
    handlePauseClick,
    isPaused,
  }: {
    isPaused: boolean;

    handlePauseClick: () => void;
  }) => {
    return (
      <IconButton
        onClick={handlePauseClick}
        aria-label="primary leaf"
        isPrimary={isPaused}
        isPill={isPaused}
        isDanger={isPaused}
      >
        <PauseIcon />
      </IconButton>
    );
  }
);

export default PauseRecordingButton;
