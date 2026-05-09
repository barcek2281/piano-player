import { state } from "./main.js";

const keyMap = {
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
  KeyU: "B3"
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
    const key = pianoKey.dataset.note;
    pianoKey.addEventListener("mousedown", () => {
        playNote(key);
        pianoKey.classList.add("active");
    });

     pianoKey.addEventListener("mouseup", () => {
        pianoKey.classList.remove("active");
    });
});


// init input from keyboard
document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code in keyMap) {
        const note = keyMap[event.code];
        if(!state.pressedKey.has(note)) {
            playNote(note);
            state.pressedKey.add(note);
            const elementPianoKey = notesAndPianoKeys[note];
            elementPianoKey.classList.add("active");
        }
    }
});

document.addEventListener("keyup", (event) => {
    event.preventDefault();
    const code = event.code;
    const note = keyMap[event.code];
    if (code in keyMap && state.pressedKey.has(note)) {
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
    console.log("this file is playing: ", filename);
}

/**
 * 
 * @param {string} note 
 */
export function playNote(note){
    const filename = `src/static/notes/old/${note}.mp3`;
    playAudio(filename);
}