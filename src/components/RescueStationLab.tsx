import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Siren, Shield, Volume2, Sparkles, CheckCircle2, ArrowRight, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager, speakText } from '../utils/soundEffects';

interface RescueStationLabProps {
  onUnlockBadge: (badgeId: string) => void;
  onOpenHandsOn?: () => void;
}

interface RescueMission {
  id: string;
  emergencyText: string;
  correctVehicleId: string;
  explanation: string;
}

const MISSIONS: RescueMission[] = [
  {
    id: 'm1',
    emergencyText: 'Meow! A curious kitten climbed high up in a tall tree and cannot get down! Who has a giant ladder and basket to rescue it?',
    correctVehicleId: 'fire-truck',
    explanation: 'Hooray! The Fire Truck has a long extension ladder to reach high branches!',
  },
  {
    id: 'm2',
    emergencyText: 'Ouch! A boy scraped his knee and needs a ride to the clinic with paramedics! Who has a cozy bed inside and flashing lights?',
    correctVehicleId: 'ambulance',
    explanation: 'Awesome! The Ambulance has medical equipment and a stretcher bed to help patients!',
  },
  {
    id: 'm3',
    emergencyText: 'Mayday! A small sailboat has a torn sail in the middle of the ocean waves! Who can rush across the water to tow them home?',
    correctVehicleId: 'coast-guard',
    explanation: 'Splendid! The Coast Guard Boat powers across deep water with life jackets and rescue lines!',
  },
  {
    id: 'm4',
    emergencyText: 'A hiker is stuck on a steep mountain cliff where cars and trucks have no roads! Who can fly straight up into the air to airlift them?',
    correctVehicleId: 'helicopter',
    explanation: 'Incredible! The Rescue Helicopter has spinning rotor blades that can hover in place over mountains!',
  },
  {
    id: 'm5',
    emergencyText: 'The school crossing lights need traffic helpers so kindergarteners can cross the street safely! Who patrols the neighborhood roads?',
    correctVehicleId: 'police-car',
    explanation: 'Wonderful! The Police Patrol Car helps keep neighborhood roads safe and orderly!',
  },
];

const RESCUE_VEHICLES = [
  {
    id: 'fire-truck',
    name: 'Red Fire Engine',
    emoji: '🚒',
    domain: 'Land',
    specialGear: 'Extending ladder & high-pressure water hose',
  },
  {
    id: 'police-car',
    name: 'Police Cruiser',
    emoji: '🚓',
    domain: 'Land',
    specialGear: 'Flashing strobe lights & radio dispatcher',
  },
  {
    id: 'ambulance',
    name: 'Paramedic Ambulance',
    emoji: '🚑',
    domain: 'Land',
    specialGear: 'First aid stretcher & heartbeat monitor',
  },
  {
    id: 'helicopter',
    name: 'Rescue Helicopter',
    emoji: '🚁',
    domain: 'Air',
    specialGear: 'Spinning rotors & mountain airlift winch',
  },
  {
    id: 'coast-guard',
    name: 'Coast Guard Rescue Boat',
    emoji: '🚤',
    domain: 'Water',
    specialGear: 'Twin outboard motors & life rings',
  },
];

export const RescueStationLab: React.FC<RescueStationLabProps> = ({
  onUnlockBadge,
  onOpenHandsOn,
}) => {
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [resolvedCount, setResolvedCount] = useState<number>(0);

  const mission = MISSIONS[currentMissionIdx % MISSIONS.length];

  const handleSpeakMission = () => {
    soundManager.playPop(520);
    speakText(`Emergency Call! ${mission.emergencyText} Tap the right rescue vehicle!`);
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);

    if (vehicleId === 'fire-truck' || vehicleId === 'police-car' || vehicleId === 'ambulance') {
      soundManager.playSiren();
    } else if (vehicleId === 'helicopter') {
      soundManager.playHelicopter();
    } else {
      soundManager.playBoatHorn();
    }

    if (vehicleId === mission.correctVehicleId) {
      setTimeout(() => {
        soundManager.playChime();
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.6 },
        });

        setIsCorrect(true);
        setFeedback(mission.explanation);
        setResolvedCount((c) => c + 1);

        if (resolvedCount + 1 >= 3) {
          onUnlockBadge('badge-rescue');
        }

        speakText(mission.explanation);
      }, 600);
    } else {
      setTimeout(() => {
        soundManager.playPop(300);
        setIsCorrect(false);
        const retry = `Let's check! Does this helper have the right tools for this emergency? Try another helper!`;
        setFeedback(retry);
        speakText(retry);
      }, 500);
    }
  };

  const handleNextMission = () => {
    soundManager.playPop(480);
    setCurrentMissionIdx((prev) => (prev + 1) % MISSIONS.length);
    setSelectedVehicle(null);
    setFeedback(null);
    setIsCorrect(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 uppercase tracking-wider">
            <span>Community Helpers & Purpose</span>
            <span aria-hidden="true">·</span>
            <span>Ages 4–6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Community Helper Rescue Station
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakMission}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Hear Mission Call</span>
          </button>
        </div>
      </div>

      {/* Main Mission Bay */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm space-y-6">
        
        {/* Emergency Dispatch Card */}
        <div className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-100 mb-2">
            <Siren className="w-4 h-4 text-white animate-spin" />
            <span>Incoming Emergency Call #{((currentMissionIdx % MISSIONS.length) + 1)}</span>
          </div>

          <p className="text-base sm:text-lg font-bold leading-relaxed font-display text-balance">
            "{mission.emergencyText}"
          </p>

          <div className="mt-4 flex items-center justify-between text-xs text-rose-100">
            <span>Who should we dispatch to help?</span>
            <button
              onClick={handleSpeakMission}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white font-bold flex items-center gap-1 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Aloud</span>
            </button>
          </div>
        </div>

        {/* 5 Rescue Vehicles Options */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-4">
            Select the Helper Vehicle with the Right Equipment:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {RESCUE_VEHICLES.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;

              return (
                <button
                  key={vehicle.id}
                  onClick={() => handleSelectVehicle(vehicle.id)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between gap-2 group cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300'
                        : 'border-rose-400 bg-rose-50'
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/40'
                  }`}
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform select-none">
                    {vehicle.emoji}
                  </span>

                  <div>
                    <span className="text-xs font-extrabold text-slate-800 block">
                      {vehicle.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mt-0.5">
                      {vehicle.domain} Transport
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-500 leading-tight block mt-1">
                    {vehicle.specialGear}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Area */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isCorrect ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold">
                {feedback}
              </p>
            </div>

            {isCorrect && (
              <button
                onClick={handleNextMission}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-xs shrink-0 flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>Next Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}

        {/* Hands-On Activity Banner */}
        <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-rose-500 to-amber-600 rounded-2xl p-5 text-white text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold text-rose-200 uppercase tracking-wider block">
              🎨 Aktivitas Praktis di Akhir Pembelajaran
            </span>
            <h4 className="text-base sm:text-lg font-black font-display">
              Simulasi Lintasan Penyelamat Cilik (Junior Rescue Mission)
            </h4>
            <p className="text-xs text-rose-100 max-w-lg leading-relaxed">
              Gunakan setir kardus dan perban mainan untuk melakukan simulasi misi penyelamatan boneka hewan di kelas!
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playFanfare();
              onOpenHandsOn?.();
            }}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-950 font-black text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 whitespace-nowrap"
          >
            <span>Buka Panduan Praktik</span>
            <ArrowRight className="w-4 h-4 text-rose-700" />
          </button>
        </div>

      </div>
    </div>
  );
};
