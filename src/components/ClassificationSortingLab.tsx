import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, RotateCcw, Sparkles, CheckCircle2, ArrowRight, Play, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VEHICLES } from '../data/transportationContent';
import { Vehicle, TransportCategory } from '../types/transportation';
import { soundManager, speakText } from '../utils/soundEffects';

interface ClassificationSortingLabProps {
  onUnlockBadge: (badgeId: string) => void;
  onOpenHandsOn?: () => void;
  onOpenCarCraft?: () => void;
}

export const ClassificationSortingLab: React.FC<ClassificationSortingLabProps> = ({
  onUnlockBadge,
  onOpenHandsOn,
  onOpenCarCraft,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedVehicles, setSortedVehicles] = useState<{
    vehicle: Vehicle;
    category: TransportCategory;
  }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    text: string;
    vehicle: Vehicle;
  } | null>(null);

  const currentVehicle = VEHICLES[currentIndex % VEHICLES.length];

  // Play corresponding synthesized vehicle sound
  const handlePlayVehicleSound = (vehicle: Vehicle) => {
    switch (vehicle.soundType) {
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

  const handleSpeakVehicle = (vehicle: Vehicle) => {
    soundManager.playPop(500);
    speakText(vehicle.voicePrompt);
  };

  const handleClassify = (chosenCategory: TransportCategory) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const isCorrect =
      currentVehicle.category === chosenCategory ||
      (currentVehicle.category === 'space' && chosenCategory === 'air');

    handlePlayVehicleSound(currentVehicle);

    if (isCorrect) {
      setTimeout(() => {
        soundManager.playChime();
        confetti({
          particleCount: 35,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#10b981', '#f59e0b', '#ec4899'],
        });

        const praise = `Great job! The ${currentVehicle.name} belongs to ${chosenCategory.toUpperCase()}! ${currentVehicle.soundText}`;
        speakText(praise);

        setFeedback({
          isCorrect: true,
          text: praise,
          vehicle: currentVehicle,
        });

        // Add to sorted list
        setSortedVehicles((prev) => {
          const next = [...prev.filter((v) => v.vehicle.id !== currentVehicle.id), { vehicle: currentVehicle, category: chosenCategory }];
          
          // Badge checks
          const landCount = next.filter((v) => v.category === 'land').length;
          const waterCount = next.filter((v) => v.category === 'water').length;
          const airCount = next.filter((v) => v.category === 'air' || v.category === 'space').length;

          if (landCount >= 3) onUnlockBadge('badge-land');
          if (waterCount >= 3) onUnlockBadge('badge-water');
          if (airCount >= 3) onUnlockBadge('badge-air');
          if (next.length >= 10) onUnlockBadge('badge-allstar');

          return next;
        });

        setIsAnimating(false);
      }, 700);
    } else {
      setTimeout(() => {
        soundManager.playPop(300);
        const retryPrompt = `Let us think! Can a ${currentVehicle.name} travel on ${chosenCategory}? Look at its features: ${currentVehicle.wheelsDescription}! Try again!`;
        speakText(retryPrompt);

        setFeedback({
          isCorrect: false,
          text: retryPrompt,
          vehicle: currentVehicle,
        });
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleNextVehicle = () => {
    soundManager.playPop(480);
    setFeedback(null);
    setCurrentIndex((prev) => (prev + 1) % VEHICLES.length);
  };

  const handleReset = () => {
    soundManager.playPop(320);
    setSortedVehicles([]);
    setFeedback(null);
  };

  const landVehicles = sortedVehicles.filter((v) => v.category === 'land');
  const waterVehicles = sortedVehicles.filter((v) => v.category === 'water');
  const airVehicles = sortedVehicles.filter((v) => v.category === 'air' || v.category === 'space');

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <span>Core Kindergarten Science Classification</span>
            <span aria-hidden="true">·</span>
            <span>Ages 4–6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Classify Kind of Transportation
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSpeakVehicle(currentVehicle)}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Read to Me</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Worlds</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox: 2 Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Stage Zone: 3 Illustrated World Habitats (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-amber-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs font-medium text-amber-950">
            <span className="flex items-center gap-1.5 font-bold">
              <span>🌍</span>
              <span>The Three Transportation Domains</span>
            </span>
            <span className="text-xs text-amber-800">
              {sortedVehicles.length} of {VEHICLES.length} vehicles classified
            </span>
          </div>

          {/* 3 Domain Strips */}
          <div className="space-y-3.5">
            
            {/* 1. SKY & AIR DOMAIN */}
            <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-sky-300 bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300 p-3 shadow-inner flex flex-col justify-between">
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-black text-sky-950 bg-white/90 px-2 py-0.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <span>✈️</span>
                  <span>AIR & SKY</span>
                </span>
                <span className="text-[11px] font-bold text-white drop-shadow-sm">
                  {airVehicles.length} flying
                </span>
              </div>

              {/* Gentle floating clouds */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-2 left-10 text-2xl opacity-60">☁️</div>
                <div className="absolute top-6 right-16 text-3xl opacity-70">☁️</div>
                <div className="absolute top-1 left-48 text-xl opacity-50">☀️</div>
              </div>

              {/* Parked / Flying vehicles in Air */}
              <div className="flex flex-wrap items-center gap-3 z-10 min-h-[44px]">
                {airVehicles.length === 0 ? (
                  <span className="text-xs text-white/80 italic font-medium">
                    No air vehicles sorted yet. Look for wings, rotors or balloons!
                  </span>
                ) : (
                  airVehicles.map((v) => (
                    <motion.button
                      key={v.vehicle.id}
                      initial={{ scale: 0, y: 15 }}
                      animate={{ scale: 1, y: 0 }}
                      className="group relative flex items-center gap-1 bg-white/95 px-2.5 py-1.5 rounded-xl shadow-xs border border-sky-200 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => {
                        handlePlayVehicleSound(v.vehicle);
                        speakText(`${v.vehicle.name}! Flying high in the air!`);
                      }}
                    >
                      <span className="text-2xl">{v.vehicle.emoji}</span>
                      <span className="text-[11px] font-bold text-slate-800 hidden sm:inline">
                        {v.vehicle.name.split(' ')[0]}
                      </span>
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* 2. WATER DOMAIN */}
            <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-blue-400 bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-400 p-3 shadow-inner flex flex-col justify-between">
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-black text-blue-950 bg-white/90 px-2 py-0.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <span>⛵</span>
                  <span>WATER & SEAS</span>
                </span>
                <span className="text-[11px] font-bold text-white drop-shadow-sm">
                  {waterVehicles.length} floating
                </span>
              </div>

              {/* Gentle water ripples */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute bottom-2 inset-x-0 h-4 bg-white/10 border-t border-white/20" />
                <div className="absolute top-3 right-8 text-2xl opacity-60">🌊</div>
                <div className="absolute bottom-1 left-20 text-xl opacity-40">🐟</div>
              </div>

              {/* Floating vehicles in Water */}
              <div className="flex flex-wrap items-center gap-3 z-10 min-h-[44px]">
                {waterVehicles.length === 0 ? (
                  <span className="text-xs text-white/80 italic font-medium">
                    No water vehicles sorted yet. Look for smooth hulls, oars and sails!
                  </span>
                ) : (
                  waterVehicles.map((v) => (
                    <motion.button
                      key={v.vehicle.id}
                      initial={{ scale: 0, y: 15 }}
                      animate={{ scale: 1, y: 0 }}
                      className="group relative flex items-center gap-1 bg-white/95 px-2.5 py-1.5 rounded-xl shadow-xs border border-blue-200 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => {
                        handlePlayVehicleSound(v.vehicle);
                        speakText(`${v.vehicle.name}! Floating on the water!`);
                      }}
                    >
                      <span className="text-2xl">{v.vehicle.emoji}</span>
                      <span className="text-[11px] font-bold text-slate-800 hidden sm:inline">
                        {v.vehicle.name.split(' ')[0]}
                      </span>
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* 3. LAND DOMAIN */}
            <div className="relative h-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-400 bg-gradient-to-r from-emerald-600 via-amber-700 to-emerald-500 p-3 shadow-inner flex flex-col justify-between">
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-black text-emerald-950 bg-white/90 px-2 py-0.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <span>🚗</span>
                  <span>LAND & ROADS</span>
                </span>
                <span className="text-[11px] font-bold text-white drop-shadow-sm">
                  {landVehicles.length} rolling
                </span>
              </div>

              {/* Paved highway road stripe */}
              <div className="absolute bottom-2 inset-x-0 h-9 bg-slate-800/90 border-t-2 border-amber-300 z-0 flex items-center justify-around">
                <div className="w-8 h-1 bg-white/80 rounded-full" />
                <div className="w-8 h-1 bg-white/80 rounded-full" />
                <div className="w-8 h-1 bg-white/80 rounded-full" />
                <div className="w-8 h-1 bg-white/80 rounded-full" />
                <div className="w-8 h-1 bg-white/80 rounded-full" />
              </div>

              {/* Driving vehicles on Land */}
              <div className="flex flex-wrap items-center gap-3 z-10 min-h-[44px]">
                {landVehicles.length === 0 ? (
                  <span className="text-xs text-white/80 italic font-medium">
                    No land vehicles sorted yet. Look for rubber wheels and railroad tracks!
                  </span>
                ) : (
                  landVehicles.map((v) => (
                    <motion.button
                      key={v.vehicle.id}
                      initial={{ scale: 0, y: 15 }}
                      animate={{ scale: 1, y: 0 }}
                      className="group relative flex items-center gap-1 bg-white/95 px-2.5 py-1.5 rounded-xl shadow-xs border border-emerald-200 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => {
                        handlePlayVehicleSound(v.vehicle);
                        speakText(`${v.vehicle.name}! Rolling on land roads!`);
                      }}
                    >
                      <span className="text-2xl">{v.vehicle.emoji}</span>
                      <span className="text-[11px] font-bold text-slate-800 hidden sm:inline">
                        {v.vehicle.name.split(' ')[0]}
                      </span>
                    </motion.button>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Feedback Strip below Worlds */}
          <div className="mt-3 min-h-[48px] bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-center justify-between">
            {feedback ? (
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    feedback.isCorrect ? 'bg-emerald-500 text-white' : 'bg-amber-600 text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-amber-950">
                  {feedback.text}
                </p>
              </div>
            ) : (
              <p className="text-xs text-amber-900/80">
                Inspect the vehicle on the right, listen to its sound, and tap where it belongs!
              </p>
            )}

            {feedback?.isCorrect && (
              <button
                onClick={handleNextVehicle}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ml-2 shadow-xs active:scale-95"
              >
                <span>Next Vehicle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Control Zone: Vehicle Spotlight & Big Classification Buttons (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-amber-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Current Vehicle
              </span>
              <span className="text-xs text-amber-900/60 font-mono">
                Vehicle {(currentIndex % VEHICLES.length) + 1} of {VEHICLES.length}
              </span>
            </div>

            {/* Vehicle Spotlight Card */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100/40 rounded-2xl p-5 border border-amber-200/60 text-center flex flex-col items-center relative overflow-hidden">
              <div className="text-6xl mb-2 filter drop-shadow-sm select-none animate-bounce" style={{ animationDuration: '2.5s' }}>
                {currentVehicle.emoji}
              </div>

              <h3 className="text-xl font-extrabold text-amber-950 font-display">
                {currentVehicle.name}
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <button
                  onClick={() => handlePlayVehicleSound(currentVehicle)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Sound: {currentVehicle.soundText.split('!')[0]}</span>
                </button>

                <button
                  onClick={() => handleSpeakVehicle(currentVehicle)}
                  className="px-3 py-1 bg-white hover:bg-amber-100/80 border border-amber-300 rounded-lg text-xs font-semibold text-amber-900 transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Voice Clue</span>
                </button>
              </div>

              {/* Clues for Kindergarteners */}
              <div className="mt-3 pt-3 border-t border-amber-200/60 text-left w-full space-y-1 text-xs">
                <div className="text-amber-950">
                  <span className="font-bold">Wheels:</span> {currentVehicle.wheelsDescription}
                </div>
                <div className="text-amber-900/80 text-[11px] leading-relaxed">
                  💡 {currentVehicle.kidFunFact}
                </div>
              </div>
            </div>

            {/* The Big Classification Question */}
            <div className="my-4 text-center">
              <p className="text-base font-extrabold text-amber-950">
                Where does it travel?
              </p>
              <p className="text-xs text-amber-800/70">
                Tap the matching kind of transportation:
              </p>
            </div>

            {/* 3 Giant Touch-Friendly Classification Buttons */}
            <div className="grid grid-cols-1 gap-2.5">
              {/* LAND BUTTON */}
              <button
                onClick={() => handleClassify('land')}
                disabled={isAnimating}
                className="group p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-b-4 border-emerald-800 shadow-md active:translate-y-1 active:border-b-0 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">🚗</span>
                  <div className="text-left">
                    <span className="text-base font-black font-display block">LAND TRANSPORT</span>
                    <span className="text-[11px] text-emerald-100 opacity-90 block">Roads, tracks, and wheels</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform mr-1" />
              </button>

              {/* WATER BUTTON */}
              <button
                onClick={() => handleClassify('water')}
                disabled={isAnimating}
                className="group p-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-b-4 border-blue-800 shadow-md active:translate-y-1 active:border-b-0 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">⛵</span>
                  <div className="text-left">
                    <span className="text-base font-black font-display block">WATER TRANSPORT</span>
                    <span className="text-[11px] text-blue-100 opacity-90 block">Rivers, lakes, and oceans</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform mr-1" />
              </button>

              {/* AIR BUTTON */}
              <button
                onClick={() => handleClassify('air')}
                disabled={isAnimating}
                className="group p-3.5 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white border-b-4 border-indigo-700 shadow-md active:translate-y-1 active:border-b-0 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">✈️</span>
                  <div className="text-left">
                    <span className="text-base font-black font-display block">AIR TRANSPORT</span>
                    <span className="text-[11px] text-sky-100 opacity-90 block">Clouds, sky, and high above</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-sky-200 group-hover:translate-x-1 transition-transform mr-1" />
              </button>
            </div>
          </div>

          {/* Quick Vehicle Thumbnail Bar */}
          <div className="mt-4 pt-3 border-t border-amber-100">
            <span className="text-[11px] font-bold text-amber-900/60 uppercase tracking-wider block mb-1.5">
              Choose Another Vehicle to Test:
            </span>
            <div className="grid grid-cols-6 gap-1.5">
              {VEHICLES.slice(0, 12).map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playPop(420);
                    setCurrentIndex(idx);
                    setFeedback(null);
                  }}
                  className={`p-1.5 rounded-xl text-center border transition-all ${
                    idx === currentIndex % VEHICLES.length
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                  }`}
                  title={item.name}
                >
                  <span className="text-lg block">{item.emoji}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Post-Lesson Hands-On Activity Banner (Aktivitas Akhir Pembelajaran) */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
            <span>🎨 Aktivitas Akhir Pembelajaran (Hands-On)</span>
            <span aria-hidden="true">·</span>
            <span>Praktik Nyata Siswa TK</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black font-display">
            Aktivitas Karpet 3 Jalur: Darat, Air & Udara
          </h3>
          <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">
            Ajak siswa bergerak aktif di karpet kelas dengan mainan mobil, perahu, dan pesawat! Dilengkapi panduan langkah demi langkah dan lembar aktivitas yang dapat dicetak.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playFanfare();
            onOpenHandsOn?.();
          }}
          className="px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-95 whitespace-nowrap"
        >
          <span>Buka Panduan Aktivitas Praktis</span>
          <ArrowRight className="w-4 h-4 text-emerald-700" />
        </button>
      </div>

      {/* Car Anatomy & Clay/Paper Craft Spotlight Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200">
            <span>🚗 Bagian-Bagian Mobil & Prakarya Kelas</span>
            <span aria-hidden="true">·</span>
            <span>Plastisin (Clay) & Kotak Bekas Kertas</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black font-display">
            Amati Bagian-Bagian Mobil & Buat Model Mobil Sendiri!
          </h3>
          <p className="text-xs text-amber-100 max-w-xl leading-relaxed">
            Amati roda, bodi, kaca depan, lampu terang, setir kemudi, dan knalpot dengan gambar diagram & bunyi suara. Siswa dapat mengikuti langkah membuat mobil nyata dari plastisin (clay) atau kotak bekas dan kertas!
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playCarHonk();
            onOpenCarCraft?.();
          }}
          className="px-5 py-3 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-95 whitespace-nowrap"
        >
          <span>Buka Bedah Mobil & Prakarya</span>
          <ArrowRight className="w-4 h-4 text-amber-700" />
        </button>
      </div>

      {/* Classroom Teacher Tip Bar */}
      <div className="bg-amber-100/50 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3">
        <Compass className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950">
          <span className="font-bold">Kindergarten Teacher Tip:</span>{' '}
          Ask your students: "How can we tell where this vehicle goes?" Notice whether it has round wheels to grip the ground, a smooth hull to float on water, or wings and rotors to fly through the sky!
        </div>
      </div>
    </div>
  );
};
