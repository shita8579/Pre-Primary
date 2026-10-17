import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Sun, Heart, Sprout, RotateCcw, Volume2, Sparkles, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager, speakText } from '../utils/soundEffects';

interface PlantGardenLabProps {
  onUnlockSticker: (stickerId: string) => void;
}

export const PlantGardenLab: React.FC<PlantGardenLabProps> = ({ onUnlockSticker }) => {
  // Stages: 0 = no seed, 1 = seed in dirt, 2 = tiny sprout, 3 = stem & leaves, 4 = blooming flower!
  const [stage, setStage] = useState<number>(0);
  const [waterCount, setWaterCount] = useState<number>(0);
  const [sunCount, setSunCount] = useState<number>(0);
  const [flowerColor, setFlowerColor] = useState<'yellow' | 'red' | 'purple'>('yellow');
  const [isWatering, setIsWatering] = useState<boolean>(false);
  const [isSunburst, setIsSunburst] = useState<boolean>(false);
  const [isLoving, setIsLoving] = useState<boolean>(false);

  const getStagePrompt = () => {
    switch (stage) {
      case 0:
        return 'Our garden bed is ready! Tap "Plant Seed" to bury our seed in the warm soil.';
      case 1:
        return 'The seed is tucked in cozy dirt! Now it is thirsty. Give it a gentle drink of water!';
      case 2:
        return 'Look! A baby green sprout popped out! Now give it warm sunshine to help it reach for the sky!';
      case 3:
        return 'Growing big and strong! It has green leaves and a bud. Give it more water and love to open!';
      case 4:
        return 'Hooray! Our gorgeous flower is blooming in the sunshine! Look at the happy bees and butterflies!';
      default:
        return '';
    }
  };

  const handleSpeakGuidance = () => {
    soundManager.playPop(520);
    speakText(getStagePrompt());
  };

  const handlePlantSeed = () => {
    if (stage > 0) return;
    soundManager.playPop(420);
    setStage(1);
    speakText('The seed is tucked in the cozy soil! Next, give it water to drink.');
  };

  const handleWater = () => {
    if (stage === 0) {
      handlePlantSeed();
      return;
    }
    setIsWatering(true);
    soundManager.playWaterPour();

    setTimeout(() => {
      setIsWatering(false);
      setWaterCount((prev) => prev + 1);

      if (stage === 1) {
        setStage(2);
        soundManager.playChime();
        speakText('Yay! The seed drank water and a baby sprout is peeking out! Now give it warm sunshine.');
      } else if (stage === 3) {
        setStage(4);
        soundManager.playFanfare();
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#ec4899', '#3b82f6'],
        });
        onUnlockSticker('star-garden');
        speakText('Wow! It bloomed into a magnificent flower! You are a wonderful gardener!');
      } else {
        soundManager.playPop(550);
      }
    }, 1200);
  };

  const handleSun = () => {
    if (stage === 0) {
      handlePlantSeed();
      return;
    }
    setIsSunburst(true);
    soundManager.playPop(620);

    setTimeout(() => {
      setIsSunburst(false);
      setSunCount((prev) => prev + 1);

      if (stage === 2) {
        setStage(3);
        soundManager.playChime();
        speakText('Warm sunlight gave our plant energy! Now it has tall stems and green leaves!');
      } else if (stage === 3 && waterCount > 0) {
        setStage(4);
        soundManager.playFanfare();
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#ec4899', '#3b82f6'],
        });
        onUnlockSticker('star-garden');
        speakText('Hooray! The bright sun opened the flower petals!');
      } else {
        soundManager.playPop(660);
      }
    }, 1000);
  };

  const handleLove = () => {
    setIsLoving(true);
    soundManager.playPop(780);
    setTimeout(() => setIsLoving(false), 1500);
    speakText('Singing and kind words make our garden happy!');
  };

  const handleResetGarden = () => {
    soundManager.playPop(350);
    setStage(0);
    setWaterCount(0);
    setSunCount(0);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Lab Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>Plant Biology & Growth</span>
            <span aria-hidden="true">·</span>
            <span>Ages 3–4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Little Seed & Garden Patch
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakGuidance}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Read to Me</span>
          </button>

          <button
            onClick={handleResetGarden}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Seed</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Stage Zone: The Garden Visual Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs font-medium text-emerald-900">
            <span className="flex items-center gap-1.5 font-bold">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Garden Soil Bed</span>
            </span>
            <span className="text-emerald-700">
              {stage === 0 && 'Ready to plant'}
              {stage === 1 && 'Seed asleep in dirt'}
              {stage === 2 && 'Baby sprout'}
              {stage === 3 && 'Growing stem & leaves'}
              {stage === 4 && 'Full bloom!'}
            </span>
          </div>

          {/* Garden Viewport */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-emerald-300 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 shadow-inner">
            
            {/* Friendly Smiling Sun in Sky */}
            <motion.div
              className={`absolute top-4 right-6 cursor-pointer z-10 ${
                isSunburst ? 'scale-125' : ''
              } transition-transform duration-500`}
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              onClick={handleSun}
            >
              <div className="relative flex items-center justify-center">
                {isSunburst && (
                  <div className="absolute inset-0 w-20 h-20 -m-3 rounded-full bg-amber-300/40 animate-ping" />
                )}
                <span className="text-6xl select-none filter drop-shadow-md">☀️</span>
              </div>
            </motion.div>

            {/* Puffy Clouds in Sky */}
            <motion.div
              className="absolute top-6 left-6 text-3xl opacity-80 pointer-events-none select-none"
              animate={{ x: [0, 25, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
            >
              ☁️
            </motion.div>

            {/* Gentle Rain Droplets animation if watering */}
            {isWatering && (
              <div className="absolute inset-x-0 top-16 bottom-28 z-20 pointer-events-none flex justify-center gap-6">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-4 bg-sky-400 rounded-full"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: 180, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.08 }}
                  />
                ))}
              </div>
            )}

            {/* Floating love hearts if loving */}
            {isLoving && (
              <div className="absolute inset-x-0 bottom-24 z-20 pointer-events-none flex justify-center gap-8">
                {['💖', '🌸', '✨', '💕'].map((item, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    initial={{ y: 0, opacity: 1, scale: 0.5 }}
                    animate={{ y: -120, opacity: 0, scale: 1.2 }}
                    transition={{ duration: 1.2, delay: i * 0.15 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Soil Ground (lower 35%) */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-amber-900 to-amber-950 border-t-4 border-amber-800 z-10">
              {/* Cute little worm */}
              <motion.div
                className="absolute top-4 left-10 text-xl cursor-pointer select-none"
                animate={{ x: [0, 8, 0], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                onClick={() => {
                  soundManager.playPop(580);
                  speakText('Hello! I am a friendly earthworm helping the soil stay soft and healthy!');
                }}
              >
                🪱
              </motion.div>

              <span className="absolute bottom-2 inset-x-0 text-center text-[10px] font-bold text-amber-300/60 uppercase tracking-widest">
                Nutrient Soil & Roots
              </span>
            </div>

            {/* Plant Stage Representation */}
            <div className="absolute bottom-28 inset-x-0 flex flex-col items-center justify-end z-10 pointer-events-none">
              
              {/* Stage 0: Empty Soil with digging hole */}
              {stage === 0 && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-5 rounded-full bg-amber-950/90 border border-amber-800/80 shadow-inner" />
                  <span className="text-[11px] font-bold text-amber-950 bg-white/90 px-2 py-0.5 rounded-full mt-2 shadow-xs">
                    Cozy Seed Hole
                  </span>
                </div>
              )}

              {/* Stage 1: Seed in Soil */}
              {stage === 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center -mb-2"
                >
                  <span className="text-3xl select-none filter drop-shadow-sm">🌰</span>
                  <span className="text-[10px] font-bold text-emerald-900 bg-white/95 px-2 py-0.5 rounded-full shadow-xs mt-1">
                    Seed tucked in soil
                  </span>
                </motion.div>
              )}

              {/* Stage 2: Little Green Sprout */}
              {stage === 2 && (
                <motion.div
                  initial={{ scale: 0.2, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-5xl select-none filter drop-shadow-sm">🌱</span>
                  <span className="text-[10px] font-bold text-emerald-900 bg-white/95 px-2 py-0.5 rounded-full shadow-xs mt-1">
                    Baby Sprout!
                  </span>
                </motion.div>
              )}

              {/* Stage 3: Tall Stem with Leaves and Bud */}
              {stage === 3 && (
                <motion.div
                  initial={{ scale: 0.5, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', bounce: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-6xl select-none filter drop-shadow-sm">🌿</div>
                  <span className="text-[10px] font-bold text-emerald-900 bg-white/95 px-2 py-0.5 rounded-full shadow-xs mt-1">
                    Big Stem & Green Leaves
                  </span>
                </motion.div>
              )}

              {/* Stage 4: Full Blooming Sunflower + Butterflies */}
              {stage === 4 && (
                <motion.div
                  initial={{ scale: 0.4, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Fluttering Butterflies */}
                  <motion.div
                    className="absolute -top-12 -left-16 text-3xl select-none"
                    animate={{ y: [-4, 6, -4], x: [-6, 6, -6], rotate: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    🦋
                  </motion.div>

                  <motion.div
                    className="absolute -top-10 -right-16 text-2xl select-none"
                    animate={{ y: [4, -6, 4], x: [4, -4, 4] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    🐝
                  </motion.div>

                  {/* Blooming flower icon depending on selected color */}
                  <div className="text-8xl select-none filter drop-shadow-lg">
                    {flowerColor === 'yellow' && '🌻'}
                    {flowerColor === 'red' && '🌺'}
                    {flowerColor === 'purple' && '🪻'}
                  </div>

                  <span className="text-xs font-black text-amber-950 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full shadow-xs mt-1">
                    Magnificent Bloom!
                  </span>
                </motion.div>
              )}

            </div>

          </div>

          {/* Plant progress guidance strip */}
          <div className="mt-3 min-h-[48px] bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                {getStagePrompt()}
              </p>
            </div>
          </div>
        </div>

        {/* Control Zone: Preschool Care Deck (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-emerald-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                What does a plant need?
              </span>
              <span className="text-xs font-mono text-emerald-800/70">
                Stage {stage} / 4
              </span>
            </div>

            {/* 4 Big Toddler-Friendly Buttons */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* 1. Plant Seed */}
              <button
                onClick={handlePlantSeed}
                disabled={stage > 0}
                className={`p-4 rounded-2xl border-b-4 shadow-md transition-all flex flex-col items-center justify-center gap-1 ${
                  stage === 0
                    ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-800 active:translate-y-1 active:border-b-0 animate-pulse'
                    : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                }`}
              >
                <span className="text-3xl">🌱</span>
                <span className="text-sm font-extrabold font-display">1. Plant Seed</span>
                <span className="text-[10px] font-medium opacity-90">In cozy dirt</span>
              </button>

              {/* 2. Water Plant */}
              <button
                onClick={handleWater}
                className="p-4 rounded-2xl bg-gradient-to-b from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white border-b-4 border-sky-700 shadow-md active:translate-y-1 active:border-b-0 transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">💧</span>
                <span className="text-sm font-extrabold font-display">2. Pour Water</span>
                <span className="text-[10px] font-medium text-sky-100 opacity-90">Give a drink</span>
              </button>

              {/* 3. Sunlight */}
              <button
                onClick={handleSun}
                className="p-4 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 border-b-4 border-amber-700 shadow-md active:translate-y-1 active:border-b-0 transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">☀️</span>
                <span className="text-sm font-extrabold font-display">3. Warm Sun</span>
                <span className="text-[10px] font-medium text-amber-900 opacity-90">Sunlight energy</span>
              </button>

              {/* 4. Love & Sing */}
              <button
                onClick={handleLove}
                className="p-4 rounded-2xl bg-gradient-to-b from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white border-b-4 border-rose-700 shadow-md active:translate-y-1 active:border-b-0 transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">❤️</span>
                <span className="text-sm font-extrabold font-display">4. Sing & Care</span>
                <span className="text-[10px] font-medium text-rose-100 opacity-90">Happy plant</span>
              </button>

            </div>

            {/* Flower Color Options */}
            <div className="mt-6 pt-4 border-t border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-950/70 uppercase tracking-wider block mb-2">
                Choose Your Flower Bloom:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    soundManager.playPop(500);
                    setFlowerColor('yellow');
                  }}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    flowerColor === 'yellow'
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-2xl block">🌻</span>
                  <span className="text-[10px] font-bold text-amber-900 block mt-1">Sunflower</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playPop(540);
                    setFlowerColor('red');
                  }}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    flowerColor === 'red'
                      ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-2xl block">🌺</span>
                  <span className="text-[10px] font-bold text-rose-900 block mt-1">Hibiscus</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playPop(580);
                    setFlowerColor('purple');
                  }}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    flowerColor === 'purple'
                      ? 'bg-purple-100 border-purple-400 ring-2 ring-purple-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-2xl block">🪻</span>
                  <span className="text-[10px] font-bold text-purple-900 block mt-1">Lavender</span>
                </button>
              </div>
            </div>

          </div>

          {/* Plant Care Metrics Counter */}
          <div className="mt-5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-around text-xs font-semibold text-emerald-950">
            <span className="flex items-center gap-1.5">
              <span>💧 Water:</span>
              <span className="font-mono text-emerald-700">{waterCount} drinks</span>
            </span>
            <span aria-hidden="true" className="text-emerald-300">|</span>
            <span className="flex items-center gap-1.5">
              <span>☀️ Sunshine:</span>
              <span className="font-mono text-amber-700">{sunCount} rays</span>
            </span>
          </div>

        </div>

      </div>

      {/* Classroom Teacher Note */}
      <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-start gap-3">
        <Flower2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-950">
          <span className="font-bold">Preschool Science Tip for Teachers:</span>{' '}
          Talk about how plants drink water through roots underground, and catch sunlight through their green leaves like solar panels!
          Try germinating a bean in a damp Ziploc bag taped to the window so 3-year-olds can see the roots grow day by day.
        </div>
      </div>
    </div>
  );
};
