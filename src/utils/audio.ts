/**
 * Audio and Speech Synthesis helper for the Volcano Adventure game
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sound effects using Web Audio API synthesis
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {
    console.debug('Audio not allowed yet:', e);
  }
}

export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.26);
    });
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

export function playWrongSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

export function playEruptionSound() {
  try {
    const ctx = getAudioContext();
    // Pink/Brown noise burst for volcano rumble
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.5);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 1.5);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

// Web Speech API Text-to-Speech (Indonesian voice preference)
let isSpeakingState = false;

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeakingState = false;
}

export function speakText(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: unknown) => void;
  }
) {
  if (!isSpeechSupported()) {
    callbacks?.onEnd?.();
    return;
  }

  stopSpeaking();

  // Clean text from emojis or markdown symbols that could confuse speech synthesizer
  const cleanText = text
    .replace(/[#*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'id-ID';
  utterance.rate = 0.95; // Slightly slower, very clear for 6th grade SD
  utterance.pitch = 1.05; // Friendly, engaging tone

  // Attempt to select an Indonesian voice if available
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(
    (v) => v.lang.toLowerCase().includes('id') || v.name.toLowerCase().includes('indonesia')
  );
  if (idVoice) {
    utterance.voice = idVoice;
  }

  utterance.onstart = () => {
    isSpeakingState = true;
    callbacks?.onStart?.();
  };

  utterance.onend = () => {
    isSpeakingState = false;
    callbacks?.onEnd?.();
  };

  utterance.onerror = (e) => {
    isSpeakingState = false;
    callbacks?.onError?.(e);
    callbacks?.onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}
