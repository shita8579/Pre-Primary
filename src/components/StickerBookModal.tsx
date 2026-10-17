import React from 'react';
import { X, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScienceSticker } from '../types/science';
import { soundManager, speakText } from '../utils/soundEffects';

interface StickerBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  stickers: ScienceSticker[];
}

export const StickerBookModal: React.FC<StickerBookModalProps> = ({
  isOpen,
  onClose,
  stickers,
}) => {
  if (!isOpen) return null;

  const unlockedCount = stickers.filter((s) => s.unlocked).length;

  const handleTapSticker = (sticker: ScienceSticker) => {
    if (sticker.unlocked) {
      soundManager.playChime();
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5 },
      });
      speakText(`Hooray! You earned the ${sticker.title} badge: ${sticker.badgeName}!`);
    } else {
      soundManager.playPop(340);
      speakText(`Explore the ${sticker.title} science lab to unlock this shiny badge!`);
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
              <h2 className="text-lg font-bold font-display">Scientist Badge Book</h2>
              <p className="text-xs text-amber-100">
                You have collected <span className="font-bold">{unlockedCount}</span> of {stickers.length} badges!
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
            Every time you complete experiments and make science discoveries, you earn a shiny badge!
            Tap any badge to inspect:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {stickers.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => handleTapSticker(sticker)}
                className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 group ${
                  sticker.unlocked
                    ? 'bg-gradient-to-b from-amber-50 to-amber-100/60 border-amber-300 shadow-xs hover:scale-105 active:scale-95'
                    : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="relative">
                  <span
                    className={`text-5xl block select-none ${
                      sticker.unlocked ? 'filter drop-shadow-sm group-hover:rotate-6 transition-transform' : 'grayscale opacity-50'
                    }`}
                  >
                    {sticker.emoji}
                  </span>
                  {sticker.unlocked && (
                    <div className="absolute -top-1 -right-2 bg-emerald-500 text-white rounded-full p-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-xs font-black text-slate-800 font-display block">
                    {sticker.title}
                  </span>
                  <span className="text-[10px] text-amber-900/80 font-medium block">
                    {sticker.badgeName}
                  </span>
                </div>

                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    sticker.unlocked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {sticker.unlocked ? 'Unlocked ⭐' : 'Locked'}
                </span>
              </button>
            ))}
          </div>

          {unlockedCount === stickers.length && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs font-bold text-emerald-950 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Incredible! You have earned ALL science explorer badges! You are a master little scientist!</span>
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
            Keep Exploring
          </button>
        </div>

      </div>
    </div>
  );
};
