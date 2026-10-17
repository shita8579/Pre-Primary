/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Volume2,
  ChevronLeft,
  CheckCircle2,
  Compass,
  Car,
  Ship,
  Plane,
  Siren,
  Gamepad2,
  HelpCircle
} from 'lucide-react';
import { TranspoTopBar, TranspoLabTab } from './components/TranspoTopBar';
import { ClassificationSortingLab } from './components/ClassificationSortingLab';
import { MysterySoundQuiz } from './components/MysterySoundQuiz';
import { RescueStationLab } from './components/RescueStationLab';
import { DriveSimulatorLab } from './components/DriveSimulatorLab';
import { CarAnatomyCraftLab } from './components/CarAnatomyCraftLab';
import { TeacherHubModal } from './components/TeacherHubModal';
import { BadgeCollectorModal } from './components/BadgeCollectorModal';
import { HandsOnActivityModal } from './components/HandsOnActivityModal';
import { TRANSPORT_BADGES } from './data/transportationContent';
import { TransportBadge } from './types/transportation';
import { soundManager, speakText } from './utils/soundEffects';

// Generated domain visual assets
import heroImage from './assets/images/hero_kindergarten_transpo_1792219203883.jpg';
import landScene from './assets/images/scene_land_transport_1792219204779.jpg';
import waterScene from './assets/images/scene_water_transport_1792219205555.jpg';
import airScene from './assets/images/scene_air_transport_1792219205750.jpg';
import rescueScene from './assets/images/scene_emergency_rescue_1792219204749.jpg';
import carPartsDiagram from './assets/images/car_parts_diagram_1792220975192.jpg';

interface HubCard {
  id: TranspoLabTab;
  title: string;
  subtitle: string;
  emoji: string;
  tag: string;
  colorBorder: string;
  image: string;
  description: string;
}

