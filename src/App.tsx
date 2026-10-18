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
import { kaptenNalaImg, gunungMeletusImg, awanPanasImg, aliranLaharImg, resolveAssetUrl } from './assets/images';
import { ImageModal, ImageModalData } from './components/ImageModal';

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
  const [galleryModalData, setGalleryModalData] = useState<ImageModalData | null>(null);

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
            <button
              type="button"
              onClick={() =>
                setGalleryModalData({
                  title: 'Kapten Nala',
                  subtitle: 'Komandan Ekspedisi Sains Vulkanik Indonesia',
                  src: kaptenNalaImg,
                  fallbackSrc: resolveAssetUrl('images/kapten_nala.jpg'),
                  alt: 'Kapten Nala - Komandan Ekspedisi Sains Vulkanik',
                  caption:
                    'Kapten Nala memandu kawan-kawan kelas 6 SD menjelajahi misteri letusan gunung berapi dengan peta storyboard, teks eksplanasi, kuis, dan piagam sertifikat kelulusan!',
                  speechText:
                    'Ahoy Kawan! Senang sekali bisa berpetualang bersamamu di Ekspedisi Gunung Meletus!',
                  legendItems: [
                    { label: 'Seragam Penjelajah', color: '#d97706', desc: 'Siap meneliti medan vulkanik' },
                    { label: 'Kompas & Teropong', color: '#0284c7', desc: 'Alat navigasi ekspedisi' },
                    { label: 'Bendera Merah Putih', color: '#dc2626', desc: 'Kekayaan geologis Indonesia di Ring of Fire' },
                  ],
                })
              }
              className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xs flex-shrink-0 cursor-zoom-in transition-transform hover:scale-105 active:scale-95"
              title="Klik untuk melihat foto Kapten Nala (HD)"
            >
              <img
                src={kaptenNalaImg}
                alt="Kapten Nala"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/kapten_nala.jpg');
                }}
                className="w-full h-full object-cover object-top"
              />
            </button>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-stone-900 tracking-tight block leading-tight">
                Ekspedisi Vulkanik Kapten Nala
              </span>
              <span className="text-[11px] text-orange-600 font-bold block leading-none">
                Game Penjelajah Gunung Meletus · Kelas 6 SD
              </span>
            </div>
          </div>

          {/* Quick Header Stage Controls & HD Gallery Shortcut */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectStage('pos1_pengenalan')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold border border-red-200 transition-all shadow-2xs"
              title="Lihat Detail Erupsi Gunung"
            >
              <span>🌋 Detail Erupsi</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectStage('pos3_awan_panas')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-bold border border-orange-200 transition-all shadow-2xs"
              title="Lihat Visual Awan Panas & Letusan"
            >
              <span>💨 Awan Panas</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectStage('pos4_lahar_video')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold border border-amber-200 transition-all shadow-2xs"
              title="Lihat Visual Lahar Dingin & Video"
            >
              <span>🌊 Lahar & Video</span>
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

        {/* Quick Visual Gallery Strip (4 Gambar Kunci Ekspedisi Kapten Nala) */}
        <section className="bg-white/90 border border-amber-200 rounded-3xl p-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-orange-100 text-orange-600 text-sm font-bold">📸</span>
              <div>
                <h2 className="text-xs sm:text-sm font-extrabold text-stone-900 leading-tight">
                  Galeri Pengamatan Sains Kapten Nala (Visual Utama HD)
                </h2>
                <p className="text-[11px] text-stone-500">
                  4 gambar utama yang diuji tajam & muncul sempurna di GitHub dan Vercel
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 w-fit">
              🔍 Klik Gambar untuk Perbesar (HD Zoom)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {/* Card 1: Kapten Nala */}
            <button
              type="button"
              onClick={() =>
                setGalleryModalData({
                  title: 'Kapten Nala',
                  subtitle: 'Pemandu Ekspedisi Sains Vulkanik',
                  src: kaptenNalaImg,
                  fallbackSrc: resolveAssetUrl('images/kapten_nala.jpg'),
                  alt: 'Kapten Nala',
                  caption:
                    'Kapten Nala adalah pemandu cilik ramah yang menemani siswa kelas 6 SD menjelajahi misteri letusan gunung meletus dengan bahasa sederhana.',
                  speechText: 'Ahoy Kawan! Saya Kapten Nala, siap memandumu menjelajah gunung meletus!',
                  legendItems: [
                    { label: 'Topi Kapten', color: '#f59e0b', desc: 'Jangkar emas tanda komandan' },
                    { label: 'Kompas', color: '#38bdf8', desc: 'Penunjuk arah pulau vulkanik' },
                    { label: 'Badge ID', color: '#ef4444', desc: 'Penjelajah gunung api Indonesia' },
                  ],
                })
              }
              className="group relative rounded-2xl overflow-hidden border border-amber-200 bg-amber-50 text-left transition-all hover:shadow-md hover:border-orange-400 cursor-zoom-in"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={kaptenNalaImg}
                  alt="Kapten Nala"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/kapten_nala.jpg');
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5">
                <span className="text-[10px] font-bold text-orange-600 block">Pemandu Sains</span>
                <h3 className="text-xs font-extrabold text-stone-900 group-hover:text-orange-600">
                  1. Kapten Nala
                </h3>
              </div>
            </button>

            {/* Card 2: Erupsi Gunung Berapi */}
            <button
              type="button"
              onClick={() =>
                setGalleryModalData({
                  title: 'Visualisasi Detail Bagian Erupsi Gunung Berapi',
                  subtitle: 'Anatomi Erupsi & Dapur Magma',
                  src: gunungMeletusImg,
                  fallbackSrc: resolveAssetUrl('images/gunung_meletus.jpg'),
                  alt: 'Visualisasi Detail Bagian Erupsi Gunung Berapi',
                  caption:
                    'Penampang detail erupsi memperlihatkan dapur magma di bawah tanah, saluran pipa kepundan, lubang kawah, kolom abu vulkanik di angkasa, semburan lava pijar, dan lontaran batu bom vulkanik.',
                  speechText:
                    'Perhatikan penampang ini Kawan! Kamu bisa melihat dapur magma di kedalaman bumi yang mendorong letusan dahsyat ini!',
                  legendItems: [
                    { label: 'Magma Chamber', color: '#dc2626', desc: 'Dapur batuan cair pijar' },
                    { label: 'Crater', color: '#f59e0b', desc: 'Kawah mulut letusan' },
                    { label: 'Ash Cloud', color: '#64748b', desc: 'Kolom abu ke angkasa' },
                    { label: 'Lava Flow', color: '#ea580c', desc: 'Lelehan batuan cair' },
                  ],
                })
              }
              className="group relative rounded-2xl overflow-hidden border border-amber-200 bg-amber-50 text-left transition-all hover:shadow-md hover:border-orange-400 cursor-zoom-in"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={gunungMeletusImg}
                  alt="Detail Bagian Erupsi Gunung"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/gunung_meletus.jpg');
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5">
                <span className="text-[10px] font-bold text-red-600 block">Anatomi Erupsi</span>
                <h3 className="text-xs font-extrabold text-stone-900 group-hover:text-orange-600">
                  2. Detail Erupsi Gunung
                </h3>
              </div>
            </button>

            {/* Card 3: Awan Panas */}
            <button
              type="button"
              onClick={() =>
                setGalleryModalData({
                  title: 'Gumpalan Awan Panas (Pyroclastic Flow) Meluncur di Lereng',
                  subtitle: 'Wedhus Gembel Gunung Merapi',
                  src: awanPanasImg,
                  fallbackSrc: resolveAssetUrl('images/awan_panas.jpg'),
                  alt: 'Awan Panas Wedhus Gembel',
                  caption:
                    'Awan panas bersuhu 600°C meluncur deras menuruni lereng Gunung Merapi dengan kecepatan melebihi 100 km/jam, membakar vegetasi dan memicu evakuasi warga.',
                  speechText:
                    'Awas Kawan! Awan panas meluncur sangat kencang dan suhunya 600 derajat Celsius!',
                  legendItems: [
                    { label: 'Awan Panas', color: '#71717a', desc: 'Gas & abu 600°C' },
                    { label: 'Hutan Terbakar', color: '#f97316', desc: 'Dampak suhu ekstrem' },
                    { label: 'Evakuasi Desa', color: '#38bdf8', desc: 'Warga menuju titik kumpul' },
                  ],
                })
              }
              className="group relative rounded-2xl overflow-hidden border border-amber-200 bg-amber-50 text-left transition-all hover:shadow-md hover:border-orange-400 cursor-zoom-in"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={awanPanasImg}
                  alt="Awan Panas Wedhus Gembel"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/awan_panas.jpg');
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5">
                <span className="text-[10px] font-bold text-orange-600 block">Wedhus Gembel</span>
                <h3 className="text-xs font-extrabold text-stone-900 group-hover:text-orange-600">
                  3. Awan Panas di Lereng
                </h3>
              </div>
            </button>

            {/* Card 4: Aliran Lahar Dingin */}
            <button
              type="button"
              onClick={() =>
                setGalleryModalData({
                  title: 'Aliran Banjir Lahar Dingin & Batu-Batu Besar di Sungai',
                  subtitle: 'Lembah Sungai Pasca Erupsi',
                  src: aliranLaharImg,
                  fallbackSrc: resolveAssetUrl('images/aliran_lahar.jpg'),
                  alt: 'Aliran Lahar Dingin di Sungai',
                  caption:
                    'Guyuran hujan lebat di puncak melarutkan jutaan ton endapan abu vulkanik menjadi banjir lumpur pekat yang menggelindingkan batu-batu raksasa di alur sungai.',
                  speechText:
                    'Perhatikan banjir lumpur ini Kawan! Lahar dingin sanggup menggelindingkan batu kali raksasa!',
                  legendItems: [
                    { label: 'Hujan Lebat', color: '#38bdf8', desc: 'Pemicu utama di puncak' },
                    { label: 'Lahar Dingin', color: '#a16207', desc: 'Banjir lumpur abu' },
                    { label: 'Batu Raksasa', color: '#57534e', desc: 'Boulders terbawa arus' },
                    { label: 'Rambu Bahaya', color: '#eab308', desc: 'Peringatan dini sungai' },
                  ],
                })
              }
              className="group relative rounded-2xl overflow-hidden border border-amber-200 bg-amber-50 text-left transition-all hover:shadow-md hover:border-orange-400 cursor-zoom-in"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={aliranLaharImg}
                  alt="Aliran Lahar Dingin di Sungai"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/aliran_lahar.jpg');
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5">
                <span className="text-[10px] font-bold text-amber-700 block">Banjir Vulkanik</span>
                <h3 className="text-xs font-extrabold text-stone-900 group-hover:text-orange-600">
                  4. Lahar Dingin di Sungai
                </h3>
              </div>
            </button>
          </div>
        </section>

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

      {/* Fullscreen HD Image Preview Modal for Gallery & Header */}
      <ImageModal data={galleryModalData} onClose={() => setGalleryModalData(null)} />
    </div>
  );
}
