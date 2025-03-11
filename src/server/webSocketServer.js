const WebSocket = require("ws");
const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient({
  keyFilename: "/Users/kunwardeep/Code/sound-api.json",
});

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("WebSocket server running on ws://localhost:8080");
});

wss.on("connection", (ws) => {
  console.log("Client connected for audio stream.");

  const request = {
    config: {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 48000,
      languageCode: "en-US",
    },
    interimResults: true,
  };

  const recognizeStream = client
    .streamingRecognize(request)
    .on("data", (data) => {
      const transcript = data.results[0]?.alternatives[0]?.transcript;
      const isFinal = data.results[0]?.isFinal;
      console.log("isFinal---", isFinal);

      if (transcript) {
        ws.send(JSON.stringify({ transcript }));
      }
    })
    .on("error", (error) => {
      console.error("Google API Error:", error);
      ws.send(JSON.stringify({ error: error.message }));
    });

  ws.on("message", (message) => {
    console.error("GOT AUDIO MESSAGE, sending..");
    recognizeStream.write(message);
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
    recognizeStream.end();
  });

  ws.on("error", (error) => {
    console.error("WebSocket Error:", error);
  });
});
