import React, { useState, useEffect, useRef } from 'react';
import { CloudRain, Sparkles, Flame, Volume2, ArrowRight, RotateCcw, Film, Maximize2, ExternalLink, Play, Pause } from 'lucide-react';
import { playClickSound, playEruptionSound, speakText } from '../utils/audio';
import { aliranLaharImg, resolveAssetUrl } from '../assets/images';
import { ImageModal, ImageModalData } from './ImageModal';

interface LaharAndSimulationSectionProps {
  onContinue: () => void;
}

export const LaharAndSimulationSection: React.FC<LaharAndSimulationSectionProps> = ({
  onContinue,
}) => {
  const [activeTab, setActiveTab] = useState<'lahar' | 'video' | 'simulator'>('lahar');
  const [selectedHotspot, setSelectedHotspot] = useState<string>('hujan');
  const [gasPressure, setGasPressure] = useState<number>(80);
  const [isErupting, setIsErupting] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ImageModalData | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('V863xR0Y63w');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const laharHotspots = [
    {
      id: 'hujan',
      title: 'Pemicu: Hujan Lebat di Puncak',
      badge: 'Hujan Deras',
      desc: 'Air hujan lebat mengguyur timbunan jutaan ton abu dan kerikil vulkanik sisa erupsi, lalu melarutkannya menjadi lumpur pekat.',
      speech: 'Hujan lebat di puncak gunung adalah pemicu utama terbentuknya lahar dingin!',
    },
    {
      id: 'batu_besar',
      title: 'Batu Kali Besar Terbawa Arus',
      badge: 'Batu Boulders',
      desc: 'Daya dorong aliran lahar sangat dahsyat hingga mampu menggelindingkan batu-batu raksasa seukuran mobil ke arah hilir!',
      speech: 'Aliran lahar dapat menghanyutkan batu-batu raksasa seukuran mobil! Sangat berbahaya jika berada di dekat sungai!',
    },
    {
      id: 'sungai',
      title: 'Jalur Lembah & Jembatan',
      badge: 'Lembah Sungai',
      desc: 'Aliran lahar bergerak mengikuti alur sungai purba. Jembatan dan tanggul bisa rusak diterjang banjir lumpur vulkanik.',
      speech: 'Lahar dingin mengalir deras melalui alur lembah sungai. Warga dilarang beraktivitas di bantaran sungai saat hujan lebat!',
    },
    {
      id: 'peringatan',
      title: 'Rambu Bahaya & EWS Lahar',
      badge: 'Rambu Bahaya',
      desc: 'Sistem Peringatan Dini (Early Warning System) dipasang di sungai untuk mendeteksi getaran dan ketinggian aliran lahar.',
      speech: 'Petugas memasang sensor peringatan dini untuk memberi tahu warga agar segera menjauhi bantaran sungai!',
    },
  ];

  const currentHotspot = laharHotspots.find((h) => h.id === selectedHotspot) || laharHotspots[0];

  // Particle eruption simulator loop
  useEffect(() => {
    if (!isErupting || activeTab !== 'simulator') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const width = canvas.width;
    const height = canvas.height;
    const ventX = width / 2;
    const ventY = height * 0.38;
    const colors = ['#ef4444', '#f97316', '#fbbf24', '#475569', '#64748b'];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const count = Math.floor(gasPressure / 15);
      for (let i = 0; i < count; i++) {
        const speed = (gasPressure / 10) * (Math.random() * 2 + 2);
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9;
        particles.push({
          x: ventX + (Math.random() - 0.5) * 20,
          y: ventY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.alpha -= 0.015;

        if (p.alpha <= 0 || p.y > height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isErupting, gasPressure, activeTab]);

  const handleTriggerEruption = () => {
    playEruptionSound();
    setIsErupting(true);
    speakText('Duaaar! Erupsi terjadi di lab simulasi Kapten Nala! Perhatikan lontaran material dan kepulan asapnya!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-amber-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Pos 4 · Lembah Sungai Lahar
              </span>
              <span className="text-xs font-extrabold text-white bg-amber-600 px-3 py-1 rounded-full shadow-2xs">
                📖 Struktur Teks Eksplanasi: Bagian 2 - Deretan Penjelas
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
              Lembah Sungai: Aliran Lahar Dingin & Simulasi Erupsi
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              <strong>Fungsi dalam Teks Eksplanasi:</strong> Menjelaskan urutan tahapan pasca letusan ketika air hujan lebat di puncak melarutkan abu vulkanik menjadi banjir lahar di sungai.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(
                'Kawan! Di Pos 4 ini kita mempelajari bahaya banjir lahar dingin yang dipicu oleh hujan deras di puncak gunung. Amati juga video dan coba simulator letusannya!'
              )
            }
            className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-orange-600" />
            <span>Suara Kapten Nala</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-amber-100/80 rounded-2xl border border-amber-200">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab('lahar');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'lahar'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/50'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span>Visualisasi Lahar Dingin (HD)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab('video');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'video'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/50'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Video Animasi Letusan</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab('simulator');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'simulator'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Lab Simulator Erupsi</span>
          </button>
        </div>

        {/* TAB 1: VISUALISASI LAHAR DINGIN */}
        {activeTab === 'lahar' && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-stone-800 shadow-md group">
              <img
                src={aliranLaharImg}
                alt="Visualisasi Aliran Banjir Lahar Dingin & Batu-Batu Besar di Sungai"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/aliran_lahar.jpg');
                }}
                className="w-full aspect-[4/3] sm:aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-102 cursor-zoom-in"
                onClick={() =>
                  setModalData({
                    title: 'Aliran Banjir Lahar Dingin & Batu-Batu Besar di Sungai',
                    subtitle: 'Pos 4 · Peta Investigasi Sungai Kapten Nala',
                    src: aliranLaharImg,
                    fallbackSrc: resolveAssetUrl('images/aliran_lahar.jpg'),
                    alt: 'Aliran Banjir Lahar Dingin & Batu-Batu Besar di Sungai',
                    caption:
                      'Visualisasi banjir lahar dingin yang dipicu guyuran hujan lebat di puncak gunung. Jutaan meter kubik abu dan kerikil vulkanik larut menjadi banjir lumpur pekat berdaya dorong luar biasa hingga mampu menghanyutkan batu-batu raksasa seukuran mobil ke lembah sungai.',
                    speechText:
                      'Perhatikan alur sungai ini Kawan! Saat hujan deras di puncak gunung, abu vulkanik larut menjadi banjir lahar dingin yang sanggup menghanyutkan batu kali raksasa!',
                    legendItems: [
                      { label: 'Heavy Rainfall', color: '#38bdf8', desc: 'Hujan deras pemicu banjir di puncak' },
                      { label: 'Lahar Dingin', color: '#a16207', desc: 'Aliran lumpur pekat bercampur pasir kerikil' },
                      { label: 'Boulders', color: '#57534e', desc: 'Batu-batu raksasa menggelinding terbawa arus' },
                      { label: 'River Valley', color: '#15803d', desc: 'Lembah sungai jalur evakuasi wajib diwaspadai' },
                      { label: 'Warning Sign', color: '#eab308', desc: 'Rambu bahaya awas lahar dingin' },
                    ],
                  })
                }
              />

              {/* Quick Zoom HD Button */}
              <button
                type="button"
                onClick={() =>
                  setModalData({
                    title: 'Aliran Banjir Lahar Dingin & Batu-Batu Besar di Sungai',
                    subtitle: 'Pos 4 · Peta Investigasi Sungai Kapten Nala',
                    src: aliranLaharImg,
                    fallbackSrc: resolveAssetUrl('images/aliran_lahar.jpg'),
                    alt: 'Aliran Banjir Lahar Dingin & Batu-Batu Besar di Sungai',
                    caption:
                      'Visualisasi banjir lahar dingin yang dipicu guyuran hujan lebat di puncak gunung. Jutaan meter kubik abu dan kerikil vulkanik larut menjadi banjir lumpur pekat berdaya dorong luar biasa hingga mampu menghanyutkan batu-batu raksasa seukuran mobil ke lembah sungai.',
                    speechText:
                      'Perhatikan alur sungai ini Kawan! Saat hujan deras di puncak gunung, abu vulkanik larut menjadi banjir lahar dingin yang sanggup menghanyutkan batu kali raksasa!',
                    legendItems: [
                      { label: 'Heavy Rainfall', color: '#38bdf8', desc: 'Hujan deras pemicu banjir di puncak' },
                      { label: 'Lahar Dingin', color: '#a16207', desc: 'Aliran lumpur pekat bercampur pasir kerikil' },
                      { label: 'Boulders', color: '#57534e', desc: 'Batu-batu raksasa menggelinding terbawa arus' },
                      { label: 'River Valley', color: '#15803d', desc: 'Lembah sungai jalur evakuasi wajib diwaspadai' },
                      { label: 'Warning Sign', color: '#eab308', desc: 'Rambu bahaya awas lahar dingin' },
                    ],
                  })
                }
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-amber-300 hover:text-white text-xs font-bold backdrop-blur-sm border border-stone-700 shadow-md transition-all active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Perbesar Gambar (HD Zoom)</span>
              </button>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-transparent p-4 sm:p-5 text-white pointer-events-none">
                <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase block">
                  Peta Investigasi Sungai Kapten Nala
                </span>
                <h3 className="text-sm sm:text-base font-extrabold">
                  Aliran Banjir Lahar Dingin & Batu-Batu Besar di Sungai
                </h3>
                <p className="text-xs text-stone-300 mt-1 max-w-xl">
                  Perhatikan hujan deras di puncak gunung yang melarutkan jutaan meter kubik abu vulkanik menjadi banjir lumpur pekat.
                </p>
              </div>
            </div>

            {/* Hotspot buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {laharHotspots.map((hs) => (
                <button
                  key={hs.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedHotspot(hs.id);
                    speakText(`${hs.title}. ${hs.desc}`);
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedHotspot === hs.id
                      ? 'bg-orange-500 text-white border-orange-600 shadow-md ring-2 ring-orange-300'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50'
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full block w-fit mb-1 ${
                      selectedHotspot === hs.id
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {hs.badge}
                  </span>
                  <h4 className="text-xs font-extrabold line-clamp-1">{hs.title}</h4>
                </button>
              ))}
            </div>

            {/* Explanation card */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-orange-700">{currentHotspot.title}</span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {currentHotspot.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => speakText(currentHotspot.speech)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengarkan</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: VIDEO */}
        {activeTab === 'video' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedVideoId('V863xR0Y63w')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedVideoId === 'V863xR0Y63w'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  🎬 Video 1: Animasi Letusan SD
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVideoId('lAmqsMQG3RM')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedVideoId === 'lAmqsMQG3RM'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  🌋 Video 2: Proses Magma & Lahar
                </button>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${selectedVideoId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-bold hover:underline"
                title="Buka langsung di YouTube tab baru"
              >
                <span>Buka di YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-md border-2 border-stone-800">
              <iframe
                key={selectedVideoId}
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${selectedVideoId}?rel=0&modestbranding=1`}
                title="Proses Terjadinya Gunung Meletus - Video Animasi Siswa SD"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-stone-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                  <span>📺 Panduan Belajar Sambil Menonton Video</span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      'Tonton video animasi ini dengan cermat kawan! Amati bagaimana tekanan gas mendorong magma dari dalam perut bumi hingga menyembur keluar kawah menjadi lava dan awan abu!'
                    )
                  }
                  className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan Petunjuk</span>
                </button>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <li className="bg-white p-2.5 rounded-xl border border-amber-200/60">
                  <strong>1. Dapur Magma:</strong> Cairan batuan membara di kedalaman bumi yang mencari jalan keluar.
                </li>
                <li className="bg-white p-2.5 rounded-xl border border-amber-200/60">
                  <strong>2. Dorongan Gas:</strong> Gelembung gas memuai menghasilkan tekanan jutaan atmosfer.
                </li>
                <li className="bg-white p-2.5 rounded-xl border border-amber-200/60">
                  <strong>3. Kolom Erupsi & Lahar:</strong> Terlemparnya abu ke udara serta banjir lumpur saat hujan.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8 bg-stone-900 rounded-3xl p-4 border border-stone-800 relative">
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <span className="font-bold text-amber-400">LAB UJI COBA KAPTEN NALA</span>
                <span>Status: {isErupting ? '🔴 ERUPSI BERLANGSUNG' : '🟢 Kondisi Siaga'}</span>
              </div>

              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
                <canvas ref={canvasRef} width={500} height={380} className="w-full h-full relative z-10" />

                {!isErupting && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="bg-stone-900/90 px-4 py-2 rounded-2xl border border-stone-700 text-center">
                      <p className="text-xs text-amber-300 font-bold">
                        Tarik tuas gas di samping lalu tekan "Picu Letusan"!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 bg-amber-50/70 p-5 rounded-3xl border border-amber-200 space-y-4">
              <div>
                <h4 className="font-extrabold text-stone-900 text-sm">Tuas Gas Vulkanik</h4>
                <p className="text-xs text-stone-500">Kekuatan gas pemicu letusan</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Tekanan Gas</span>
                  <span className="text-orange-600">{gasPressure}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={gasPressure}
                  onChange={(e) => setGasPressure(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {!isErupting ? (
                <button
                  type="button"
                  onClick={handleTriggerEruption}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 fill-current" />
                  <span>🔥 Picu Letusan!</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsErupting(false)}
                  className="w-full py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Hentikan Erupsi</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Continue CTA to Pos 5 */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onContinue();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md active:scale-98 transition-all"
        >
          <span>Lanjut ke Pos 5: Gua Uji Nyali Kapten Nala (Kuis)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen HD Image Preview Modal */}
      <ImageModal data={modalData} onClose={() => setModalData(null)} />
    </div>
  );
};
