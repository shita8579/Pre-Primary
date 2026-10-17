import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, Printer, Volume2, Clock, Check, HelpCircle, Layers, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HANDS_ON_ACTIVITIES } from '../data/transportationContent';
import { HandsOnActivity } from '../types/transportation';
import { soundManager, speakText } from '../utils/soundEffects';
import { StepPicture } from './StepPicture';

interface HandsOnActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLabId?: 'sorting' | 'car-craft' | 'sound-quiz' | 'rescue' | 'drive';
  onSelectTab?: (tab: 'sorting' | 'car-craft' | 'sound-quiz' | 'rescue' | 'drive') => void;
}

export const HandsOnActivityModal: React.FC<HandsOnActivityModalProps> = ({
  isOpen,
  onClose,
  activeLabId = 'sorting',
  onSelectTab,
}) => {
  const [selectedLabId, setSelectedLabId] = useState<'sorting' | 'car-craft' | 'sound-quiz' | 'rescue' | 'drive'>(activeLabId);
  const [lang, setLang] = useState<'id' | 'en'>('id'); // Default to Indonesian for Ms. Rosita, with English toggle
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isActivityDone, setIsActivityDone] = useState<boolean>(false);

  // Sync if activeLabId changes
  React.useEffect(() => {
    if (activeLabId) {
      setSelectedLabId(activeLabId);
      setCompletedSteps([]);
      setIsActivityDone(false);
    }
  }, [activeLabId]);

  if (!isOpen) return null;

  const currentActivity =
    HANDS_ON_ACTIVITIES.find((a) => a.labId === selectedLabId) || HANDS_ON_ACTIVITIES[0];

  const handleToggleStep = (stepNum: number) => {
    soundManager.playPop(520);
    setCompletedSteps((prev) => {
      const next = prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum];
      if (next.length === currentActivity.steps.length) {
        setIsActivityDone(true);
        soundManager.playFanfare();
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
      return next;
    });
  };

  const handleSpeakInstruction = (text: string) => {
    soundManager.playPop(480);
    speakText(text);
  };

  const handlePrint = () => {
    soundManager.playPop(520);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl">
              🎨
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">
                {lang === 'id' ? 'Aktivitas Praktis Nyata (Hands-on Activity)' : 'Classroom Hands-on Activity'}
              </h2>
              <p className="text-xs text-emerald-100">
                {lang === 'id' ? 'Praktik langsung untuk siswa TK di akhir pembelajaran' : 'End-of-unit tactile activities for kindergarten students'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle: Bahasa Indonesia / English */}
            <div className="flex items-center bg-emerald-800/60 p-1 rounded-xl">
              <button
                onClick={() => {
                  soundManager.playPop(420);
                  setLang('id');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'id' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => {
                  soundManager.playPop(480);
                  setLang('en');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'en' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            <button
              onClick={() => {
                soundManager.playPop(300);
                onClose();
              }}
              className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          
          {/* Activity Category Selector (Hidden on Print) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 print:hidden">
            {HANDS_ON_ACTIVITIES.map((act) => (
              <button
                key={act.id}
                onClick={() => {
                  soundManager.playPop(450);
                  setSelectedLabId(act.labId);
                  setCompletedSteps([]);
                  setIsActivityDone(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  selectedLabId === act.labId
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-950 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <span>
                  {act.labId === 'sorting' && '🛣️'}
                  {act.labId === 'car-craft' && '🚗'}
                  {act.labId === 'sound-quiz' && '🎧'}
                  {act.labId === 'rescue' && '🚨'}
                  {act.labId === 'drive' && '🏎️'}
                </span>
                <span>{lang === 'id' ? act.titleId : act.title}</span>
              </button>
            ))}
          </div>

          {/* Activity Detail Sheet */}
          <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 space-y-6 print:border-none print:p-0">
            
            {/* Direct Studio Jump Banner if on Car Craft */}
            {currentActivity.labId === 'car-craft' && onSelectTab && (
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs print:hidden">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🚗</span>
                  <div>
                    <span className="font-extrabold text-sm block">
                      {lang === 'id' ? 'Ingin melihat diagram bagian mobil & mendengar bunyi klakson?' : 'Want to inspect the car diagram & hear engine sounds?'}
                    </span>
                    <span className="text-xs text-amber-100">
                      {lang === 'id' ? 'Buka Studio Interaktif Bedah & Kreasi Mobil sekarang' : 'Open the Interactive Car Anatomy & Craft Studio now'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    soundManager.playCarHonk();
                    onSelectTab('car-craft');
                    onClose();
                  }}
                  className="px-4 py-2 bg-white hover:bg-amber-50 text-amber-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 active:scale-95 whitespace-nowrap"
                >
                  <span>{lang === 'id' ? 'Buka Studio Mobil' : 'Open Car Studio'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Title & Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-emerald-200/60">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  {lang === 'id' ? 'Aktivitas Akhir Pembelajaran' : 'Post-Lesson Physical Activity'}
                </span>
                <h3 className="text-2xl font-black text-emerald-950 font-display mt-0.5">
                  {lang === 'id' ? currentActivity.titleId : currentActivity.title}
                </h3>
                <p className="text-xs text-emerald-900/80 mt-1">
                  {currentActivity.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 bg-white rounded-xl text-xs font-bold text-emerald-900 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentActivity.durationMinutes} Menit</span>
                </span>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all print:hidden"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'Cetak Lembar Aktivitas' : 'Print Activity Sheet'}</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {currentActivity.description}
            </p>

            {/* Required Classroom Materials */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200/80 shadow-2xs">
              <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span>📦</span>
                <span>{lang === 'id' ? 'Alat & Bahan Sederhana di Kelas:' : 'Materials Needed in Classroom:'}</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {currentActivity.materials.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-center gap-2 text-xs font-bold text-emerald-950"
                  >
                    <span className="text-xl">{m.emoji}</span>
                    <span className="leading-tight">{lang === 'id' ? m.nameId : m.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Hands-On Instructions with Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>👣</span>
                  <span>{lang === 'id' ? 'Langkah-Langkah Aktivitas Siswa:' : 'Step-by-Step Student Instructions:'}</span>
                </h4>
                <span className="text-xs text-emerald-800 font-mono font-bold">
                  {completedSteps.length} / {currentActivity.steps.length} {lang === 'id' ? 'Selesai' : 'Done'}
                </span>
              </div>

              <div className="space-y-3.5">
                {currentActivity.steps.map((step) => {
                  const isChecked = completedSteps.includes(step.stepNumber);
                  const instructionText = lang === 'id' ? step.instructionId : step.instruction;
                  const stepTitle = lang === 'id' ? step.titleId : step.title;

                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => handleToggleStep(step.stepNumber)}
                      className={`p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col md:flex-row items-start gap-4 group shadow-2xs ${
                        isChecked
                          ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 shadow-xs'
                          : 'bg-white border-emerald-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-800'
                      }`}
                    >
                      {/* Step Picture Visual Illustration */}
                      {step.stepType && (
                        <div className="w-full md:w-56 shrink-0 rounded-2xl overflow-hidden shadow-2xs border border-emerald-200/80">
                          <StepPicture
                            stepType={step.stepType}
                            title={stepTitle}
                            stepNumber={step.stepNumber}
                            altText={step.imageAltId || instructionText}
                            aspect="aspect-16/10"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl shrink-0 select-none">{step.emoji}</span>
                              <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                                {lang === 'id' ? `Langkah ${step.stepNumber}` : `Step ${step.stepNumber}`}:
                              </span>
                              <span className="text-sm sm:text-base font-extrabold font-display">
                                {stepTitle}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {/* Audio Read Aloud button for toddlers */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSpeakInstruction(instructionText);
                                }}
                                className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors print:hidden"
                                title="Dengarkan instruksi"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>

                              <div
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? 'bg-emerald-600 border-emerald-700 text-white'
                                    : 'border-slate-300 bg-white group-hover:border-emerald-400'
                                }`}
                              >
                                {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                              </div>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 font-medium">
                            {instructionText}
                          </p>
                        </div>

                        {step.imageAltId && (
                          <div className="mt-3 pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-850/90 italic flex items-center gap-1.5">
                            <span className="text-sm">🖼️</span>
                            <span>{step.imageAltId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reflection Questions for Morning Circle or Wrap-Up */}
            <div className="bg-sky-50 rounded-2xl p-4 sm:p-5 border border-sky-200">
              <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>{lang === 'id' ? 'Pertanyaan Refleksi & Tanya Jawab Guru:' : 'Teacher Discussion & Wrap-up Prompts:'}</span>
              </h4>

              <ul className="list-disc list-inside space-y-1.5 text-xs text-sky-950 font-medium">
                {(lang === 'id' ? currentActivity.reflectionQuestionsId : currentActivity.reflectionQuestions).map(
                  (q, idx) => (
                    <li key={idx} className="leading-relaxed">
                      "{q}"
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Learning Benefit Note */}
            <div className="text-xs text-emerald-950 bg-emerald-100/60 p-3.5 rounded-xl border border-emerald-200">
              <span className="font-bold">{lang === 'id' ? 'Manfaat Pembelajaran:' : 'Pedagogical Benefit:'}</span>{' '}
              {lang === 'id' ? currentActivity.learningBenefitId : currentActivity.learningBenefit}
            </div>

            {/* Completion Banner */}
            {isActivityDone && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white text-center space-y-2 shadow-md"
              >
                <div className="text-3xl">🌟 🏆 🌟</div>
                <h4 className="text-lg font-black font-display">
                  {lang === 'id'
                    ? 'Hebat Sekali! Aktivitas Praktis Selesai!'
                    : 'Bravo! Hands-On Activity Completed!'}
                </h4>
                <p className="text-xs text-emerald-100 max-w-md mx-auto">
                  {lang === 'id'
                    ? 'Siswa berhasil mempraktikkan langsung klasifikasi transportasi di dunia nyata!'
                    : 'The students have successfully explored transportation classification hands-on!'}
                </p>
              </motion.div>
            )}

          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-emerald-50/70 border-t border-emerald-100 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <span>💡 {lang === 'id' ? 'Tips Mengajar: Lakukan kegiatan ini bersama kelompok kecil di karpet kelas.' : 'Teaching Tip: Great for small groups on classroom rugs.'}</span>
          </div>

          <button
            onClick={() => {
              soundManager.playPop(350);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            {lang === 'id' ? 'Tutup & Lanjutkan' : 'Close & Continue'}
          </button>
        </div>

      </div>
    </div>
  );
};
