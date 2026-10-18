import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  Layers,
  CheckCircle,
  Lightbulb,
  FileText,
  Puzzle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Square,
  Play,
} from 'lucide-react';
import { TEKS_EKSPLANASI_DATA } from '../data/volcanoData';
import { speakText, stopSpeaking, playClickSound, playSuccessSound, playWrongSound } from '../utils/audio';

export const ExplanationTextViewer: React.FC = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tahap' | 'utuh' | 'game'>('tahap');
  const [isReadingFull, setIsReadingFull] = useState<boolean>(false);

  // Mini-game state for matching text snippets to explanation text structures
  const sampleSnippets = [
    {
      id: 's1',
      text: 'Gunung meletus merupakan fenomena alam keluarnya endapan magma dari perut bumi karena dorongan gas bertekanan tinggi.',
      correctCategory: 'Pernyataan Umum',
    },
    {
      id: 's2',
      text: 'Magma di kedalaman bumi mencair karena suhu di atas 1.000°C lalu naik menembus retakan pipa kepundan.',
      correctCategory: 'Deretan Penjelas',
    },
    {
      id: 's3',
      text: 'Tekanan gas yang kuat meledakkan kawah, menyemburkan awan panas dan lava pijar ke lereng gunung.',
      correctCategory: 'Deretan Penjelas',
    },
    {
      id: 's4',
      text: 'Meskipun berbahaya, abu vulkanik letusan gunung berapi dalam jangka panjang menyuburkan tanah pertanian.',
      correctCategory: 'Penutup',
    },
  ];

  const [snippetPlacements, setSnippetPlacements] = useState<Record<string, string>>({});
  const [gameChecked, setGameChecked] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);

  const currentSection = TEKS_EKSPLANASI_DATA[activeSectionIndex];

  const handleReadSection = (speech: string) => {
    speakText(speech);
  };

  const handlePlaceSnippet = (snippetId: string, category: string) => {
    playClickSound();
    setSnippetPlacements((prev) => ({
      ...prev,
      [snippetId]: category,
    }));
    setGameChecked(false);
  };

  const handleCheckGame = () => {
    let score = 0;
    sampleSnippets.forEach((sn) => {
      if (snippetPlacements[sn.id] === sn.correctCategory) {
        score += 1;
      }
    });
    setGameScore(score);
    setGameChecked(true);

    if (score === sampleSnippets.length) {
      playSuccessSound();
      speakText('Luar biasa Kawan! Kamu berhasil menempatkan seluruh kalimat ke struktur teks eksplanasi yang tepat! Sempurna!');
    } else {
      playWrongSound();
      speakText(`Bagus Kawan! Kamu berhasil mencocokkan ${score} dari ${sampleSnippets.length} bagian. Coba periksa kembali kotak yang belum tepat ya!`);
    }
  };

  const handleResetGame = () => {
    playClickSound();
    setSnippetPlacements({});
    setGameChecked(false);
    setGameScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Visual Roadmap Linking Teks Eksplanasi to Volcano Phenomena */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-5 rounded-3xl shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span className="text-xs font-extrabold uppercase tracking-widest bg-black/20 px-3 py-0.5 rounded-full">
              Kurikulum Bahasa Indonesia & IPA Kelas 6 SD
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(
                'Teks Eksplanasi tentang gunung meletus tersusun atas 3 bagian pokok: 1. Pernyataan Umum berisi pengertian gunung meletus, 2. Deretan Penjelas berisi urutan kronologis terjadinya letusan, dan 3. Penutup berisi kesimpulan serta manfaat tanah subur.'
              )
            }
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-orange-700 text-xs font-extrabold hover:bg-orange-50 shadow-xs"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengarkan Ringkasan 3 Struktur</span>
          </button>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Hubungan Struktur Teks Eksplanasi & Proses Gunung Meletus
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 mt-0.5">
            Setiap tahapan sains gunung berapi terangkai secara ilmiah ke dalam 3 struktur baku teks eksplanasi:
          </p>
        </div>

        {/* 3 Step Interactive Visual Connection Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
          <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">Bagian 1</span>
            <h4 className="font-extrabold text-sm text-white">1. Pernyataan Umum</h4>
            <p className="text-[11px] text-orange-100 mt-1 leading-snug">
              <strong>Pengertian Gunung Meletus</strong>: Menjawab <em>apa itu</em> gunung berapi dan peristiwa keluarnya magma dari perut bumi.
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold bg-white text-orange-700 px-2 py-0.5 rounded-md">
              📍 Terhubung di Pos 1
            </span>
          </div>

          <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">Bagian 2</span>
            <h4 className="font-extrabold text-sm text-white">2. Deretan Penjelas</h4>
            <p className="text-[11px] text-orange-100 mt-1 leading-snug">
              <strong>Urutan Proses Letusan</strong>: Menjawab <em>bagaimana & mengapa</em> magma naik, gas menekan, semburan awan panas, hingga lahar dingin.
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold bg-white text-orange-700 px-2 py-0.5 rounded-md">
              📍 Terhubung di Pos 3 & 4
            </span>
          </div>

          <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">Bagian 3</span>
            <h4 className="font-extrabold text-sm text-white">3. Penutup (Kesimpulan)</h4>
            <p className="text-[11px] text-orange-100 mt-1 leading-snug">
              <strong>Interpretasi & Dampak</strong>: Menjawab kesimpulan manfaat tanah vulkanik yang subur serta kesiapan mitigasi bencana.
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold bg-white text-orange-700 px-2 py-0.5 rounded-md">
              📍 Terhubung di Pos 6
            </span>
          </div>
        </div>
      </div>

      {/* View Mode Toggle: 3 Modes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-100/70 p-3 rounded-2xl border border-amber-200">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-600" />
          <span className="font-extrabold text-stone-900 text-sm">
            Eksplorasi Materi Teks Eksplanasi:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-amber-200 shadow-xs">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setViewMode('tahap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'tahap'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Pelajari Per Struktur
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setViewMode('utuh');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'utuh'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Baca Teks Utuh
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setViewMode('game');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'game'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Puzzle className="w-3.5 h-3.5" />
            <span>Misi Susun Struktur</span>
          </button>
        </div>
      </div>

      {/* MODE 1: PELAJARI PER STRUKTUR */}
      {viewMode === 'tahap' && (
        <div className="space-y-5">
          {/* Section Step Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TEKS_EKSPLANASI_DATA.map((sec, idx) => {
              const isSelected = idx === activeSectionIndex;
              return (
                <button
                  key={sec.category}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveSectionIndex(idx);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-white border-orange-600 shadow-md ring-2 ring-orange-300'
                      : 'bg-white text-stone-800 border-amber-200 hover:bg-amber-50 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Struktur {idx + 1}
                    </span>
                    {isSelected && <span className="text-xs">✨</span>}
                  </div>
                  <h3 className="font-extrabold text-sm mt-1">{sec.title}</h3>
                  <p
                    className={`text-xs mt-1 line-clamp-2 ${
                      isSelected ? 'text-orange-100' : 'text-stone-500'
                    }`}
                  >
                    {sec.shortSummary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Content of Active Section */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Kategori Struktur Teks: {currentSection.category}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-0.5">
                  {currentSection.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    handleReadSection(currentSection.guideSpeech);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors"
                  title="Dengarkan penjelasan pengantar Kapten Nala"
                >
                  <Volume2 className="w-4 h-4 text-orange-600" />
                  <span>Petunjuk Kapten</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    const fullText = `${currentSection.title}. ${currentSection.shortSummary}. ${currentSection.content.join(' ')}`;
                    handleReadSection(fullText);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 shadow-xs active:scale-95 transition-all"
                  title="Pemandu membaca seluruh isi paragraf bagian ini secara lengkap"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Baca Lengkap Isi Paragraf Ini</span>
                </button>
              </div>
            </div>

            {/* Paragraph Content */}
            <div className="space-y-3.5">
              {currentSection.content.map((paragraph, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/80 text-stone-800 text-sm sm:text-base leading-relaxed flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {pIdx + 1}
                  </span>
                  <p className="flex-1">{paragraph}</p>
                </div>
              ))}
            </div>

            {/* Key Vocabulary Terms */}
            <div className="bg-orange-50/70 p-5 rounded-2xl border border-orange-200 space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-orange-600" />
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Kosakata Sains & Istilah Penting dalam Bagian Ini:
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentSection.keyTerms.map((term, tIdx) => (
                  <div
                    key={tIdx}
                    className="bg-white p-3.5 rounded-xl border border-orange-100 shadow-2xs"
                  >
                    <span className="font-extrabold text-xs text-orange-700 block">
                      {term.term}
                    </span>
                    <p className="text-xs text-stone-600 mt-1">{term.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: BACA TEKS UTUH */}
      {viewMode === 'utuh' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto pb-4 border-b border-stone-100">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
              Contoh Karangan Teks Eksplanasi Lengkap
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
              Proses Terjadinya Gunung Meletus
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Materi Terpadu Bahasa Indonesia & IPA Kelas 6 SD
            </p>
          </div>

          <div className="space-y-6">
            {TEKS_EKSPLANASI_DATA.map((section, idx) => (
              <div key={idx} className="space-y-2 bg-amber-50/30 p-5 rounded-2xl border border-amber-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide">
                      {section.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                    {section.category}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-stone-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Audio Reading Controls for Full Text */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isReadingFull ? (
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setIsReadingFull(false);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-md animate-pulse active:scale-95 transition-all"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>Hentikan Pembacaan Teks</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsReadingFull(true);
                  const fullReading = [
                    'Karangan Teks Eksplanasi Lengkap: Proses Terjadinya Gunung Meletus.',
                    'Bagian Pertama: Pernyataan Umum.',
                    ...TEKS_EKSPLANASI_DATA[0].content,
                    'Bagian Kedua: Deretan Penjelas Urutan Proses Letusan.',
                    ...TEKS_EKSPLANASI_DATA[1].content,
                    'Bagian Ketiga: Penutup atau Kesimpulan dan Mitigasi Bencana.',
                    ...TEKS_EKSPLANASI_DATA[2].content,
                  ].join(' ');
                  speakText(fullReading, {
                    onEnd: () => setIsReadingFull(false),
                    onError: () => setIsReadingFull(false),
                  });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 text-white font-extrabold text-xs sm:text-sm hover:bg-orange-600 shadow-md active:scale-95 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Pembacaan Seluruh Teks Lengkap (3 Bagian)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsReadingFull(false);
                speakText(
                  'Teks Eksplanasi: Proses Terjadinya Gunung Meletus. Terdiri dari 1. Pernyataan umum tentang pengertian gunung meletus, 2. Deretan penjelas tentang proses bertahap dari dapur magma hingga letusan erupsi, dan 3. Penutup tentang kesimpulan manfaat tanah subur serta langkah mitigasi warga.'
                );
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Dengarkan Ringkasan Singkat Saja</span>
            </button>
          </div>

          {isReadingFull && (
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-orange-700 bg-orange-100/90 border border-orange-300 px-4 py-1.5 rounded-full animate-bounce">
                📢 Kapten Nala sedang membacakan seluruh teks bacaan secara lengkap...
              </span>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: GAME SUSUN STRUKTUR TEKS EKSPLANASI */}
      {viewMode === 'game' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🎮</span>
                <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
                  Mini-Game Penjelajah Bahasa
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">
                Misi Tantangan: Susun Potongan Kalimat ke Strukturnya!
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Tentukan apakah setiap kalimat di bawah termasuk <strong>Pernyataan Umum</strong>, <strong>Deretan Penjelas</strong>, atau <strong>Penutup</strong>!
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                speakText(
                  'Ayo Kawan! Cocokkan setiap potongan kalimat ilmiah ke dalam 3 struktur teks eksplanasi yang tepat. Tekan tombol Periksa Jawaban setelah selesai!'
                )
              }
              className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200"
            >
              <Volume2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Petunjuk Kapten Nala</span>
            </button>
          </div>

          {/* List of Sentences to Match */}
          <div className="space-y-4">
            {sampleSnippets.map((sn, sIdx) => {
              const currentChoice = snippetPlacements[sn.id];
              const isCorrect = currentChoice === sn.correctCategory;

              return (
                <div
                  key={sn.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    gameChecked
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-rose-50 border-rose-300'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-extrabold text-xs text-stone-500 uppercase">
                      Kalimat #{sIdx + 1}
                    </span>

                    {gameChecked && (
                      <span
                        className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                        }`}
                      >
                        {isCorrect ? '✓ Tepat!' : `✗ Seharusnya: ${sn.correctCategory}`}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-stone-800 mb-3">{sn.text}</p>

                  {/* 3 Choice Buttons for this snippet */}
                  <div className="flex flex-wrap gap-2">
                    {['Pernyataan Umum', 'Deretan Penjelas', 'Penutup'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handlePlaceSnippet(sn.id, cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          currentChoice === cat
                            ? 'bg-orange-500 text-white border-orange-600 shadow-xs scale-102'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-amber-50 hover:border-orange-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification & Score */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-100">
            <div>
              {gameChecked && (
                <div className="text-xs font-extrabold text-stone-800">
                  Hasil: <span className="text-orange-600 text-sm">{gameScore} dari {sampleSnippets.length} Benar</span>!
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetGame}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Pilihan</span>
              </button>

              <button
                type="button"
                onClick={handleCheckGame}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-extrabold shadow-sm active:scale-98 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Periksa Jawaban Struktur</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
