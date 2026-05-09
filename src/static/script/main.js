
class State {
  initialState = {
    mode: "interactive",
    isRecording: false,
    recording: [],
  };

  constructor() {
    this.mode = "interactive";
    this.isRecording = false;
    this.recording = [];
    this.pressedKey = new Set();
    this.startedTime = null;
  }

}

export const state = new State();
