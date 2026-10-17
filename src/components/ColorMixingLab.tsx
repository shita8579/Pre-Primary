import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Volume2, Beaker, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager, speakText } from '../utils/soundEffects';

interface ColorMixingLabProps {
  onUnlockSticker: (stickerId: string) => void;
}

type PrimaryColor = 'red' | 'yellow' | 'blue';

interface ColorResult {
  name: string;
  cssBg: string;
  cssBorder: string;
  emoji: string;
  description: string;
  realWorldMatches: { name: string; emoji: string }[];
}

export const ColorMixingLab: React.FC<ColorMixingLabProps> = ({ onUnlockSticker }) => {
  const [selectedColors, setSelectedColors] = useState<PrimaryColor[]>([]);
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [lastPoured, setLastPoured] = useState<PrimaryColor | null>(null);

  // Compute resulting mixture
  const getMixResult = (colors: PrimaryColor[]): ColorResult | null => {
    if (colors.length === 0) return null;
    const hasRed = colors.includes('red');
    const hasYellow = colors.includes('yellow');
    const hasBlue = colors.includes('blue');

    if (hasRed && hasYellow && hasBlue) {
      return {
        name: 'Earth Brown',
        cssBg: 'from-amber-900 to-amber-950',
        cssBorder: 'border-amber-800',
        emoji: '🌰',
        description: 'All three primary colors mixed together create warm earthy brown, like tree bark and acorns!',
        realWorldMatches: [
          { name: 'Tree Bark', emoji: '🪵' },
          { name: 'Teddy Bear', emoji: '🧸' },
          { name: 'Chocolate', emoji: '🍫' },
        ],
      };
    }

    if (hasRed && hasYellow) {
      return {
        name: 'Bright Orange',
        cssBg: 'from-amber-400 via-orange-500 to-amber-500',
        cssBorder: 'border-orange-500',
        emoji: '🍊',
        description: 'Magic! Red + Yellow mixed together make bright ORANGE, like carrots and sweet oranges!',
        realWorldMatches: [
          { name: 'Carrot', emoji: '🥕' },
          { name: 'Pumpkin', emoji: '🎃' },
          { name: 'Orange Fruit', emoji: '🍊' },
          { name: 'Cute Fox', emoji: '🦊' },
        ],
      };
    }

    if (hasYellow && hasBlue) {
      return {
        name: 'Fresh Green',
        cssBg: 'from-emerald-400 via-green-500 to-emerald-600',
        cssBorder: 'border-emerald-500',
        emoji: '🍃',
        description: 'Magic! Yellow + Blue mixed together make fresh GREEN, like grass and tree frogs!',
        realWorldMatches: [
          { name: 'Green Leaf', emoji: '🍃' },
          { name: 'Happy Frog', emoji: '🐸' },
          { name: 'Crisp Apple', emoji: '🍏' },
          { name: 'Tall Tree', emoji: '🌳' },
        ],
      };
    }

    if (hasRed && hasBlue) {
      return {
        name: 'Royal Purple',
        cssBg: 'from-purple-500 via-violet-600 to-purple-700',
        cssBorder: 'border-purple-500',
        emoji: '🍇',
        description: 'Magic! Red + Blue mixed together make vibrant PURPLE, like sweet grapes and lavender!',
        realWorldMatches: [
          { name: 'Sweet Grapes', emoji: '🍇' },
          { name: 'Eggplant', emoji: '🍆' },
          { name: 'Purple Flower', emoji: '🪻' },
          { name: 'Butterfly', emoji: '🦋' },
        ],
      };
    }

    if (hasRed) {
      return {
        name: 'Ruby Red',
        cssBg: 'from-rose-500 to-red-600',
        cssBorder: 'border-rose-500',
        emoji: '🍓',
        description: 'Pure primary Red! Now add Yellow or Blue to see it transform!',
        realWorldMatches: [
          { name: 'Strawberry', emoji: '🍓' },
          { name: 'Apple', emoji: '🍎' },
          { name: 'Fire Engine', emoji: '🚒' },
        ],
      };
    }

    if (hasYellow) {
      return {
        name: 'Sunshine Yellow',
        cssBg: 'from-amber-300 via-yellow-400 to-amber-400',
        cssBorder: 'border-yellow-400',
        emoji: '☀️',
        description: 'Pure primary Yellow! Now add Red or Blue to see color magic!',
        realWorldMatches: [
          { name: 'Warm Sun', emoji: '☀️' },
          { name: 'Yellow Duck', emoji: '🦆' },
          { name: 'Banana', emoji: '🍌' },
        ],
      };
    }

    if (hasBlue) {
      return {
        name: 'Ocean Blue',
        cssBg: 'from-sky-400 via-blue-500 to-indigo-600',
        cssBorder: 'border-blue-500',
        emoji: '🌊',
        description: 'Pure primary Blue! Now add Yellow or Red to create a new color!',
        realWorldMatches: [
          { name: 'Ocean Wave', emoji: '🌊' },
          { name: 'Blue Sky', emoji: '🌌' },
          { name: 'Blue Whale', emoji: '🐋' },
        ],
      };
    }

    return null;
  };

  const currentResult = getMixResult(selectedColors);

  const handleAddColor = (color: PrimaryColor) => {
    if (selectedColors.includes(color)) {
      soundManager.playPop(300);
      return;
    }

    setIsPouring(true);
    setLastPoured(color);
    soundManager.playWaterPour();

    setTimeout(() => {
      setIsPouring(false);
      const nextColors = [...selectedColors, color];
      setSelectedColors(nextColors);

      const nextResult = getMixResult(nextColors);
      if (nextResult) {
        soundManager.playChime();
        speakText(nextResult.description);

        if (nextColors.length >= 2) {
          confetti({
            particleCount: 40,
            spread: 70,
            origin: { y: 0.6 },
          });
          onUnlockSticker('star-color');
        }
      }
    }, 800);
  };

  const handleResetBeaker = () => {
    soundManager.playPop(320);
    setSelectedColors([]);
    setLastPoured(null);
  };

  const handleSpeakCurrentResult = () => {
    if (!currentResult) {
      speakText('Tap any two color droppers to mix them in the potion beaker!');
    } else {
      speakText(currentResult.description);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Lab Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider">
            <span>Color Science & Blending</span>
            <span aria-hidden="true">·</span>
            <span>Ages 3–4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Magic Color Mixing Lab
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakCurrentResult}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Read to Me</span>
          </button>

          <button
            onClick={handleResetBeaker}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Rinse Bowl</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox 2-Zone Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Stage Zone: The Magic Mixing Beaker (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-purple-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs font-medium text-purple-900">
            <span className="flex items-center gap-1.5 font-bold">
              <Beaker className="w-4 h-4 text-purple-600" />
              <span>Mixing Station</span>
            </span>
            <span>
              {selectedColors.length === 0
                ? 'Empty Bowl'
                : `${selectedColors.length} color${selectedColors.length > 1 ? 's' : ''} added`}
            </span>
          </div>

          {/* Mixing Canvas */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-purple-200 bg-gradient-to-b from-purple-50/50 via-white to-amber-50/30 shadow-inner flex flex-col items-center justify-center p-6">
            
            {/* Animated Liquid Droplets during pour */}
            {isPouring && (
              <div className="absolute top-8 inset-x-0 flex justify-center pointer-events-none z-30">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3.5 h-6 rounded-full mx-1 ${
                      lastPoured === 'red'
                        ? 'bg-rose-500'
                        : lastPoured === 'yellow'
                        ? 'bg-amber-400'
                        : 'bg-blue-500'
                    }`}
                    initial={{ y: 0, opacity: 1, scale: 0.8 }}
                    animate={{ y: 140, opacity: 0, scale: 1.2 }}
                    transition={{ repeat: Infinity, duration: 0.45, delay: i * 0.08 }}
                  />
                ))}
              </div>
            )}

            {/* Giant Magic Glass Beaker */}
            <div className="relative w-64 h-64 rounded-full border-8 border-slate-300/80 bg-slate-50/40 shadow-2xl overflow-hidden flex items-center justify-center">
              
              {/* Glass Rim highlight */}
              <div className="absolute top-4 inset-x-8 h-8 rounded-full border-t-2 border-white/90 z-20 pointer-events-none" />

              {/* Liquid inside the beaker */}
              {currentResult ? (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-tr ${currentResult.cssBg} flex flex-col items-center justify-center p-4 text-white text-center`}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                >
                  {/* Swirling ripples inside liquid */}
                  <div className="text-6xl drop-shadow-md select-none animate-bounce" style={{ animationDuration: '2.5s' }}>
                    {currentResult.emoji}
                  </div>
                  <h3 className="text-xl font-black font-display tracking-wide drop-shadow-sm mt-2">
                    {currentResult.name}!
                  </h3>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center text-center p-4">
                  <span className="text-5xl opacity-40 mb-2">🥣</span>
                  <span className="text-xs font-bold text-slate-500">
                    Empty Glass Bowl
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Tap colors on the right to pour!
                  </span>
                </div>
              )}
            </div>

            {/* Ingredients added indicator pills */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">In the bowl:</span>
              {selectedColors.length === 0 ? (
                <span className="text-xs text-slate-400 italic">None yet</span>
              ) : (
                selectedColors.map((c) => (
                  <span
                    key={c}
                    className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize text-white ${
                      c === 'red' ? 'bg-rose-500' : c === 'yellow' ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                  >
                    {c}
                  </span>
                ))
              )}
            </div>

          </div>

          {/* Feedback strip */}
          <div className="mt-3 min-h-[48px] bg-purple-50 rounded-xl p-3 border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-purple-950">
                {currentResult
                  ? currentResult.description
                  : 'Tap any two primary colors below to discover what color they make!'}
              </p>
            </div>
          </div>
        </div>

        {/* Control Zone: Color Dropper Deck (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-purple-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Primary Colors to Pour
              </span>
              <span className="text-xs font-mono text-purple-700">
                Tap to drop
              </span>
            </div>

            {/* 3 Big Primary Dropper Buttons */}
            <div className="space-y-3">
              
              {/* RED */}
              <button
                onClick={() => handleAddColor('red')}
                disabled={selectedColors.includes('red') || isPouring}
                className={`w-full p-3.5 rounded-2xl border-b-4 shadow-md transition-all flex items-center justify-between group ${
                  selectedColors.includes('red')
                    ? 'bg-rose-100 text-rose-400 border-rose-200 opacity-60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white border-rose-800 active:translate-y-1 active:border-b-0'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">🍓</span>
                  <div className="text-left">
                    <span className="text-base font-black font-display block">1. Squeeze RED</span>
                    <span className="text-[11px] opacity-90 block">Primary Color</span>
                  </div>
                </div>
                {selectedColors.includes('red') && <CheckCircle className="w-5 h-5 text-rose-600 mr-2" />}
              </button>

              {/* YELLOW */}
              <button
                onClick={() => handleAddColor('yellow')}
                disabled={selectedColors.includes('yellow') || isPouring}
                className={`w-full p-3.5 rounded-2xl border-b-4 shadow-md transition-all flex items-center justify-between group ${
                  selectedColors.includes('yellow')
                    ? 'bg-amber-100 text-amber-400 border-amber-200 opacity-60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 border-amber-700 active:translate-y-1 active:border-b-0'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">☀️</span>
                  <div className="text-left">
                    <span className="text-base font-black font-display block">2. Squeeze YELLOW</span>
                    <span className="text-[11px] opacity-90 block">Primary Color</span>
                  </div>
                </div>
                {selectedColors.includes('yellow') && <CheckCircle className="w-5 h-5 text-amber-800 mr-2" />}
              </button>

              {/* BLUE */}
              <button
                onClick={() => handleAddColor('blue')}
                disabled={selectedColors.includes('blue') || isPouring}
                className={`w-full p-3.5 rounded-2xl border-b-4 shadow-md transition-all flex items-center justify-between group ${
                  selectedColors.includes('blue')
                    ? 'bg-sky-100 text-sky-400 border-sky-200 opacity-60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-800 active:translate-y-1 active:border-b-0'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">🌊</span>
                  <div className="text-left">
                    <span className="text-base font-black font-display block">3. Squeeze BLUE</span>
                    <span className="text-[11px] opacity-90 block">Primary Color</span>
                  </div>
                </div>
                {selectedColors.includes('blue') && <CheckCircle className="w-5 h-5 text-blue-300 mr-2" />}
              </button>

            </div>

            {/* Real World Matches Section */}
            {currentResult && currentResult.realWorldMatches.length > 0 && (
              <div className="mt-6 pt-4 border-t border-purple-100">
                <span className="text-[11px] font-bold text-purple-900/70 uppercase tracking-wider block mb-2">
                  Things in nature that match {currentResult.name}:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {currentResult.realWorldMatches.slice(0, 3).map((match) => (
                    <div
                      key={match.name}
                      onClick={() => {
                        soundManager.playPop(500);
                        speakText(match.name);
                      }}
                      className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/80 text-center cursor-pointer hover:bg-purple-100 transition-colors"
                    >
                      <span className="text-2xl block">{match.emoji}</span>
                      <span className="text-[10px] font-bold text-purple-950 block mt-1 truncate">
                        {match.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Quick Mixing Formula Guide */}
          <div className="mt-5 p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-950 space-y-1">
            <div className="font-bold text-purple-900 mb-1">Color Magic Formulas:</div>
            <div className="flex justify-between text-[11px]">
              <span>🔴 Red + 🟡 Yellow = <strong>🍊 Orange</strong></span>
              <span>🟡 Yellow + 🔵 Blue = <strong>🍃 Green</strong></span>
            </div>
            <div className="text-[11px]">
              <span>🔵 Blue + 🔴 Red = <strong>🍇 Purple</strong></span>
            </div>
          </div>

        </div>

      </div>

      {/* Classroom Teacher Note */}
      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
        <div className="text-xs text-purple-950">
          <span className="font-bold">Preschool Science Tip for Teachers:</span>{' '}
          In your circle time, use clear cups with water tinted by food coloring.
          Have toddlers predict aloud: "What do you think happens when we pour yellow into blue?"
          Seeing liquid transform before their eyes is one of the foundational 'wow' moments of early science!
        </div>
      </div>
    </div>
  );
};
