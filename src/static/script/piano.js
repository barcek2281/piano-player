import { state } from "./main.js";
const keyMap = {
  // Octave 3
  KeyQ: "C3",
  Digit2: "Cb3",
  KeyW: "D3",
  Digit3: "Db3",
  KeyE: "E3",
  KeyR: "F3",
  Digit5: "Fb3",
  KeyT: "G3",
  Digit6: "Gb3",
  KeyY: "A3",
  Digit7: "Ab3",
  KeyU: "B3",

  // Octave 4
  KeyI: "C4",
  Digit9: "Cb4",
  KeyO: "D4",
  Digit0: "Db4",
  KeyP: "E4",
  KeyZ: "F4",
  KeyS: "Fb4",
  KeyX: "G4",
  KeyD: "Gb4",
  KeyC: "A4",
  KeyF: "Ab4",
  KeyV: "B4",

  // Octave 5
  KeyB: "C5",
  KeyH: "Cb5",
  KeyN: "D5",
  KeyJ: "Db5",
  KeyM: "E5",
};

const pianoKeys = document.querySelectorAll(".piano__key");
export const notesAndPianoKeys = {};

for (let key in keyMap) {
  const note = keyMap[key];
  for (let pianoKey of pianoKeys) {
    if (pianoKey.dataset.note === note) {
      notesAndPianoKeys[note] = pianoKey;
    }
  }
}

// init piano key by mouse
pianoKeys.forEach((pianoKey) => {
  if (state.mode !== "interactive") {
    return;
  }
  const note = pianoKey.dataset.note;
  pianoKey.addEventListener("mousedown", () => {
    if (state.mode !== "interactive") {
      return;
    }
    playNote(note);
  });
   pianoKey.addEventListener("mouseup", () => {
    pianoKey.classList.remove("active");
  });

  pianoKey.addEventListener("mouseleave", () => {
    pianoKey.classList.remove("active");
  });
});

// init input from keyboard
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code in keyMap) {
    if (state.mode !== "interactive") {
      return;
    }
    const note = keyMap[event.code];
    if (!state.pressedKey.has(note)) {
      playNote(note);
    }
  }
});

document.addEventListener("keyup", (event) => {
  event.preventDefault();
  const code = event.code;
  const note = keyMap[event.code];
  if (code in keyMap && state.pressedKey.has(note)) {
    if (state.mode !== "interactive") {
      return;
    }
    state.pressedKey.delete(note);
    const elementPianoKey = notesAndPianoKeys[note];
    elementPianoKey.classList.remove("active");
  }
});

/**
 *
 * @param {string} filename
 */
export function playAudio(filename) {
  const audio = new Audio(filename);
  audio.play();
}

/**
 *
 * @param {string} note
 */
export function playNote(note, isTimeout = false) {
  state.pressedKey.add(note);
  const elementPianoKey = notesAndPianoKeys[note];
  elementPianoKey.classList.add("active");

  if (state.isRecording) {
    state.recording.push({
      note: note,
      startTime: Date.now() - state.startedTime,
      duration: 2000,
    });
  }
  if (isTimeout) {
    setTimeout(() => {
      elementPianoKey.classList.remove("active");
    }, 2000);
  }
  const filename = `src/static/notes/${note}.mp3`;
  playAudio(filename);
}
