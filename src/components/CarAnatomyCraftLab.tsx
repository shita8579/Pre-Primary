import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Printer, Sparkles, CheckCircle2, Check, ArrowRight, Play, Wrench, Scissors, Palette, Compass, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAR_PARTS, CLAY_CRAFT_STEPS, PAPER_CRAFT_STEPS, CarPart } from '../data/carCraftContent';
import { soundManager, speakText } from '../utils/soundEffects';
import { StepPicture } from './StepPicture';

// Generated image assets
import carPartsDiagram from '../assets/images/car_parts_diagram_1792220975192.jpg';
import clayCraftImg from '../assets/images/clay_car_craft_steps_1792220976568.jpg';
import paperCraftImg from '../assets/images/paper_car_craft_steps_1792220977114.jpg';

interface CarAnatomyCraftLabProps {
  onUnlockBadge?: (badgeId: string) => void;
}

export const CarAnatomyCraftLab: React.FC<CarAnatomyCraftLabProps> = ({ onUnlockBadge }) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('wheels');
  const [craftMode, setCraftMode] = useState<'clay' | 'paper'>('clay');
  const [completedClaySteps, setCompletedClaySteps] = useState<number[]>([]);
  const [completedPaperSteps, setCompletedPaperSteps] = useState<number[]>([]);
  const [isFinishedCrafting, setIsFinishedCrafting] = useState<boolean>(false);
  const [lang, setLang] = useState<'id' | 'en'>('id'); // Default Indonesian for Ms. Rosita

  const selectedPart = CAR_PARTS.find((p) => p.id === selectedPartId) || CAR_PARTS[0];

  const handleSelectPart = (part: CarPart) => {
    setSelectedPartId(part.id);
    if (part.soundType === 'honk') {
      soundManager.playCarHonk();
    } else if (part.soundType === 'engine') {
      soundManager.playPop(520);
    } else {
      soundManager.playBicycleBell();
    }

    const speechText =
      lang === 'id'
        ? `${part.nameId}. ${part.functionId} Untuk membuatnya dengan ${craftMode === 'clay' ? 'plastisin' : 'kertas'}: ${
            craftMode === 'clay' ? part.clayMethodId : part.paperMethodId
          }`
        : `${part.name}. ${part.functionEn} Craft tip: ${
            craftMode === 'clay' ? part.clayMethodEn : part.paperMethodEn
          }`;

    speakText(speechText);
  };

  const handleToggleStep = (stepNumber: number) => {
    soundManager.playPop(580);
    if (craftMode === 'clay') {
      setCompletedClaySteps((prev) => {
        const next = prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber];
        if (next.length === CLAY_CRAFT_STEPS.length) {
          triggerSuccess();
        }
        return next;
      });
    } else {
      setCompletedPaperSteps((prev) => {
        const next = prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber];
        if (next.length === PAPER_CRAFT_STEPS.length) {
          triggerSuccess();
        }
        return next;
      });
    }
  };

  const triggerSuccess = () => {
    setIsFinishedCrafting(true);
    soundManager.playFanfare();
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
    });
    onUnlockBadge?.('badge-car-craft');
    onUnlockBadge?.('badge-allstar');
    speakText(
      lang === 'id'
        ? 'Luar biasa! Kamu adalah Arsitek Mobil Cilik yang hebat! Mobil buatanmu sudah selesai!'
        : 'Awesome! You are a brilliant Little Car Architect! Your handmade car is complete!'
    );
  };

  const handlePrint = () => {
    soundManager.playPop(520);
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>{lang === 'id' ? 'Sains Kendaraan & Prakarya TK' : 'Vehicle Science & Classroom Craft'}</span>
            <span aria-hidden="true">·</span>
            <span>Ages 4–6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mt-0.5">
            {lang === 'id' ? 'Mengenal Bagian Mobil & Kreasi Clay / Kertas' : 'Car Anatomy & DIY Craft Studio'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex items-center bg-amber-100/70 p-1 rounded-xl border border-amber-200">
            <button
              onClick={() => {
                soundManager.playPop(420);
                setLang('id');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'id' ? 'bg-white text-amber-950 shadow-xs' : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              🇮🇩 Indonesia
            </button>
            <button
              onClick={() => {
                soundManager.playPop(480);
                setLang('en');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-white text-amber-950 shadow-xs' : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              🇬🇧 English
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'id' ? 'Cetak Pola & Panduan' : 'Print Craft Guide'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE CAR ANATOMY EXPLORER */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
              {lang === 'id' ? 'Langkah 1: Amati Bagian-Bagian Mobil' : 'Step 1: Inspect the Parts of a Car'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-display">
              {lang === 'id' ? 'Sentuh Setiap Bagian Mobil untuk Mengetahui Fungsinya!' : 'Tap Any Car Part to Inspect and Hear Its Purpose!'}
            </h2>
          </div>
          <span className="text-xs text-amber-900/80">
            {lang === 'id' ? '6 Bagian Utama' : '6 Core Anatomical Parts'}
          </span>
        </div>

        {/* 2-Zone Layout: Left diagram visual, Right inspection & craft tips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Diagram Visual with Hotspot buttons */}
          <div className="lg:col-span-7 bg-amber-50/50 rounded-2xl p-4 border border-amber-200/80 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md aspect-16/9 bg-white">
              <img
                src={carPartsDiagram}
                alt="Diagram Bagian Mobil Ceria: Roda, Bodi, Lampu, Kaca, Setir"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />

              {/* Labeled callout banner overlay */}
              <div className="absolute bottom-2.5 inset-x-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-amber-200 flex items-center justify-between">
                <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                  <span>{selectedPart.emoji}</span>
                  <span>{lang === 'id' ? selectedPart.nameId : selectedPart.name}</span>
                </span>
                <span className="text-[11px] font-bold text-amber-700">
                  {lang === 'id' ? 'Terpilih' : 'Selected'}
                </span>
              </div>
            </div>

            {/* Quick Part Selector Badges / Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4">
              {CAR_PARTS.map((part) => {
                const isSelected = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part)}
                    className={`p-2 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group ${
                      isSelected
                        ? 'border-amber-500 bg-amber-100 shadow-xs ring-2 ring-amber-300'
                        : 'border-slate-200 bg-white hover:bg-amber-50'
                    }`}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {part.emoji}
                    </span>
                    <span className="text-[10px] font-bold text-slate-800 truncate block w-full">
                      {lang === 'id' ? part.nameId.split(' ')[0] : part.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Inspection & Crafting Advice Deck */}
          <div className="lg:col-span-5 bg-gradient-to-b from-amber-50/60 to-white rounded-2xl p-6 border border-amber-200 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider">
                  {lang === 'id' ? 'Detail Bagian Mobil' : 'Selected Part Details'}
                </span>

                <button
                  onClick={() => {
                    if (selectedPart.soundType === 'honk') soundManager.playCarHonk();
                    else soundManager.playPop(520);
                  }}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{lang === 'id' ? 'Bunyi' : 'Sound'}</span>
                </button>
              </div>

              {/* Spotlight Part Title */}
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl">{selectedPart.emoji}</span>
                  <h3 className="text-lg font-black text-amber-950 font-display">
                    {lang === 'id' ? selectedPart.nameId : selectedPart.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {lang === 'id' ? selectedPart.functionId : selectedPart.functionEn}
                </p>
              </div>

              {/* How to craft this part with Clay */}
              <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-950">
                  <Palette className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{lang === 'id' ? 'Cara Bentuk dengan Clay / Plastisin:' : 'How to Shape with Clay:'}</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {lang === 'id' ? selectedPart.clayMethodId : selectedPart.clayMethodEn}
                </p>
              </div>

              {/* How to craft this part with Paper */}
              <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-sky-950">
                  <Scissors className="w-3.5 h-3.5 text-sky-700" />
                  <span>{lang === 'id' ? 'Cara Buat dengan Kertas & Kotak Bekas:' : 'How to Make with Paper & Box:'}</span>
                </div>
                <p className="text-xs text-sky-900 leading-relaxed">
                  {lang === 'id' ? selectedPart.paperMethodId : selectedPart.paperMethodEn}
                </p>
              </div>

            </div>

            {/* Read Aloud Button */}
            <button
              onClick={() => {
                const text =
                  lang === 'id'
                    ? `${selectedPart.nameId}. ${selectedPart.functionId} Cara membuat dengan plastisin: ${selectedPart.clayMethodId}`
                    : `${selectedPart.name}. ${selectedPart.functionEn} Clay guide: ${selectedPart.clayMethodEn}`;
                soundManager.playPop(480);
                speakText(text);
              }}
              className="mt-4 w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-xl border border-amber-300 transition-colors flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>{lang === 'id' ? 'Dengarkan Penjelasan Suara' : 'Listen to Voice Explanation'}</span>
            </button>
          </div>

        </div>

      </section>

      {/* SECTION 2: HANDS-ON CLASSROOM CRAFTING WORKSHOP */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
        
        {/* Section Header with Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
              {lang === 'id' ? 'Langkah 2: Prakarya Nyata di Kelas' : 'Step 2: Hands-On Classroom Crafting'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-display mt-0.5">
              {lang === 'id' ? 'Pilih Bahan Prakarya Mobilmu:' : 'Choose Your Vehicle Craft Medium:'}
            </h2>
          </div>

          {/* 2 Big Choice Tabs: Clay vs Paper */}
          <div className="flex items-center gap-2 bg-amber-100/70 p-1.5 rounded-2xl border border-amber-200">
            <button
              onClick={() => {
                soundManager.playPop(520);
                setCraftMode('clay');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                craftMode === 'clay'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-white/60'
              }`}
            >
              <span>🟢</span>
              <span>{lang === 'id' ? 'Plastisin / Clay' : 'Playdough / Clay'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playPop(540);
                setCraftMode('paper');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                craftMode === 'paper'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-white/60'
              }`}
            >
              <span>✂️</span>
              <span>{lang === 'id' ? 'Kertas & Kotak Bekas' : 'Paper & Recycled Box'}</span>
            </button>
          </div>
        </div>

        {/* CRAFTING STAGE: CLAY MODE */}
        {craftMode === 'clay' && (
          <div className="space-y-6">
            
            {/* Visual Classroom Setup Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-emerald-50/60 rounded-3xl p-5 border border-emerald-200">
              <div className="md:col-span-5 rounded-2xl overflow-hidden border-2 border-emerald-300 aspect-4/3 shadow-sm">
                <img
                  src={clayCraftImg}
                  alt="Anak TK membuat mobil dari plastisin di meja kelas"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-7 space-y-2.5">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  {lang === 'id' ? 'Bahan yang Diperlukan di Kelas' : 'Materials Needed at Classroom Table'}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-emerald-950 font-display">
                  {lang === 'id' ? 'Membuat Mobil Plastisin 3 Dimensi' : '3D Playdough Car Sculpting'}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {lang === 'id'
                    ? 'Aktivitas motorik halus yang melatih koordinasi jemari tangan anak saat meremas, menggulung, memipihkan roda, dan merangkai bagian mobil.'
                    : 'Fine-motor tactile sculpting that strengthens hand muscles through squeezing, rolling round wheels, and assembling car parts.'}
                </p>

                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 font-bold text-emerald-900">
                    🟢 Plastisin Warna (Merah / Biru)
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 font-bold text-emerald-900">
                    ⚫ Plastisin Hitam (4 Roda)
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 font-bold text-emerald-900">
                    🟡 Plastisin Kuning (Lampu)
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 font-bold text-emerald-900">
                    🥢 Tusuk Gigi Tumpul / Penggaris
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Steps Checklist Cards for Clay */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                {lang === 'id' ? 'Langkah Pembuatan Mobil Clay (Centang saat selesai):' : 'Clay Crafting Steps (Check off as you build):'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CLAY_CRAFT_STEPS.map((step) => {
                  const isDone = completedClaySteps.includes(step.step);

                  return (
                    <div
                      key={step.step}
                      onClick={() => handleToggleStep(step.step)}
                      className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-xs ${
                        isDone
                          ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{step.emoji}</span>
                          <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                            {lang === 'id' ? `Langkah ${step.step}` : `Step ${step.step}`}
                          </span>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                            isDone
                              ? 'bg-emerald-600 border-emerald-700 text-white'
                              : 'border-slate-300 bg-white group-hover:border-emerald-400'
                          }`}
                        >
                          {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>

                      {/* Step Picture Visual Illustration */}
                      <div className="w-full">
                        <StepPicture
                          stepType={step.stepType}
                          title={lang === 'id' ? step.titleId : step.titleEn}
                          stepNumber={step.step}
                          altText={step.imageAltId}
                          aspect="aspect-16/9"
                        />
                      </div>

                      <div>
                        <h5 className="text-sm font-black text-slate-900 font-display">
                          {lang === 'id' ? step.titleId : step.titleEn}
                        </h5>
                        <p className="text-xs text-slate-700 leading-relaxed mt-1 font-medium">
                          {lang === 'id' ? step.instructionId : step.instructionEn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-emerald-200/50 flex items-center justify-between text-[11px] text-emerald-900/80">
                        <span className="italic">💡 {step.tipId}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playPop(480);
                            speakText(lang === 'id' ? step.instructionId : step.instructionEn);
                          }}
                          className="p-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                          title="Dengarkan suara"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* CRAFTING STAGE: PAPER & BOX MODE */}
        {craftMode === 'paper' && (
          <div className="space-y-6">
            
            {/* Visual Classroom Setup Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-sky-50/60 rounded-3xl p-5 border border-sky-200">
              <div className="md:col-span-5 rounded-2xl overflow-hidden border-2 border-sky-300 aspect-4/3 shadow-sm">
                <img
                  src={paperCraftImg}
                  alt="Mobil kertas dari kotak susu daur ulang dan tutup botol di meja prakarya"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-7 space-y-2.5">
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
                  {lang === 'id' ? 'Bahan Daur Ulang Ramah Lingkungan' : 'Recycled Classroom Materials'}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-sky-950 font-display">
                  {lang === 'id' ? 'Membuat Mobil dari Kotak Bekas & Kertas Warna' : 'Paper & Juice Box Car Assembly'}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {lang === 'id'
                    ? 'Mengajarkan konsep daur ulang sejak dini. Mengubah kotak susu bekas dan tutup botol plastik menjadi mobil mainan yang bisa berjalan!'
                    : 'Teaches environmental recycling by transforming empty juice boxes and plastic bottle caps into rolling, steerable toy cars!'}
                </p>

                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-sky-200 font-bold text-sky-900">
                    🧃 Kotak Jus / Susu Bekas
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-sky-200 font-bold text-sky-900">
                    🟡 4 Tutup Botol Plastik (Roda)
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-sky-200 font-bold text-sky-900">
                    📄 Kertas Lipat Origami Warna
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-sky-200 font-bold text-sky-900">
                    🧴 Lem Kertas & Gunting Anak
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Steps Checklist Cards for Paper */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                {lang === 'id' ? 'Langkah Pembuatan Mobil Kertas (Centang saat selesai):' : 'Paper Crafting Steps (Check off as you build):'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PAPER_CRAFT_STEPS.map((step) => {
                  const isDone = completedPaperSteps.includes(step.step);

                  return (
                    <div
                      key={step.step}
                      onClick={() => handleToggleStep(step.step)}
                      className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-xs ${
                        isDone
                          ? 'bg-sky-100/70 border-sky-400 text-sky-950 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{step.emoji}</span>
                          <span className="text-xs font-black text-sky-800 uppercase tracking-wide">
                            {lang === 'id' ? `Langkah ${step.step}` : `Step ${step.step}`}
                          </span>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                            isDone
                              ? 'bg-sky-600 border-sky-700 text-white'
                              : 'border-slate-300 bg-white group-hover:border-sky-400'
                          }`}
                        >
                          {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>

                      {/* Step Picture Visual Illustration */}
                      <div className="w-full">
                        <StepPicture
                          stepType={step.stepType}
                          title={lang === 'id' ? step.titleId : step.titleEn}
                          stepNumber={step.step}
                          altText={step.imageAltId}
                          aspect="aspect-16/9"
                        />
                      </div>

                      <div>
                        <h5 className="text-sm font-black text-slate-900 font-display">
                          {lang === 'id' ? step.titleId : step.titleEn}
                        </h5>
                        <p className="text-xs text-slate-700 leading-relaxed mt-1 font-medium">
                          {lang === 'id' ? step.instructionId : step.instructionEn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-sky-200/50 flex items-center justify-between text-[11px] text-sky-900/80">
                        <span className="italic">💡 {step.tipId}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playPop(480);
                            speakText(lang === 'id' ? step.instructionId : step.instructionEn);
                          }}
                          className="p-1 rounded-md bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors"
                          title="Dengarkan suara"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Completion & Certification Banner */}
        <div className="mt-6 pt-4 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-extrabold text-amber-950 font-display">
              {lang === 'id' ? 'Sudah Selesai Membuat Mobil di Meja Kelas?' : 'Finished Crafting Your Car in Class?'}
            </h4>
            <p className="text-xs text-slate-600">
              {lang === 'id'
                ? 'Tekan tombol untuk merayakan hasil karyamu dan menerima lencana Arsitek Mobil Cilik!'
                : 'Tap to celebrate your creation and earn the Little Car Architect badge!'}
            </p>
          </div>

          <button
            onClick={triggerSuccess}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>🌟</span>
            <span>{lang === 'id' ? 'Mobil Saya Sudah Jadi! 🏁' : 'My Car is Ready! 🏁'}</span>
          </button>
        </div>

      </section>

      {/* Classroom Teacher Pedagogy Tip */}
      <div className="bg-amber-100/60 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
        <Compass className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950">
          <span className="font-bold">Tips Pembelajaran untuk Guru TK (Ms. Rosita):</span>{' '}
          Saat siswa membuat roda mobil dari plastisin atau tutup botol, ajak mereka mencoba menggelindingkan bentuk bundar vs bentuk kotak di atas meja.
          Tanyakan: <em>"Mengapa roda mobil harus berbentuk bundar, bukan kotak?"</em>
          Ini adalah fondasi fisika awal mengenai rotasi dan gaya gesek!
        </div>
      </div>
    </div>
  );
};
