import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, Volume2, RotateCcw, Lightbulb, Award } from 'lucide-react';
import { KUIS_DATA } from '../data/volcanoData';
import { playClickSound, playSuccessSound, playWrongSound, speakText } from '../utils/audio';

interface QuizSectionProps {
  onQuizCompleted: (scorePoints: number) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onQuizCompleted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState<boolean>(false);

  const question = KUIS_DATA[currentQuestionIndex];
  const selectedOptionId = selectedAnswers[question.id];
  const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
  const hasAnswered = Boolean(selectedOptionId);

  // Calculate accumulated points so far (10 points per correct answer)
  const currentTotalPoints = Object.entries(selectedAnswers).reduce((acc, [qId, optId]) => {
    const q = KUIS_DATA.find((item) => item.id === Number(qId));
    const opt = q?.options.find((o) => o.id === optId);
    return opt?.isCorrect ? acc + 10 : acc;
  }, 0);

  const handleSelectOption = (optionId: string) => {
    if (hasAnswered) return; // Prevent changing answer once selected

    playClickSound();
    const chosenOption = question.options.find((o) => o.id === optionId);
    const isCorrect = chosenOption?.isCorrect ?? false;

    const updatedAnswers = {
      ...selectedAnswers,
      [question.id]: optionId,
    };
    setSelectedAnswers(updatedAnswers);

    if (isCorrect) {
      playSuccessSound();
      speakText(`Hebat! Jawabanmu benar! Kamu mendapat 10 poin! ${chosenOption?.reason || ''}`);
    } else {
      playWrongSound();
      speakText(`Hampir tepat! ${chosenOption?.reason || ''}. Jawaban yang tepat adalah: ${question.generalExplanation}`);
    }
  };

  const handleNextQuestion = () => {
    playClickSound();
    if (currentQuestionIndex < KUIS_DATA.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      // Calculate final points
      let finalPoints = 0;
      KUIS_DATA.forEach((q) => {
        const picked = selectedAnswers[q.id];
        const opt = q.options.find((o) => o.id === picked);
        if (opt?.isCorrect) finalPoints += 10;
      });
      onQuizCompleted(finalPoints);
      speakText(`Selamat! Kamu menyelesaikan kuis dengan total skor ${finalPoints} poin dari maksimal 30 poin!`);
    }
  };

  const handlePrevQuestion = () => {
    playClickSound();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    playClickSound();
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Quiz Header & Live Points Tracker */}
      <div className="bg-amber-100/90 p-4 rounded-3xl border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
              Kuis Interaktif Sains: Proses Gunung Meletus (Kelas 6 SD)
            </h3>
            <p className="text-xs text-stone-600">
              Dapatkan <strong className="text-orange-700">+10 Poin</strong> untuk setiap jawaban yang benar!
            </p>
          </div>
        </div>

