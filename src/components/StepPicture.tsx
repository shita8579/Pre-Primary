import React, { useState } from 'react';
import { ZoomIn, X, Check, Volume2 } from 'lucide-react';
import { soundManager, speakText } from '../utils/soundEffects';

export interface StepPictureProps {
  stepType:
    | 'clay-1'
    | 'clay-2'
    | 'clay-3'
    | 'clay-4'
    | 'paper-1'
    | 'paper-2'
    | 'paper-3'
    | 'paper-4'
    | 'sorting-1'
    | 'sorting-2'
    | 'sorting-3'
    | 'sorting-4'
    | 'sound-1'
    | 'sound-2'
    | 'sound-3'
    | 'sound-4'
    | 'rescue-1'
    | 'rescue-2'
    | 'rescue-3'
    | 'rescue-4'
    | 'drive-1'
    | 'drive-2'
    | 'drive-3'
    | 'drive-4'
    | 'car-craft-1'
    | 'car-craft-2'
    | 'car-craft-3'
    | 'car-craft-4'
    | 'car-craft-5';
  title: string;
  stepNumber: number;
  altText: string;
  aspect?: string;
  showZoomButton?: boolean;
}

export const StepPicture: React.FC<StepPictureProps> = ({
  stepType,
  title,
  stepNumber,
  altText,
  aspect = 'aspect-16/10',
  showZoomButton = true,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleOpenZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop(520);
    setIsZoomed(true);
  };

  const handleCloseZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop(380);
    setIsZoomed(false);
  };

  const renderIllustration = () => {
    switch (stepType) {
      /* ========================================================
         CLAY STEP 1: Siapkan 3 Warna Plastisin
         ======================================================== */
      case 'clay-1':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="c1-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>
              <linearGradient id="c1-mat" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="100%" stopColor="#6ee7b7" />
              </linearGradient>
              <radialGradient id="c1-red" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="70%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
              <radialGradient id="c1-black" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
              <radialGradient id="c1-yellow" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="70%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </radialGradient>
            </defs>
            {/* Background & Craft Mat */}
            <rect width="400" height="220" fill="url(#c1-bg)" />
            <rect x="25" y="45" width="350" height="155" rx="20" fill="url(#c1-mat)" stroke="#10b981" strokeWidth="2.5" />
            
            {/* Grid pattern on mat */}
            <line x1="25" y1="95" x2="375" y2="95" stroke="#34d399" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="25" y1="145" x2="375" y2="145" stroke="#34d399" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="140" y1="45" x2="140" y2="200" stroke="#34d399" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="260" y1="45" x2="260" y2="200" stroke="#34d399" strokeWidth="1" strokeDasharray="4 4" />

            {/* Clay 1: Big Red Body Clay */}
            <g transform="translate(85, 120)">
              <ellipse cx="0" cy="22" rx="42" ry="12" fill="#047857" opacity="0.25" />
              <path d="M-38,5 C-42,-25 -20,-45 0,-45 C22,-45 42,-25 38,5 C35,22 15,28 0,28 C-18,28 -35,22 -38,5 Z" fill="url(#c1-red)" stroke="#991b1b" strokeWidth="2.5" />
              <circle cx="-12" cy="-22" r="5" fill="#fecaca" opacity="0.6" />
              <rect x="-35" y="32" width="70" height="16" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
              <text x="0" y="43" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">Bodi (Merah)</text>
            </g>

            {/* Clay 2: 4 Black Balls for Wheels */}
            <g transform="translate(205, 120)">
              <ellipse cx="0" cy="22" rx="38" ry="10" fill="#047857" opacity="0.2" />
              <circle cx="-16" cy="-14" r="14" fill="url(#c1-black)" stroke="#0f172a" strokeWidth="2" />
              <circle cx="16" cy="-14" r="14" fill="url(#c1-black)" stroke="#0f172a" strokeWidth="2" />
              <circle cx="-10" cy="10" r="14" fill="url(#c1-black)" stroke="#0f172a" strokeWidth="2" />
              <circle cx="18" cy="10" r="14" fill="url(#c1-black)" stroke="#0f172a" strokeWidth="2" />
              <rect x="-38" y="32" width="76" height="16" rx="8" fill="#f1f5f9" stroke="#334155" strokeWidth="1.5" />
              <text x="0" y="43" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">4 Roda (Hitam)</text>
            </g>

            {/* Clay 3: Yellow & Light-Blue Bits for Lights/Glass */}
            <g transform="translate(315, 120)">
              <ellipse cx="0" cy="22" rx="30" ry="8" fill="#047857" opacity="0.2" />
              <circle cx="-12" cy="-8" r="11" fill="url(#c1-yellow)" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="12" cy="-8" r="11" fill="url(#c1-yellow)" stroke="#ca8a04" strokeWidth="2" />
              <rect x="-14" y="6" width="28" height="14" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <rect x="-32" y="32" width="64" height="16" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="0" y="43" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">Lampu & Kaca</text>
            </g>

            {/* Kindergarten Tool: Toothpick / Ruler */}
            <g transform="translate(330, 60) rotate(-25)">
              <rect x="0" y="0" width="45" height="4" rx="2" fill="#d97706" stroke="#92400e" strokeWidth="0.8" />
              <polygon points="45,0 52,2 45,4" fill="#fde68a" />
            </g>

            {/* Top Label Banner */}
            <rect x="25" y="10" width="160" height="26" rx="13" fill="#059669" />
            <text x="105" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
              LANGKAH 1: SIAPKAN CLAY
            </text>
          </svg>
        );

      /* ========================================================
         CLAY STEP 2: Bentuk Bodi Utama Mobil
         ======================================================== */
      case 'clay-2':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="c2-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>
              <linearGradient id="c2-clay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
            <rect width="400" height="220" fill="url(#c2-bg)" />
            {/* Table Surface */}
            <rect x="20" y="160" width="360" height="45" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Flat Table shadow */}
            <ellipse cx="200" cy="165" rx="110" ry="16" fill="#64748b" opacity="0.3" />

            {/* Sculpted Car Body Loaf */}
            <g transform="translate(200, 120)">
              {/* Main Body block */}
              <path
                d="M-90,35 L90,35 C95,35 100,30 98,22 L85,-5 C82,-12 75,-16 66,-16 L35,-16 C30,-32 15,-45 -8,-45 L-45,-45 C-60,-45 -72,-35 -78,-20 L-95,15 C-98,25 -96,35 -90,35 Z"
                fill="url(#c2-clay)"
                stroke="#991b1b"
                strokeWidth="4"
              />
              {/* Clay tactile dimples showing hand kneading */}
              <circle cx="-55" cy="-2" r="7" fill="#f87171" opacity="0.5" />
              <circle cx="10" cy="-22" r="9" fill="#f87171" opacity="0.4" />
              <circle cx="45" cy="5" r="8" fill="#f87171" opacity="0.5" />

              {/* Sloped hood highlight */}
              <path d="M40,-12 L80,-4" stroke="#fca5a5" strokeWidth="3" strokeLinecap="round" />
              {/* Flat bottom baseline indicator */}
              <line x1="-80" y1="36" x2="80" y2="36" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 3" />
            </g>

            {/* Hand Action Arrows: Pressing flat bottom & shaping roof */}
            <g transform="translate(195, 42)">
              <circle cx="0" cy="0" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fontSize="13">👇</text>
              <rect x="-45" y="18" width="90" height="15" rx="7" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <text x="0" y="29" textAnchor="middle" fill="#854d0e" fontSize="8" fontWeight="bold">Tekan Atap Halus</text>
            </g>

            <g transform="translate(305, 80)">
              <circle cx="0" cy="0" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fontSize="13">👉</text>
              <rect x="-40" y="18" width="80" height="15" rx="7" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <text x="0" y="29" textAnchor="middle" fill="#854d0e" fontSize="8" fontWeight="bold">Kap Miring Depan</text>
            </g>

            {/* Top Label */}
            <rect x="25" y="10" width="160" height="26" rx="13" fill="#059669" />
            <text x="105" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
              LANGKAH 2: BENTUK BODI
            </text>
          </svg>
        );

      /* ========================================================
         CLAY STEP 3: Bentuk & Pasang 4 Roda Bundar
         ======================================================== */
      case 'clay-3':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="c3-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>
              <radialGradient id="c3-wheel" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
            </defs>
            <rect width="400" height="220" fill="url(#c3-bg)" />
            {/* Table Surface */}
            <rect x="20" y="165" width="360" height="40" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />

            {/* Car body in background */}
            <g transform="translate(195, 115)">
              <ellipse cx="0" cy="50" rx="100" ry="12" fill="#64748b" opacity="0.3" />
              <path
                d="M-85,30 L85,30 C90,30 94,25 92,18 L80,-5 C77,-12 70,-15 62,-15 L32,-15 C28,-30 14,-42 -6,-42 L-40,-42 C-55,-42 -66,-32 -72,-18 L-88,12 C-92,22 -90,30 -85,30 Z"
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth="3.5"
              />

              {/* Rear Wheel attached */}
              <g transform="translate(-50, 30)">
                <circle cx="0" cy="0" r="24" fill="url(#c3-wheel)" stroke="#0f172a" strokeWidth="3" />
                <circle cx="0" cy="0" r="10" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                {/* Toothpick carved spokes */}
                <line x1="-18" y1="0" x2="18" y2="0" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="0" y1="-18" x2="0" y2="18" stroke="#cbd5e1" strokeWidth="2" />
              </g>

              {/* Front Wheel being attached with guide hands & motion */}
              <g transform="translate(50, 30)">
                <circle cx="0" cy="0" r="24" fill="url(#c3-wheel)" stroke="#0f172a" strokeWidth="3" />
                <circle cx="0" cy="0" r="10" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                <line x1="-18" y1="0" x2="18" y2="0" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="0" y1="-18" x2="0" y2="18" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="0" cy="0" r="28" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 4" />
              </g>
            </g>

            {/* Toothpick carving tool action */}
            <g transform="translate(290, 115) rotate(40)">
              <rect x="0" y="0" width="55" height="5" rx="2.5" fill="#d97706" stroke="#92400e" strokeWidth="1" />
              <polygon points="55,0 64,2.5 55,5" fill="#fde68a" />
              <text x="30" y="-8" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">Ukir Garis Velg</text>
            </g>

            {/* 4 Wheels Badge */}
            <g transform="translate(200, 35)">
              <rect x="-85" y="-14" width="170" height="28" rx="14" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                🛞 2 Roda Kiri + 2 Roda Kanan
              </text>
            </g>

            {/* Top Label */}
            <rect x="25" y="10" width="160" height="26" rx="13" fill="#059669" />
            <text x="105" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
              LANGKAH 3: PASANG RODA
            </text>
          </svg>
        );

      /* ========================================================
         CLAY STEP 4: Hias Kaca, Lampu & Wajah Ceria
         ======================================================== */
      case 'clay-4':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="c4-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>
              <linearGradient id="c4-light" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="400" height="220" fill="url(#c4-bg)" />
            {/* Table Surface */}
            <rect x="20" y="165" width="360" height="40" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />

            {/* Sparkles of celebration */}
            <text x="60" y="60" fontSize="20">✨</text>
            <text x="340" y="55" fontSize="22">⭐</text>
            <text x="320" y="130" fontSize="18">🎉</text>

            {/* Completed Cute Clay Car */}
            <g transform="translate(190, 115)">
              <ellipse cx="0" cy="50" rx="105" ry="14" fill="#64748b" opacity="0.3" />

              {/* Headlight Beams */}
              <polygon points="90,15 160,-10 160,40" fill="url(#c4-light)" />

              {/* Body */}
              <path
                d="M-85,30 L85,30 C90,30 94,25 92,18 L80,-5 C77,-12 70,-15 62,-15 L32,-15 C28,-30 14,-42 -6,-42 L-40,-42 C-55,-42 -66,-32 -72,-18 L-88,12 C-92,22 -90,30 -85,30 Z"
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth="3.5"
              />

              {/* Windshield & Side Windows (Light Blue) */}
              <path d="M5,-36 L26,-15 L-5,-15 L-5,-36 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <path d="M-10,-36 L-35,-36 L-48,-15 L-10,-15 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <line x1="12" y1="-30" x2="20" y2="-20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

              {/* Bright Yellow Headlight */}
              <circle cx="88" cy="15" r="9" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="86" cy="13" r="3" fill="#ffffff" />

              {/* Cute Smiling Mouth on front bumper */}
              <path d="M68,22 Q78,30 85,22" fill="none" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round" />

              {/* Wheels */}
              <g transform="translate(-48, 30)">
                <circle cx="0" cy="0" r="23" fill="#1e293b" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="9" fill="#94a3b8" />
              </g>
              <g transform="translate(48, 30)">
                <circle cx="0" cy="0" r="23" fill="#1e293b" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="9" fill="#94a3b8" />
              </g>

              {/* Steering wheel silhouette visible inside */}
              <ellipse cx="14" cy="-20" rx="5" ry="8" fill="none" stroke="#1e293b" strokeWidth="2" />
            </g>

            {/* Success Banner */}
            <g transform="translate(200, 35)">
              <rect x="-95" y="-15" width="190" height="30" rx="15" fill="#10b981" stroke="#047857" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                🚗 Selesai! Siap Meluncur!
              </text>
            </g>

            {/* Top Label */}
            <rect x="25" y="10" width="160" height="26" rx="13" fill="#059669" />
            <text x="105" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
              LANGKAH 4: KACA & LAMPU
            </text>
          </svg>
        );

      /* ========================================================
         PAPER STEP 1: Siapkan Kotak Bekas & 4 Tutup Botol
         ======================================================== */
      case 'paper-1':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p1-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0f9ff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
            </defs>
            <rect width="400" height="220" fill="url(#p1-bg)" />
            {/* Craft Table */}
            <rect x="20" y="55" width="360" height="145" rx="16" fill="#ffffff" stroke="#bae6fd" strokeWidth="2" />

            {/* Recycled Juice Box Carton */}
            <g transform="translate(100, 130)">
              <rect x="-35" y="-55" width="70" height="75" rx="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
              {/* Milk/Juice cartoon graphics */}
              <polygon points="-35,-55 0,-72 35,-55" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="0" cy="-15" r="16" fill="#f97316" />
              <text x="0" y="-10" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">JUS</text>
              <rect x="-42" y="28" width="84" height="16" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="0" y="39" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">Kotak Bekas</text>
            </g>

            {/* 4 Plastic Bottle Caps */}
            <g transform="translate(220, 130)">
              <circle cx="-20" cy="-30" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
              <circle cx="-20" cy="-30" r="11" fill="#f87171" />
              
              <circle cx="20" cy="-30" r="16" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
              <circle cx="20" cy="-30" r="11" fill="#60a5fa" />
              
              <circle cx="-20" cy="10" r="16" fill="#eab308" stroke="#a16207" strokeWidth="2.5" />
              <circle cx="-20" cy="10" r="11" fill="#fde047" />

              <circle cx="20" cy="10" r="16" fill="#10b981" stroke="#047857" strokeWidth="2.5" />
              <circle cx="20" cy="10" r="11" fill="#34d399" />

              <rect x="-45" y="30" width="90" height="16" rx="8" fill="#f1f5f9" stroke="#334155" strokeWidth="1.5" />
              <text x="0" y="41" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">4 Tutup Botol</text>
            </g>

            {/* Glue & Kids Safety Scissors */}
            <g transform="translate(325, 120)">
              {/* Glue Bottle */}
              <rect x="-24" y="-35" width="22" height="42" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
              <polygon points="-21,-35 -13,-48 -5,-35" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
              <rect x="-20" y="-18" width="14" height="16" fill="#38bdf8" />
              <text x="-13" y="-7" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">LEM</text>

              {/* Safety Scissors */}
              <g transform="translate(14, -10) rotate(-20)">
                <ellipse cx="-8" cy="18" rx="7" ry="10" fill="none" stroke="#ec4899" strokeWidth="3" />
                <ellipse cx="8" cy="18" rx="7" ry="10" fill="none" stroke="#ec4899" strokeWidth="3" />
                <line x1="-5" y1="10" x2="8" y2="-22" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="5" y1="10" x2="-8" y2="-22" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
              </g>

              <rect x="-35" y="40" width="70" height="16" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
              <text x="0" y="51" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="bold">Lem & Gunting</text>
            </g>

            {/* Top Label */}
            <rect x="25" y="10" width="165" height="26" rx="13" fill="#0284c7" />
            <text x="107" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
              LANGKAH 1: KOTAK & TUTUP
            </text>
          </svg>
        );

      /* ========================================================
         PAPER STEP 2: Bungkus Kotak dengan Kertas Warna
         ======================================================== */
      case 'paper-2':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p2-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0f9ff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
            </defs>
            <rect width="400" height="220" fill="url(#p2-bg)" />
            {/* Craft Table */}
            <rect x="20" y="160" width="360" height="45" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />

            {/* Wrapping Origami Paper (Folded around box) */}
            <g transform="translate(195, 115)">
              <ellipse cx="0" cy="50" rx="110" ry="14" fill="#64748b" opacity="0.25" />
              
              {/* Outer wrapped color layer (Bright Red Origami) */}
              <rect x="-85" y="-40" width="170" height="75" rx="12" fill="#ef4444" stroke="#dc2626" strokeWidth="3" />
              
              {/* Fold lines showing neatly wrapped gift style */}
              <line x1="-85" y1="-40" x2="-45" y2="35" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="85" y1="-40" x2="45" y2="35" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="-85" y1="0" x2="85" y2="0" stroke="#fca5a5" strokeWidth="1.5" />

              {/* Tape / Glue stickers */}
              <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#fef08a" opacity="0.85" stroke="#ca8a04" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fill="#854d0e" fontSize="8" fontWeight="bold">LEM / ISOLASI</text>
            </g>

            {/* Glue drops indicator */}
            <g transform="translate(100, 75)">
              <circle cx="0" cy="0" r="14" fill="#38bdf8" />
              <text x="0" y="5" textAnchor="middle" fontSize="13">🧴</text>
              <rect x="-35" y="18" width="70" height="15" rx="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
              <text x="0" y="29" textAnchor="middle" fill="#0369a1" fontSize="8" fontWeight="bold">Oleskan Lem</text>
            </g>

            {/* Fold direction arrow */}
            <g transform="translate(300, 75)">
              <circle cx="0" cy="0" r="14" fill="#fbbf24" />
              <text x="0" y="5" textAnchor="middle" fontSize="13">📐</text>
              <rect x="-42" y="18" width="84" height="15" rx="7" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <text x="0" y="29" textAnchor="middle" fill="#854d0e" fontSize="8" fontWeight="bold">Lipat Ujung Rapi</text>
            </g>

            {/* Top Label */}
            <rect x="25" y="10" width="165" height="26" rx="13" fill="#0284c7" />
            <text x="107" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
              LANGKAH 2: BUNGKUS KOTAK
            </text>
          </svg>
        );

      /* ========================================================
         PAPER STEP 3: Pasang 4 Tutup Botol Sebagai Roda
         ======================================================== */
      case 'paper-3':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p3-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0f9ff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
            </defs>
            <rect width="400" height="220" fill="url(#p3-bg)" />
            {/* Table Surface */}
            <rect x="20" y="165" width="360" height="40" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />

            {/* Box with Straw Axles & Bottle Cap Wheels */}
            <g transform="translate(195, 115)">
              <ellipse cx="0" cy="50" rx="110" ry="12" fill="#64748b" opacity="0.3" />

              {/* Red wrapped box */}
              <rect x="-85" y="-35" width="170" height="65" rx="10" fill="#ef4444" stroke="#dc2626" strokeWidth="3" />

              {/* Straw axle tube beneath */}
              <rect x="-65" y="18" width="130" height="8" rx="4" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
              <text x="0" y="25" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">SEDOTAN GANDAR</text>

              {/* Rear Wheel (Bottle Cap) */}
              <g transform="translate(-55, 28)">
                <circle cx="0" cy="0" r="22" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
                <circle cx="0" cy="0" r="14" fill="#60a5fa" />
                <circle cx="0" cy="0" r="4" fill="#f8fafc" />
                {/* Toothpick axle pin */}
                <circle cx="0" cy="0" r="2" fill="#d97706" />
              </g>

              {/* Front Wheel (Bottle Cap) with rolling animation arrows */}
              <g transform="translate(55, 28)">
                <circle cx="0" cy="0" r="22" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
                <circle cx="0" cy="0" r="14" fill="#60a5fa" />
                <circle cx="0" cy="0" r="4" fill="#f8fafc" />
                <circle cx="0" cy="0" r="2" fill="#d97706" />
                {/* Rotating motion circle */}
                <circle cx="0" cy="0" r="26" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
              </g>
            </g>

            {/* Teacher tip banner */}
            <g transform="translate(200, 35)">
              <rect x="-105" y="-14" width="210" height="28" rx="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
              <text x="0" y="4" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">
                💡 Tusuk gigi & sedotan bikin roda berputar!
              </text>
            </g>

            {/* Top Label */}
            <rect x="25" y="10" width="165" height="26" rx="13" fill="#0284c7" />
            <text x="107" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
              LANGKAH 3: PASANG TUTUP BOTOL
            </text>
          </svg>
        );

      /* ========================================================
         PAPER STEP 4: Gunting & Tempel Jendela serta Lampu
         ======================================================== */
      case 'paper-4':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p4-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0f9ff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <linearGradient id="p4-beam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="400" height="220" fill="url(#p4-bg)" />
            {/* Table Surface */}
            <rect x="20" y="165" width="360" height="40" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />

            {/* Sparkles */}
            <text x="50" y="55" fontSize="20">✨</text>
            <text x="345" y="60" fontSize="22">🏁</text>

            {/* Completed Box Car */}
            <g transform="translate(190, 115)">
              <ellipse cx="0" cy="50" rx="110" ry="12" fill="#64748b" opacity="0.3" />

              {/* Headlight beam */}
              <polygon points="85,5 155,-15 155,30" fill="url(#p4-beam)" />

              {/* Main Box Car */}
              <rect x="-85" y="-35" width="170" height="65" rx="10" fill="#ef4444" stroke="#dc2626" strokeWidth="3" />

              {/* Window with happy kid driver waving */}
              <rect x="10" y="-25" width="45" height="30" rx="5" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
              {/* Smiling Kid */}
              <circle cx="32" cy="-10" r="8" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
              <circle cx="29" cy="-12" r="1.5" fill="#1e293b" />
              <circle cx="35" cy="-12" r="1.5" fill="#1e293b" />
              <path d="M30,-8 Q32,-5 35,-8" fill="none" stroke="#b45309" strokeWidth="1.2" />
              {/* Waving hand */}
              <text x="44" y="-8" fontSize="9">👋</text>

              {/* Rear Window */}
              <rect x="-65" y="-25" width="40" height="30" rx="5" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />

              {/* Racing Number 1 sticker */}
              <circle cx="-15" cy="5" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
              <text x="-15" y="10" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="900">1</text>

              {/* Front Yellow Headlight */}
              <circle cx="85" cy="10" r="9" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="83" cy="8" r="3" fill="#ffffff" />

              {/* Straw Exhaust at the back */}
              <rect x="-95" y="18" width="16" height="5" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1" />
              <text x="-105" y="24" fontSize="10">💨</text>

              {/* Wheels */}
              <g transform="translate(-52, 28)">
                <circle cx="0" cy="0" r="22" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="14" fill="#60a5fa" />
                <circle cx="0" cy="0" r="4" fill="#ffffff" />
              </g>
              <g transform="translate(52, 28)">
                <circle cx="0" cy="0" r="22" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="14" fill="#60a5fa" />
                <circle cx="0" cy="0" r="4" fill="#ffffff" />
              </g>
            </g>

            {/* Success Banner */}
            <g transform="translate(200, 35)">
              <rect x="-95" y="-15" width="190" height="30" rx="15" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                🧃 Mobil Kertas Siap Balapan!
              </text>
            </g>

            {/* Top Label */}
            <rect x="25" y="10" width="165" height="26" rx="13" fill="#0284c7" />
            <text x="107" y="27" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
              LANGKAH 4: JENDELA & LAMPU
            </text>
          </svg>
        );

      /* ========================================================
         HANDS-ON SORTING STEPS
         ======================================================== */
      case 'sorting-1':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#f8fafc" />
            <text x="200" y="30" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">
              3 Zona Karpet: Darat, Air & Udara
            </text>
            {/* 3 Zones */}
            <g transform="translate(30, 45)">
              {/* Land */}
              <rect x="0" y="0" width="105" height="145" rx="14" fill="#fed7aa" stroke="#f97316" strokeWidth="2.5" />
              <rect x="15" y="15" width="75" height="115" rx="10" fill="#475569" />
              <line x1="52" y1="20" x2="52" y2="125" stroke="#fde047" strokeWidth="3" strokeDasharray="8 6" />
              <text x="52" y="140" textAnchor="middle" fill="#9a3412" fontSize="11" fontWeight="bold">🛣️ Jalan Darat</text>
            </g>
            <g transform="translate(148, 45)">
              {/* Water */}
              <rect x="0" y="0" width="105" height="145" rx="14" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
              <path d="M15,40 Q30,30 45,40 T75,40 T90,40" fill="none" stroke="#0284c7" strokeWidth="3" />
              <path d="M15,70 Q30,60 45,70 T75,70 T90,70" fill="none" stroke="#0284c7" strokeWidth="3" />
              <path d="M15,100 Q30,90 45,100 T75,100 T90,100" fill="none" stroke="#0284c7" strokeWidth="3" />
              <text x="52" y="140" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">🌊 Air Laut</text>
            </g>
            <g transform="translate(265, 45)">
              {/* Air */}
              <rect x="0" y="0" width="105" height="145" rx="14" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2.5" />
              <path d="M30,55 Q40,40 55,45 Q70,35 80,50 Q85,65 70,68 L35,68 Z" fill="#ffffff" stroke="#818cf8" strokeWidth="1.5" />
              <path d="M20,95 Q30,80 45,85 Q60,75 70,90 Q75,105 60,108 L25,108 Z" fill="#ffffff" stroke="#818cf8" strokeWidth="1.5" />
              <text x="52" y="140" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">☁️ Udara Langit</text>
            </g>
          </svg>
        );

      case 'sorting-2':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#f8fafc" />
            <text x="200" y="30" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">
              Keranjang Kendaraan Campur
            </text>
            {/* Basket */}
            <g transform="translate(200, 120)">
              <ellipse cx="0" cy="50" rx="90" ry="16" fill="#cbd5e1" opacity="0.4" />
              <path d="M-80,-20 L-60,50 L60,50 L80,-20 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
              <line x1="-70" y1="-5" x2="70" y2="-5" stroke="#b45309" strokeWidth="1.5" />
              <line x1="-65" y1="20" x2="65" y2="20" stroke="#b45309" strokeWidth="1.5" />
              {/* Vehicles peeking */}
              <text x="-40" y="-15" fontSize="26">🚗</text>
              <text x="-5" y="-30" fontSize="30">✈️</text>
              <text x="35" y="-12" fontSize="26">🚢</text>
              <text x="-20" y="10" fontSize="22">🚌</text>
              <text x="20" y="12" fontSize="22">🚁</text>
            </g>
            <rect x="130" y="185" width="140" height="24" rx="12" fill="#f59e0b" />
            <text x="200" y="201" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              Ambil Satu per Satu!
            </text>
          </svg>
        );

      case 'sorting-3':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#f8fafc" />
            <text x="200" y="30" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">
              Siswa Menaruh Kendaraan di Zona Tepat
            </text>
            {/* Hand placing toy car on road */}
            <g transform="translate(100, 110)">
              <rect x="-60" y="-30" width="120" height="70" rx="10" fill="#475569" stroke="#334155" strokeWidth="2" />
              <line x1="-50" y1="5" x2="50" y2="5" stroke="#facc15" strokeWidth="2" strokeDasharray="5 4" />
              <text x="0" y="0" textAnchor="middle" fontSize="30">🚗</text>
              <circle cx="35" cy="-20" r="12" fill="#10b981" />
              <text x="35" y="-12" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">✓</text>
            </g>
            <g transform="translate(290, 110)">
              <rect x="-60" y="-30" width="120" height="70" rx="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
              <path d="M-45,15 Q-20,5 0,15 T45,15" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <text x="0" y="0" textAnchor="middle" fontSize="30">🚢</text>
              <circle cx="35" cy="-20" r="12" fill="#10b981" />
              <text x="35" y="-12" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">✓</text>
            </g>
          </svg>
        );

      case 'sorting-4':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#ecfdf5" />
            <text x="200" y="35" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="900">
              Hebat! Tepuk Tangan & Bintang Emas!
            </text>
            <g transform="translate(200, 110)">
              <circle cx="0" cy="0" r="50" fill="#fef08a" stroke="#eab308" strokeWidth="4" />
              <polygon points="0,-35 11,-12 35,-12 16,3 23,26 0,12 -23,26 -16,3 -35,-12 -11,-12" fill="#eab308" />
              <text x="-70" y="10" fontSize="28">👏</text>
              <text x="50" y="10" fontSize="28">👏</text>
            </g>
            <rect x="110" y="175" width="180" height="28" rx="14" fill="#059669" />
            <text x="200" y="194" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              Semua Kendaraan Tepat Tempat!
            </text>
          </svg>
        );

      /* ========================================================
         HANDS-ON MYSTERY SOUND STEPS
         ======================================================== */
      case 'sound-1':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#fdf4ff" />
            <text x="200" y="30" textAnchor="middle" fill="#86198f" fontSize="13" fontWeight="bold">
              Kotak Rahasia Berisi Suara Misteri
            </text>
            <g transform="translate(90, 110)">
              <rect x="-35" y="-40" width="70" height="80" rx="10" fill="#f5d0fe" stroke="#c026d3" strokeWidth="2.5" />
              <text x="0" y="5" textAnchor="middle" fill="#86198f" fontSize="28" fontWeight="bold">❓</text>
              <text x="0" y="32" textAnchor="middle" fontSize="14">🎵</text>
            </g>
            <g transform="translate(200, 110)">
              <rect x="-35" y="-40" width="70" height="80" rx="10" fill="#f5d0fe" stroke="#c026d3" strokeWidth="2.5" />
              <text x="0" y="5" textAnchor="middle" fill="#86198f" fontSize="28" fontWeight="bold">❓</text>
              <text x="0" y="32" textAnchor="middle" fontSize="14">🔔</text>
            </g>
            <g transform="translate(310, 110)">
              <rect x="-35" y="-40" width="70" height="80" rx="10" fill="#f5d0fe" stroke="#c026d3" strokeWidth="2.5" />
              <text x="0" y="5" textAnchor="middle" fill="#86198f" fontSize="28" fontWeight="bold">❓</text>
              <text x="0" y="32" textAnchor="middle" fontSize="14">🔊</text>
            </g>
          </svg>
        );

      case 'sound-2':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#fdf4ff" />
            <text x="200" y="30" textAnchor="middle" fill="#86198f" fontSize="13" fontWeight="bold">
              Tutup Mata & Pasang Telinga Detektif!
            </text>
            <g transform="translate(200, 115)">
              <circle cx="0" cy="0" r="45" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
              {/* Fun Blindfold */}
              <rect x="-42" y="-12" width="84" height="24" rx="10" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">DETEKTIF</text>
              {/* Big smiling mouth */}
              <path d="M-15,18 Q0,30 15,18" fill="none" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              {/* Big ears listening to sound waves */}
              <path d="M55,-10 Q70,0 55,10" fill="none" stroke="#c026d3" strokeWidth="3" />
              <path d="M65,-20 Q85,0 65,20" fill="none" stroke="#c026d3" strokeWidth="2.5" />
            </g>
          </svg>
        );

      case 'sound-3':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#fdf4ff" />
            <text x="200" y="30" textAnchor="middle" fill="#86198f" fontSize="13" fontWeight="bold">
              Angkat Kartu Kendaraan yang Tepat!
            </text>
            <g transform="translate(200, 115)">
              {/* Flashcard held up */}
              <rect x="-60" y="-55" width="120" height="85" rx="10" fill="#ffffff" stroke="#c026d3" strokeWidth="3" />
              <text x="0" y="-10" textAnchor="middle" fontSize="36">🚒</text>
              <rect x="-50" y="10" width="100" height="15" rx="5" fill="#fee2e2" />
              <text x="0" y="21" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Mobil Pemadam!</text>
              <circle cx="45" cy="-40" r="14" fill="#10b981" />
              <text x="45" y="-30" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">✓</text>
            </g>
          </svg>
        );

      case 'sound-4':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#fdf4ff" />
            <text x="200" y="30" textAnchor="middle" fill="#86198f" fontSize="13" fontWeight="bold">
              Tirukan Suara Kendaraan Bersama Teman!
            </text>
            <g transform="translate(130, 115)">
              <circle cx="0" cy="0" r="35" fill="#fed7aa" stroke="#f97316" strokeWidth="2.5" />
              <text x="0" y="8" textAnchor="middle" fontSize="24">🗣️</text>
              <rect x="-45" y="42" width="90" height="18" rx="9" fill="#f97316" />
              <text x="0" y="55" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">"Ninu-ninu! 🚨"</text>
            </g>
            <g transform="translate(270, 115)">
              <circle cx="0" cy="0" r="35" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2.5" />
              <text x="0" y="8" textAnchor="middle" fontSize="24">🗣️</text>
              <rect x="-45" y="42" width="90" height="18" rx="9" fill="#16a34a" />
              <text x="0" y="55" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">"Tuut-tuut! 🚂"</text>
            </g>
          </svg>
        );

      /* ========================================================
         HANDS-ON EMERGENCY RESCUE STEPS
         ======================================================== */
      case 'rescue-1':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#fff1f2" />
            <text x="200" y="30" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="bold">
              Pilih Peran: Pemadam, Ambulans, atau Polisi
            </text>
            <g transform="translate(80, 110)">
              <circle cx="0" cy="-10" r="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
              <text x="0" y="2" textAnchor="middle" fontSize="28">🚒</text>
              <text x="0" y="35" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">Pemadam Api</text>
            </g>
            <g transform="translate(200, 110)">
              <circle cx="0" cy="-10" r="30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <text x="0" y="2" textAnchor="middle" fontSize="28">🚑</text>
              <text x="0" y="35" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">Ambulans Medis</text>
            </g>
            <g transform="translate(320, 110)">
              <circle cx="0" cy="-10" r="30" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
              <text x="0" y="2" textAnchor="middle" fontSize="28">🚓</text>
              <text x="0" y="35" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">Polisi Penolong</text>
            </g>
          </svg>
        );

      case 'rescue-2':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#fff1f2" />
            <text x="200" y="30" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="bold">
              Rintangan Jalan: Kerucut & Jalur Penyelamatan
            </text>
            <g transform="translate(100, 110)">
              {/* Traffic Cone */}
              <polygon points="0,-35 -25,25 25,25" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              <polygon points="-8,-5 8,-5 12,6 -12,6" fill="#ffffff" />
              <rect x="-30" y="25" width="60" height="8" rx="2" fill="#ea580c" />
            </g>
            <g transform="translate(200, 110)">
              <polygon points="0,-35 -25,25 25,25" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              <polygon points="-8,-5 8,-5 12,6 -12,6" fill="#ffffff" />
              <rect x="-30" y="25" width="60" height="8" rx="2" fill="#ea580c" />
            </g>
            <g transform="translate(300, 110)">
              <polygon points="0,-35 -25,25 25,25" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              <polygon points="-8,-5 8,-5 12,6 -12,6" fill="#ffffff" />
              <rect x="-30" y="25" width="60" height="8" rx="2" fill="#ea580c" />
            </g>
            <path d="M50,155 Q100,125 150,155 T250,155 T350,155" fill="none" stroke="#e11d48" strokeWidth="3" strokeDasharray="6 4" />
          </svg>
        );

      case 'rescue-3':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#fff1f2" />
            <text x="200" y="30" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="bold">
              Memegang Setir Kardus & Mengemudi Tertib
            </text>
            <g transform="translate(200, 115)">
              <circle cx="0" cy="0" r="50" fill="#fef3c7" stroke="#b45309" strokeWidth="6" />
              <circle cx="0" cy="0" r="14" fill="#d97706" />
              <line x1="-50" y1="0" x2="50" y2="0" stroke="#b45309" strokeWidth="6" />
              <line x1="0" y1="0" x2="0" y2="50" stroke="#b45309" strokeWidth="6" />
              {/* Kids hands steering */}
              <text x="-65" y="10" fontSize="24">✊</text>
              <text x="45" y="10" fontSize="24">✊</text>
            </g>
          </svg>
        );

      case 'rescue-4':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#fff1f2" />
            <text x="200" y="30" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="bold">
              Tolong Boneka, Beri Perban & Bawa ke Posko
            </text>
            <g transform="translate(200, 110)">
              <circle cx="0" cy="0" r="38" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
              <text x="0" y="8" textAnchor="middle" fontSize="28">🐶</text>
              {/* Cute bandage */}
              <rect x="-18" y="-5" width="36" height="10" rx="3" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="0" y="3" textAnchor="middle" fill="#e11d48" fontSize="8" fontWeight="bold">➕ PERBAN</text>
            </g>
            <rect x="120" y="170" width="160" height="26" rx="13" fill="#e11d48" />
            <text x="200" y="187" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              ❤️ Selamat dan Sembuh!
            </text>
          </svg>
        );

      /* ========================================================
         HANDS-ON SAILBOAT & RAMP STEPS
         ======================================================== */
      case 'drive-1':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#eff6ff" />
            <text x="200" y="30" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">
              Rakit Perahu Spons & Layar Kertas
            </text>
            <g transform="translate(200, 120)">
              {/* Sponge base */}
              <rect x="-55" y="10" width="110" height="28" rx="6" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
              {/* Sponge pores */}
              <circle cx="-35" cy="20" r="3" fill="#eab308" opacity="0.6" />
              <circle cx="10" cy="24" r="2.5" fill="#eab308" opacity="0.6" />
              <circle cx="35" cy="18" r="3" fill="#eab308" opacity="0.6" />
              {/* Toothpick Mast */}
              <line x1="0" y1="12" x2="0" y2="-45" stroke="#78350f" strokeWidth="3" />
              {/* Triangle Sail */}
              <polygon points="0,-42 45,-15 0,-15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
            </g>
          </svg>
        );

      case 'drive-2':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#eff6ff" />
            <text x="200" y="30" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">
              Apungkan di Baskom Air (Spons Mengapung!)
            </text>
            <g transform="translate(200, 125)">
              {/* Water Basin */}
              <ellipse cx="0" cy="30" rx="130" ry="25" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
              <path d="M-130,30 C-130,65 130,65 130,30 Z" fill="#0284c7" opacity="0.4" />
              {/* Floating Sponge Sailboat */}
              <g transform="translate(-10, 10)">
                <rect x="-40" y="5" width="80" height="20" rx="5" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                <line x1="0" y1="5" x2="0" y2="-35" stroke="#78350f" strokeWidth="2.5" />
                <polygon points="0,-32 35,-10 0,-10" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
              </g>
            </g>
          </svg>
        );

      case 'drive-3':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#eff6ff" />
            <text x="200" y="30" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">
              Tiup Layar Menggunakan Sedotan Minuman!
            </text>
            {/* Child with straw blowing wind */}
            <g transform="translate(80, 115)">
              <circle cx="0" cy="0" r="30" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
              <rect x="25" y="-3" width="70" height="8" rx="4" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
              <text x="-40" y="5" textAnchor="middle" fontSize="14">💨</text>
            </g>
            {/* Wind curves */}
            <path d="M180,105 Q210,95 240,110" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="5 3" />
            <path d="M185,120 Q215,110 245,125" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="5 3" />
            {/* Boat sailing forward */}
            <g transform="translate(280, 115)">
              <rect x="-35" y="8" width="70" height="18" rx="4" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
              <line x1="0" y1="8" x2="0" y2="-30" stroke="#78350f" strokeWidth="2" />
              <polygon points="0,-28 30,-8 0,-8" fill="#ef4444" />
              <text x="40" y="15" fontSize="14">⏩</text>
            </g>
          </svg>
        );

      case 'drive-4':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#eff6ff" />
            <text x="200" y="30" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">
              Luncurkan Mobil Mainan di Papan Luncur!
            </text>
            {/* Slanted Cardboard Ramp */}
            <g transform="translate(60, 140)">
              {/* Stack of books */}
              <rect x="0" y="-50" width="55" height="50" rx="3" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              {/* Ramp board */}
              <polygon points="45,-50 250,5 245,15 40,-40" fill="#d97706" stroke="#92400e" strokeWidth="2" />
              {/* Toy Car rolling down */}
              <g transform="translate(130, -25) rotate(14)">
                <rect x="-20" y="-12" width="40" height="16" rx="4" fill="#ef4444" />
                <circle cx="-12" cy="5" r="6" fill="#0f172a" />
                <circle cx="12" cy="5" r="6" fill="#0f172a" />
              </g>
              <text x="210" y="5" fontSize="16">💨</text>
            </g>
          </svg>
        );

      /* ========================================================
         HANDS-ON CAR CRAFT (MODAL) STEPS
         ======================================================== */
      case 'car-craft-1':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#ecfdf5" />
            <text x="200" y="30" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">
              Amati 6 Bagian Mobil: Roda, Bodi, Kaca, Lampu & Setir
            </text>
            <g transform="translate(200, 115)">
              <rect x="-80" y="-30" width="160" height="60" rx="10" fill="#ef4444" stroke="#dc2626" strokeWidth="3" />
              <rect x="-30" y="-22" width="60" height="25" rx="5" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
              <circle cx="-50" cy="30" r="20" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
              <circle cx="50" cy="30" r="20" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
              <circle cx="78" cy="5" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            </g>
            <text x="80" y="70" fontSize="11" fontWeight="bold" fill="#065f46">🪟 Kaca</text>
            <text x="310" y="100" fontSize="11" fontWeight="bold" fill="#065f46">💡 Lampu</text>
            <text x="140" y="195" fontSize="11" fontWeight="bold" fill="#065f46">🛞 Roda Karet</text>
          </svg>
        );

      case 'car-craft-2':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#ecfdf5" />
            <text x="200" y="30" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">
              Pilih: Plastisin Empuk atau Kotak Bekas Kertas
            </text>
            <g transform="translate(120, 115)">
              <circle cx="0" cy="0" r="42" fill="#fed7aa" stroke="#f97316" strokeWidth="3" />
              <text x="0" y="10" textAnchor="middle" fontSize="32">🟢</text>
              <text x="0" y="38" textAnchor="middle" fill="#9a3412" fontSize="10" fontWeight="bold">Plastisin (Clay)</text>
            </g>
            <g transform="translate(280, 115)">
              <circle cx="0" cy="0" r="42" fill="#bae6fd" stroke="#0284c7" strokeWidth="3" />
              <text x="0" y="10" textAnchor="middle" fontSize="32">🧃</text>
              <text x="0" y="38" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">Kotak & Tutup Botol</text>
            </g>
          </svg>
        );

      case 'car-craft-3':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#ecfdf5" />
            <text x="200" y="30" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">
              Bentuk Bodi Utama dan 4 Roda Bundar
            </text>
            <g transform="translate(200, 115)">
              <rect x="-80" y="-30" width="160" height="55" rx="10" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
              <circle cx="-50" cy="25" r="22" fill="#0f172a" stroke="#334155" strokeWidth="3" />
              <circle cx="50" cy="25" r="22" fill="#0f172a" stroke="#334155" strokeWidth="3" />
              <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Bodi & Roda Siap</text>
            </g>
          </svg>
        );

      case 'car-craft-4':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#ecfdf5" />
            <text x="200" y="30" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">
              Pasang Kaca, Lampu Sorot & Setir Kemudi
            </text>
            <g transform="translate(200, 115)">
              <rect x="-80" y="-30" width="160" height="55" rx="10" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
              <rect x="-25" y="-22" width="50" height="22" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <circle cx="75" cy="5" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="-50" cy="25" r="20" fill="#0f172a" />
              <circle cx="50" cy="25" r="20" fill="#0f172a" />
              {/* Steer */}
              <ellipse cx="10" cy="-12" rx="5" ry="7" fill="none" stroke="#1e293b" strokeWidth="2" />
            </g>
          </svg>
        );

      case 'car-craft-5':
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="220" fill="#ecfdf5" />
            <text x="200" y="30" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="bold">
              🎉 Uji Coba Meluncur di Karpet Jalan Kelas!
            </text>
            <g transform="translate(200, 115)">
              <rect x="-80" y="-30" width="160" height="55" rx="10" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
              <circle cx="-50" cy="25" r="22" fill="#0f172a" />
              <circle cx="50" cy="25" r="22" fill="#0f172a" />
              <circle cx="75" cy="5" r="8" fill="#facc15" />
              <text x="-95" y="15" fontSize="18">💨</text>
              <text x="95" y="15" fontSize="18">💨</text>
            </g>
            <rect x="110" y="170" width="180" height="28" rx="14" fill="#059669" />
            <text x="200" y="188" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              "Tin-tin! Vrooom!" 🚗💨
            </text>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
            <span>Gambar Langkah {stepNumber}</span>
          </div>
        );
    }
  };

  return (
    <>
      <div className={`relative overflow-hidden rounded-xl border border-slate-200/80 bg-white group/pic ${aspect} shadow-2xs`}>
        {renderIllustration()}

        {/* Step Badge Overlay */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] font-black text-white flex items-center gap-1">
          <span>Langkah {stepNumber}</span>
        </div>

        {/* Zoom In Button for Teachers and Kids */}
        {showZoomButton && (
          <button
            type="button"
            onClick={handleOpenZoom}
            className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 shadow-sm opacity-90 group-hover/pic:opacity-100 transition-all flex items-center gap-1 text-[11px] font-bold"
            title="Perbesar gambar langkah ini"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px]">Perbesar</span>
          </button>
        )}
      </div>

      {/* Big Modal Zoom for Classroom Display */}
      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          onClick={handleCloseZoom}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-emerald-400 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black">
                  Langkah {stepNumber}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                  {title}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCloseZoom}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Tutup tampilan gambar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Area */}
            <div className="w-full aspect-16/10 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner bg-slate-50">
              {renderIllustration()}
            </div>

            {/* Description & Speak Button */}
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {altText}
              </p>
              <button
                type="button"
                onClick={() => {
                  soundManager.playPop(520);
                  speakText(altText);
                }}
                className="shrink-0 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 text-xs font-bold transition-all"
                title="Dengarkan penjelasan gambar"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">Dengarkan</span>
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleCloseZoom}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold"
              >
                Tutup Gambar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
