
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
  }

}

export const state = new State();
