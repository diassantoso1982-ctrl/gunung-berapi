import React, { useState } from 'react';
import { Flame, Sparkles, Wind, Lightbulb, Volume2, ArrowRight, Maximize2, Eye } from 'lucide-react';
import { PENJELASAN_SINGKAT } from '../data/volcanoData';
import { speakText, playClickSound } from '../utils/audio';
import { gunungMeletusImg, resolveAssetUrl } from '../assets/images';
import { ImageModal, ImageModalData } from './ImageModal';

interface IntroductionSectionProps {
  onContinue: () => void;
  onJumpToAnimation?: () => void;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({ onContinue, onJumpToAnimation }) => {
  const [modalData, setModalData] = useState<ImageModalData | null>(null);
  return (
    <div className="space-y-6">
      {/* Hero Title & Short Explanation */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-orange-700 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                Pos 1 · Dermaga Ekspedisi
              </span>
              <span className="text-xs font-extrabold text-white bg-blue-600 px-3 py-1 rounded-full shadow-2xs">
                📖 Struktur Teks Eksplanasi: Bagian 1 - Pernyataan Umum
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-0.5">
              {PENJELASAN_SINGKAT.judulUtama}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              <strong>Fungsi dalam Teks Eksplanasi:</strong> Menjelaskan pengertian dan gambaran umum tentang peristiwa letusan gunung api.
            </p>

          <button
            type="button"
            onClick={() => speakText(PENJELASAN_SINGKAT.suaraPemandu)}
            className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-orange-600" />
            <span>Dengarkan Penjelasan</span>
          </button>
        </div>

        {/* Visual Real Eruption Illustration with Kapten Nala Seal */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md group">
          <img
            src={gunungMeletusImg}
            alt="Visualisasi Detail Bagian Erupsi Gunung Berapi"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/gunung_meletus.jpg');
            }}
            className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-102 cursor-zoom-in"
            onClick={() =>
              setModalData({
                title: 'Visualisasi Detail Bagian Erupsi Gunung Berapi',
                subtitle: 'Pos 1 · Dermaga Ekspedisi Kapten Nala',
                src: gunungMeletusImg,
                fallbackSrc: resolveAssetUrl('images/gunung_meletus.jpg'),
                alt: 'Visualisasi Detail Bagian Erupsi Gunung Berapi',
                caption:
                  'Visualisasi penampang letusan gunung berapi memperlihatkan dapur magma di bawah tanah, pipa kepundan, lubang kawah, kolom abu vulkanik membubung ke angkasa dengan kilatan petir, aliran lava pijar membakar lereng, dan luncuran awan panas berbahaya.',
                speechText:
                  'Perhatikan gambar ini Kawan! Kamu bisa melihat kolom abu vulkanik yang tinggi, semburan lava pijar dari kawah, dan dapur magma di bawah tanah yang mendorong letusan ini!',
                legendItems: [
                  { label: 'Magma Chamber', color: '#dc2626', desc: 'Dapur magma di kedalaman perut bumi' },
                  { label: 'Crater (Kawah)', color: '#f59e0b', desc: 'Mulut letusan tempat material dimuntahkan' },
                  { label: 'Ash Cloud', color: '#64748b', desc: 'Kolom abu pekat membubung ke atmosfer' },
                  { label: 'Lava Flow', color: '#ea580c', desc: 'Cairan batuan panas mengalir di lereng' },
                  { label: 'Volcanic Bombs', color: '#b91c1c', desc: 'Batu pijar terlontar ke udara' },
                  { label: 'Pyroclastic Flow', color: '#71717a', desc: 'Awan panas bergulung-gulung di lereng' },
                ],
              })
            }
          />

          {/* Quick Zoom HD Button */}
          <button
            type="button"
            onClick={() =>
              setModalData({
                title: 'Visualisasi Detail Bagian Erupsi Gunung Berapi',
                subtitle: 'Pos 1 · Dermaga Ekspedisi Kapten Nala',
                src: gunungMeletusImg,
                fallbackSrc: '/images/gunung_meletus.jpg',
                alt: 'Visualisasi Detail Bagian Erupsi Gunung Berapi',
                caption:
                  'Visualisasi penampang letusan gunung berapi memperlihatkan dapur magma di bawah tanah, pipa kepundan, lubang kawah, kolom abu vulkanik membubung ke angkasa dengan kilatan petir, aliran lava pijar membakar lereng, dan luncuran awan panas berbahaya.',
                speechText:
                  'Perhatikan gambar ini Kawan! Kamu bisa melihat kolom abu vulkanik yang tinggi, semburan lava pijar dari kawah, dan dapur magma di bawah tanah yang mendorong letusan ini!',
                legendItems: [
                  { label: 'Magma Chamber', color: '#dc2626', desc: 'Dapur magma di kedalaman perut bumi' },
                  { label: 'Crater (Kawah)', color: '#f59e0b', desc: 'Mulut letusan tempat material dimuntahkan' },
                  { label: 'Ash Cloud', color: '#64748b', desc: 'Kolom abu pekat membubung ke atmosfer' },
                  { label: 'Lava Flow', color: '#ea580c', desc: 'Cairan batuan panas mengalir di lereng' },
                  { label: 'Volcanic Bombs', color: '#b91c1c', desc: 'Batu pijar terlontar ke udara' },
                  { label: 'Pyroclastic Flow', color: '#71717a', desc: 'Awan panas bergulung-gulung di lereng' },
                ],
              })
            }
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-amber-300 hover:text-white text-xs font-bold backdrop-blur-sm border border-stone-700 shadow-md transition-all active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Perbesar Gambar (HD Zoom)</span>
          </button>

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-900/60 to-transparent p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                Peta Pengamatan Kapten Nala
              </span>
              <p className="text-xs sm:text-sm font-extrabold">
                Visualisasi Detail Bagian Erupsi Gunung Berapi
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
              <span className="bg-red-500/80 px-2 py-0.5 rounded-md">Magma</span>
              <span className="bg-orange-500/80 px-2 py-0.5 rounded-md">Lava</span>
              <span className="bg-stone-600/80 px-2 py-0.5 rounded-md">Awan Panas</span>
              <span className="bg-amber-600/80 px-2 py-0.5 rounded-md">Kawah</span>
            </div>
          </div>
        </div>

        {/* Short explanation paragraph */}
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
          {PENJELASAN_SINGKAT.ringkasan}
        </p>

        {/* Soda Bottle Analogy Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/80 p-5 rounded-2xl border border-orange-200/80 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥤</span>
            <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
              {PENJELASAN_SINGKAT.analogiBotolSoda.judul}
            </h3>
          </div>
          <p className="text-stone-700 text-sm leading-relaxed">
            {PENJELASAN_SINGKAT.analogiBotolSoda.penjelasan}
          </p>
        </div>

        {/* Direct Shortcut to Eruption Animation */}
        {onJumpToAnimation && (
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌋</span>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">
                  Ingin langsung melihat simulasi letusan?
                </h4>
                <p className="text-xs text-orange-100 mt-0.5">
                  Tonton animasi gunung siap meletus, awan panas, lahar, dan klik titik hot-spot!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                onJumpToAnimation();
              }}
              className="px-4 py-2 rounded-xl bg-white text-orange-600 font-extrabold text-xs shadow-xs hover:bg-orange-50 active:scale-95 transition-all self-stretch sm:self-auto text-center"
            >
              Lihat Animasi Erupsi Sekarang →
            </button>
          </div>
        )}
      </div>

      {/* 3 Key Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PENJELASAN_SINGKAT.faktaKunci.map((fakta, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs hover:border-orange-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                {idx === 0 ? (
                  <Sparkles className="w-5 h-5" />
                ) : idx === 1 ? (
                  <Flame className="w-5 h-5" />
                ) : (
                  <Wind className="w-5 h-5" />
                )}
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm mb-1.5">{fakta.judul}</h4>
              <p className="text-stone-600 text-xs leading-relaxed">{fakta.deskripsi}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-stone-100 text-[11px] text-stone-400">
              Konsep Penting Kelas 6 SD
            </div>
          </div>
        ))}
      </div>

      {/* Continue CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <span className="text-xs text-stone-500">
          Ikuti petualangan bertahap atau buka peta di atas untuk memilih pos.
        </span>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onContinue();
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md active:scale-98 transition-all"
        >
          <span>Lanjut ke Pos 2: Lembah Teks Eksplanasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen HD Image Preview Modal */}
      <ImageModal data={modalData} onClose={() => setModalData(null)} />
    </div>
  );
};
