import { useCallback } from "react";
import { KEY } from "../key";

// Ideally the request should be routed using the an internal API
// that has the credentials to talk to the google cloud
// however for this exercise i am leaving this in here.

const useTranscribeAudio = (
  updateNotes: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log("IN TRANSCRBING");
  const url = `https://speech.googleapis.com/v1/speech:recognize?key=${KEY}`;

  const transcribeAudioHandler = useCallback(
    (blob: Blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(",")[1];

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            config: {
              encoding: "WEBM_OPUS",
              sampleRateHertz: 48000,
              languageCode: "en-US",
            },
            audio: {
              content: base64Audio,
            },
          }),
        });

        const data = await response.json();
        console.log("data", data.results);

        if (data.results && data.results[0]) {
          console.log(data.results[0].alternatives[0].transcript);
          // setTranscript(data.results[0].alternatives[0].transcript);
          console.log("tanscribing");
          updateNotes(data.results[0].alternatives[0].transcript);
        }
      };
    },
    [updateNotes, url]
  );

  return { transcribeAudioHandler };
};

export default useTranscribeAudio;
