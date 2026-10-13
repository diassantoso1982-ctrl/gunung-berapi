import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Square, Sparkles } from 'lucide-react';
import { speakText, stopSpeaking, isSpeechSupported } from '../utils/audio';

interface SpeakingGuideProps {
  currentSpeech: string;
  guideName?: string;
  subtitle?: string;
  autoSpeakOnChange?: boolean;
}

export const SpeakingGuide: React.FC<SpeakingGuideProps> = ({
  currentSpeech,
  guideName = 'Kapten Nala',
  subtitle = 'Komandan Ekspedisi Sains Vulkanik',
  autoSpeakOnChange = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    setSpeechSupported(isSpeechSupported());
  }, []);

  // When speech content changes, handle auto speech if user opted in
  useEffect(() => {
    if (autoSpeakOnChange && !isMuted && hasUserInteracted && currentSpeech) {
      handleSpeak();
    }
    return () => {
      stopSpeaking();
      setIsSpeaking(false);
    };
  }, [currentSpeech]);

  const handleSpeak = () => {
    setHasUserInteracted(true);
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    if (isMuted) {
      setIsMuted(false);
    }

    setIsSpeaking(true);
    speakText(currentSpeech, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const toggleMute = () => {
    if (isSpeaking) {
      handleStop();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-gradient-to-r from-amber-100/90 via-orange-50/80 to-amber-100/90 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Real Generated Avatar of Kapten Nala */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <div
            className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shadow-md relative border-2 border-amber-400 bg-amber-50 ${
              isSpeaking ? 'ring-4 ring-orange-500 ring-offset-2 animate-pulse scale-105' : ''
            }`}
          >
            <img
              src="/src/assets/images/kapten_nala_1791906531237.jpg"
              alt="Kapten Nala"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Captain Hat Badge */}
          <span className="absolute -bottom-2 bg-amber-800 text-yellow-300 border border-yellow-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
            ⚓ KAPTEN
          </span>

          {/* Sound waves indicator */}
          {isSpeaking && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-500 items-center justify-center text-[10px] text-white font-bold">
                📢
              </span>
            </span>
          )}
        </div>

        {/* Speech Text and Guide Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-900 text-sm sm:text-base">{guideName}</span>
              <span className="text-xs text-stone-500 hidden sm:inline">· {subtitle}</span>
            </div>

            {/* Speaking Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSpeak}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  isSpeaking
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
                }`}
                title={isSpeaking ? 'Hentikan Suara' : 'Dengarkan Pemandu Berbicara'}
              >
                {isSpeaking ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Berhenti Bicara</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Dengarkan Suara</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-amber-200/60 transition-colors"
                title={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
                aria-label="Toggle mute"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Balloon Speech Bubble */}
          <div className="relative bg-white/90 border border-amber-200 rounded-xl p-3 text-stone-800 text-sm leading-relaxed shadow-xs">
            <p className="italic">
              "{currentSpeech}"
            </p>
            {!speechSupported && (
              <p className="text-[11px] text-amber-700 mt-1">
                Catatan: Perangkat ini dapat membaca teks secara mandiri.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
