import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Info, Sparkles, Volume2, Film, Image as ImageIcon, Flame, Clapperboard, ExternalLink, Maximize2, Camera } from 'lucide-react';
import { ANATOMI_GUNUNG } from '../data/volcanoData';
import { playClickSound, playEruptionSound, speakText } from '../utils/audio';
import { InteractiveStoryboardAnimation } from './InteractiveStoryboardAnimation';
import { gunungMeletusImg, resolveAssetUrl } from '../assets/images';
import { ImageModal, ImageModalData } from './ImageModal';

export const AnatomyAndSimulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'storyboard' | 'gambar' | 'video' | 'simulasi'>('storyboard');
  const [diagramSubTab, setDiagramSubTab] = useState<'foto_hd' | 'vektor'>('foto_hd');
  const [selectedPart, setSelectedPart] = useState<string>('dapur_magma');
  const [gasPressure, setGasPressure] = useState<number>(75);
  const [isErupting, setIsErupting] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ImageModalData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentAnatomyInfo = ANATOMI_GUNUNG.find((item) => item.id === selectedPart) || ANATOMI_GUNUNG[0];

  // Particle eruption loop
  useEffect(() => {
    if (!isErupting || activeTab !== 'simulasi') return;

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
      type: 'lava' | 'ash' | 'rock';
    }> = [];

    const width = canvas.width;
    const height = canvas.height;
    const ventX = width / 2;
    const ventY = height * 0.38;

    const colorsLava = ['#ef4444', '#f97316', '#fbbf24', '#ffedd5'];
    const colorsAsh = ['#475569', '#64748b', '#94a3b8', '#334155'];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn new particles based on gas pressure
      const countToSpawn = Math.floor(gasPressure / 15);
      for (let i = 0; i < countToSpawn; i++) {
        const isLava = Math.random() > 0.35;
        const speed = (gasPressure / 10) * (Math.random() * 2 + 2);
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9; // upward cone

        particles.push({
          x: ventX + (Math.random() - 0.5) * 20,
          y: ventY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: isLava ? Math.random() * 4 + 3 : Math.random() * 8 + 6,
          color: isLava
            ? colorsLava[Math.floor(Math.random() * colorsLava.length)]
            : colorsAsh[Math.floor(Math.random() * colorsAsh.length)],
          alpha: 1,
          type: isLava ? 'lava' : 'ash',
        });
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.type === 'lava') {
          p.vy += 0.18; // gravity
        } else {
          p.vy += 0.02; // floating ash
          p.size += 0.2; // expanding smoke
        }

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

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isErupting, gasPressure, activeTab]);

  const handleTriggerEruption = () => {
    playEruptionSound();
    setIsErupting(true);
    speakText('Bum! Gunung meletus! Perhatikan semburan lava dan awan abu yang keluar dari kawah!');
  };

  const handleStopEruption = () => {
    playClickSound();
    setIsErupting(false);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-amber-100/80 rounded-2xl border border-amber-200">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveTab('storyboard');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'storyboard'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/50'
          }`}
        >
          <Clapperboard className="w-4 h-4" />
          <span>Storyboard Animasi (4 Adegan & Hotspot)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveTab('gambar');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'gambar'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/50'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Gambar Anatomi Penampang</span>
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
          <span>Video Animasi Edukasi</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveTab('simulasi');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'simulasi'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-stone-700 hover:text-stone-900 hover:bg-amber-200/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Lab Simulator Letusan</span>
        </button>
      </div>

      {/* TAB 0: STORYBOARD ANIMASI INTERAKTIF (4 ADEGAN & HOTSPOTS) */}
      {activeTab === 'storyboard' && <InteractiveStoryboardAnimation />}

      {/* TAB 1: GAMBAR ANATOMI GUNUNG MELETUS */}
      {activeTab === 'gambar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Diagram Column */}
          <div className="lg:col-span-7 bg-gradient-to-b from-sky-100 via-amber-50 to-amber-100/70 p-4 rounded-3xl border border-amber-300 relative shadow-sm overflow-hidden">
            {/* Sub-tab switcher: Foto Realistis HD vs Diagram Skematis Irisan */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 bg-white/80 p-1 rounded-xl border border-amber-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setDiagramSubTab('foto_hd');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    diagramSubTab === 'foto_hd'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Foto Erupsi Merapi (HD)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setDiagramSubTab('vektor');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    diagramSubTab === 'vektor'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Diagram Irisan (Vektor)</span>
                </button>
              </div>

              <span className="text-[11px] text-stone-500">
                {diagramSubTab === 'foto_hd' ? 'Gambar Nyata Erupsi Merapi' : 'Klik nomor pada gambar'}
              </span>
            </div>

            {/* View A: Real Generated High-Res Photo of Merapi Eruption */}
            {diagramSubTab === 'foto_hd' ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-stone-800 bg-stone-900 shadow-md group">
                <img
                  src={gunungMeletusImg}
                  alt="Visualisasi Detail Bagian Erupsi Gunung Merapi"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/gunung_meletus.jpg');
                  }}
                  className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                  onClick={() =>
                    setModalData({
                      title: 'Visualisasi Detail Bagian Erupsi Gunung Merapi',
                      subtitle: 'Pos 1 · Anatomi Vulkanik & Erupsi Eksplosif',
                      src: gunungMeletusImg,
                      fallbackSrc: resolveAssetUrl('images/gunung_meletus.jpg'),
                      alt: 'Visualisasi Detail Bagian Erupsi Gunung Merapi',
                      caption:
                        'Ilustrasi visual mendetail erupsi Gunung Merapi yang memperlihatkan kolom abu vulkanik pekat membubung ke atmosfer, semburan lava pijar, kawah kepundan utama, rekahan lereng, serta dapur magma membara di bawah kerak bumi.',
                      speechText:
                        'Perhatikan gambar erupsi Gunung Merapi ini Kawan! Kolom abu vulkanik membubung tinggi ke angkasa, magma merah menyembur dari kawah kepundan, dan lelehan lava mengalir membakar lereng gunung!',
                      legendItems: [
                        { label: 'Kolom Abu', color: '#64748b', desc: 'Awan abu dan debu pekat membubung ke angkasa' },
                        { label: 'Lava Pijar', color: '#ea580c', desc: 'Magma cair yang keluar mengalir membakar lereng' },
                        { label: 'Kawah Utama', color: '#f59e0b', desc: 'Mulut kepundan tempat semburan energi erupsi' },
                        { label: 'Bom Vulkanik', color: '#dc2626', desc: 'Bongkahan batu panas yang terlontar ke udara' },
                      ],
                    })
                  }
                />

                {/* Perbesar HD Button */}
                <button
                  type="button"
                  onClick={() =>
                    setModalData({
                      title: 'Visualisasi Detail Bagian Erupsi Gunung Merapi',
                      subtitle: 'Pos 1 · Anatomi Vulkanik & Erupsi Eksplosif',
                      src: gunungMeletusImg,
                      fallbackSrc: resolveAssetUrl('images/gunung_meletus.jpg'),
                      alt: 'Visualisasi Detail Bagian Erupsi Gunung Merapi',
                      caption:
                        'Ilustrasi visual mendetail erupsi Gunung Merapi yang memperlihatkan kolom abu vulkanik pekat membubung ke atmosfer, semburan lava pijar, kawah kepundan utama, rekahan lereng, serta dapur magma membara di bawah kerak bumi.',
                      speechText:
                        'Perhatikan gambar erupsi Gunung Merapi ini Kawan! Kolom abu vulkanik membubung tinggi ke angkasa, magma merah menyembur dari kawah kepundan, dan lelehan lava mengalir membakar lereng gunung!',
                      legendItems: [
                        { label: 'Kolom Abu', color: '#64748b', desc: 'Awan abu dan debu pekat membubung ke angkasa' },
                        { label: 'Lava Pijar', color: '#ea580c', desc: 'Magma cair yang keluar mengalir membakar lereng' },
                        { label: 'Kawah Utama', color: '#f59e0b', desc: 'Mulut kepundan tempat semburan energi erupsi' },
                        { label: 'Bom Vulkanik', color: '#dc2626', desc: 'Bongkahan batu panas yang terlontar ke udara' },
                      ],
                    })
                  }
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-amber-300 hover:text-white text-xs font-bold backdrop-blur-sm border border-stone-700 shadow-md transition-all active:scale-95"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Perbesar HD</span>
                </button>

                {/* Floating labels over image */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-transparent p-3 sm:p-4 text-white pointer-events-none">
                  <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase block">
                    Visual Nyata Erupsi
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold">
                    Erupsi Dahsyat Gunung Merapi & Bagian-Bagiannya
                  </h4>
                </div>
              </div>
            ) : (
              /* View B: Educational SVG Graphic */
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-sky-200/40 border border-amber-200/60 flex items-center justify-center">
                <svg
                  viewBox="0 0 500 400"
                  className="w-full h-full select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                {/* Sky & Sun */}
                <rect width="500" height="400" fill="#bae6fd" opacity="0.35" />
                <circle cx="80" cy="70" r="30" fill="#fde047" opacity="0.6" />

                {/* Cloud & Ash Smoke plume */}
                <path
                  d="M 210,140 Q 180,90 220,50 Q 250,20 290,40 Q 340,30 330,80 Q 360,110 320,140 Z"
                  fill="#94a3b8"
                  opacity="0.8"
                />
                <path
                  d="M 230,120 Q 220,80 250,55 Q 280,35 300,65 Q 320,70 310,110 Z"
                  fill="#cbd5e1"
                  opacity="0.9"
                />

                {/* Mountain Body Layers */}
                {/* Base Rock */}
                <polygon points="40,360 210,140 290,140 460,360" fill="#78716c" />
                {/* Secondary strata bands */}
                <polygon points="80,360 220,160 280,160 420,360" fill="#a8a29e" />
                <polygon points="120,360 230,180 270,180 380,360" fill="#78716c" />

                {/* Crater bowl */}
                <path d="M 210,140 Q 250,170 290,140 Z" fill="#44403c" />

                {/* Earth crust ground */}
                <rect x="0" y="340" width="500" height="60" fill="#451a03" opacity="0.8" />
                <rect x="0" y="360" width="500" height="40" fill="#292524" />

                {/* Magma Chamber (Dapur Magma) */}
                <ellipse cx="250" cy="355" rx="80" ry="32" fill="#ef4444" />
                <ellipse cx="250" cy="355" rx="65" ry="24" fill="#f97316" />
                <ellipse cx="250" cy="355" rx="45" ry="15" fill="#fef08a" />

                {/* Main Conduit (Pipa Kepundan) */}
                <path d="M 238,340 L 244,145 L 256,145 L 262,340 Z" fill="#f97316" />
                <path d="M 244,340 L 247,150 L 253,150 L 256,340 Z" fill="#fef08a" />

                {/* Flowing Lava on Slopes */}
                <path
                  d="M 285,145 Q 310,190 330,240 Q 345,290 370,350 L 355,350 Q 330,290 315,240 Q 295,190 275,145 Z"
                  fill="#ea580c"
                />
                <path
                  d="M 215,145 Q 195,200 170,260 L 180,260 Q 205,200 225,145 Z"
                  fill="#ef4444"
                />

                {/* Hotspot 1: Dapur Magma */}
                <g
                  className="cursor-pointer"
                  onClick={() => {
                    playClickSound();
                    setSelectedPart('dapur_magma');
                  }}
                >
                  <circle cx="250" cy="355" r="16" fill="#b91c1c" className="animate-pulse" />
                  <circle cx="250" cy="355" r="12" fill="#ffffff" />
                  <text
                    x="250"
                    y="360"
                    textAnchor="middle"
                    fill="#b91c1c"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    1
                  </text>
                </g>

                {/* Hotspot 2: Pipa Kepundan */}
                <g
                  className="cursor-pointer"
                  onClick={() => {
                    playClickSound();
                    setSelectedPart('pipa_kepundan');
                  }}
                >
                  <circle cx="250" cy="240" r="16" fill="#c2410c" />
                  <circle cx="250" cy="240" r="12" fill="#ffffff" />
                  <text
                    x="250"
                    y="245"
                    textAnchor="middle"
                    fill="#c2410c"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    2
                  </text>
                </g>

                {/* Hotspot 3: Kawah Utama */}
                <g
                  className="cursor-pointer"
                  onClick={() => {
                    playClickSound();
                    setSelectedPart('kawah_utama');
                  }}
                >
                  <circle cx="250" cy="140" r="16" fill="#b45309" />
                  <circle cx="250" cy="140" r="12" fill="#ffffff" />
                  <text
                    x="250"
                    y="145"
                    textAnchor="middle"
                    fill="#b45309"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    3
                  </text>
                </g>

                {/* Hotspot 4: Aliran Lava */}
                <g
                  className="cursor-pointer"
                  onClick={() => {
                    playClickSound();
                    setSelectedPart('lelehan_lava');
                  }}
                >
                  <circle cx="330" cy="240" r="16" fill="#ea580c" />
                  <circle cx="330" cy="240" r="12" fill="#ffffff" />
                  <text
                    x="330"
                    y="245"
                    textAnchor="middle"
                    fill="#ea580c"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    4
                  </text>
                </g>

                {/* Hotspot 5: Awan Abu */}
                <g
                  className="cursor-pointer"
                  onClick={() => {
                    playClickSound();
                    setSelectedPart('awan_abu');
                  }}
                >
                  <circle cx="270" cy="65" r="16" fill="#475569" />
                  <circle cx="270" cy="65" r="12" fill="#ffffff" />
                  <text
                    x="270"
                    y="70"
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    5
                  </text>
                </g>
              </svg>
            </div>
            )}
          </div>

          {/* Details Column for Selected Part */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  Bagian Nomor {ANATOMI_GUNUNG.findIndex((x) => x.id === currentAnatomyInfo.id) + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      `${currentAnatomyInfo.nama}. Letak: ${currentAnatomyInfo.posisi}. ${currentAnatomyInfo.penjelasan}`
                    )
                  }
                  className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-orange-600 font-semibold px-2 py-1 rounded-lg hover:bg-amber-50"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan</span>
                </button>
              </div>

              <h3 className="text-lg font-extrabold text-stone-900">{currentAnatomyInfo.nama}</h3>
              <p className="text-xs text-stone-500 mb-3">Posisi: {currentAnatomyInfo.posisi}</p>
              <p className="text-sm text-stone-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100">
                {currentAnatomyInfo.penjelasan}
              </p>
            </div>

            {/* Quick Selector List */}
            <div className="bg-white/80 p-4 rounded-3xl border border-amber-200">
              <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                Pilih Bagian Gunung:
              </h4>
              <div className="space-y-1.5">
                {ANATOMI_GUNUNG.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setSelectedPart(item.id);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      selectedPart === item.id
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-stone-50 text-stone-700 hover:bg-amber-100/60'
                    }`}
                  >
                    <span>
                      {idx + 1}. {item.nama}
                    </span>
                    <span className="text-[11px] opacity-75">{item.posisi}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VIDEO EDUKASI GUNUNG MELETUS */}
      {activeTab === 'video' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Video Animasi: Proses Terjadinya Gunung Meletus
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Tonton animasi edukatif berdurasi ringkas untuk memahami visual letusan secara nyata.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.youtube.com/watch?v=V863xR0Y63w"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
                >
                  <span>Buka di YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      'Berikut adalah video penjelasan animasi tentang proses gunung meletus. Ayo amati bagaimana magma bergerak ke atas kawah!'
                    )
                  }
                  className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Pemandu Bicara</span>
                </button>
              </div>
            </div>

            {/* Video Player Frame with Educational Video */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-md border-2 border-stone-800">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/V863xR0Y63w?rel=0&modestbranding=1"
                title="Proses Terjadinya Gunung Meletus - Animasi Edukasi Kelas 6 SD"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Study Points */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-stone-700">
                <span className="font-bold text-stone-900 block mb-1">🔍 1. Amati Dapur Magma</span>
                Lihat warna merah membara di bawah tanah tempat magma berkumpul dengan suhu ribuan derajat.
              </div>
              <div className="bg-orange-50 p-3.5 rounded-2xl border border-orange-200 text-xs text-stone-700">
                <span className="font-bold text-stone-900 block mb-1">💨 2. Perhatikan Gas Terperangkap</span>
                Gas menumpuk menciptakan tekanan super kuat yang memaksa magma merayap ke pipa kepundan.
              </div>
              <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200 text-xs text-stone-700">
                <span className="font-bold text-stone-900 block mb-1">💥 3. Terjadinya Erupsi</span>
                Material tersembur ke udara bebas membentuk awan abu vulkanik dan aliran lava pijar.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SIMULATOR LETUSAN INTERAKTIF */}
      {activeTab === 'simulasi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Simulation Stage */}
          <div className="lg:col-span-8 bg-stone-900 rounded-3xl p-4 border border-stone-800 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span className="font-bold text-amber-400">LAB VULKANOLOGI INTERAKTIF</span>
              <span>
                Status: {isErupting ? '🔴 ERUPSI SEDANG TERJADI!' : '🟢 Kondisi Normal (Siaga)'}
              </span>
            </div>

            {/* Canvas Simulator */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950/40 border border-stone-800">
              {/* Mountain Silhouette Background */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 500 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Mountain Body */}
                <polygon points="50,380 220,150 280,150 450,380" fill="#44403c" opacity="0.9" />
                <path d="M 220,150 Q 250,170 280,150 Z" fill="#292524" />

                {/* Ground */}
                <rect x="0" y="370" width="500" height="30" fill="#1c1917" />

                {/* Underground Magma Chamber Glow */}
                <ellipse
                  cx="250"
                  cy="365"
                  rx={50 + gasPressure * 0.4}
                  ry={20 + gasPressure * 0.15}
                  fill="#ef4444"
                  opacity={0.4 + gasPressure * 0.005}
                />
                <ellipse
                  cx="250"
                  cy="365"
                  rx={35 + gasPressure * 0.25}
                  ry={14 + gasPressure * 0.1}
                  fill="#f97316"
                  opacity={0.7}
                />

                {/* Magma Conduit pipe */}
                <path d="M 242,365 L 246,155 L 254,155 L 258,365 Z" fill="#ea580c" opacity="0.8" />
              </svg>

              {/* Dynamic Particle Canvas for Eruption */}
              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                className="w-full h-full relative z-10"
              />

              {!isErupting && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="bg-stone-900/80 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-stone-700 text-center">
                    <p className="text-xs text-amber-300 font-bold">
                      Atur Tekanan Gas di samping, lalu tekan tombol "Picu Letusan"!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Simulation Control Panel */}
          <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-amber-200 shadow-xs space-y-5">
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Kontrol Tekanan Magma</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Geser tuas untuk menaikkan kekuatan tekanan gas di dalam dapur magma.
              </p>
            </div>

            {/* Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-stone-700">Tekanan Gas Vulkanik</span>
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
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>Rendah (Tenang)</span>
                <span>Sedang</span>
                <span>Maksimal (Dahsyat!)</span>
              </div>
            </div>

            {/* Science note based on slider */}
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-900 block mb-0.5">💡 Prinsip Sains:</span>
              {gasPressure < 50
                ? 'Tekanan gas masih rendah. Magma belum cukup kuat mendobrak sumbat kawah.'
                : gasPressure < 80
                ? 'Tekanan gas mulai tinggi! Batuan kawah mulai retak dan gempa vulkanik terjadi.'
                : 'Tekanan gas sangat dahsyat! Siap meledak menyemburkan lava pijar dan awan panas!'}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              {!isErupting ? (
                <button
                  type="button"
                  onClick={handleTriggerEruption}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-extrabold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 fill-current" />
                  <span>🔥 Picu Letusan Erupsi!</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopEruption}
                  className="w-full py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-sm shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Hentikan Erupsi (Kembali Tenang)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen HD Image Preview Modal */}
      <ImageModal data={modalData} onClose={() => setModalData(null)} />
    </div>
  );
};
