import React, { useState, useEffect } from 'react';
import {
  Mountain,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { StageId } from './types';
import { STAGES, PENJELASAN_SINGKAT, TEKS_EKSPLANASI_DATA } from './data/volcanoData';
import { StoryboardMap } from './components/StoryboardMap';
import { SpeakingGuide } from './components/SpeakingGuide';
import { IntroductionSection } from './components/IntroductionSection';
import { ExplanationTextViewer } from './components/ExplanationTextViewer';
import { AnatomyAndSimulation } from './components/AnatomyAndSimulation';
import { QuizSection } from './components/QuizSection';
import { CertificateSection } from './components/CertificateSection';
import { AwanPanasSection } from './components/AwanPanasSection';
import { LaharAndSimulationSection } from './components/LaharAndSimulationSection';
import { playClickSound, speakText, stopSpeaking } from './utils/audio';

export default function App() {
  const [currentStageId, setCurrentStageId] = useState<StageId>('pos1_pengenalan');
  const [completedStages, setCompletedStages] = useState<Set<StageId>>(() => {
    try {
      const saved = localStorage.getItem('volcano_completed_stages');
      return saved ? new Set(JSON.parse(saved)) : new Set(['pos1_pengenalan']);
    } catch {
      return new Set(['pos1_pengenalan']);
    }
  });
  const [quizScore, setQuizScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('volcano_quiz_score');
      return saved ? Number(saved) : 30;
    } catch {
      return 30;
    }
  });

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem('volcano_completed_stages', JSON.stringify(Array.from(completedStages)));
      localStorage.setItem('volcano_quiz_score', String(quizScore));
    } catch {
      // ignore
    }
  }, [completedStages, quizScore]);

  const currentStageIndex = STAGES.findIndex((s) => s.id === currentStageId);
  const currentStage = STAGES[currentStageIndex] || STAGES[0];

  // Dynamic speech script for the current stage with Kapten Nala personality
  const getStageSpeech = (id: StageId): string => {
    switch (id) {
      case 'pos1_pengenalan':
        return PENJELASAN_SINGKAT.suaraPemandu;
      case 'pos2_eksplanasi':
        return 'Kawan! Di Pos 2 Lembah Bahasa ini, kita meneliti 3 struktur teks eksplanasi: pernyataan umum, deretan penjelas proses letusan bertahap, dan penutup atau kesimpulan. Pelajari dengan teliti!';
      case 'pos3_awan_panas':
        return 'Awas Kawan, pasang masker dan kacamata pelindung! Di Pos 3 Kawah Awan Panas, kita mengamati wedhus gembel bersuhu 600 derajat Celsius yang meluncur di lereng gunung! Klik titik hot-spot untuk mempelajarinya!';
      case 'pos4_lahar_video':
        return 'Waspada di dekat bantaran sungai, Kawan! Pos 4 menunjukkan banjir lahar dingin yang dipicu guyuran air hujan deras di puncak gunung. Amati fotonya, tonton video letusan, dan uji lab simulator kita!';
      case 'pos5_kuis':
        return 'Saatnya ujian keberanian, Kawan! Jawab 3 soal tantangan dari Kapten Nala untuk mengumpulkan total 30 koin poin emas! Setiap jawaban benar bernilai 10 poin!';
      case 'pos6_sertifikat':
        return 'Hore! Luar biasa Kawan! Kamu berhasil menyelesaikan seluruh ekspedisi pulau gunung berapi! Masukkan namamu dan unduh Piagam Master Penjelajah Vulkanik bersamaku!';
      default:
        return 'Ahoy Kawan! Ayo lanjutkan penjelajahan pulau gunung berapi bersama Kapten Nala!';
    }
  };

  const handleSelectStage = (id: StageId) => {
    setCurrentStageId(id);
    setCompletedStages((prev) => new Set([...prev, id]));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStage = () => {
    playClickSound();
    if (currentStageIndex < STAGES.length - 1) {
      const nextId = STAGES[currentStageIndex + 1].id;
      handleSelectStage(nextId);
    }
  };

  const handlePrevStage = () => {
    playClickSound();
    if (currentStageIndex > 0) {
      const prevId = STAGES[currentStageIndex - 1].id;
      handleSelectStage(prevId);
    }
  };

  const handleQuizDone = (score: number) => {
    setQuizScore(score);
    setCompletedStages((prev) => new Set([...prev, 'pos5_kuis', 'pos6_sertifikat']));
  };

  return (
    <div className="min-h-screen bg-[#fffdf7] text-stone-900 pb-16 selection:bg-orange-500 selection:text-white">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xs flex-shrink-0">
              <img
                src="/src/assets/images/kapten_nala_1791906531237.jpg"
                alt="Kapten Nala"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-stone-900 tracking-tight block leading-tight">
                Ekspedisi Vulkanik Kapten Nala
              </span>
              <span className="text-[11px] text-orange-600 font-bold block leading-none">
                Game Penjelajah Gunung Meletus · Kelas 6 SD
              </span>
            </div>
          </div>

          {/* Quick Header Stage Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectStage('pos3_awan_panas')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-bold border border-orange-200 transition-all shadow-2xs"
              title="Lihat Visual Awan Panas & Letusan"
            >
              <span>🌋 Awan Panas</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectStage('pos4_lahar_video')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold border border-amber-200 transition-all shadow-2xs"
              title="Lihat Visual Lahar Dingin"
            >
              <span>🌊 Lahar Dingin</span>
            </button>

            <button
              type="button"
              disabled={currentStageIndex === 0}
              onClick={handlePrevStage}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                currentStageIndex === 0
                  ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                  : 'border-amber-200 text-stone-700 hover:bg-amber-50 active:scale-95'
              }`}
              title="Pos Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-extrabold text-stone-700 bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-200 hidden sm:inline-block">
              Pos {currentStageIndex + 1} / {STAGES.length}
            </span>

            <button
              type="button"
              disabled={currentStageIndex === STAGES.length - 1}
              onClick={handleNextStage}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                currentStageIndex === STAGES.length - 1
                  ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                  : 'border-orange-300 bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
              }`}
              title="Pos Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Interactive Storyboard Map Navigator */}
        <StoryboardMap
          currentStageId={currentStageId}
          completedStages={completedStages}
          onSelectStage={handleSelectStage}
        />

        {/* Talking Guide Widget for Current Pos with Kapten Nala */}
        <SpeakingGuide
          currentSpeech={getStageSpeech(currentStageId)}
          guideName="Kapten Nala"
          subtitle="Komandan Ekspedisi Sains Vulkanik"
        />

        {/* Dynamic Pos Content */}
        <div className="pt-2">
          {currentStageId === 'pos1_pengenalan' && (
            <IntroductionSection
              onContinue={() => handleSelectStage('pos2_eksplanasi')}
              onJumpToAnimation={() => handleSelectStage('pos3_awan_panas')}
            />
          )}

          {currentStageId === 'pos2_eksplanasi' && <ExplanationTextViewer />}

          {currentStageId === 'pos3_awan_panas' && (
            <AwanPanasSection onContinue={() => handleSelectStage('pos4_lahar_video')} />
          )}

          {currentStageId === 'pos4_lahar_video' && (
            <LaharAndSimulationSection onContinue={() => handleSelectStage('pos5_kuis')} />
          )}

          {currentStageId === 'pos5_kuis' && <QuizSection onQuizCompleted={handleQuizDone} />}

          {currentStageId === 'pos6_sertifikat' && <CertificateSection quizScore={quizScore} />}
        </div>

        {/* Bottom Stage Navigation Bar (Large Friendly Page Switch Buttons) */}
        <div className="mt-10 pt-6 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            disabled={currentStageIndex === 0}
            onClick={handlePrevStage}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl border font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
              currentStageIndex === 0
                ? 'border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50'
                : 'border-amber-300 text-stone-800 bg-white hover:bg-amber-50 active:scale-98 shadow-xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Pos Sebelumnya</span>
          </button>

          <div className="text-xs text-stone-500 text-center">
            Sedang Mempelajari:{' '}
            <span className="font-extrabold text-stone-800">{currentStage.title}</span>
          </div>

          <button
            type="button"
            disabled={currentStageIndex === STAGES.length - 1}
            onClick={handleNextStage}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
              currentStageIndex === STAGES.length - 1
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-98'
            }`}
          >
            <span>Lanjut ke Pos Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-stone-400 border-t border-amber-200/60 pt-6">
        <p>Media Pembelajaran IPA & Bahasa Indonesia Kelas 6 SD · Materi Gunung Meletus</p>
      </footer>
    </div>
  );
}
