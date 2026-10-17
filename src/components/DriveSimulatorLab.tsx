import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Volume2, Sparkles, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager, speakText } from '../utils/soundEffects';

interface DriveSimulatorLabProps {
  onUnlockBadge: (badgeId: string) => void;
  onOpenHandsOn?: () => void;
}

type DriveVehicleType = 'bus' | 'boat' | 'plane' | 'train' | 'rocket';

interface SimulatorOption {
  id: DriveVehicleType;
  name: string;
  emoji: string;
  domain: string;
  bgGradient: string;
  soundFn: () => void;
  voiceIntro: string;
}

const OPTIONS: SimulatorOption[] = [
  {
    id: 'bus',
    name: 'School Bus',
    emoji: '🚌',
    domain: 'Land Road',
    bgGradient: 'from-amber-200 via-emerald-100 to-amber-100',
    soundFn: () => soundManager.playCarHonk(),
    voiceIntro: 'Driving the yellow school bus down the road! Beep-beep!',
  },
  {
    id: 'boat',
    name: 'Sailboat',
    emoji: '⛵',
    domain: 'Water Ocean',
    bgGradient: 'from-sky-300 via-blue-200 to-cyan-200',
    soundFn: () => soundManager.playBoatHorn(),
    voiceIntro: 'Sailing across the blue ocean waves! Splish-splash!',
  },
  {
    id: 'plane',
    name: 'Airplane',
    emoji: '✈️',
    domain: 'Air Sky',
    bgGradient: 'from-sky-400 via-indigo-200 to-white',
    soundFn: () => soundManager.playAirplaneJet(),
    voiceIntro: 'Soaring above the fluffy clouds in the sky! Whoosh!',
  },
  {
    id: 'train',
    name: 'Steam Train',
    emoji: '🚂',
    domain: 'Railway Tracks',
    bgGradient: 'from-emerald-300 via-amber-200 to-emerald-200',
    soundFn: () => soundManager.playTrainWhistle(),
    voiceIntro: 'Chugging down the railroad tracks! Choo-choo!',
  },
  {
    id: 'rocket',
    name: 'Space Rocket',
    emoji: '🚀',
    domain: 'Outer Space',
    bgGradient: 'from-indigo-900 via-purple-900 to-slate-900',
    soundFn: () => soundManager.playRocket(),
    voiceIntro: '3, 2, 1, blastoff into outer space! Zooming past the stars!',
  },
];

