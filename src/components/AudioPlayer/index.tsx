import React, { useEffect, useRef, useState } from "react";

const AudioPlayer = React.memo(
  ({ audioBlob }: { audioBlob: Blob | undefined }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
      if (audioBlob) {
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        return () => {
          URL.revokeObjectURL(url);
        };
      }
    }, [audioBlob]);

    useEffect(() => {
      if (audioRef.current && audioUrl) {
        audioRef.current.load();
      } else {
        console.log("audioRef.current", audioRef.current);
      }
    }, [audioUrl]);

    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio ref={audioRef} controls aria-label="Audio player">
          {audioUrl && (
            <>
              <source src={audioUrl} type="audio/wav" />
              <source src={audioUrl} type="audio/x-wav" />
            </>
          )}
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
);

export default AudioPlayer;
