import React, { useState } from 'react';
import { Flame, Wind, AlertTriangle, ShieldCheck, Volume2, ArrowRight, Eye, Sparkles, Maximize2 } from 'lucide-react';
import { InteractiveStoryboardAnimation } from './InteractiveStoryboardAnimation';
import { speakText, playClickSound } from '../utils/audio';
import { awanPanasImg, resolveAssetUrl } from '../assets/images';
import { ImageModal, ImageModalData } from './ImageModal';

interface AwanPanasSectionProps {
  onContinue: () => void;
}

export const AwanPanasSection: React.FC<AwanPanasSectionProps> = ({ onContinue }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('suhu');
  const [modalData, setModalData] = useState<ImageModalData | null>(null);

  const hotspots = [
    {
      id: 'suhu',
      title: 'Suhu Super Panas (600°C)',
      badge: 'Suhu 600°C',
      desc: 'Awan panas bukanlah uap air biasa! Di dalamnya berisi gas belerang dan serpihan abu membara yang suhunya dapat membakar pohon dan hutan seketika.',
      speech: 'Awas Kawan! Awan panas memiliki suhu hingga 600 derajat Celsius. Suhunya sangat panas dan membakar apa saja di jalurnya!',
    },
    {
      id: 'kecepatan',
      title: 'Kecepatan Luncur Dahsyat (>100 km/jam)',
      badge: '>100 km/jam',
      desc: 'Meluncur menuruni lereng dengan kecepatan melebihi mobil di jalan tol! Penduduk tidak dapat berlari menghindar saat awan panas meluncur.',
      speech: 'Kecepatan awan panas melebihi 100 kilometer per jam! Karena itu, warga harus segera mengungsi saat status gunung dinaikkan menjadi Awas.',
    },
    {
      id: 'wedhus_gembel',
      title: 'Bentuk Bulu Domba (Wedhus Gembel)',
      badge: 'Wedhus Gembel',
      desc: 'Masyarakat di sekitar Gunung Merapi menyebutnya "Wedhus Gembel" karena gumpalan asap tebal bergulung-gulung mirip bulu domba yang lebat.',
      speech: 'Masyarakat Jawa menyebut awan panas sebagai Wedhus Gembel karena bentuk gumpalannya mirip bulu domba!',
    },
    {
      id: 'mitigasi',
      title: 'Langkah Mitigasi & Evakuasi Cepat',
      badge: 'Evakuasi Warga',
      desc: 'Saat sirene bahaya berbunyi, seluruh warga wajib meninggalkan zona bahaya, masuk ke tempat evakuasi yang aman, dan mengenakan masker anti abu.',
      speech: 'Kapten Nala mengingatkan: patuhi arahan petugas mitigasi bencana, segera mengungsi ke tempat aman, dan selalu kenakan masker!',
    },
  ];

  const currentInfo = hotspots.find((h) => h.id === selectedHotspot) || hotspots[0];

  return (
    <div className="space-y-6">
      {/* Pos Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-amber-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Pos 3 · Kawah Awan Panas
              </span>
              <span className="text-xs font-extrabold text-white bg-amber-600 px-3 py-1 rounded-full shadow-2xs">
                📖 Struktur Teks Eksplanasi: Bagian 2 - Deretan Penjelas
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
              Kawah Bahaya: Awan Panas (Wedhus Gembel)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              <strong>Fungsi dalam Teks Eksplanasi:</strong> Menjelaskan urutan tahapan erupsi saat kubah lava runtuh dan menyemburkan awan panas bersuhu 600°C di lereng.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(
                'Kawan! Di Pos 3 ini kita mengamati awan panas atau wedhus gembel yang sangat berbahaya. Pelajari titik suhunya, kecepatannya, dan amati storyboard animasinya!'
              )
            }
            className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-orange-600" />
            <span>Suara Kapten Nala</span>
          </button>
        </div>

        {/* Real Generated High-Res Illustration of Awan Panas */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-stone-800 shadow-md group">
          <img
            src={awanPanasImg}
            alt="Gumpalan Awan Panas (Pyroclastic Flow) Meluncur di Lereng Merapi"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = resolveAssetUrl('images/awan_panas.jpg');
            }}
            className="w-full aspect-[4/3] sm:aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-102 cursor-zoom-in"
            onClick={() =>
              setModalData({
                title: 'Gumpalan Awan Panas (Pyroclastic Flow) Meluncur di Lereng Merapi',
                subtitle: 'Pos 3 · Kawah Awan Panas Kapten Nala',
                src: awanPanasImg,
                fallbackSrc: resolveAssetUrl('images/awan_panas.jpg'),
                alt: 'Gumpalan Awan Panas Wedhus Gembel Merapi',
                caption:
                  'Foto pengamatan visual awan panas (wedhus gembel) meluncur deras menuruni lereng Gunung Merapi. Suhu gas dan serpihan debunya mencapai 600°C dengan kecepatan meluncur lebih dari 100 km/jam, membakar pepohonan hutan dan memaksa warga desa segera mengungsi.',
                speechText:
                  'Awas Kawan! Perhatikan gumpalan awan panas yang tebal mirip bulu domba ini meluncur di lereng gunung! Suhunya mencapai 600 derajat Celsius!',
                legendItems: [
                  { label: 'Hot Ash & Gas Cloud', color: '#71717a', desc: 'Gulungan gas belerang dan abu pekat membara' },
                  { label: 'Burning Forest', color: '#f97316', desc: 'Hutan terbakar karena panas ekstrem awan' },
                  { label: 'Evacuating Village', color: '#38bdf8', desc: 'Warga desa bergegas mengungsi ke zona aman' },
                  { label: 'Flying Dust', color: '#a8a29e', desc: 'Debu tajam melayang yang mewajibkan masker' },
                ],
              })
            }
          />

          {/* Quick Zoom HD Button */}
          <button
            type="button"
            onClick={() =>
              setModalData({
                title: 'Gumpalan Awan Panas (Pyroclastic Flow) Meluncur di Lereng Merapi',
                subtitle: 'Pos 3 · Kawah Awan Panas Kapten Nala',
                src: awanPanasImg,
                fallbackSrc: '/images/awan_panas.jpg',
                alt: 'Gumpalan Awan Panas Wedhus Gembel Merapi',
                caption:
                  'Foto pengamatan visual awan panas (wedhus gembel) meluncur deras menuruni lereng Gunung Merapi. Suhu gas dan serpihan debunya mencapai 600°C dengan kecepatan meluncur lebih dari 100 km/jam, membakar pepohonan hutan dan memaksa warga desa segera mengungsi.',
                speechText:
                  'Awas Kawan! Perhatikan gumpalan awan panas yang tebal mirip bulu domba ini meluncur di lereng gunung! Suhunya mencapai 600 derajat Celsius!',
                legendItems: [
                  { label: 'Hot Ash & Gas Cloud', color: '#71717a', desc: 'Gulungan gas belerang dan abu pekat membara' },
                  { label: 'Burning Forest', color: '#f97316', desc: 'Hutan terbakar karena panas ekstrem awan' },
                  { label: 'Evacuating Village', color: '#38bdf8', desc: 'Warga desa bergegas mengungsi ke zona aman' },
                  { label: 'Flying Dust', color: '#a8a29e', desc: 'Debu tajam melayang yang mewajibkan masker' },
                ],
              })
            }
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-orange-400 hover:text-white text-xs font-bold backdrop-blur-sm border border-stone-700 shadow-md transition-all active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Perbesar Gambar (HD Zoom)</span>
          </button>

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-transparent p-4 sm:p-5 text-white pointer-events-none">
            <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase block">
              Foto Pengamatan Lapangan Kapten Nala
            </span>
            <h3 className="text-sm sm:text-base font-extrabold">
              Gumpalan Awan Panas (Pyroclastic Flow) Meluncur di Lereng
            </h3>
            <p className="text-xs text-stone-300 mt-1 max-w-xl">
              Perhatikan hutan yang terbakar dan gumpalan debu membara yang meluncur deras menuju pemukiman di kaki gunung.
            </p>
          </div>
        </div>

        {/* Interactive Hotspot Feature Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {hotspots.map((hs) => (
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
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {hs.badge}
              </span>
              <h4 className="text-xs font-extrabold line-clamp-1">{hs.title}</h4>
            </button>
          ))}
        </div>

        {/* Selected Hotspot Explanation Box */}
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-orange-700">{currentInfo.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {currentInfo.desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => speakText(currentInfo.speech)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengarkan</span>
          </button>
        </div>
      </div>

      {/* Interactive Storyboard Animation (Complete 4 Scenes with Hotspots) */}
      <InteractiveStoryboardAnimation />

      {/* Continue CTA to Pos 4 */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onContinue();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md active:scale-98 transition-all"
        >
          <span>Lanjut ke Pos 4: Lembah Sungai Lahar & Simulator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen HD Image Preview Modal */}
      <ImageModal data={modalData} onClose={() => setModalData(null)} />
    </div>
  );
};
