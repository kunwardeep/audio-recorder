import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const RecordingTimeDisplay = styled.span`
  background-color: green;
  color: white;
  padding: 2px 8px;
  border-radius: 50px;
`;

// TODO: Pause time not implemented
// Also this should be a dumb component that just displays the time. Move this logic outside
const RecordingTime = React.memo(
  ({
    startTimer,
    pauseTimer,
  }: {
    startTimer: boolean;
    pauseTimer: boolean;
  }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
      if (startTimer) {
        const startTime = Date.now();

        const timer = setInterval(() => {
          const currentTime = Date.now();
          const timeDiff = Math.floor((currentTime - startTime) / 1000);
          setElapsedTime(timeDiff);
        }, 500);

        return () => clearInterval(timer);
      }
    }, [startTimer]);

    const formatTime = (seconds: number) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`;
    };

    return (
      <RecordingTimeDisplay>{formatTime(elapsedTime)}</RecordingTimeDisplay>
    );
  }
);

export default RecordingTime;
