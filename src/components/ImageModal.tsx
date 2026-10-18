import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Volume2, Sparkles, Download, Check } from 'lucide-react';
import { speakText, playClickSound } from '../utils/audio';

export interface ImageModalData {
  title: string;
  subtitle: string;
  src: string;
  fallbackSrc?: string;
  alt: string;
  caption: string;
  legendItems?: Array<{ label: string; color: string; desc: string }>;
  speechText?: string;
}

interface ImageModalProps {
  data: ImageModalData | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ data, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setZoomLevel(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (data) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [data, onClose]);

  if (!data) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl overflow-hidden text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-orange-500/20 text-orange-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-stone-100 tracking-tight leading-tight">
                {data.title}
              </h3>
              <p className="text-[11px] text-amber-400/90 font-medium">{data.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Zoom Controls */}
            <div className="flex items-center bg-stone-800/80 rounded-xl p-1 border border-stone-700 text-xs">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                className="p-1.5 hover:bg-stone-700 rounded-lg text-stone-300 disabled:opacity-40 transition-colors"
                title="Perkecil (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2 py-0.5 text-[11px] font-bold text-amber-300 hover:text-white"
                title="Reset Ukuran"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-1.5 hover:bg-stone-700 rounded-lg text-stone-300 disabled:opacity-40 transition-colors"
                title="Perbesar (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Audio narration */}
            {data.speechText && (
              <button
                type="button"
                onClick={() => speakText(data.speechText!)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-xs"
                title="Dengarkan penjelasan Kapten Nala"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Suara Pemandu</span>
              </button>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              title="Tutup (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Display Area with Pan & Zoom */}
        <div className="relative flex-1 overflow-auto bg-stone-950 flex items-center justify-center p-4 min-h-[300px] max-h-[60vh] select-none">
          <div
            className="transition-transform duration-150 ease-out flex items-center justify-center max-w-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={data.src}
              alt={data.alt}
              onError={(e) => {
                if (data.fallbackSrc) {
                  (e.currentTarget as HTMLImageElement).src = data.fallbackSrc;
                }
              }}
              className="max-h-[56vh] w-auto object-contain rounded-xl shadow-2xl border border-stone-800"
            />
          </div>
        </div>

        {/* Footer & Legend Description */}
        <div className="px-5 py-4 bg-stone-900 border-t border-stone-800 space-y-3">
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {data.caption}
          </p>

          {data.legendItems && data.legendItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-800/80">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1">
                Keterangan Bagian:
              </span>
              {data.legendItems.map((item, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700 text-[11px]"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="font-bold text-stone-200">{item.label}:</span>
                  <span className="text-stone-400">{item.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
