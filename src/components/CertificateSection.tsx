import React, { useState } from 'react';
import { Award, Printer, CheckCircle, Sparkles, Volume2, BookCheck } from 'lucide-react';
import { speakText, playSuccessSound, playClickSound } from '../utils/audio';

interface CertificateSectionProps {
  quizScore: number;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({ quizScore }) => {
  const [studentName, setStudentName] = useState<string>('Siswa Hebat Kelas 6');
  const [schoolName, setSchoolName] = useState<string>('Sekolah Dasar Pintar');
  const [isGenerated, setIsGenerated] = useState<boolean>(true);

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleCelebrate = () => {
    playSuccessSound();
    speakText(
      `Selamat kepada ${studentName} dari ${schoolName}! Kamu telah berhasil menyelesaikan seluruh petualangan belajar proses terjadinya gunung meletus! Kamu resmi menjadi Penjelajah Vulkano Cilik!`
    );
  };

  return (
    <div className="space-y-6">
      {/* Smart Learning Summary Cards */}
      <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-orange-600" />
            <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
              Rangkuman Kilat Belajar Gunung Meletus (Kelas 6 SD)
            </h3>
          </div>
          <span className="text-xs font-extrabold text-white bg-emerald-600 px-3 py-1 rounded-full shadow-2xs">
            📖 Struktur Teks Eksplanasi: Bagian 3 - Penutup (Kesimpulan)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-stone-800">
            <span className="text-xs font-bold text-orange-700 block mb-1">
              1. Konsep Utama
            </span>
            <p className="text-xs leading-relaxed">
              Gunung meletus terjadi akibat magma di perut bumi terdorong ke atas oleh tekanan gas
              vulkanik yang sangat tinggi.
            </p>
          </div>

          <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 text-stone-800">
            <span className="text-xs font-bold text-orange-700 block mb-1">
              2. Teks Eksplanasi
            </span>
            <p className="text-xs leading-relaxed">
              Memiliki 3 struktur baku: <strong>Pernyataan Umum</strong> (pengertian),{' '}
              <strong>Deretan Penjelas</strong> (urutan proses), dan <strong>Penutup</strong> (kesimpulan/interpretasi).
            </p>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-stone-800">
            <span className="text-xs font-bold text-emerald-800 block mb-1">
              3. Manfaat Alam
            </span>
            <p className="text-xs leading-relaxed">
              Abu vulkanik menyuburkan tanah pertanian, menghasilkan material tambang pasir/batu,
              serta memicu mata air geotermal.
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Customizer Inputs */}
      <div className="bg-amber-100/60 p-5 rounded-3xl border border-amber-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
              Personalisasi Sertifikat Penjelajah Cilik
            </h4>
            <p className="text-xs text-stone-600">
              Ketik namamu dan asal sekolah untuk dicetak pada piagam penghargaan.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCelebrate}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rayakan dengan Pemandu</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Nama Lengkap Siswa:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Contoh: Budi Pratama"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-stone-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Asal Sekolah / Kelas:</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Contoh: SDN 1 Merapi - Kelas 6A"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-stone-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div
        id="certificate-print-area"
        className="bg-white p-6 sm:p-10 rounded-3xl border-4 border-amber-400 relative shadow-md overflow-hidden"
      >
        {/* Certificate Decorative Borders */}
        <div className="absolute inset-2 border-2 border-dashed border-amber-300 pointer-events-none rounded-2xl"></div>

        <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center mx-auto shadow-md">
            <Award className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[11px] font-extrabold tracking-widest text-orange-600 uppercase">
              Piagam Penghargaan Pembelajaran Sains & Bahasa Indonesia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1 font-serif">
              SERTIFIKAT PENJELAJAH VULKANO CILIK
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Telah Menyelesaikan Modul "Proses Terjadinya Gunung Meletus"
            </p>
          </div>

          <div className="py-2">
            <p className="text-xs text-stone-500 uppercase tracking-wider">Diberikan Kepada Siswa Berprestasi:</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-orange-700 underline decoration-amber-300 decoration-4 underline-offset-4 mt-1 font-serif">
              {studentName || 'Siswa Kelas 6'}
            </p>
            <p className="text-xs sm:text-sm font-bold text-stone-700 mt-1">
              {schoolName || 'Kelas 6 Sekolah Dasar'}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            Atas keberhasilannya memahami struktur teks eksplanasi (pernyataan umum, deretan penjelas,
            dan penutup) serta menguasai konsep ilmiah letusan gunung berapi dan simulasi erupsi secara
            tuntas.
          </p>

          {/* Certificate Signatures and Badges */}
          <div className="pt-6 border-t border-amber-200 flex items-center justify-between text-left text-xs">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Skor Kuis</span>
              <span className="font-extrabold text-orange-600 text-sm">
                {quizScore >= 30 ? '⭐⭐⭐' : quizScore >= 20 ? '⭐⭐' : '⭐'} {quizScore}/30 Poin
              </span>
            </div>

            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[11px] border border-amber-300">
                LULUS KOMPETENSI KELAS 6
              </span>
            </div>

            <div className="text-right flex items-center gap-2">
              <img
                src="/src/assets/images/kapten_nala_1791906531237.jpg"
                alt="Kapten Nala"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full border border-amber-400 object-cover object-top"
              />
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Komandan Ekspedisi</span>
                <span className="font-extrabold text-stone-800">Kapten Nala</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print / Save Action */}
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-sm active:scale-98 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan Sertifikat (PDF)</span>
        </button>
      </div>
    </div>
  );
};
