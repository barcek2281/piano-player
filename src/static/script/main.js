const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const voices = {};

// document.addEventListener("mousedown", (event) => {
//   if (event.target.classList.contains("piano__key")) {
//     const noteAudio = document.getElementById(event.target.dataset.note);
//     console.log(noteAudio);
//     noteAudio.currentTime = 0;
//     noteAudio.play();
//   }
// });

// document.addEventListener("mouseup", (event) => {
//   if (event.target.classList.contains("piano__key")) {
//     const noteAudio = document.getElementById(event.target.dataset.note);
//     setTimeout(() => {
//       noteAudio.pause();
//       noteAudio.currentTime = 0;
//     }, 150);
//   }
// });

document.addEventListener("mousedown", (event) => {
  if (!event.target.classList.contains("piano__key")) return;
  event.target.classList.toggle("active", true);
  const key = event.target.dataset.key;
  const freq = Number(event.target.dataset.freq);

  const now = audioCtx.currentTime;

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();

  const gain = audioCtx.createGain();

  osc1.type = "triangle";
  osc2.type = "sine";

  osc1.frequency.value = freq;
  osc2.frequency.value = freq * 2;

  osc2.detune.value = 4;

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.9, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);

  osc1.start(now);
  osc2.start(now);

  voices[key] = { osc1, osc2, gain };
});

document.addEventListener("mouseup", (event) => {
  if (!event.target.classList.contains("piano__key")) return;
  event.target.classList.toggle("active", false);

  const key = event.target.dataset.key;
  const voice = voices[key];
  if (!voice) return;

  const now = audioCtx.currentTime;

  voice.gain.gain.cancelScheduledValues(now);
  voice.gain.gain.setValueAtTime(Math.max(voice.gain.gain.value, 0.001), now);
  voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

  voice.osc1.stop(now + 0.16);
  voice.osc2.stop(now + 0.16);

  delete voices[key];
});
