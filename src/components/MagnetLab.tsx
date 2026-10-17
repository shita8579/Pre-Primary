import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Volume2, Compass, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MAGNET_ITEMS } from '../data/scienceContent';
import { MagnetItem } from '../types/science';
import { soundManager, speakText } from '../utils/soundEffects';

interface MagnetLabProps {
  onUnlockSticker: (stickerId: string) => void;
}

export const MagnetLab: React.FC<MagnetLabProps> = ({ onUnlockSticker }) => {
  const [selectedItem, setSelectedItem] = useState<MagnetItem | null>(null);
  const [isSnapping, setIsSnapping] = useState<boolean>(false);
  const [testedItems, setTestedItems] = useState<{ item: MagnetItem; isMagnetic: boolean }[]>([]);
  const [attractingItem, setAttractingItem] = useState<MagnetItem | null>(null);

  const handleTestItem = (item: MagnetItem) => {
    if (isSnapping) return;
    setSelectedItem(item);
    setIsSnapping(true);

    if (item.isMagnetic) {
      // It snaps to the magnet!
      setTimeout(() => {
        soundManager.playSnap();
        setAttractingItem(item);
      }, 350);

      setTimeout(() => {
        soundManager.playChime();
        speakText(`SNAP! The ${item.name} is made of metal, so the magnet grabs it tight!`);
        setIsSnapping(false);

        // Add to tested if not already
        setTestedItems((prev) => {
          if (prev.some((p) => p.item.id === item.id)) return prev;
          const next = [...prev, { item, isMagnetic: true }];
          if (next.length >= 3) {
            onUnlockSticker('star-magnet');
          }
          if (next.length >= 6) {
            confetti({
              particleCount: 40,
              spread: 70,
              origin: { y: 0.6 },
            });
          }
          return next;
        });
      }, 1000);
    } else {
      // It does not stick
      setTimeout(() => {
        soundManager.playPop(300);
        speakText(`Nope! The ${item.name} is not magnetic. Magnets only attract certain metals!`);
        setIsSnapping(false);

        setTestedItems((prev) => {
          if (prev.some((p) => p.item.id === item.id)) return prev;
          const next = [...prev, { item, isMagnetic: false }];
          if (next.length >= 3) {
            onUnlockSticker('star-magnet');
          }
          return next;
        });
      }, 800);
    }
  };

  const handleResetTray = () => {
    soundManager.playPop(340);
    setSelectedItem(null);
    setAttractingItem(null);
    setTestedItems([]);
  };

  const handleSpeakCurrent = () => {
    if (selectedItem) {
      speakText(`${selectedItem.name}. ${selectedItem.funFact}`);
    } else {
      speakText('Tap any object in the discovery tray to see if the big magnet pulls it with invisible magnetic force!');
    }
  };

  const magneticTested = testedItems.filter((t) => t.isMagnetic);
  const nonMagneticTested = testedItems.filter((t) => !t.isMagnetic);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Lab Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 uppercase tracking-wider">
            <span>Magnetism & Forces</span>
            <span aria-hidden="true">·</span>
            <span>Ages 3–4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Super Magnet Discovery Tray
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakCurrent}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Read to Me</span>
          </button>

          <button
            onClick={handleResetTray}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Tray</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox 2-Zone Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Stage Zone: The Magnet Stage (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-rose-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs font-medium text-rose-950">
            <span className="flex items-center gap-1.5 font-bold">
              <Compass className="w-4 h-4 text-rose-600" />
              <span>Magnetic Attraction Stage</span>
            </span>
            <span>{testedItems.length} of 8 items tested</span>
          </div>

          {/* Magnet Stage Area */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-rose-200 bg-gradient-to-b from-rose-50/60 via-amber-50/30 to-slate-100 shadow-inner flex flex-col items-center justify-between p-6">
            
            {/* The Horseshoe Magnet (Top Center) */}
            <div className="relative flex flex-col items-center">
              <motion.div
                className="relative select-none"
                animate={
                  isSnapping && selectedItem?.isMagnetic
                    ? { y: [0, 15, 0], scale: [1, 1.08, 1] }
                    : {}
                }
                transition={{ duration: 0.4 }}
              >
                {/* Giant horseshoe magnet visual */}
                <div className="text-8xl filter drop-shadow-lg">
                  🧲
                </div>

                {/* Magnetic field glow lines if snapping to metal */}
                {isSnapping && selectedItem?.isMagnetic && (
                  <div className="absolute inset-0 -m-4 border-4 border-dashed border-sky-400 rounded-full animate-ping opacity-60 pointer-events-none" />
                )}
              </motion.div>

              {/* Item attached to magnet */}
              <AnimatePresence>
                {attractingItem && (
                  <motion.div
                    initial={{ y: 80, opacity: 0, scale: 0.5 }}
                    animate={{ y: -15, opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.4 }}
                    className="flex flex-col items-center bg-sky-50 border-2 border-sky-400 px-3 py-1 rounded-xl shadow-md z-10"
                  >
                    <span className="text-3xl">{attractingItem.emoji}</span>
                    <span className="text-[10px] font-black text-sky-900">
                      SNAP! Attached!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Test Pad Floor */}
            <div className="w-full bg-white/90 rounded-2xl p-4 border border-rose-200/80 shadow-xs text-center">
              {selectedItem ? (
                <div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl">{selectedItem.emoji}</span>
                    <span className="text-base font-extrabold text-amber-950 font-display">
                      {selectedItem.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({selectedItem.material})
                    </span>
                  </div>

                  <p className="text-xs text-rose-950 font-medium mt-1">
                    {selectedItem.funFact}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-rose-900/70 font-medium">
                  Tap an object below to bring the magnet close to it!
                </p>
              )}
            </div>

          </div>

          {/* Feedback Strip */}
          <div className="mt-3 min-h-[48px] bg-rose-50 rounded-xl p-3 border border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-rose-950">
                {selectedItem
                  ? selectedItem.isMagnetic
                    ? `Snap! ${selectedItem.name} contains iron or steel — the magnet pulled it!`
                    : `No pull! ${selectedItem.name} is made of ${selectedItem.material}, which magnets ignore!`
                  : 'Magnets have an invisible force that only attracts certain metals like iron and steel!'}
              </p>
            </div>
          </div>
        </div>

        {/* Control Zone: Tray Items & Sorting Bins (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-rose-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                Discovery Tray (Tap to Test)
              </span>
              <span className="text-xs font-mono text-rose-700">
                8 Objects
              </span>
            </div>

            {/* 8 Items Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {MAGNET_ITEMS.map((item) => {
                const isTested = testedItems.some((t) => t.item.id === item.id);
                const isCurrent = selectedItem?.id === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTestItem(item)}
                    disabled={isSnapping}
                    className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-2.5 text-left group ${
                      isCurrent
                        ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-300'
                        : isTested
                        ? item.isMagnetic
                          ? 'border-sky-300 bg-sky-50/60'
                          : 'border-slate-200 bg-slate-50'
                        : 'border-amber-200/80 bg-white hover:bg-rose-50/40 hover:border-rose-300'
                    }`}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform select-none">
                      {item.emoji}
                    </span>
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-slate-800 truncate block">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate">
                        {item.material}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Two Sorting Result Bins */}
            <div className="mt-5 pt-4 border-t border-rose-100 grid grid-cols-2 gap-3">
              
              {/* Magnetic Bin */}
              <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Sticks to Magnet!</span>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[36px]">
                  {magneticTested.length === 0 ? (
                    <span className="text-[10px] text-sky-700/60 italic">None yet</span>
                  ) : (
                    magneticTested.map((t) => (
                      <span
                        key={t.item.id}
                        className="text-lg bg-white px-1.5 py-0.5 rounded-md shadow-2xs"
                        title={t.item.name}
                      >
                        {t.item.emoji}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Non-Magnetic Bin */}
              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1.5">
                  <XCircle className="w-4 h-4 text-amber-600" />
                  <span>Does Not Stick</span>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[36px]">
                  {nonMagneticTested.length === 0 ? (
                    <span className="text-[10px] text-amber-700/60 italic">None yet</span>
                  ) : (
                    nonMagneticTested.map((t) => (
                      <span
                        key={t.item.id}
                        className="text-lg bg-white px-1.5 py-0.5 rounded-md shadow-2xs"
                        title={t.item.name}
                      >
                        {t.item.emoji}
                      </span>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Quick Magnetism Fact */}
          <div className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-950">
            <span className="font-bold text-rose-900">Did you know?</span> Magnets can even pull through paper, cardboard, and water without touching!
          </div>

        </div>

      </div>

      {/* Classroom Teacher Note */}
      <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 flex items-start gap-3">
        <Compass className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
        <div className="text-xs text-rose-950">
          <span className="font-bold">Preschool Science Tip for Teachers:</span>{' '}
          In the classroom, give children horseshoe magnets and let them go on a "Magnetic Treasure Hunt" around the room.
          Have them test table legs (metal!), chairs (wood/plastic!), doors, and paperclips.
          Help them say the magic science word: <strong>Attract</strong>!
        </div>
      </div>
    </div>
  );
};
