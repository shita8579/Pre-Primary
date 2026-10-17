import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, CloudRain, Snowflake, Wind, Volume2, Sparkles, Rainbow } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager, speakText } from '../utils/soundEffects';

interface WeatherSeasonsLabProps {
  onUnlockSticker: (stickerId: string) => void;
}

type WeatherType = 'sunny' | 'rainy' | 'snowy' | 'windy';

interface WeatherDetails {
  id: WeatherType;
  title: string;
  emoji: string;
  description: string;
  clothingTip: string;
  soundName: string;
}

const WEATHERS: WeatherDetails[] = [
  {
    id: 'sunny',
    title: 'Sunny Day',
    emoji: '☀️',
    description: 'The sun is shining bright and warm! Time to wear a sun hat and play outside!',
    clothingTip: 'Sunhat, sunglasses & light t-shirt',
    soundName: 'Warm sun hum',
  },
  {
    id: 'rainy',
    title: 'Rainy Day',
    emoji: '🌧️',
    description: 'Pitter-patter! Rain drops fall from the gray clouds. Tap puddles to splash!',
    clothingTip: 'Yellow raincoat, boots & an umbrella',
    soundName: 'Gentle raindrops',
  },
  {
    id: 'snowy',
    title: 'Snowy Day',
    emoji: '❄️',
    description: 'Brrr! Fluffy white snowflakes are floating down! Let us build a snowman!',
    clothingTip: 'Cozy mittens, warm beanie & heavy coat',
    soundName: 'Soft winter chill',
  },
  {
    id: 'windy',
    title: 'Windy Day',
    emoji: '🍃',
    description: 'Whoosh! The wind is blowing through the trees! Tap the kite to make it dance!',
    clothingTip: 'Windbreaker jacket & a flying kite',
    soundName: 'Breezy gusts',
  },
];

