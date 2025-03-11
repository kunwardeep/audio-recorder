import React, { useRef } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const RecordingTimeDisplay = styled.span`
  background-color: green;
  color: white;
  padding: 2px 8px;
  border-radius: 50px;
`;

const RecordingTime = React.memo(
  ({
    startTimer,
    pauseTimer,
  }: {
    startTimer: boolean;
    pauseTimer: boolean;
  }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const timer = useRef<any>();
    const lastTime = useRef<any>();

    useEffect(() => {
      const shouldStartTimer = startTimer && !pauseTimer;
      const shouldStopTimer = !startTimer;
      const shouldPauseTimer = startTimer && pauseTimer;

      if (shouldPauseTimer) {
        clearInterval(timer.current);
      }

      if (shouldStopTimer) {
        console.log("stop timer");
        clearInterval(timer.current);
        timer.current = undefined;
        lastTime.current = undefined;
        return;
      }

      if (shouldStartTimer) {
        let pausedTime = 0;
        if (lastTime.current) {
          pausedTime = lastTime.current * 1000;
        }

        const startTime = Date.now();

        timer.current = setInterval(() => {
          const currentTime = Date.now();
          const timeDiff = Math.floor(
            (currentTime - startTime + pausedTime) / 1000
          );
          lastTime.current = timeDiff;
          setElapsedTime(timeDiff);
        }, 500);

        return;
      }
    }, [startTimer, pauseTimer]);

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
