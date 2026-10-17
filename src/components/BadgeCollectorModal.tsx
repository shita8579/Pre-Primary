import React from 'react';
import { X, Award, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TransportBadge } from '../types/transportation';
import { soundManager, speakText } from '../utils/soundEffects';

interface BadgeCollectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: TransportBadge[];
}

export const BadgeCollectorModal: React.FC<BadgeCollectorModalProps> = ({
  isOpen,
  onClose,
  badges,
}) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const handleTapBadge = (badge: TransportBadge) => {
    if (badge.unlocked) {
      soundManager.playChime();
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5 },
      });
      speakText(`Hooray! You earned the ${badge.title} badge: ${badge.badgeName}!`);
    } else {
      soundManager.playPop(340);
      speakText(`To unlock this badge: ${badge.requirement}!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-amber-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">Transportation Navigator Badges</h2>
              <p className="text-xs text-amber-100">
                You have earned <span className="font-bold">{unlockedCount}</span> of {badges.length} badges!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPop(300);
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Sort land, water, and air vehicles, identify mystery sounds, and complete emergency missions to collect all captain badges! Tap any badge to hear details:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {badges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => handleTapBadge(badge)}
                className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                  badge.unlocked
                    ? 'bg-gradient-to-b from-amber-50 to-amber-100/60 border-amber-300 shadow-xs hover:scale-105 active:scale-95'
                    : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="relative">
                  <span
                    className={`text-5xl block select-none ${
                      badge.unlocked
                        ? 'filter drop-shadow-sm group-hover:rotate-6 transition-transform'
                        : 'grayscale opacity-50'
                    }`}
                  >
                    {badge.emoji}
                  </span>
                  {badge.unlocked && (
                    <div className="absolute -top-1 -right-2 bg-emerald-500 text-white rounded-full p-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-xs font-black text-slate-800 font-display block">
                    {badge.title}
                  </span>
                  <span className="text-[10px] text-amber-900/80 font-medium block">
                    {badge.badgeName}
                  </span>
                </div>

                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    badge.unlocked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {badge.unlocked ? 'Unlocked ⭐' : badge.requirement}
                </span>
              </button>
            ))}
          </div>

          {unlockedCount === badges.length && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs font-bold text-emerald-950 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Incredible! You have earned ALL Transportation Badges! You are a Grand Transportation Captain!</span>
            </div>
          )}
        </div>

        <div className="p-4 bg-amber-50/50 border-t border-amber-100 flex justify-end">
          <button
            onClick={() => {
              soundManager.playPop(350);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Keep Navigating
          </button>
        </div>

      </div>
    </div>
  );
};