export const WeatherSeasonsLab: React.FC<WeatherSeasonsLabProps> = ({ onUnlockSticker }) => {
  const [activeWeather, setActiveWeather] = useState<WeatherType>('sunny');
  const [showRainbow, setShowRainbow] = useState<boolean>(false);
  const [snowmanParts, setSnowmanParts] = useState<{ base: boolean; middle: boolean; head: boolean; face: boolean }>({
    base: true,
    middle: true,
    head: true,
    face: true,
  });
  const [puddleSplashes, setPuddleSplashes] = useState<number[]>([]);
  const [kiteLoop, setKiteLoop] = useState<number>(0);

  const currentWeather = WEATHERS.find((w) => w.id === activeWeather)!;

  const handleSelectWeather = (type: WeatherType) => {
    setActiveWeather(type);
    setShowRainbow(false);

    if (type === 'sunny') {
      soundManager.playPop(620);
    } else if (type === 'rainy') {
      soundManager.playWaterPour();
    } else if (type === 'snowy') {
      soundManager.playChime();
    } else if (type === 'windy') {
      soundManager.playPop(480);
    }

    const detail = WEATHERS.find((w) => w.id === type);
    if (detail) {
      speakText(`${detail.title}! ${detail.description}`);
    }

    onUnlockSticker('star-weather');
  };

  const handleSplashPuddle = (index: number) => {
    soundManager.playSplash();
    setPuddleSplashes((prev) => [...prev, index]);
    setTimeout(() => {
      setPuddleSplashes((prev) => prev.filter((i) => i !== index));
    }, 600);
  };

  const handleTapKite = () => {
    soundManager.playPop(700);
    setKiteLoop((prev) => prev + 1);
  };

  const handleTriggerRainbow = () => {
    soundManager.playFanfare();
    setShowRainbow(true);
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'],
    });
    speakText('When the bright sun shines through raindrops, a beautiful rainbow appears in the sky!');
  };

  const handleSpeakCurrent = () => {
    speakText(`${currentWeather.title}! ${currentWeather.description} We wear: ${currentWeather.clothingTip}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Lab Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 uppercase tracking-wider">
            <span>Earth Science & Atmosphere</span>
            <span aria-hidden="true">·</span>
            <span>Ages 3–4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            Weather & Seasons Sky Room
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
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Stage Zone: The Interactive Sky Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-sky-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs font-medium text-sky-950">
            <span className="flex items-center gap-1.5 font-bold">
              <span>{currentWeather.emoji}</span>
              <span>{currentWeather.title} Viewport</span>
            </span>
            <span className="capitalize">{activeWeather} atmosphere</span>
          </div>

          {/* Sky Canvas Container */}
          <div
            className={`relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-4 shadow-inner transition-colors duration-700 ${
              activeWeather === 'sunny'
                ? 'border-amber-300 bg-gradient-to-b from-sky-300 via-sky-200 to-amber-100'
                : activeWeather === 'rainy'
                ? 'border-slate-400 bg-gradient-to-b from-slate-600 via-slate-400 to-emerald-200'
                : activeWeather === 'snowy'
                ? 'border-sky-300 bg-gradient-to-b from-indigo-200 via-sky-100 to-white'
                : 'border-teal-300 bg-gradient-to-b from-sky-200 via-teal-100 to-amber-100'
            }`}
          >
            {/* SUNNY MODE */}
            {activeWeather === 'sunny' && (
              <>
                <motion.div
                  className="absolute top-4 right-8 text-7xl select-none filter drop-shadow-lg"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 8 }}
                >
                  ☀️
                </motion.div>
                <motion.div
                  className="absolute top-12 left-10 text-3xl select-none"
                  animate={{ x: [0, 30, 0] }}
                  transition={{ repeat: Infinity, duration: 12 }}
                >
                  ☁️
                </motion.div>
                <div className="absolute top-16 left-48 text-2xl select-none animate-bounce">
                  🐦
                </div>
              </>
            )}

            {/* RAINY MODE */}
            {activeWeather === 'rainy' && (
              <>
                {/* Dark Rain Clouds */}
                <div className="absolute top-2 inset-x-0 flex justify-around text-5xl opacity-90 select-none">
                  <span>🌧️</span>
                  <span>⛈️</span>
                  <span>🌧️</span>
                </div>

                {/* Falling raindrops */}
                <div className="absolute inset-x-0 top-16 bottom-20 overflow-hidden pointer-events-none">
                  {[...Array(14)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-5 bg-sky-200/90 rounded-full"
                      style={{ left: `${6 + i * 7}%` }}
                      initial={{ y: -20, opacity: 0.8 }}
                      animate={{ y: 220, opacity: 0.2 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + (i % 3) * 0.15,
                        delay: i * 0.08,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </div>

                {/* Rain Puddles on the ground that splash when clicked! */}
                <div className="absolute bottom-6 inset-x-8 flex justify-around z-20">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSplashPuddle(idx)}
                      className="relative px-5 py-2.5 rounded-full bg-sky-300/80 hover:bg-sky-400 border border-sky-400 shadow-inner text-xs font-bold text-sky-950 transition-transform active:scale-90"
                    >
                      <span>💧 Splash!</span>
                      {puddleSplashes.includes(idx) && (
                        <span className="absolute -top-6 inset-x-0 text-center text-lg animate-ping">
                          💦
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Button to make rainbow! */}
                <button
                  onClick={handleTriggerRainbow}
                  className="absolute top-20 right-4 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-bold text-purple-900 border border-purple-200 shadow-md flex items-center gap-1.5 transition-all z-20 active:scale-95"
                >
                  <Rainbow className="w-4 h-4 text-purple-600" />
                  <span>Sun + Rain = Rainbow!</span>
                </button>
              </>
            )}

            {/* RAINBOW OVERLAY */}
            {showRainbow && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-x-0 top-10 flex justify-center z-15 pointer-events-none"
              >
                <div className="w-80 h-40 border-t-8 border-r-8 border-l-8 border-red-500 rounded-t-full relative flex items-center justify-center">
                  <div className="w-72 h-36 border-t-8 border-r-8 border-l-8 border-amber-400 rounded-t-full relative flex items-center justify-center">
                    <div className="w-64 h-32 border-t-8 border-r-8 border-l-8 border-emerald-400 rounded-t-full relative flex items-center justify-center">
                      <div className="w-56 h-28 border-t-8 border-r-8 border-l-8 border-sky-400 rounded-t-full relative flex items-center justify-center">
                        <div className="w-48 h-24 border-t-8 border-r-8 border-l-8 border-purple-500 rounded-t-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SNOWY MODE */}
            {activeWeather === 'snowy' && (
              <>
                {/* Falling gentle snowflakes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-xl select-none"
                      style={{ left: `${4 + i * 6}%` }}
                      initial={{ y: -20, opacity: 0.9 }}
                      animate={{
                        y: 280,
                        x: [0, (i % 2 === 0 ? 10 : -10), 0],
                        opacity: 0.3,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + (i % 4),
                        delay: i * 0.2,
                        ease: 'easeInOut',
                      }}
                    >
                      ❄️
                    </motion.div>
                  ))}
                </div>

                {/* Friendly Snowman */}
                <div className="absolute bottom-6 left-12 flex flex-col items-center z-10">
                  <span className="text-7xl select-none filter drop-shadow-md">
                    ⛄
                  </span>
                  <span className="text-[10px] font-bold bg-white/90 text-sky-900 px-2 py-0.5 rounded-full shadow-xs mt-1">
                    Frosty Snowman
                  </span>
                </div>
              </>
            )}

            {/* WINDY MODE */}
            {activeWeather === 'windy' && (
              <>
                {/* Flying Autumn Leaves */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {['🍂', '🍁', '🍃', '🍂', '🍁'].map((leaf, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-3xl select-none"
                      style={{ top: `${20 + i * 15}%` }}
                      initial={{ x: -40, rotate: 0 }}
                      animate={{
                        x: 500,
                        y: [0, -30, 20, 0],
                        rotate: 360,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.8 + i * 0.6,
                        delay: i * 0.4,
                        ease: 'easeInOut',
                      }}
                    >
                      {leaf}
                    </motion.div>
                  ))}
                </div>

                {/* Interactive Flying Kite */}
                <motion.div
                  className="absolute top-12 right-16 cursor-pointer z-20 flex flex-col items-center"
                  animate={{
                    rotate: [kiteLoop * 360 - 15, kiteLoop * 360 + 15, kiteLoop * 360 - 15],
                    y: [0, -15, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  onClick={handleTapKite}
                >
                  <span className="text-6xl select-none filter drop-shadow-md">
                    🪁
                  </span>
                  <span className="text-[10px] font-black bg-amber-100 text-amber-950 px-2 py-0.5 rounded-full shadow-xs">
                    Tap to loop!
                  </span>
                </motion.div>
              </>
            )}

            {/* Little Animal Explorer on the Ground */}
            <div className="absolute bottom-4 right-10 flex flex-col items-center z-10">
              <div className="text-6xl select-none filter drop-shadow-md">
                {activeWeather === 'sunny' && '🐻🕶️'}
                {activeWeather === 'rainy' && '🐸☂️'}
                {activeWeather === 'snowy' && '🐧🧣'}
                {activeWeather === 'windy' && '🦊🪁'}
              </div>
              <span className="text-[10px] font-bold text-slate-800 bg-white/90 px-2 py-0.5 rounded-full shadow-xs mt-1">
                {activeWeather === 'sunny' && 'Bear in Sunhat'}
                {activeWeather === 'rainy' && 'Frog with Umbrella'}
                {activeWeather === 'snowy' && 'Penguin with Scarf'}
                {activeWeather === 'windy' && 'Fox Flying Kite'}
              </span>
            </div>

            {/* Ground landscape */}
            <div
              className={`absolute bottom-0 inset-x-0 h-10 border-t-2 z-0 ${
                activeWeather === 'snowy'
                  ? 'bg-white border-sky-200'
                  : 'bg-emerald-600/90 border-emerald-700'
              }`}
            />

          </div>

          {/* Feedback strip */}
          <div className="mt-3 min-h-[48px] bg-sky-50 rounded-xl p-3 border border-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-sky-950">
                {currentWeather.description}
              </p>
            </div>
          </div>
        </div>

        {/* Control Zone: Weather Selector & Clothing Deck (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-sky-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">
                Choose the Weather Sky
              </span>
              <span className="text-xs font-mono text-sky-700">
                4 Modes
              </span>
            </div>

            {/* 4 Big Weather Buttons */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Sunny */}
              <button
                onClick={() => handleSelectWeather('sunny')}
                className={`p-4 rounded-2xl border-b-4 shadow-md transition-all flex flex-col items-center justify-center gap-1 group ${
                  activeWeather === 'sunny'
                    ? 'bg-amber-400 border-amber-600 text-amber-950 ring-2 ring-amber-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">☀️</span>
                <span className="text-sm font-black font-display">Sunny</span>
                <span className="text-[10px] opacity-80">Warm & Bright</span>
              </button>

              {/* Rainy */}
              <button
                onClick={() => handleSelectWeather('rainy')}
                className={`p-4 rounded-2xl border-b-4 shadow-md transition-all flex flex-col items-center justify-center gap-1 group ${
                  activeWeather === 'rainy'
                    ? 'bg-sky-500 border-sky-700 text-white ring-2 ring-sky-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50'
                }`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">🌧️</span>
                <span className="text-sm font-black font-display">Rainy</span>
                <span className="text-[10px] opacity-80">Puddle Splashes</span>
              </button>

              {/* Snowy */}
              <button
                onClick={() => handleSelectWeather('snowy')}
                className={`p-4 rounded-2xl border-b-4 shadow-md transition-all flex flex-col items-center justify-center gap-1 group ${
                  activeWeather === 'snowy'
                    ? 'bg-indigo-400 border-indigo-600 text-white ring-2 ring-indigo-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50'
                }`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">❄️</span>
                <span className="text-sm font-black font-display">Snowy</span>
                <span className="text-[10px] opacity-80">Cold & Frosty</span>
              </button>

              {/* Windy */}
              <button
                onClick={() => handleSelectWeather('windy')}
                className={`p-4 rounded-2xl border-b-4 shadow-md transition-all flex flex-col items-center justify-center gap-1 group ${
                  activeWeather === 'windy'
                    ? 'bg-teal-500 border-teal-700 text-white ring-2 ring-teal-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-teal-50'
                }`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">🍃</span>
                <span className="text-sm font-black font-display">Windy</span>
                <span className="text-[10px] opacity-80">Kite Dancing</span>
              </button>

            </div>

            {/* How to Dress Box */}
            <div className="mt-6 pt-4 border-t border-sky-100">
              <span className="text-[11px] font-bold text-sky-950/70 uppercase tracking-wider block mb-2">
                What should we wear today?
              </span>
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-center gap-3">
                <span className="text-3xl">
                  {activeWeather === 'sunny' && '👒'}
                  {activeWeather === 'rainy' && '🧥'}
                  {activeWeather === 'snowy' && '🧤'}
                  {activeWeather === 'windy' && '🧣'}
                </span>
                <div>
                  <span className="text-xs font-bold text-sky-950 block">
                    Dress for {currentWeather.title}:
                  </span>
                  <span className="text-xs text-sky-900 font-medium block">
                    {currentWeather.clothingTip}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Weather Wisdom */}
          <div className="mt-5 p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-950">
            <span className="font-bold text-sky-900">Weather Question:</span> Look out your real window right now! Is it sunny, cloudy, or rainy outside your classroom?
          </div>

        </div>

      </div>

      {/* Classroom Teacher Note */}
      <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200 flex items-start gap-3">
        <Sun className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        <div className="text-xs text-sky-950">
          <span className="font-bold">Preschool Science Tip for Teachers:</span>{' '}
          In morning circle time, appoint a daily "Weather Reporter" student.
          They look out the window, observe the sky, and match the weather in the app!
          This establishes daily routines and observational skills for 3-4 year olds.
        </div>
      </div>
    </div>
  );
};