        {/* Live Score Counter Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-white px-4 py-2 rounded-2xl border border-amber-200 shadow-2xs">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
              Total Skor Saat Ini
            </span>
            <span className="text-sm sm:text-base font-extrabold text-orange-600">
              {currentTotalPoints} / 30 Poin
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-extrabold text-xs flex items-center justify-center">
            🪙
          </div>
        </div>
      </div>

      {!completed ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-xs space-y-6">
          {/* Question Order & Read Button */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Soal Nomor {currentQuestionIndex + 1} dari {KUIS_DATA.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  speakText(
                    `Soal nomor ${currentQuestionIndex + 1}: ${question.question}. Pilihan A: ${
                      question.options[0].text
                    }. Pilihan B: ${question.options[1].text}. Pilihan C: ${
                      question.options[2].text
                    }. Pilihan D: ${question.options[3].text}.`
                  )
                }
                className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                <span>Bacakan Soal</span>
              </button>
            </div>

            <h4 className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug pt-1">
              {question.question}
            </h4>
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let optionStyle =
                'bg-stone-50 border-stone-200 text-stone-800 hover:bg-amber-50 hover:border-orange-300';

              if (hasAnswered) {
                if (opt.isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300';
                } else if (isSelected && !opt.isCorrect) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-300';
                } else {
                  optionStyle = 'bg-stone-50/50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      hasAnswered && opt.isCorrect
                        ? 'bg-emerald-500 text-white'
                        : hasAnswered && isSelected && !opt.isCorrect
                        ? 'bg-rose-500 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="flex-1 mt-0.5">{opt.text}</span>
                  {hasAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                  {hasAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Instant Feedback & Why Right/Wrong Explanation */}
          {hasAnswered && selectedOption && (
            <div
              className={`p-5 rounded-2xl border animate-in fade-in duration-200 space-y-2 ${
                selectedOption.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-stone-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md ${
                      selectedOption.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-orange-600 text-white'
                    }`}
                  >
                    {selectedOption.isCorrect ? '🎉 +10 Poin Diraih!' : '💡 Jawaban Belum Tepat'}
                  </span>
                  <span className="font-extrabold text-xs uppercase tracking-wider text-stone-600">
                    Penjelasan Singkat:
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      `${selectedOption.reason}. ${
                        !selectedOption.isCorrect
                          ? `Penjelasan lengkap: ${question.generalExplanation}`
                          : ''
                      }`
                    )
                  }
                  className="flex items-center gap-1 text-[11px] font-bold text-orange-700 hover:text-orange-900 bg-white px-2 py-0.5 rounded-lg border border-amber-200"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Dengarkan</span>
                </button>
              </div>

              {/* Specific reason why the chosen option is correct or wrong */}
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                {selectedOption.reason}
              </p>

              {/* Additional helpful explanation if wrong */}
              {!selectedOption.isCorrect && (
                <div className="pt-2 mt-2 border-t border-amber-200/80 text-xs text-stone-700 leading-relaxed">
                  <span className="font-bold text-stone-900">Pembahasan Lengkap: </span>
                  {question.generalExplanation}
                </div>
              )}
            </div>
          )}

          {/* Navigation Between Quiz Questions */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <button
              type="button"
              disabled={currentQuestionIndex === 0}
              onClick={handlePrevQuestion}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                currentQuestionIndex === 0
                  ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              ← Soal Sebelumnya
            </button>

            <button
              type="button"
              disabled={!hasAnswered}
              onClick={handleNextQuestion}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-xs transition-all ${
                !hasAnswered
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm active:scale-98'
              }`}
            >
              {currentQuestionIndex < KUIS_DATA.length - 1
                ? 'Lanjut Soal Berikutnya →'
                : 'Lihat Total Skor Kuis ✨'}
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Completed Final Score Board */
        <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-xs text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto text-3xl shadow-md">
            🏆
          </div>

          <div>
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
              Hasil Akhir Evaluasi Kuis
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              Total Skor Kamu: {currentTotalPoints} / 30 Poin
            </h4>
            <p className="text-sm text-stone-600 mt-1">
              {currentTotalPoints === 30
                ? '⭐⭐⭐ Sempurna! Kamu menjawab 3 soal dengan benar (+30 Poin)!'
                : currentTotalPoints === 20
                ? '⭐⭐ Bagus Sekali! Kamu menjawab 2 soal dengan benar (+20 Poin)!'
                : currentTotalPoints === 10
                ? '⭐ Cukup Baik! Kamu menjawab 1 soal dengan benar (+10 Poin)!'
                : 'Ayo coba lagi untuk mengumpulkan poin!'}
            </p>
          </div>

          {/* Child-friendly badge & summary */}
          <div className="max-w-md mx-auto p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
            {currentTotalPoints === 30
              ? 'Luar biasa! Kamu sangat memahami magma, awan panas, dan lahar dingin. Kamu resmi berhak menyandang gelar Ahli Vulkanologi Cilik!'
              : currentTotalPoints === 20
              ? 'Hebat! Pengetahuanmu tentang letusan gunung berapi sudah sangat baik. Pelajari sedikit lagi dan kamu akan mendapat nilai sempurna!'
              : 'Semangat pantang menyerah! Klik tombol "Coba Kuis Lagi" untuk mengulang pertanyaan dan raih skor 30 poin penuh!'}
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetQuiz}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs sm:text-sm hover:bg-stone-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Kuis Lagi</span>
            </button>

            <button
              type="button"
              onClick={() => {
                speakText(
                  `Selamat! Kamu menyelesaikan kuis dengan total nilai ${currentTotalPoints} poin dari maksimal 30 poin!`
                );
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs sm:text-sm hover:bg-orange-600 shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Dengarkan Ucapan Pemandu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