const HUB_CARDS: HubCard[] = [
  {
    id: 'sorting',
    title: 'Sort Land, Water & Air',
    subtitle: 'Core Transportation Classification',
    emoji: '🚦',
    tag: 'Classification Lab',
    colorBorder: 'border-emerald-300 hover:border-emerald-500',
    image: landScene,
    description: 'Inspect school buses, trains, sailboats, and airplanes, listen to their engines, and park them in their natural domains!',
  },
  {
    id: 'car-craft',
    title: 'Bagian Mobil & Kreasi Clay/Kertas',
    subtitle: 'Car Anatomy & 3D Model Craft Studio',
    emoji: '🚗',
    tag: 'Anatomi & Prakarya',
    colorBorder: 'border-amber-400 hover:border-amber-600',
    image: carPartsDiagram,
    description: 'Amati 6 bagian mobil (roda, bodi, lampu, kaca, setir, knalpot) dengan diagram & suara, lalu buat mobil dari plastisin atau kardus bekas!',
  },
  {
    id: 'sound-quiz',
    title: 'Mystery Sound Detective',
    subtitle: 'Audio Clues & Guessing Game',
    emoji: '🎧',
    tag: 'Sound Quiz',
    colorBorder: 'border-purple-300 hover:border-purple-500',
    image: airScene,
    description: 'Choo-choo! Wee-woo! Tooooot! Listen closely to the mystery vehicle sound, identify the machine, and classify where it travels!',
  },
  {
    id: 'rescue',
    title: 'Rescue Helper Dispatcher',
    subtitle: 'Community Helpers & Purpose',
    emoji: '🚨',
    tag: 'Emergency Rescue',
    colorBorder: 'border-rose-300 hover:border-rose-500',
    image: rescueScene,
    description: 'Answer emergency calls! Dispatch fire trucks, ambulances, police cars, and helicopters with the right tools to save the day!',
  },
  {
    id: 'drive',
    title: 'Drive, Sail & Fly Track',
    subtitle: 'Interactive Vehicle Physics',
    emoji: '🎮',
    tag: 'Driving Minigame',
    colorBorder: 'border-sky-300 hover:border-sky-500',
    image: waterScene,
    description: 'Take the driver’s seat of a school bus, sailboat, or jet plane! Press GO to accelerate, collect golden stars, and park at the station!',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TranspoLabTab | 'overview'>('overview');
  const [badges, setBadges] = useState<TransportBadge[]>(TRANSPORT_BADGES);
  const [isTeacherHubOpen, setIsTeacherHubOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isHandsOnModalOpen, setIsHandsOnModalOpen] = useState(false);

  const handleUnlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => (b.id === badgeId ? { ...b, unlocked: true } : b))
    );
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const handleSpeakWelcome = () => {
    soundManager.playPop(520);
    speakText(
      'Welcome to TranspoWorld! Let us learn all about Land, Water, and Air transportation! Which activity would you like to explore first?'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-900 font-sans">
      {/* Top Navigation Bar */}
      <TranspoTopBar
        activeTab={activeTab === 'overview' ? 'sorting' : activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenTeacherGuide={() => setIsTeacherHubOpen(true)}
        onOpenBadgeBook={() => setIsBadgeModalOpen(true)}
        onOpenHandsOn={() => setIsHandsOnModalOpen(true)}
        unlockedBadgesCount={unlockedCount}
        totalBadgesCount={badges.length}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* OVERVIEW / HOME VIEW */}
        {activeTab === 'overview' ? (
          <div className="space-y-10">
            
            {/* Hero Split Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Headlines & Actions */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                  <span>Kindergarten Science & Social Studies</span>
                  <span aria-hidden="true">·</span>
                  <span>Ages 4–6</span>
                  <span aria-hidden="true">·</span>
                  <span>Vehicle Classification</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 font-display tracking-tight leading-tight text-balance">
                  Classify, Sort & Explore Kinds of Transportation!
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                  Welcome to TranspoWorld! Discover how vehicles travel across <strong>Land roads</strong>, glide through <strong>Water waves</strong>, and soar high in the <strong>Air sky</strong>. Listen to real engine sounds, solve mystery audio quizzes, and help rescue workers!
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      soundManager.playCarHonk();
                      setActiveTab('sorting');
                    }}
                    className="px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-base shadow-sm hover:shadow-md transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap"
                  >
                    <span>Start Sorting Vehicles</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playCarHonk();
                      setActiveTab('car-craft');
                    }}
                    className="px-4 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap"
                  >
                    <span>🚗</span>
                    <span>Bedah Bagian Mobil & Prakarya</span>
                  </button>

                  <button
                    onClick={handleSpeakWelcome}
                    className="px-4 py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <Volume2 className="w-5 h-5 text-amber-700" />
                    <span>Read to Class</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playFanfare();
                      setIsHandsOnModalOpen(true);
                    }}
                    className="px-4 py-3.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 font-bold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>🎨</span>
                    <span>Aktivitas Praktis Siswa</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playPop(480);
                      setIsTeacherHubOpen(true);
                    }}
                    className="px-4 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>Teacher Lesson Plan</span>
                  </button>
                </div>

                {/* Pedagogical Feature Bullets */}
                <div className="flex items-center gap-4 pt-3 text-xs text-amber-900/70 border-t border-amber-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Land, Water & Air Domains
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Synthesized Engine Sounds
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Printable Captain Certificates
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Visual Artwork */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border-4 border-amber-200 shadow-md aspect-16/10 bg-amber-100 group">
                  <img
                    src={heroImage}
                    alt="Kindergarten students and cute animal friends exploring yellow school bus, red car, sailboat on river, and airplane in sky"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-xl shadow-xs text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>TranspoWorld Academy</span>
                  </div>
                </div>
              </div>

            </section>

            {/* 5 Interactive Transportation Hubs Grid */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    Choose an Activity
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display">
                    5 Kindergarten Learning Adventures & Craft Studio
                  </h2>
                </div>
                <span className="text-xs text-amber-900/70">
                  Tap any station to jump right in!
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {HUB_CARDS.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      soundManager.playPop(520);
                      setActiveTab(card.id);
                    }}
                    className={`bg-white rounded-3xl p-4 border-2 ${card.colorBorder} shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group`}
                  >
                    <div>
                      {/* Card Thumbnail */}
                      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-amber-100 mb-3 border border-amber-200/60">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl text-xs font-extrabold text-amber-950 shadow-xs flex items-center gap-1.5">
                          <span>{card.emoji}</span>
                          <span>{card.tag}</span>
                        </div>
                      </div>

                      <div className="px-1">
                        <span className="text-xs font-semibold text-slate-500 block">
                          {card.subtitle}
                        </span>
                        <h3 className="text-lg font-bold text-amber-950 font-display mt-0.5 group-hover:text-amber-700 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between px-1">
                      <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                        <span>Ages 4–6</span>
                        <span aria-hidden="true">·</span>
                        <span>Interactive</span>
                      </span>

                      <button className="px-3.5 py-1.5 rounded-xl bg-amber-600 group-hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs">
                        <span>Play Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick 3-Domain Reference strip for Kindergarten Students */}
            <section className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs">
              <div className="text-center max-w-xl mx-auto mb-6">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  Kindergarten Classification Guide
                </span>
                <h3 className="text-xl font-extrabold text-amber-950 font-display">
                  The Three Main Ways We Travel
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Land */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="text-4xl">🚗 🚂 🚌 🚲</div>
                  <h4 className="text-base font-extrabold text-emerald-950 font-display">1. Land Transport</h4>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Vehicles that roll on paved roads, dirt paths, or steel tracks using rubber wheels and heavy tires.
                  </p>
                </div>

                {/* Water */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
                  <div className="text-4xl">⛵ 🚢 🚤 🛶</div>
                  <h4 className="text-base font-extrabold text-blue-950 font-display">2. Water Transport</h4>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    Vehicles that float across rivers, lakes, and oceans with hollow hulls, sails, or underwater propellers.
                  </p>
                </div>

                {/* Air */}
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center space-y-2">
                  <div className="text-4xl">✈️ 🚁 🎈 🚀</div>
                  <h4 className="text-base font-extrabold text-sky-950 font-display">3. Air & Sky Transport</h4>
                  <p className="text-xs text-sky-900 leading-relaxed">
                    Vehicles that soar above the clouds using aerodynamic wings, spinning helicopter rotors, or hot air.
                  </p>
                </div>
              </div>
            </section>

          </div>
        ) : (
          /* ACTIVE LAB SANDBOX VIEW */
          <div className="space-y-6">
            
            {/* Back Navigation Bar */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  soundManager.playPop(380);
                  setActiveTab('overview');
                }}
                className="px-4 py-2 rounded-2xl bg-white hover:bg-amber-100/70 text-amber-950 border border-amber-200 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-2xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>All Activities</span>
              </button>

              <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                <span>TranspoWorld</span>
                <span aria-hidden="true">/</span>
                <span className="text-amber-900 font-bold capitalize">
                  {activeTab === 'sorting' && 'Classification Sorting'}
                  {activeTab === 'car-craft' && 'Bedah Bagian Mobil & Kreasi (Clay / Kertas)'}
                  {activeTab === 'sound-quiz' && 'Mystery Sound Detective'}
                  {activeTab === 'rescue' && 'Rescue Helper Dispatcher'}
                  {activeTab === 'drive' && 'Drive, Sail & Fly'}
                </span>
              </div>
            </div>

            {/* Render the selected activity */}
            <div>
              {activeTab === 'sorting' && (
                <ClassificationSortingLab
                  onUnlockBadge={handleUnlockBadge}
                  onOpenHandsOn={() => setIsHandsOnModalOpen(true)}
                  onOpenCarCraft={() => setActiveTab('car-craft')}
                />
              )}
              {activeTab === 'car-craft' && (
                <CarAnatomyCraftLab
                  onUnlockBadge={handleUnlockBadge}
                />
              )}
              {activeTab === 'sound-quiz' && (
                <MysterySoundQuiz
                  onUnlockBadge={handleUnlockBadge}
                  onOpenHandsOn={() => setIsHandsOnModalOpen(true)}
                />
              )}
              {activeTab === 'rescue' && (
                <RescueStationLab
                  onUnlockBadge={handleUnlockBadge}
                  onOpenHandsOn={() => setIsHandsOnModalOpen(true)}
                />
              )}
              {activeTab === 'drive' && (
                <DriveSimulatorLab
                  onUnlockBadge={handleUnlockBadge}
                  onOpenHandsOn={() => setIsHandsOnModalOpen(true)}
                />
              )}
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-amber-200/70 py-6 px-4 text-center text-xs text-amber-900/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-950 font-display">TranspoWorld</span>
            <span aria-hidden="true">·</span>
            <span>Kindergarten Transportation Classification (Ages 4–6)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundManager.playPop(480);
                setIsHandsOnModalOpen(true);
              }}
              className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
            >
              <span>🎨</span>
              <span>Aktivitas Praktis</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                soundManager.playPop(480);
                setIsTeacherHubOpen(true);
              }}
              className="text-amber-800 hover:text-amber-950 font-semibold"
            >
              Teacher Guide
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                soundManager.playChime();
                setIsBadgeModalOpen(true);
              }}
              className="text-amber-800 hover:text-amber-950 font-semibold"
            >
              Captain Badges ({unlockedCount}/{badges.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Teacher and Badge Modals */}
      <TeacherHubModal
        isOpen={isTeacherHubOpen}
        onClose={() => setIsTeacherHubOpen(false)}
      />

      <BadgeCollectorModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        badges={badges}
      />

      <HandsOnActivityModal
        isOpen={isHandsOnModalOpen}
        onClose={() => setIsHandsOnModalOpen(false)}
        activeLabId={activeTab === 'overview' ? 'sorting' : activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsHandsOnModalOpen(false);
        }}
      />

    </div>
  );
}
