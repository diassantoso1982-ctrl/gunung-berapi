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

// Web Speech API Text-to-Speech (Indonesian voice preference with long-reading support)
let isSpeakingState = false;
let keepAliveTimer: number | null = null;
let currentUtteranceQueue: SpeechSynthesisUtterance[] = [];
let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isCurrentlySpeaking(): boolean {
  return isSpeakingState;
}

function clearKeepAlive() {
  if (keepAliveTimer !== null) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
}

function startKeepAlive() {
  clearKeepAlive();
  // Chrome bug workaround: speech synthesis can stall after ~15s.
  // Periodically toggling pause/resume keeps the audio thread active.
  keepAliveTimer = window.setInterval(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }
  }, 7000);
}

export function stopSpeaking() {
  clearKeepAlive();
  currentUtteranceQueue = [];
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeakingState = false;
}

/**
 * Split text into natural Indonesian sentences suitable for complete, uninterrupted reading.
 */
function splitIntoSentences(text: string): string[] {
  const cleaned = text
    .replace(/[#*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return [];

  // Match sentences ending in ., !, ?, :, or newlines
  const regex = /[^.!?\n]+[.!?\n]*/g;
  const matches = cleaned.match(regex);
  if (!matches || matches.length === 0) {
    return [cleaned];
  }

  const sentences: string[] = [];
  let buffer = '';

  for (const item of matches) {
    const trimmed = item.trim();
    if (!trimmed) continue;

    // If an item is very short (e.g. "Pos 1."), buffer it with the next sentence
    if (trimmed.length < 15 && !trimmed.endsWith('.')) {
      buffer += (buffer ? ' ' : '') + trimmed;
    } else {
      const full = buffer ? `${buffer} ${trimmed}` : trimmed;
      buffer = '';
      // Limit sentence chunk size to ~180 chars to avoid any browser speech buffer overflow
      if (full.length > 200) {
        // Split further by commas if very long
        const subParts = full.split(/,\s+/);
        sentences.push(...subParts.filter(Boolean));
      } else {
        sentences.push(full);
      }
    }
  }

  if (buffer) {
    sentences.push(buffer);
  }

  return sentences.filter((s) => s.length > 0);
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

  const sentences = splitIntoSentences(text);
  if (sentences.length === 0) {
    callbacks?.onEnd?.();
    return;
  }

  const voices = loadVoices();
  // Find Indonesian voice: prefer id-ID, then id, or Indonesian in name
  const idVoice =
    voices.find(
      (v) =>
        v.lang === 'id-ID' ||
        v.lang === 'id_ID' ||
        v.lang.toLowerCase().startsWith('id') ||
        v.name.toLowerCase().includes('indonesia')
    ) || null;

  isSpeakingState = true;
  callbacks?.onStart?.();
  startKeepAlive();

  let currentIndex = 0;

  const speakNextSentence = () => {
    if (currentIndex >= sentences.length) {
      stopSpeaking();
      callbacks?.onEnd?.();
      return;
    }

    const sentenceText = sentences[currentIndex];
    const utterance = new SpeechSynthesisUtterance(sentenceText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92; // Clear, measured pace ideal for Indonesian elementary students
    utterance.pitch = 1.04; // Friendly, warm tone for Kapten Nala

    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onend = () => {
      currentIndex++;
      speakNextSentence();
    };

    utterance.onerror = (e) => {
      // If cancelled intentionally by stopSpeaking, do not treat as fatal error
      if (e.error === 'canceled' || e.error === 'interrupted') {
        clearKeepAlive();
        isSpeakingState = false;
        return;
      }
      console.warn('SpeechSynthesis error on chunk:', e);
      currentIndex++;
      speakNextSentence();
    };

    window.speechSynthesis.speak(utterance);
  };

  speakNextSentence();
}

