import React, { useState } from 'react';
import { Volume2, BookOpen, Layers, CheckCircle, Lightbulb, FileText } from 'lucide-react';
import { TEKS_EKSPLANASI_DATA } from '../data/volcanoData';
import { speakText, playClickSound } from '../utils/audio';

export const ExplanationTextViewer: React.FC = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tahap' | 'utuh'>('tahap');

  const currentSection = TEKS_EKSPLANASI_DATA[activeSectionIndex];

  const handleReadSection = (speech: string) => {
    speakText(speech);
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-100/70 p-3 rounded-2xl border border-amber-200">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-600" />
          <span className="font-extrabold text-stone-900 text-sm">
            Struktur Teks Eksplanasi (Bahasa Indonesia Kelas 6 SD)
          </span>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-amber-200 shadow-xs">
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
            Pelajari Per Bagian
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
            Baca Teks Lengkap
          </button>
        </div>
      </div>

      {viewMode === 'tahap' ? (
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
                      Bagian {idx + 1}
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
                  {currentSection.category}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-0.5">
                  {currentSection.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleReadSection(currentSection.guideSpeech)}
                className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-orange-600" />
                <span>Bacakan Penjelasan Bagian Ini</span>
              </button>
            </div>

            {/* Paragraph Content */}
            <div className="space-y-3.5">
              {currentSection.content.map((paragraph, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/80 text-stone-800 text-sm sm:text-base leading-relaxed"
                >
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            {/* Key Vocabulary Terms */}
            <div className="bg-orange-50/70 p-5 rounded-2xl border border-orange-200 space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-orange-600" />
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Kosakata Sains & Istilah Penting:
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentSection.keyTerms.map((term, tIdx) => (
                  <div
                    key={tIdx}
                    className="bg-white p-3 rounded-xl border border-orange-100 shadow-2xs"
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
      ) : (
        /* Complete Continuous Text View */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto pb-4 border-b border-stone-100">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
              Contoh Teks Eksplanasi Lengkap
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
              Proses Terjadinya Gunung Meletus
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Materi Pembelajaran Bahasa Indonesia & IPA Kelas 6 SD
            </p>
          </div>

          <div className="space-y-6">
            {TEKS_EKSPLANASI_DATA.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                    {section.title}
                  </h4>
                </div>

                <div className="pl-8 space-y-2.5">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-stone-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-center">
            <button
              type="button"
              onClick={() =>
                speakText(
                  'Teks Eksplanasi: Proses Terjadinya Gunung Meletus. Gunung meletus merupakan fenomena alam yang terjadi akibat endapan magma di dalam perut bumi yang keluar karena dorongan gas bertekanan tinggi. Magma terbentuk di kedalaman bumi, terdorong oleh gas, lalu menyembur lewat kawah menghasilkan lava dan abu vulkanik.'
                )
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs sm:text-sm hover:bg-orange-600 shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Ringkasan Teks Lengkap</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
