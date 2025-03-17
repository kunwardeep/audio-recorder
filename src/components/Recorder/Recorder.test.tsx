import { screen } from "@testing-library/react";
import Recorder from "./index";
import {
  PAUSE_RECORDING_BUTTON_TESTID,
  RECORDING_STATE_LABEL_TESTID,
  START_RECORDING_BUTTON_TESTID,
} from "./dataTestIds";
import { customRender } from "../../testUtils/customRender";
import userEvent from "@testing-library/user-event";

const startRecordingFn = jest.fn();
const stopRecordingFn = jest.fn();
const pauseRecordingFn = jest.fn();
const resumeRecordingFn = jest.fn();

const mock = {
  error: null,
  streamAvailable: true,
  startRecording: startRecordingFn,
  stopRecording: stopRecordingFn,
  pauseRecording: pauseRecordingFn,
  resumeRecording: resumeRecordingFn,
};

jest.mock("../../hooks/useRecorder", () => ({
  __esModule: true,
  default: () => {
    return mock;
  },
}));

const mockSaveAudioBlob = jest.fn();
const mockSaveVoiceNotes = jest.fn();

describe("Recorder Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show 'Recording not started' by default", () => {
    customRender(
      <Recorder
        saveAudioBlob={mockSaveAudioBlob}
        saveVoiceNotes={mockSaveVoiceNotes}
      />
    );
    expect(screen.getByTestId(RECORDING_STATE_LABEL_TESTID)).toHaveTextContent(
      "Recording not started"
    );
  });

  it("should show 'Recording started' when recording begins", async () => {
    customRender(
      <Recorder
        saveAudioBlob={mockSaveAudioBlob}
        saveVoiceNotes={mockSaveVoiceNotes}
      />
    );
    const recordButton = screen.getByTestId(START_RECORDING_BUTTON_TESTID);

    await user.click(recordButton); // Use userEvent for better simulation

    expect(screen.getByTestId(RECORDING_STATE_LABEL_TESTID)).toHaveTextContent(
      "Recording started"
    );

    expect(startRecordingFn).toBeCalledTimes(1);
  });

  it("should show 'Recording stopped' when recording stops", async () => {
    customRender(
      <Recorder
        saveAudioBlob={mockSaveAudioBlob}
        saveVoiceNotes={mockSaveVoiceNotes}
      />
    );
    const recordButton = screen.getByTestId(START_RECORDING_BUTTON_TESTID);
    await user.click(recordButton);
    await user.click(recordButton);

    expect(screen.getByTestId(RECORDING_STATE_LABEL_TESTID)).toHaveTextContent(
      "Recording stopped"
    );

    expect(startRecordingFn).toBeCalledTimes(1);
    expect(stopRecordingFn).toBeCalledTimes(1);
  });

  it("should show 'Recording paused' when paused", async () => {
    customRender(
      <Recorder
        saveAudioBlob={mockSaveAudioBlob}
        saveVoiceNotes={mockSaveVoiceNotes}
      />
    );
    const recordButton = screen.getByTestId(START_RECORDING_BUTTON_TESTID);
    await user.click(recordButton);
    expect(startRecordingFn).toBeCalledTimes(1);
    const pauseButton = screen.getByTestId(PAUSE_RECORDING_BUTTON_TESTID);
    await user.click(pauseButton);
    expect(pauseRecordingFn).toBeCalledTimes(1);
    expect(screen.getByTestId(RECORDING_STATE_LABEL_TESTID)).toHaveTextContent(
      "Recording paused"
    );
  });

  it("should show 'Recording resumed' when resumed", async () => {
    customRender(
      <Recorder
        saveAudioBlob={mockSaveAudioBlob}
        saveVoiceNotes={mockSaveVoiceNotes}
      />
    );
    const recordButton = screen.getByTestId(START_RECORDING_BUTTON_TESTID);
    await user.click(recordButton);
    const pauseButton = screen.getByTestId(PAUSE_RECORDING_BUTTON_TESTID);
    await user.click(pauseButton);
    expect(pauseRecordingFn).toBeCalledTimes(1);
    await user.click(pauseButton);
    expect(resumeRecordingFn).toBeCalledTimes(1);

    expect(screen.getByTestId(RECORDING_STATE_LABEL_TESTID)).toHaveTextContent(
      "Recording resumed"
    );
  });
});