export const DriveSimulatorLab: React.FC<DriveSimulatorLabProps> = ({
  onUnlockBadge,
  onOpenHandsOn,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<DriveVehicleType>('bus');
  const [position, setPosition] = useState<number>(10); // 10% to 85%
  const [collectedStars, setCollectedStars] = useState<number[]>([]);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const starLocations = [25, 45, 65, 80];
  const currentOption = OPTIONS.find((o) => o.id === selectedVehicle)!;

  const handleSelectVehicle = (option: SimulatorOption) => {
    soundManager.playPop(520);
    setSelectedVehicle(option.id);
    setPosition(10);
    setCollectedStars([]);
    setHasFinished(false);
    option.soundFn();
    speakText(option.voiceIntro);
  };

  const handleDriveForward = () => {
    if (hasFinished) return;
    currentOption.soundFn();

    const nextPos = Math.min(position + 15, 85);
    setPosition(nextPos);

    // Check collected stars
    starLocations.forEach((starPos, idx) => {
      if (nextPos >= starPos && !collectedStars.includes(idx)) {
        soundManager.playChime();
        setCollectedStars((prev) => [...prev, idx]);
      }
    });

    if (nextPos >= 85 && !hasFinished) {
      setHasFinished(true);
      soundManager.playFanfare();
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
      });
      speakText(`Congratulations! You safely navigated the ${currentOption.name} to the station!`);
      onUnlockBadge('badge-allstar');
    }
  };

  const handleResetCourse = () => {
    soundManager.playPop(350);
    setPosition(10);
    setCollectedStars([]);
    setHasFinished(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>Hands-On Vehicle Navigation</span>
            <span aria-hidden="true">·</span>
            <span>Ages 4–6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Drive, Sail & Fly Interactive Track
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCourse}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Track</span>
          </button>
        </div>
      </div>

      {/* Vehicle Selector Strip */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto pb-1">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelectVehicle(opt)}
            className={`px-4 py-2.5 rounded-2xl border-2 transition-all flex items-center gap-2 shrink-0 ${
              selectedVehicle === opt.id
                ? 'border-amber-500 bg-amber-100 shadow-xs ring-2 ring-amber-300'
                : 'border-slate-200 bg-white hover:bg-amber-50'
            }`}
          >
            <span className="text-2xl">{opt.emoji}</span>
            <div className="text-left">
              <span className="text-xs font-black text-amber-950 block">{opt.name}</span>
              <span className="text-[10px] text-slate-500 block">{opt.domain}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Animated Course Arena */}
      <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm space-y-6">
        
        {/* Course Track Visual */}
        <div
          className={`relative w-full h-64 sm:h-72 rounded-3xl border-4 overflow-hidden shadow-inner bg-gradient-to-r ${currentOption.bgGradient} transition-colors duration-700 flex items-center`}
        >
          {/* Ground or water bed indicator */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-slate-800/20 border-t border-black/10 flex items-center justify-around">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700/50">
              {currentOption.domain} Navigation Track
            </span>
          </div>

          {/* Golden Stars to collect */}
          {starLocations.map((pos, idx) => (
            <div
              key={idx}
              className="absolute z-10 text-3xl select-none"
              style={{ left: `${pos}%`, bottom: '26%' }}
            >
              {collectedStars.includes(idx) ? (
                <span className="opacity-20">⭐</span>
              ) : (
                <motion.span
                  className="block filter drop-shadow-sm"
                  animate={{ y: [-4, 4, -4], rotate: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                >
                  ⭐
                </motion.span>
              )}
            </div>
          ))}

          {/* Finish Line Flag */}
          <div className="absolute right-6 bottom-16 flex flex-col items-center z-10">
            <span className="text-4xl">🏁</span>
            <span className="text-[10px] font-black bg-white/90 text-slate-800 px-2 py-0.5 rounded-full shadow-xs mt-1">
              Station
            </span>
          </div>

          {/* The Navigating Vehicle */}
          <motion.div
            className="absolute z-20 flex flex-col items-center"
            style={{ bottom: '16%' }}
            animate={{ left: `${position}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          >
            <div className="text-6xl filter drop-shadow-md select-none animate-bounce" style={{ animationDuration: '2s' }}>
              {currentOption.emoji}
            </div>
            <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-full shadow-xs text-amber-950 mt-1 whitespace-nowrap">
              {currentOption.name}
            </span>
          </motion.div>
        </div>

        {/* Big Driving Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          <div className="text-left">
            <span className="text-xs font-bold text-slate-600 block">
              Stars Collected: {collectedStars.length} of {starLocations.length}
            </span>
            <span className="text-sm font-extrabold text-amber-950 block">
              {hasFinished ? '🎉 Arrived safely at the station!' : 'Press GO to drive forward!'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Horn / Sound Button */}
            <button
              onClick={currentOption.soundFn}
              className="px-5 py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-sm transition-colors flex items-center gap-2 shadow-2xs active:scale-95"
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
              <span>Honk / Engine</span>
            </button>

            {/* Giant Green GO Button */}
            <button
              onClick={handleDriveForward}
              disabled={hasFinished}
              className={`px-8 py-3.5 rounded-2xl font-black text-base shadow-md transition-all flex items-center gap-2 active:scale-95 ${
                hasFinished
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 active:translate-y-1 active:border-b-0 animate-pulse'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{hasFinished ? 'Arrived! 🏁' : 'GO! ACCELERATE! 🟢'}</span>
            </button>
          </div>

        </div>

        {/* Hands-On Activity Banner */}
        <div className="mt-8 pt-6 border-t border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider block">
              🎨 Aktivitas Praktis di Akhir Pembelajaran
            </span>
            <h4 className="text-base sm:text-lg font-black font-display">
              Balap Perahu Spons Tiup & Mobil Seluncur (Wind & Wheel Physics)
            </h4>
            <p className="text-xs text-emerald-100 max-w-lg leading-relaxed">
              Buat perahu spons kecil dengan layar kertas, lalu tiup menggunakan sedotan di baskom air untuk melihat gaya dorong angin!
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playFanfare();
              onOpenHandsOn?.();
            }}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 whitespace-nowrap"
          >
            <span>Buka Panduan Praktik</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>

      </div>
    </div>
  );
};
