import { playNote } from "./piano.js";
const inputFile = document.getElementById("input-file");
const playBtn = document.getElementById("play");
const stopBtn = document.getElementById("stop");
const speedRng = document.getElementById("speed");
const speedLbl = document.querySelector("label");

const timeouts = [];
let userFile = null;

inputFile.addEventListener("change", (event) => {
  event.preventDefault();
  userFile = inputFile.files[0];
  playBtn.classList.add("active");
});
// start mucis
playBtn.addEventListener("click", async ()=> {
    if (!userFile) return;
    const content = await userFile.text();
    const jsonContent = JSON.parse(content);
    const speed = speedRng.value;
    playMusic(jsonContent.notes, speed);
    stopBtn.classList.add("active");
    playBtn.classList.remove("active");
});

stopBtn.addEventListener("click", ()=> {
    if (!userFile) return;
    stopBtn.classList.remove("active");
    stopMusic(timeouts);
    if (!playBtn.classList.contains("active")) {
        playBtn.classList.add("active");
    }
});

speedRng.addEventListener("input", async function(){
    speedLbl.textContent = `${this.value}x`;
      if (!userFile) return;
      if (!stopBtn.classList.contains("active")) {
return;
      }
    const content = await userFile.text();
    const jsonContent = JSON.parse(content);
    stopMusic(timeouts);
    playMusic(jsonContent.notes, this.value);
});

/**
 * 
 * @param {Object[]} notes 
 */
function playMusic(notes, speed=1) {
    for(let note of notes) {
        const timeout = setTimeout(() => {
            playNote(note.note, true);
        }, note.startTime / speed);
        timeouts.push(timeout);
    }
}

function stopMusic(timeoutIds) {
    for(let timeout of timeoutIds) {
        clearTimeout(timeout);
    }
}