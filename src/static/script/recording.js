import { state } from "./main.js";

const recordingBtn = document.getElementById("Record");
const stopRecordingBtn = document.getElementById("stopRecord");
const downloadRecord = document.getElementById("downloadRecord");

recordingBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (state.mode !== "interactive") {
    return;
  }
  if (state.isRecording) {
    const answer = confirm("Are you sure?, your record will be lost");
    if (!answer) {
      return;
    }
    state.isRecording = false;
    state.recording = [];
  }
  recordingBtn.classList.remove("active");
  state.isRecording = true;
  stopRecordingBtn.classList.add("active");
  downloadRecord.classList.remove("active");
  state.startedTime = Date.now();
});

stopRecordingBtn.addEventListener("click", () => {
  if (!state.isRecording) {
    return;
  }
  state.isRecording = false;
  console.log("clicked to stop recording");
  downloadRecord.classList.add("active");
  stopRecordingBtn.classList.remove("active");
  recordingBtn.classList.add("active");
});

downloadRecord.addEventListener("click", async () => {
  try {
    await getNewFileHandle(state.recording);
  } catch (err) {
    console.error(err);
  }
});

async function getNewFileHandle(content) {
  const options = {
    types: [
      {
        accept: {
          "application/json": [".json"],
        },
      },
    ],
  };
  const handle = await window.showSaveFilePicker(options);
  const writable = await handle.createWritable();
  const file = {
    name: handle.name.slice(0, handle.name.length - 5),
    duration: sumOfDuration(content),
    notes: content,
  };

  await writable.write(JSON.stringify(file, null, 2));
  await writable.close();
  return handle;
}

function sumOfDuration(notes) {
  let sum = 0;
  for (let note of notes) {
    sum += note.duration;
  }
  return sum;
}
