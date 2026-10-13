import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Volume2,
  CheckCircle2,
  Info,
  Flame,
  CloudRain,
  Eye,
  X,
  Compass,
} from 'lucide-react';
import { STORYBOARD_SCENES } from '../data/volcanoData';
import { HotspotElement, StoryboardScene } from '../types';
import { playClickSound, playEruptionSound, playSuccessSound, speakText } from '../utils/audio';

export const InteractiveStoryboardAnimation: React.FC = () => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotElement | null>(null);
  const [modalHotspot, setModalHotspot] = useState<HotspotElement | null>(null);

  const scene: StoryboardScene = STORYBOARD_SCENES[currentSceneIdx] || STORYBOARD_SCENES[0];

  // Auto-play progression through scenes
  useEffect(() => {
    if (!isPlayingAuto) return;

    const timer = setInterval(() => {
      setCurrentSceneIdx((prev) => {
        if (prev >= STORYBOARD_SCENES.length - 1) {
          setIsPlayingAuto(false);
          return 0;
        }
        const next = prev + 1;
        if (next === 1) {
          playEruptionSound();
        }
        return next;
      });
    }, 6500);

    return () => clearInterval(timer);
  }, [isPlayingAuto]);

  // Set default active hotspot on scene change
  useEffect(() => {
    if (scene.hotspots.length > 0) {
      setActiveHotspot(scene.hotspots[0]);
    }
  }, [currentSceneIdx]);

  const handleNextScene = () => {
    playClickSound();
    if (currentSceneIdx < STORYBOARD_SCENES.length - 1) {
      const nextIdx = currentSceneIdx + 1;
      setCurrentSceneIdx(nextIdx);
      if (nextIdx === 1) {
        playEruptionSound();
      }
    }
  };

  const handlePrevScene = () => {
    playClickSound();
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx((prev) => prev - 1);
    }
  };

  const handleSelectScene = (idx: number) => {
    playClickSound();
    setCurrentSceneIdx(idx);
    setIsPlayingAuto(false);
    if (idx === 1) {
      playEruptionSound();
    }
  };

  const handleHotspotClick = (hs: HotspotElement) => {
    playClickSound();
    setActiveHotspot(hs);
    setModalHotspot(hs);
    speakText(`${hs.name}. ${hs.detailedDesc}`);
  };

  const handleStartEruptionFlow = () => {
    playClickSound();
    playEruptionSound();
    setIsPlayingAuto(true);
    setCurrentSceneIdx(0);
    speakText('Memulai animasi proses letusan gunung berapi! Perhatikan setiap perubahan dari gunung yang siap meletus hingga keluarnya awan panas dan lahar!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Navigation & Quick Action */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-5 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌋</span>
            <span className="text-xs font-extrabold uppercase tracking-widest bg-black/20 px-3 py-0.5 rounded-full">
              Animasi Interaktif Kelas 6 SD
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold mt-1 tracking-tight">
            Proses Letusan Gunung Berapi: Dari Siaga Hingga Lahar
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 mt-0.5">
            Perhatikan awan panas, lava pijar, lahar dingin, dan klik titik hot-spot untuk penjelasannya!
          </p>
        </div>

        {/* Quick Launch Full Eruption Button */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleStartEruptionFlow}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-orange-700 font-extrabold text-xs sm:text-sm shadow-md hover:bg-orange-50 active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 fill-current text-red-600" />
            <span>Mulai Animasi Erupsi</span>
          </button>
        </div>
      </div>

      {/* Visual Timeline Stepper (4 Adegan Berurutan) */}
      <div className="bg-white p-4 rounded-3xl border border-amber-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-stone-500 mb-2 px-1">
          <span>Tahapan Alur Letusan:</span>
          <span className="text-orange-600 font-extrabold">
            Adegan {currentSceneIdx + 1} / {STORYBOARD_SCENES.length}: {scene.phaseName}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STORYBOARD_SCENES.map((sc, idx) => {
            const isSelected = idx === currentSceneIdx;
            const isPassed = idx < currentSceneIdx;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScene(idx)}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-600 shadow-md ring-2 ring-orange-300 scale-[1.01]'
                    : isPassed
                    ? 'bg-amber-50 text-stone-800 border-amber-300 hover:bg-amber-100/70'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span>{idx + 1}. {sc.phaseName}</span>
                  {isSelected ? <span>📍</span> : isPassed ? <span>✓</span> : <span>○</span>}
                </div>
                <h4
                  className={`text-xs font-extrabold line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {sc.title.split(':')[1]?.trim() || sc.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage with Rich Visuals and Clickable Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Animation SVG Canvas */}
        <div className="lg:col-span-8 bg-gradient-to-b from-stone-900 via-stone-800 to-amber-950 rounded-3xl p-4 sm:p-5 border border-stone-700 shadow-lg relative overflow-hidden">
          {/* Header of Canvas */}
          <div className="flex flex-wrap items-center justify-between text-xs text-stone-300 mb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-extrabold text-amber-300 uppercase tracking-wider">
                {scene.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-amber-200 bg-stone-800/80 px-2.5 py-1 rounded-xl border border-stone-700">
              <Eye className="w-3.5 h-3.5 text-orange-400" />
              <span>Klik nomor berkedip untuk info detail!</span>
            </div>
          </div>

          {/* Dynamic SVG Animation Area */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-inner flex items-center justify-center">
            <svg
              viewBox="0 0 600 450"
              className="w-full h-full select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sky Backdrop according to state */}
              {scene.volcanoState === 'siaga' && (
                <>
                  <rect width="600" height="450" fill="#38bdf8" opacity="0.35" />
                  <rect width="600" height="260" fill="#fde047" opacity="0.15" />
                  <circle cx="120" cy="80" r="32" fill="#fef08a" opacity="0.8" />
                  <circle cx="120" cy="80" r="48" fill="#fef08a" opacity="0.2" />
                </>
              )}
              {scene.volcanoState === 'letusan' && (
                <>
                  <rect width="600" height="450" fill="#1c1917" />
                  <rect width="600" height="320" fill="#991b1b" opacity="0.4" />
                  {/* Volcanic Lightning Streaks */}
                  <path
                    d="M 270,100 L 290,140 L 280,170 L 310,210"
                    stroke="#fef08a"
                    strokeWidth="3.5"
                    fill="none"
                    opacity="0.9"
                  />
                  <path
                    d="M 330,80 L 320,120 L 340,160"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    fill="none"
                    opacity="0.9"
                  />
                  <path
                    d="M 230,120 L 245,150 L 235,180"
                    stroke="#fde047"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.8"
                  />
                </>
              )}
              {scene.volcanoState === 'awan_panas' && (
                <>
                  <rect width="600" height="450" fill="#292524" />
                  <rect width="600" height="300" fill="#c2410c" opacity="0.4" />
                </>
              )}
              {scene.volcanoState === 'lahar' && (
                <>
                  <rect width="600" height="450" fill="#334155" opacity="0.8" />
                  {/* Heavy Rainfall Streaks */}
                  <g stroke="#38bdf8" strokeWidth="2" opacity="0.55" strokeDasharray="6,8">
                    <line x1="70" y1="20" x2="50" y2="180" />
                    <line x1="140" y1="10" x2="120" y2="200" />
                    <line x1="220" y1="30" x2="200" y2="190" />
                    <line x1="380" y1="15" x2="360" y2="190" />
                    <line x1="470" y1="25" x2="450" y2="210" />
                    <line x1="550" y1="10" x2="530" y2="190" />
                  </g>
                </>
              )}

              {/* Volcano Rock Body Strata */}
              <polygon
                points="40,395 240,160 360,160 560,395"
                fill={scene.volcanoState === 'letusan' ? '#292524' : '#57534e'}
              />
              <polygon
                points="90,395 250,180 350,180 510,395"
                fill={scene.volcanoState === 'letusan' ? '#3e3835' : '#78716c'}
              />

              {/* Crater Top Rim */}
              <ellipse
                cx="300"
                cy="160"
                rx="60"
                ry="18"
                fill={scene.volcanoState === 'letusan' ? '#b91c1c' : '#292524'}
              />

              {/* Underground Earth & Crust */}
              <rect x="0" y="380" width="600" height="70" fill="#3e2723" />
              <rect x="0" y="405" width="600" height="45" fill="#1c1917" />

              {/* === VISUAL DETAILS PER PHASE === */}

              {/* SCENE 1: SIAGA - Magma Membara & Gas Menumpuk */}
              {scene.volcanoState === 'siaga' && (
                <>
                  {/* White sulfur steam puffing from crater */}
                  <path
                    d="M 285,150 Q 260,110 280,75 Q 310,40 295,15 Q 320,35 315,75 Q 310,120 315,150 Z"
                    fill="#e2e8f0"
                    opacity="0.85"
                  />
                  <path
                    d="M 270,150 Q 250,120 265,95 Q 290,70 280,45 Q 300,65 295,95 Q 290,130 295,150 Z"
                    fill="#cbd5e1"
                    opacity="0.7"
                  />

                  {/* Boiling Magma Chamber with Concentric Pulsing Heat */}
                  <ellipse cx="300" cy="390" rx="105" ry="42" fill="#b91c1c" />
                  <ellipse cx="300" cy="390" rx="80" ry="30" fill="#ea580c" />
                  <ellipse cx="300" cy="390" rx="50" ry="18" fill="#fde047" />

                  {/* Magma Conduit Pipe with Upward Gas Bubbles */}
                  <path d="M 288,380 L 294,165 L 306,165 L 312,380 Z" fill="#ea580c" />
                  <path d="M 294,380 L 297,170 L 303,170 L 306,380 Z" fill="#fde047" />

                  {/* Rising Gas Bubbles in the Conduit */}
                  <circle cx="300" cy="330" r="4.5" fill="#ffffff" opacity="0.9" />
                  <circle cx="298" cy="270" r="5" fill="#ffffff" opacity="0.9" />
                  <circle cx="302" cy="210" r="5.5" fill="#ffffff" opacity="0.9" />
                </>
              )}

              {/* SCENE 2: ERUPSI DAHSYAT - Semburan Lahar Pijar, Abu & Bom Batu */}
              {scene.volcanoState === 'letusan' && (
                <>
                  {/* Huge Billowing Ash Column into the Stratosphere */}
                  <path
                    d="M 240,150 Q 130,80 170,15 Q 240,-30 300,-5 Q 370,-30 430,20 Q 490,85 360,150 Z"
                    fill="#334155"
                    opacity="0.95"
                  />
                  <path
                    d="M 255,140 Q 180,80 220,35 Q 290,0 330,20 Q 400,30 355,140 Z"
                    fill="#64748b"
                    opacity="0.85"
                  />
                  <path
                    d="M 275,130 Q 230,85 260,50 Q 300,25 330,45 Q 365,55 335,130 Z"
                    fill="#94a3b8"
                    opacity="0.75"
                  />

                  {/* Glowing Fire Lava Fountain */}
                  <path
                    d="M 270,160 L 250,65 L 285,105 L 300,30 L 315,105 L 350,65 L 330,160 Z"
                    fill="#ef4444"
                  />
                  <path
                    d="M 282,160 L 275,85 L 300,50 L 325,85 L 318,160 Z"
                    fill="#fde047"
                  />

                  {/* Volcanic Bombs (Flying Incandescent Rocks) */}
                  <circle cx="190" cy="100" r="9" fill="#ea580c" />
                  <circle cx="140" cy="130" r="7" fill="#dc2626" />
                  <circle cx="410" cy="100" r="10" fill="#ea580c" />
                  <circle cx="460" cy="140" r="8" fill="#dc2626" />

                  {/* Hot glowing conduit */}
                  <ellipse cx="300" cy="390" rx="95" ry="36" fill="#ef4444" />
                  <path d="M 285,380 L 292,165 L 308,165 L 315,380 Z" fill="#fde047" />
                </>
              )}

              {/* SCENE 3: AWAN PANAS (WEDHUS GEMBEL) & LAVA PIJAR */}
              {scene.volcanoState === 'awan_panas' && (
                <>
                  {/* Rolling Pyroclastic Ash Clouds (Wedhus Gembel) on Right Slope */}
                  <path
                    d="M 320,165 Q 370,175 405,205 Q 450,240 480,300 Q 530,355 490,385 Q 430,385 390,320 Q 355,240 320,165 Z"
                    fill="#52525b"
                    opacity="0.95"
                  />
                  <path
                    d="M 345,180 Q 395,215 430,260 Q 465,320 440,360 Q 390,330 345,180 Z"
                    fill="#71717a"
                    opacity="0.85"
                  />
                  <path
                    d="M 370,210 Q 420,245 445,290 Q 460,330 435,355 Q 395,335 370,210 Z"
                    fill="#a1a1aa"
                    opacity="0.7"
                  />
                  {/* Red fiery glow inside the pyroclastic cloud */}
                  <circle cx="440" cy="330" r="18" fill="#ea580c" opacity="0.6" />
                  <circle cx="410" cy="270" r="14" fill="#f97316" opacity="0.6" />

                  {/* Flowing Glowing Lava Streams on Left Slope */}
                  <path
                    d="M 270,165 Q 240,210 215,260 Q 185,320 155,385 L 180,385 Q 210,320 235,260 Q 260,210 285,165 Z"
                    fill="#ea580c"
                  />
                  <path
                    d="M 275,170 Q 250,220 225,270 Q 195,330 168,385 L 175,385 Q 205,330 230,270 Q 255,220 280,170 Z"
                    fill="#fde047"
                  />
                </>
              )}

              {/* SCENE 4: ALIRAN LAHAR DINGIN & PASCA LETUSAN */}
              {scene.volcanoState === 'lahar' && (
                <>
                  {/* Expanded Caldera Rim */}
                  <ellipse cx="300" cy="165" rx="78" ry="24" fill="#44403c" />

                  {/* Rushing Lahar Mud Torrent in River Valley */}
                  <path
                    d="M 240,190 Q 210,250 175,300 Q 145,350 80,415 L 140,415 Q 190,350 220,300 Q 250,250 265,190 Z"
                    fill="#57534e"
                  />
                  <path
                    d="M 245,210 Q 220,265 185,310 Q 155,360 100,415 L 120,415 Q 170,360 200,310 Q 235,265 255,210 Z"
                    fill="#78716c"
                  />
                  {/* Huge boulders tumbling in the lahar flow */}
                  <circle cx="150" cy="350" r="8" fill="#1c1917" />
                  <circle cx="115" cy="390" r="11" fill="#292524" />
                  <circle cx="185" cy="320" r="7" fill="#1c1917" />
                  <circle cx="210" cy="270" r="6" fill="#292524" />

                  {/* Lush Fertile Farmland Reviving the Mountain Base */}
                  <path
                    d="M 370,310 Q 420,330 480,350 Q 540,370 580,390 L 580,415 L 350,415 Q 350,360 370,310 Z"
                    fill="#15803d"
                    opacity="0.95"
                  />
                  <path
                    d="M 400,340 Q 450,360 520,380 L 560,415 L 370,415 Z"
                    fill="#22c55e"
                    opacity="0.85"
                  />
                </>
              )}
            </svg>

            {/* Clickable Hot-Spot Pins on the Canvas */}
            {scene.hotspots.map((hs, hIdx) => {
              const isActive = activeHotspot?.id === hs.id;
              return (
                <div
                  key={hs.id}
                  style={{
                    left: `${hs.xPercent}%`,
                    top: `${hs.yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute z-30"
                >
                  <button
                    type="button"
                    onClick={() => handleHotspotClick(hs)}
                    className={`group relative flex items-center justify-center transition-all ${
                      isActive ? 'scale-125 z-40' : 'hover:scale-115'
                    }`}
                    title={hs.name}
                  >
                    {/* Concentric glowing pulse ring */}
                    <span
                      className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: hs.color }}
                    ></span>

                    {/* Central pin circle with number */}
                    <span
                      className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-extrabold text-xs text-white shadow-lg border-2 border-white ring-2 ring-black/40"
                      style={{ backgroundColor: hs.color }}
                    >
                      {hIdx + 1}
                    </span>

                    {/* Quick text tag */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-900/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md pointer-events-none shadow-md border border-stone-700 hidden sm:block">
                      {hs.name.split('(')[0]?.trim()}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Player Navigation Bar inside Canvas */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-stone-800 text-stone-300">
            <button
              type="button"
              disabled={currentSceneIdx === 0}
              onClick={handlePrevScene}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                currentSceneIdx === 0
                  ? 'border-stone-800 text-stone-600 cursor-not-allowed bg-stone-900'
                  : 'border-stone-700 text-stone-200 bg-stone-800 hover:bg-stone-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Adegan Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsPlayingAuto(!isPlayingAuto);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all ${
                  isPlayingAuto
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {isPlayingAuto ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Jeda Putar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Putar Otomatis</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setCurrentSceneIdx(0);
                  setIsPlayingAuto(false);
                }}
                className="p-2 rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-300"
                title="Ulangi dari Awal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              disabled={currentSceneIdx === STORYBOARD_SCENES.length - 1}
              onClick={handleNextScene}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                currentSceneIdx === STORYBOARD_SCENES.length - 1
                  ? 'border-stone-800 text-stone-600 cursor-not-allowed bg-stone-900'
                  : 'border-orange-500 bg-orange-600 text-white hover:bg-orange-500'
              }`}
            >
              <span>Adegan Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side Panel: Active Hotspot & Science Explanation Card */}
        <div className="lg:col-span-4 space-y-4">
          {activeHotspot ? (
            <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-extrabold px-3 py-1 rounded-full text-white shadow-2xs"
                  style={{ backgroundColor: activeHotspot.color }}
                >
                  Hot-spot #{scene.hotspots.findIndex((x) => x.id === activeHotspot.id) + 1}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    speakText(`${activeHotspot.name}. ${activeHotspot.detailedDesc}`)
                  }
                  className="flex items-center gap-1.5 text-xs text-orange-700 font-bold bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>Dengarkan Suara</span>
                </button>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-stone-900 leading-snug">
                  {activeHotspot.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Letak: <strong className="text-stone-700">{activeHotspot.category}</strong>
                </p>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 text-stone-800 text-sm leading-relaxed space-y-2">
                <p className="font-bold text-orange-800 text-xs">
                  {activeHotspot.shortDesc}
                </p>
                <p className="text-stone-700 text-xs sm:text-sm">
                  {activeHotspot.detailedDesc}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-5 rounded-3xl border border-amber-200 text-center text-xs text-stone-500">
              Pilih salah satu nomor hot-spot pada gambar gunung untuk membaca penjelasannya!
            </div>
          )}

          {/* Quick List of All Hotspots in Current Scene */}
          <div className="bg-white p-4 rounded-3xl border border-amber-200 space-y-2">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Daftar Hot-Spot Adegan Ini:
            </h4>
            <div className="space-y-1.5">
              {scene.hotspots.map((hs, idx) => (
                <button
                  key={hs.id}
                  type="button"
                  onClick={() => handleHotspotClick(hs)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeHotspot?.id === hs.id
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-stone-50 text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  <span>
                    {idx + 1}. {hs.name}
                  </span>
                  <span className="text-[10px] opacity-75">{hs.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modal when clicking a hotspot (Optional modal for focused reading) */}
      {modalHotspot && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl border-2 border-orange-400 p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setModalHotspot(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: modalHotspot.color }}
              ></span>
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
                Penjelasan Sains Elemen Kunci
              </span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-stone-900">{modalHotspot.name}</h3>
              <p className="text-xs text-stone-500 mt-0.5">Letak: {modalHotspot.category}</p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-stone-800 leading-relaxed space-y-2">
              <p className="font-bold text-orange-900">{modalHotspot.shortDesc}</p>
              <p>{modalHotspot.detailedDesc}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() =>
                  speakText(`${modalHotspot.name}. ${modalHotspot.detailedDesc}`)
                }
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Penjelasan</span>
              </button>

              <button
                type="button"
                onClick={() => setModalHotspot(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50"
              >
                Tutup Info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
