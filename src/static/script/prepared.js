import { playNote } from "./piano.js";
const inputFile = document.getElementById("input-file");
const playBtn = document.getElementById("play");
const stopBtn = document.getElementById("stop");

const timeouts = [];
let userFile = null;

inputFile.addEventListener("change", (event) => {
  event.preventDefault();
  userFile = inputFile.files[0];
  playBtn.classList.add("active");
});

playBtn.addEventListener("click", async ()=> {
    if (!userFile) return;
    const content = await userFile.text();
    const jsonContent = JSON.parse(content);
    playMusic(jsonContent.notes);
    stopBtn.classList.add("active");
    playBtn.classList.remove("active");
});

stopBtn.addEventListener("click", ()=> {
    if (!userFile) return;
    stopBtn.classList.remove("active");
    for(let timeout of timeouts) {
        clearTimeout(timeout);
    }
    if (!playBtn.classList.contains("active")) {
        playBtn.classList.add("active");
    }
});

/**
 * 
 * @param {Object[]} notes 
 */
function playMusic(notes) {
    for(let note of notes) {
        const timeout = setTimeout(() => {
            playNote(note.note, true);
        }, note.startTime);
        timeouts.push(timeout);
    }
}
