import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Play, Sparkles, CheckCircle2, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VEHICLES } from '../data/transportationContent';
import { Vehicle, TransportCategory } from '../types/transportation';
import { soundManager, speakText } from '../utils/soundEffects';

interface MysterySoundQuizProps {
  onUnlockBadge: (badgeId: string) => void;
  onOpenHandsOn?: () => void;
}

export const MysterySoundQuiz: React.FC<MysterySoundQuizProps> = ({
  onUnlockBadge,
  onOpenHandsOn,
}) => {
  const soundVehicles = VEHICLES.filter((v) =>
    ['car', 'train', 'boat', 'plane', 'helicopter', 'bike', 'siren', 'rocket'].includes(v.soundType)
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TransportCategory | null>(null);
  const [hasIdentifiedVehicle, setHasIdentifiedVehicle] = useState(false);
  const [score, setScore] = useState(0);

  const targetVehicle = soundVehicles[questionIndex % soundVehicles.length];

  // Pick 3 distractors
  const distractors = VEHICLES.filter((v) => v.id !== targetVehicle.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  const [choices] = useState<Vehicle[]>(() =>
    [targetVehicle, ...distractors].sort(() => 0.5 - Math.random())
  );

  const handlePlayMysterySound = () => {
    switch (targetVehicle.soundType) {
      case 'car':
        soundManager.playCarHonk();
        break;
      case 'train':
        soundManager.playTrainWhistle();
        break;
      case 'boat':
        soundManager.playBoatHorn();
        break;
      case 'plane':
        soundManager.playAirplaneJet();
        break;
      case 'helicopter':
        soundManager.playHelicopter();
        break;
      case 'bike':
        soundManager.playBicycleBell();
        break;
      case 'siren':
        soundManager.playSiren();
        break;
      case 'rocket':
        soundManager.playRocket();
        break;
      default:
        soundManager.playPop(520);
    }
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    handlePlayMysterySound();

    if (vehicle.id === targetVehicle.id) {
      soundManager.playChime();
      setHasIdentifiedVehicle(true);
      setSelectedVehicleId(vehicle.id);
      speakText(`Yes! You heard the ${targetVehicle.name}! Now, does it travel on Land, Water, or Air?`);
    } else {
      soundManager.playPop(300);
      speakText(`Not quite! Listen closely to the sound again!`);
    }
  };

  const handleSelectDomain = (cat: TransportCategory) => {
    const isCorrect =
      targetVehicle.category === cat || (targetVehicle.category === 'space' && cat === 'air');

    if (isCorrect) {
      soundManager.playFanfare();
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.6 },
      });
      setSelectedCategory(cat);
      setScore((s) => s + 1);

      if (score + 1 >= 3) {
        onUnlockBadge('badge-sounds');
      }

      speakText(`Super detective! The ${targetVehicle.name} makes ${targetVehicle.soundText} and travels on ${cat.toUpperCase()}!`);
    } else {
      soundManager.playPop(320);
      speakText(`Think about where a ${targetVehicle.name} goes! Does it have wheels, a boat hull, or wings?`);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPop(480);
    setQuestionIndex((prev) => prev + 1);
    setSelectedVehicleId(null);
    setSelectedCategory(null);
    setHasIdentifiedVehicle(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider">
            <span>Audio Listening & Classification</span>
            <span aria-hidden="true">·</span>
            <span>Ages 4–6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Mystery Vehicle Sound Detective
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-100 text-purple-950 text-xs sm:text-sm font-bold">
            Stars: {score} ⭐
          </div>
        </div>
      </div>

      {/* Main Sandbox Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-sm text-center space-y-6">
        
        {/* Mystery Box Area */}
        <div className="bg-gradient-to-b from-purple-50 to-indigo-50/50 rounded-3xl p-6 border-2 border-dashed border-purple-300 max-w-xl mx-auto flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center text-5xl shadow-md mb-4 animate-pulse">
            {hasIdentifiedVehicle ? targetVehicle.emoji : '❓'}
          </div>

          <h3 className="text-xl font-black text-purple-950 font-display">
            {hasIdentifiedVehicle ? targetVehicle.name : 'What vehicle makes this sound?'}
          </h3>

          <p className="text-xs text-purple-900/80 mt-1 max-w-md">
            Tap the button below to listen to the mystery engine, horn, or siren!
          </p>

          {/* Big Audio Play Button */}
          <button
            onClick={handlePlayMysterySound}
            className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Play Mystery Sound 🔊</span>
          </button>
        </div>

        {/* STEP 1: GUESS THE VEHICLE */}
        {!hasIdentifiedVehicle && (
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
              Step 1: Which vehicle did you hear?
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {choices.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleSelectVehicle(v)}
                  className="p-4 rounded-2xl bg-amber-50/50 hover:bg-purple-50 border-2 border-amber-200/80 hover:border-purple-400 shadow-2xs hover:shadow-sm transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {v.emoji}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {v.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CLASSIFY ITS DOMAIN (LAND, WATER, OR AIR) */}
        {hasIdentifiedVehicle && !selectedCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 inline-block text-xs font-bold text-emerald-950">
              🎉 That's right! It is the {targetVehicle.name}!
            </div>

            <h4 className="text-base font-extrabold text-slate-800">
              Step 2: Where does the {targetVehicle.name} travel?
            </h4>

            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              <button
                onClick={() => handleSelectDomain('land')}
                className="p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 shadow-md font-black text-sm flex flex-col items-center gap-1 active:translate-y-1 active:border-b-0 transition-all"
              >
                <span className="text-3xl">🚗</span>
                <span>LAND</span>
              </button>

              <button
                onClick={() => handleSelectDomain('water')}
                className="p-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white border-b-4 border-blue-700 shadow-md font-black text-sm flex flex-col items-center gap-1 active:translate-y-1 active:border-b-0 transition-all"
              >
                <span className="text-3xl">⛵</span>
                <span>WATER</span>
              </button>

              <button
                onClick={() => handleSelectDomain('air')}
                className="p-4 rounded-2xl bg-sky-400 hover:bg-sky-500 text-white border-b-4 border-sky-600 shadow-md font-black text-sm flex flex-col items-center gap-1 active:translate-y-1 active:border-b-0 transition-all"
              >
                <span className="text-3xl">✈️</span>
                <span>AIR</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* COMPLETED QUESTION CELEBRATION */}
        {selectedCategory && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl border border-emerald-200 space-y-3"
          >
            <div className="text-4xl">🌟 🏆 🌟</div>
            <h3 className="text-lg font-black text-emerald-950 font-display">
              Double Star Match Completed!
            </h3>
            <p className="text-xs text-emerald-900 max-w-md mx-auto">
              {targetVehicle.name} makes {targetVehicle.soundText} and belongs to {selectedCategory.toUpperCase()} transport!
            </p>

            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 mx-auto active:scale-95 transition-all"
            >
              <span>Next Mystery Sound</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Hands-On Activity Banner */}
        <div className="mt-8 pt-6 border-t border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-5 text-white text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-200 uppercase tracking-wider block">
              🎨 Aktivitas Praktis di Akhir Pembelajaran
            </span>
            <h4 className="text-base sm:text-lg font-black font-display">
              Orkestra Bunyi Kendaraan & Safari Tebak Suara
            </h4>
            <p className="text-xs text-purple-100 max-w-lg leading-relaxed">
              Gunakan botol beras, gelas kertas, dan terompet untuk membuat konser bunyi kendaraan bersama teman sekelas!
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playFanfare();
              onOpenHandsOn?.();
            }}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-950 font-black text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 whitespace-nowrap"
          >
            <span>Buka Panduan Praktik</span>
            <ArrowRight className="w-4 h-4 text-purple-700" />
          </button>
        </div>

      </div>
    </div>
  );
};
