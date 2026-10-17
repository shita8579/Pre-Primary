import React from 'react';
import { Volume2, VolumeX, Award, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export type TranspoLabTab = 'sorting' | 'car-craft' | 'sound-quiz' | 'rescue' | 'drive';

interface TranspoTopBarProps {
  activeTab: TranspoLabTab;
  onSelectTab: (tab: TranspoLabTab) => void;
  onOpenTeacherGuide: () => void;
  onOpenBadgeBook: () => void;
  onOpenHandsOn: () => void;
  unlockedBadgesCount: number;
  totalBadgesCount: number;
}

export const TranspoTopBar: React.FC<TranspoTopBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenTeacherGuide,
  onOpenBadgeBook,
  onOpenHandsOn,
  unlockedBadgesCount,
  totalBadgesCount,
}) => {
  const [isMuted, setIsMuted] = React.useState(soundManager.isMuted);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playCarHonk();
    }
  };

  const navItems: { id: TranspoLabTab; label: string }[] = [
    { id: 'sorting', label: 'Classify Vehicles' },
    { id: 'car-craft', label: 'Car Anatomy & Craft' },
    { id: 'sound-quiz', label: 'Sound Quiz' },
    { id: 'rescue', label: 'Rescue Helpers' },
    { id: 'drive', label: 'Drive & Pilot' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={() => {
            soundManager.playPop(520);
            onSelectTab('sorting');
          }}
          className="group text-left flex items-center gap-2.5 focus-visible:outline-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-white flex items-center justify-center font-extrabold text-lg shadow-xs group-hover:scale-105 transition-transform">
            🚦
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-amber-950 font-display whitespace-nowrap">
            TranspoWorld
          </span>
        </button>
      </div>

      {/* Zone 2: 4 clean single-line nav links */}
      <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-amber-100/60 rounded-2xl border border-amber-200/60">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playPop(isActive ? 420 : 580);
                onSelectTab(item.id);
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

      {/* Zone 3: Primary action & tools */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Sound Toggle */}
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

        {/* Badges Book button */}
        <button
          onClick={() => {
            soundManager.playChime();
            onOpenBadgeBook();
          }}
          className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-amber-900 bg-amber-100/80 border border-amber-300/80 hover:bg-amber-200/80 transition-colors flex items-center gap-1.5 whitespace-nowrap"
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>Badges</span>
          <span className="font-mono text-xs px-1.5 py-0.5 bg-amber-200/90 text-amber-950 rounded-md">
            {unlockedBadgesCount}/{totalBadgesCount}
          </span>
        </button>

        {/* Hands-On Activity Button */}
        <button
          onClick={() => {
            soundManager.playPop(520);
            onOpenHandsOn();
          }}
          className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-emerald-950 bg-emerald-100/90 border border-emerald-300 hover:bg-emerald-200 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          title="Hands-on Activity / Praktik Nyata"
        >
          <span>🎨</span>
          <span className="hidden sm:inline">Hands-On</span>
          <span className="sm:hidden">Praktik</span>
        </button>

        {/* Teacher Circle Time Hub */}
        <button
          onClick={() => {
            soundManager.playPop(520);
            onOpenTeacherGuide();
          }}
          className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 border border-amber-700 shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Teacher Hub</span>
          <span className="sm:hidden">Hub</span>
        </button>
      </div>
    </header>
  );
};
