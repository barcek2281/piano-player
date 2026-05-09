const interactiveBtn = document.getElementById("interactive");
const preparedBtn = document.getElementById("prepared");
const interactiveMenu = document.querySelector(".recording-mode");
const preparedMenu = document.querySelector(".prepared-mode");
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

interactiveBtn.addEventListener("click", () => {
  interactiveMenu.classList.remove("hidden");
  interactiveBtn.classList.toggle("active");
  preparedBtn.classList.toggle("active");

  preparedMenu.classList.add("hidden");
  state.mode = "interactive";
});

preparedBtn.addEventListener("click", () => {
  preparedMenu.classList.remove("hidden");
  preparedBtn.classList.toggle("active");
  interactiveBtn.classList.toggle("active");


  interactiveMenu.classList.add("hidden");
  state.mode = "prepared";
});

export const state = new State();
