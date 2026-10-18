import React from 'react';
import { Mountain, BookOpen, Flame, HelpCircle, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { StageId, StageInfo } from '../types';
import { STAGES } from '../data/volcanoData';
import { playClickSound } from '../utils/audio';

interface StoryboardMapProps {
  currentStageId: StageId;
  completedStages: Set<StageId>;
  onSelectStage: (id: StageId) => void;
}

export const StoryboardMap: React.FC<StoryboardMapProps> = ({
  currentStageId,
  completedStages,
  onSelectStage,
}) => {
  const getIcon = (iconName: string, isCurrent: boolean) => {
    const props = { className: `w-5 h-5 ${isCurrent ? 'text-white' : 'text-stone-700'}` };
    switch (iconName) {
      case 'mountain':
        return <Mountain {...props} />;
      case 'book-open':
        return <BookOpen {...props} />;
      case 'flame':
        return <Flame {...props} />;
      case 'help-circle':
        return <HelpCircle {...props} />;
      case 'award':
        return <Award {...props} />;
      default:
        return <Mountain {...props} />;
    }
  };

  const currentIndex = STAGES.findIndex((s) => s.id === currentStageId);
  const progressPercent = Math.round(((completedStages.size) / STAGES.length) * 100);

  return (
    <div className="bg-gradient-to-b from-amber-100/90 via-orange-50/70 to-amber-100/90 border border-amber-300 rounded-3xl p-4 sm:p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
              Peta Ekspedisi Penjelajah Kapten Nala
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Jelajahi setiap pos pulau vulkanik untuk menuntaskan misi bersama Kapten Nala!
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3 bg-white/80 border border-amber-200 px-3.5 py-1.5 rounded-2xl shadow-xs self-start md:self-auto">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Progres Ekspedisi
            </span>
            <span className="text-xs font-bold text-orange-600">
              {completedStages.size} dari {STAGES.length} Pos Selesai
            </span>
          </div>
          <div className="w-20 bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(10, progressPercent)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Storyboard Map Path */}
      <div className="relative">
        {/* Connecting Trail Line for Desktop/Tablet */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-2 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 -translate-y-1/2 rounded-full z-0 opacity-70"></div>

        {/* Storyboard Map Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 relative z-10">
          {STAGES.map((stage, idx) => {
            const isCurrent = stage.id === currentStageId;
            const isCompleted = completedStages.has(stage.id);

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectStage(stage.id);
                }}
                className={`group relative text-left p-3.5 rounded-2xl transition-all duration-200 border flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-b from-orange-500 to-amber-600 text-white shadow-md ring-4 ring-orange-300/60 scale-[1.02]'
                    : isCompleted
                    ? 'bg-white/95 border-emerald-300 text-stone-800 hover:border-orange-400 hover:shadow-sm'
                    : 'bg-white/80 border-stone-200 text-stone-700 hover:border-amber-400 hover:bg-white'
                }`}
              >
                <div>
                  {/* Kapten Nala Avatar on Active Node */}
                  {isCurrent && (
                    <span className="absolute -top-3 -right-2 z-20 flex items-center gap-1 bg-amber-900 text-yellow-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md border border-yellow-400 animate-bounce">
                      ⚓ KAPTEN NALA
                    </span>
                  )}

                  {/* Top node header */}
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                        isCurrent
                          ? 'bg-white/20 text-white border border-white/30'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <span>{stage.order}</span>
                      )}
                    </div>

                    {/* Small badge */}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? 'bg-black/20 text-white'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {isCompleted ? 'Selesai ✓' : isCurrent ? 'Pos Aktif 📍' : `Pos ${stage.order}`}
                    </span>
                  </div>

                  {/* Title and subtitle */}
                  <h3
                    className={`font-bold text-sm leading-snug line-clamp-1 ${
                      isCurrent ? 'text-white' : 'text-stone-900 group-hover:text-orange-600'
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className={`text-xs mt-0.5 line-clamp-1 ${
                      isCurrent ? 'text-orange-100' : 'text-stone-500'
                    }`}
                  >
                    {stage.subtitle}
                  </p>
                </div>

                <div
                  className={`mt-3 pt-2 text-[11px] flex items-center justify-between border-t ${
                    isCurrent ? 'border-white/20 text-orange-100' : 'border-stone-100 text-stone-400'
                  }`}
                >
                  <span>{isCurrent ? 'Sedang Dipelajari' : 'Klik untuk Buka'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
