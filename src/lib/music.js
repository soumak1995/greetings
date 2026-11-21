/**
 * Ambient sitar-flavored background music — synthesized live with WebAudio
 * (no audio files needed). If a real track exists at public/music.mp3 it is
 * used instead, at gentle volume. Music starts on her first interaction
 * (browsers block sound until then) and persists across page navigation.
 */

const NOTES = {
  // Yaman scale, Mimaj→Swaptami Monk gentle arpeggio in C
  48: 130.81, 55: 196.0,
  60: 261.63, 62: 293.66, 64: 329.63, 66: 369.99,
  68: 415.30, 71: 493.88, 72: 523.25, 74: 587.33, 76: 659.26, 78: 739.99, 83: 987.77,
};

const MELODY = [72, 71, 68, 66, 64, 62, 60, 64, 68, 71, 72, 71, 68, 64, 62, 60];

let ctx = null;
let noteBus = null;
let timer = null;
let step = 0;
let playing = false;
let muted = localStorage.getItem("greetings-muted") === "1";
let audioEl = null;

const midiUp = (n) => n + 12;

function ensureGraph() {
  if (ctx) return;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(ctx.destination);

  // dreamy echo
  const delay = ctx.createDelay(1.5);
  delay.delayTime.value = 0.46;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.4;
  const wet = ctx.createGain();
  wet.gain.value = 0.45;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(master);

  noteBus = ctx.createGain();
  noteBus.gain.value = 0.11;
  noteBus.connect(master);
  noteBus.connect(delay);
}

function pluck(freq, time, { dur = 1.1, gain = 0.5, octaveUp = false } = {}) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(gain, time + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);

  const o1 = ctx.createOscillator();
  o1.type = "triangle";
  o1.frequency.value = freq;
  o1.connect(g);

  const g2 = ctx.createGain();
  g2.gain.value = 0.35;
  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = octaveUp ? freq * 2 : freq;
  o2.connect(g2);
  g2.connect(g);

  g.connect(noteBus);
  o1.start(time);
  o2.start(time);
  o1.stop(time + dur + 0.05);
  o2.stop(time + dur + 0.05);
}

function tick() {
  if (!playing) return;
  const t = ctx.currentTime;
  let n = MELODY[step % MELODY.length];
  if (Math.random() < 0.18) n = midiUp(n); // occasional sparkle
  pluck(NOTES[n] ?? 523.25, t, { gain: 0.45 + Math.random() * 0.15 });

  if (step % 8 === 0) {
    // long low drone for warmth
    pluck(NOTES[48], t, { dur: 3.4, gain: 0.3 });
    if (step % 16 === 8) pluck(NOTES[55], t + 0.05, { dur: 3.0, gain: 0.22 });
  }
  step++;
}

async function tryRealTrack() {
  try {
    const res = await fetch("music.mp3", { method: "HEAD" });
    if (!res.ok) return false;
    audioEl = new Audio("music.mp3");
    audioEl.loop = true;
    audioEl.volume = 0.3;
    await audioEl.play();
    return true;
  } catch {
    return false;
  }
}

/** Start music (call on first user interaction). Returns whether it's playing. */
export async function startMusic() {
  if (playing) return true;
  if (muted) return false;
  if (await tryRealTrack()) {
    playing = true;
    return true;
  }
  ensureGraph();
  await ctx.resume();
  playing = true;
  timer = setInterval(tick, 430);
  tick();
  return true;
}

/** Toggle mute. Returns the new playing state. */
export function toggleMusic() {
  muted = !muted;
  localStorage.setItem("greetings-muted", muted ? "1" : "0");
  if (muted) {
    if (audioEl) audioEl.pause();
    if (timer) clearInterval(timer);
    timer = null;
    playing = false;
  } else {
    startMusic().catch(() => {});
  }
  return playing;
}

export function isPlaying() {
  return playing;
}

export function isMuted() {
  return muted;
}
