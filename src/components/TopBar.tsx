import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Award } from 'lucide-react';
import { LabId } from '../types/science';
import { soundManager } from '../utils/soundEffects';

interface TopBarProps {
  activeLab: LabId;
  onSelectLab: (labId: LabId) => void;
  onOpenTeacherGuide: () => void;
  onOpenStickerBook: () => void;
  stickerCount: number;
  totalStickers: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeLab,
  onSelectLab,
  onOpenTeacherGuide,
  onOpenStickerBook,
  stickerCount,
  totalStickers,
}) => {
  const [isMuted, setIsMuted] = React.useState(soundManager.isMuted);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playPop(520);
    }
  };

  const navItems: { id: LabId; label: string }[] = [
    { id: 'float-sink', label: 'Float or Sink' },
    { id: 'plant-garden', label: 'Plant Garden' },
    { id: 'color-mixing', label: 'Color Mixer' },
    { id: 'magnet-lab', label: 'Super Magnets' },
    { id: 'weather-seasons', label: 'Weather Sky' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={() => {
            soundManager.playPop(480);
            onSelectLab('float-sink');
          }}
          className="group text-left flex items-center gap-2.5 focus-visible:outline-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            W
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-amber-950 font-display whitespace-nowrap">
            WonderLab
          </span>
        </button>
      </div>

      {/* Zone 2: 4-5 clean single-line nav links */}
      <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-amber-100/60 rounded-2xl border border-amber-200/50">
        {navItems.map((item) => {
          const isActive = activeLab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playPop(isActive ? 400 : 580);
                onSelectLab(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300'
                  : 'text-amber-800/80 hover:text-amber-950 hover:bg-white/50'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary action + quick tools */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Sound toggle button */}
        <button
          onClick={handleToggleSound}
          title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          className={`p-2.5 rounded-xl text-sm font-medium border transition-colors flex items-center gap-1.5 ${
            isMuted
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
          }`}
          aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline text-xs font-semibold">
            {isMuted ? 'Muted' : 'Sound On'}
          </span>
        </button>

        {/* Sticker badges button */}
        <button
          onClick={() => {
            soundManager.playChime();
            onOpenStickerBook();
          }}
          className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-amber-900 bg-amber-100/80 border border-amber-300/80 hover:bg-amber-200/80 transition-colors flex items-center gap-1.5 whitespace-nowrap"
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>Badges</span>
          <span className="font-mono text-xs px-1.5 py-0.5 bg-amber-200/90 text-amber-950 rounded-md">
            {stickerCount}/{totalStickers}
          </span>
        </button>

        {/* Teacher circle time guide */}
        <button
          onClick={() => {
            soundManager.playPop(520);
            onOpenTeacherGuide();
          }}
          className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 border border-amber-700 shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Teacher Guide</span>
          <span className="sm:hidden">Guide</span>
        </button>
      </div>
    </header>
  );
};
