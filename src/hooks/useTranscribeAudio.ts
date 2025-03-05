import { useCallback, useState } from "react";
import { KEY } from "../key";

// Ideally the request should be routed using the an internal API
// that has the credentials to talk to the google cloud
// however for this exercise i am leaving this in here.

const readFileAsBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64Audio = (reader.result as string).split(",")[1];
      resolve(base64Audio);
    };
    reader.onerror = reject;
  });
};

const url = `https://speech.googleapis.com/v1/speech:recognize?key=${KEY}`;
const useTranscribeAudio = (updateNotes: (val: string) => void) => {
  const [error, setError] = useState<Error>();
  const transcribeAudioHandler = useCallback(
    (blob: Blob) => {
      console.log("Processing blob:", { size: blob.size, type: blob.type });

      const fn = async () => {
        try {
          setError(undefined);
          const base64Audio = await readFileAsBase64(blob);
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
            console.log("transcribing");
            updateNotes(data.results[0].alternatives[0].transcript);
          }
        } catch (error) {
          console.log("ERROR--------", error);
          setError(error as Error);
        }
      };
      fn();
    },
    [updateNotes]
  );

  return { transcribeAudioHandler, error };
};

export default useTranscribeAudio;
