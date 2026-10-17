import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, RotateCcw, ArrowRight, Sparkles, CheckCircle2, Waves, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FLOAT_SINK_ITEMS } from '../data/scienceContent';
import { FloatSinkItem } from '../types/science';
import { soundManager, speakText } from '../utils/soundEffects';

interface FloatSinkLabProps {
  onUnlockSticker: (stickerId: string) => void;
}

interface TestedItem extends FloatSinkItem {
  userGuess: boolean; // true = guessed float, false = guessed sink
  isCorrect: boolean;
  xPosition: number; // horizontal % inside the tank
}

export const FloatSinkLab: React.FC<FloatSinkLabProps> = ({ onUnlockSticker }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [testedItems, setTestedItems] = useState<TestedItem[]>([]);
  const [lastResult, setLastResult] = useState<{
    item: FloatSinkItem;
    userGuess: boolean;
    isCorrect: boolean;
  } | null>(null);

  const currentItem = FLOAT_SINK_ITEMS[currentIndex % FLOAT_SINK_ITEMS.length];

  // Speak prompt when user taps speaker or changes item
  const handleSpeakItem = (item: FloatSinkItem) => {
    soundManager.playPop(520);
    speakText(item.voicePrompt);
  };

  const handleGuess = (guessedFloat: boolean) => {
    if (isTesting) return;
    setIsTesting(true);

    const isCorrect = guessedFloat === currentItem.floats;
    const xPos = 15 + ((testedItems.length * 11) % 70);

    // Play splash sound
    setTimeout(() => {
      soundManager.playSplash();
    }, 450);

    setTimeout(() => {
      const outcomeText = currentItem.floats
        ? `Hooray! The ${currentItem.name} floats on top of the water!`
        : `Splash! The ${currentItem.name} sinks to the bottom!`;
      
      speakText(outcomeText);

      if (isCorrect) {
        soundManager.playChime();
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#38bdf8', '#f59e0b', '#10b981'],
        });
      } else {
        soundManager.playPop(340);
      }

      const tested: TestedItem = {
        ...currentItem,
        userGuess: guessedFloat,
        isCorrect,
        xPosition: xPos,
      };

      setTestedItems((prev) => [...prev.filter((i) => i.id !== currentItem.id), tested]);
      setLastResult({ item: currentItem, userGuess: guessedFloat, isCorrect });
      setIsTesting(false);

      // Check if user has tested at least 3 items to unlock sticker
      if (testedItems.length + 1 >= 3) {
        onUnlockSticker('star-water');
      }
    }, 1200);
  };

  const handleNextItem = () => {
    soundManager.playPop(480);
    setLastResult(null);
    setCurrentIndex((prev) => (prev + 1) % FLOAT_SINK_ITEMS.length);
  };

  const handleResetTank = () => {
    soundManager.playPop(300);
    setTestedItems([]);
    setLastResult(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Lab Header strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <span>Water & Buoyancy Exploration</span>
            <span aria-hidden="true">·</span>
            <span>Ages 3–4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Float or Sink? Water Tank
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSpeakItem(currentItem)}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Read to Me</span>
          </button>

          <button
            onClick={handleResetTank}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Empty Tank</span>
          </button>
        </div>
      </div>

      {/* Main 2-Zone Sandbox: Left stage (Water Tank), Right control & prediction deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Stage Zone: The Interactive Water Tank (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-sky-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs font-medium text-sky-800">
            <span className="flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-sky-500" />
              <span>Observation Aquarium</span>
            </span>
            <span>{testedItems.length} objects tested</span>
          </div>

          {/* Water Tank Box */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-sky-300 bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300 shadow-inner">
            {/* Air / Sky zone above water line */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-amber-50/70 to-transparent z-0 flex items-center justify-center">
              <span className="text-[11px] font-bold tracking-wider uppercase text-sky-900/40">
                Air (Dry Zone)
              </span>
            </div>

            {/* Water surface line with gentle wavy shimmer */}
            <div className="absolute top-16 inset-x-0 h-3 bg-sky-300/80 border-b border-sky-400/50 z-10 animate-pulse" />

            {/* Water label */}
            <div className="absolute top-20 left-3 text-[11px] font-bold text-sky-700/60 uppercase tracking-wider z-0">
              Water Level
            </div>

            {/* Sandy bottom bed */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-amber-200/90 border-t-2 border-amber-300/80 z-10 flex items-center justify-center">
              <div className="flex gap-2 opacity-50">
                <span className="w-3 h-2 rounded-full bg-amber-400" />
                <span className="w-4 h-2 rounded-full bg-amber-500" />
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="w-5 h-2 rounded-full bg-amber-500" />
              </div>
              <span className="absolute bottom-1 text-[10px] font-semibold text-amber-900/60 uppercase">
                Tank Floor (Deep Sand)
              </span>
            </div>

            {/* Animated bubbles rising */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full bg-white/40 border border-white/60"
                  style={{
                    left: `${18 + i * 14}%`,
                    bottom: '12%',
                  }}
                  animate={{
                    y: [-10, -220],
                    opacity: [0.2, 0.8, 0],
                    x: [0, (i % 2 === 0 ? 8 : -8), 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + (i % 3),
                    delay: i * 0.7,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Current Item falling animation during test */}
            <AnimatePresence>
              {isTesting && (
                <motion.div
                  key="falling-item"
                  className="absolute z-20 flex flex-col items-center pointer-events-none"
                  style={{ left: '46%' }}
                  initial={{ top: '0px', scale: 1.1 }}
                  animate={{
                    top: currentItem.floats ? '72px' : '260px',
                    scale: 1,
                    rotate: currentItem.floats ? [0, -8, 6, 0] : [0, 15, -10, 0],
                  }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                >
                  <span className="text-4xl drop-shadow-md select-none">{currentItem.emoji}</span>
                  <span className="text-[11px] font-bold bg-white/90 px-1.5 py-0.5 rounded-sm shadow-xs text-slate-800 mt-1">
                    {currentItem.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Already tested items staying in their position in the tank */}
            {testedItems.map((item) => (
              <motion.div
                key={item.id}
                className="absolute z-10 flex flex-col items-center cursor-pointer group"
                style={{
                  left: `${item.xPosition}%`,
                  top: item.floats ? '68px' : '260px',
                }}
                animate={
                  item.floats
                    ? {
                        y: [-2, 3, -2],
                        rotate: [-2, 2, -2],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: 'easeInOut',
                }}
                onClick={() => {
                  soundManager.playPop(500);
                  speakText(item.childDescription);
                }}
              >
                <span className="text-3xl filter drop-shadow-sm select-none group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <span
                  className={`text-[9px] font-bold px-1 rounded-sm mt-0.5 shadow-2xs whitespace-nowrap ${
                    item.floats ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {item.floats ? 'Floats!' : 'Sank!'}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Feedback banner below aquarium */}
          <div className="mt-3 min-h-[48px] bg-sky-50/80 rounded-xl p-3 border border-sky-100 flex items-center justify-between">
            {lastResult ? (
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    lastResult.isCorrect ? 'bg-emerald-500 text-white' : 'bg-sky-500 text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-sky-950">
                  {lastResult.item.childDescription}
                </p>
              </div>
            ) : (
              <p className="text-xs text-sky-800/80">
                Choose an item below, make your prediction, then watch what happens in the water!
              </p>
            )}

            {lastResult && (
              <button
                onClick={handleNextItem}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ml-2 shadow-xs active:scale-95"
              >
                <span>Next Item</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Control Zone: Toddler Interactive Prediction Deck (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-amber-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Object to Test
              </span>
              <span className="text-xs text-amber-900/60 font-mono">
                Item {((currentIndex % FLOAT_SINK_ITEMS.length) + 1)} of {FLOAT_SINK_ITEMS.length}
              </span>
            </div>

            {/* Current Item Spotlight Card */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100/40 rounded-2xl p-6 border border-amber-200/60 text-center flex flex-col items-center relative overflow-hidden">
              <div className="text-6xl mb-2 filter drop-shadow-sm animate-bounce" style={{ animationDuration: '2s' }}>
                {currentItem.emoji}
              </div>
              <h3 className="text-xl font-extrabold text-amber-950 font-display">
                {currentItem.name}
              </h3>
              <p className="text-xs text-amber-800/80 mt-1 max-w-xs">
                Made of: <span className="font-semibold text-amber-950">{currentItem.material}</span>
              </p>

              <button
                onClick={() => handleSpeakItem(currentItem)}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-lg text-xs font-semibold text-amber-900 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Hear the question</span>
              </button>
            </div>

            {/* The Big Question */}
            <div className="my-5 text-center">
              <p className="text-base font-extrabold text-amber-950">
                What is your guess?
              </p>
              <p className="text-xs text-amber-800/70">
                Tap your prediction below!
              </p>
            </div>

            {/* 2 Big Toddler-Friendly Buttons */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* FLOAT Button */}
              <button
                onClick={() => handleGuess(true)}
                disabled={isTesting}
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white border-b-4 border-sky-700 shadow-md active:translate-y-1 active:border-b-0 transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">🌊</span>
                <span className="text-base font-black tracking-wide font-display">
                  FLOAT!
                </span>
                <span className="text-[11px] font-medium text-sky-100 opacity-90">
                  Stays on top
                </span>
              </button>

              {/* SINK Button */}
              <button
                onClick={() => handleGuess(false)}
                disabled={isTesting}
                className="group relative p-4 rounded-2xl bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border-b-4 border-amber-900 shadow-md active:translate-y-1 active:border-b-0 transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">⬇️</span>
                <span className="text-base font-black tracking-wide font-display">
                  SINK!
                </span>
                <span className="text-[11px] font-medium text-amber-100 opacity-90">
                  Drops down
                </span>
              </button>
            </div>
          </div>

          {/* Quick Item Picker Thumbnails */}
          <div className="mt-5 pt-4 border-t border-amber-100">
            <span className="text-[11px] font-bold text-amber-900/60 uppercase tracking-wider block mb-2">
              Choose Another Object:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {FLOAT_SINK_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playPop(450);
                    setCurrentIndex(idx);
                    setLastResult(null);
                  }}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    idx === currentIndex % FLOAT_SINK_ITEMS.length
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  <span className="text-xl block">{item.emoji}</span>
                  <span className="text-[10px] font-semibold text-slate-700 truncate block mt-0.5">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Classroom Teacher Tip Bar */}
      <div className="bg-amber-100/50 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3">
        <Compass className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950">
          <span className="font-bold">Preschool Science Tip for Teachers:</span>{' '}
          Ask children: "Is it heavy or light? Does it have air trapped inside like a balloon?"
          Young toddlers learn best by predicting first, observing the splash, and categorizing into groups!
        </div>
      </div>
    </div>
  );
};
