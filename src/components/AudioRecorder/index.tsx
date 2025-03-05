/* eslint-disable @arthurgeron/react-usememo/require-memo */
import { useCallback, useRef, useState } from "react";
import { KEY } from "../../key";

const AudioRecorder = () => {
  const [recordingAllowed, setRecordingAllowed] = useState(false);
  const [recordingCurrently, setRecordingCurrently] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Array<Blob>>([]);
  const [urlList, setUrlList] = useState<Array<string>>([]);
  const [transcript, setTranscript] = useState<string>("");

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start(5000);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.onstop = handleStop;
      setRecordingCurrently(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecordingCurrently(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      setRecordingCurrently(false);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setRecordingCurrently(true);
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      audioChunksRef.current.push(event.data);
      transcribeAudio(event.data);
    }
  };

  const handleStop = useCallback(() => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const url = URL.createObjectURL(audioBlob);
    setUrlList([...urlList, url]);
  }, [urlList]);

  const handleRecordingPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingAllowed(true);
      mediaRecorderRef.current = new MediaRecorder(stream);
    } catch (err) {
      console.log("error", err);
    }
  };

  const transcribeAudio = async (blob: Blob) => {
    const apiKey = KEY;
    const url = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Audio = (reader.result as string).split(",")[1];

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            encoding: "WEBM_OPUS", // Change based on your audio format
            sampleRateHertz: 48000,
            languageCode: "en-US",
          },
          audio: {
            content: base64Audio,
          },
        }),
      });

      const data = await response.json();
      if (data.results && data.results[0]) {
        setTranscript(data.results[0].alternatives[0].transcript);
      }
    };
  };

  return (
    <div>
      <div> Can you record -- {recordingAllowed ? "yes" : "no"}</div>
      <button onClick={handleRecordingPermission}>
        Grant microphone permission
      </button>
      <div>recordingCurrently---{recordingCurrently ? "yes" : "no"}</div>
      <div>urlList---{urlList.toString()}</div>

      {recordingAllowed && (
        <div>
          <button onClick={startRecording}> Lets Record</button>
          <button onClick={pauseRecording}> Lets Pause</button>
          <button onClick={stopRecording}> Lets Stop</button>
          <button onClick={resumeRecording}> Lets resume</button>
        </div>
      )}
      <div>
        <h2>Transcript</h2>
        <p>{transcript}</p>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div>
        {urlList.map((url) => {
          return (
            <div key={url}>
              <AudioPlayer url={url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AudioPlayer = ({ url }: { url: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div>
      {/* <audio ref={audioRef} controls>
        <source src={url} type="audio/wav" />
        Your browser does not support the audio element.
      </audio> */}
    </div>
  );
};

export default AudioRecorder;
