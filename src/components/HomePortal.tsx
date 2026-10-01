import React from 'react';
import { ActiveView, Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUpRight } from 'lucide-react';

interface HomePortalProps {
  currentLang: Language;
  onNavigate: (view: ActiveView) => void;
  onOpenEvent: (eventId: string) => void;
}

export const HomePortal: React.FC<HomePortalProps> = ({
  currentLang,
  onNavigate,
  onOpenEvent,
}) => {
  const t = translations[currentLang];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-8 animate-in fade-in duration-300">
      {/* Top Banner: "A LA UNE - L'immanquable du moment" */}
      <div className="w-full bg-[#C9D48D] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs border border-[#B9C67B] transition-transform hover:shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase drop-shadow-xs">
              {t.aLaUne}
            </h2>
            <p className="mt-1 text-sm sm:text-base md:text-lg font-semibold text-[#DF6847]">
              {t.aLaUneSub}
            </p>
            <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#3B421E]">
              {t.featuredHeadline}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#4E5629] leading-relaxed">
              {t.featuredText}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenEvent('ev-17')}
              className="inline-flex items-center gap-2 bg-[#DF6847] hover:bg-[#BA4E30] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>{t.discover}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* The 4 Iconic Section Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {/* 1. LE MÉDIA */}
        <button
          onClick={() => onNavigate('media')}
          className="group relative flex flex-col justify-between bg-[#4A1E0E] text-[#FAF7EE] p-6 sm:p-8 rounded-3xl min-h-[310px] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-left cursor-pointer border border-[#3A160A]"
        >
          {/* Sketch Icon: Radio */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 text-white/90 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-current stroke-[2.2]">
              {/* Antenna */}
              <line x1="20" y1="20" x2="48" y2="4" strokeLinecap="round" />
              <circle cx="48" cy="4" r="2.5" fill="currentColor" />
              {/* Radio Body */}
              <rect x="8" y="20" width="84" height="54" rx="8" strokeWidth="2.5" />
              {/* Speaker Grill */}
              <circle cx="68" cy="47" r="16" strokeWidth="2.2" />
              <circle cx="68" cy="47" r="9" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="68" cy="47" r="3" fill="currentColor" />
              {/* Display / Tuner */}
              <rect x="18" y="28" width="30" height="15" rx="3" strokeWidth="1.8" />
              <line x1="22" y1="35" x2="44" y2="35" strokeWidth="1.5" />
              {/* Knobs */}
              <circle cx="23" cy="56" r="4" strokeWidth="1.8" />
              <circle cx="37" cy="56" r="4" strokeWidth="1.8" />
              {/* Feet */}
              <line x1="20" y1="74" x2="16" y2="80" strokeLinecap="round" />
              <line x1="80" y1="74" x2="84" y2="80" strokeLinecap="round" />
            </svg>
          </div>

          <div className="mt-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-black uppercase tracking-wide text-white group-hover:text-[#F9DE96] transition-colors">
              {t.mediaTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
              {t.mediaSub}
            </p>
          </div>

          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#F9DE96]">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </button>

        {/* 2. L'AGENDA */}
        <button
          onClick={() => onNavigate('agenda')}
          className="group relative flex flex-col justify-between bg-[#DF6847] text-white p-6 sm:p-8 rounded-3xl min-h-[310px] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-left cursor-pointer border border-[#C55738]"
        >
          {/* Sketch Icon: Calendar Pad */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 text-white/90 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-current stroke-[2.2]">
              {/* Spiral rings on top */}
              <path d="M22 14 C22 8, 28 8, 28 14" strokeLinecap="round" />
              <path d="M38 14 C38 8, 44 8, 44 14" strokeLinecap="round" />
              <path d="M54 14 C54 8, 60 8, 60 14" strokeLinecap="round" />
              <path d="M70 14 C70 8, 76 8, 76 14" strokeLinecap="round" />
              {/* Calendar pad */}
              <rect x="14" y="14" width="66" height="68" rx="7" strokeWidth="2.5" />
              <line x1="14" y1="28" x2="80" y2="28" strokeWidth="2" />
              {/* Date grid representation */}
              <g strokeWidth="1.2" opacity="0.85">
                <line x1="24" y1="38" x2="32" y2="38" />
                <line x1="42" y1="38" x2="50" y2="38" />
                <line x1="60" y1="38" x2="68" y2="38" />

                <line x1="24" y1="48" x2="32" y2="48" />
                <line x1="42" y1="48" x2="50" y2="48" />
                <line x1="60" y1="48" x2="68" y2="48" />

                <line x1="24" y1="58" x2="32" y2="58" />
                <line x1="42" y1="58" x2="50" y2="58" />
                <line x1="60" y1="58" x2="68" y2="58" />

                <line x1="24" y1="68" x2="32" y2="68" />
                <line x1="42" y1="68" x2="50" y2="68" />
              </g>
            </svg>
          </div>

          <div className="mt-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-black uppercase tracking-wide text-white group-hover:text-[#FCECD1] transition-colors">
              {t.agendaTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
              {t.agendaSub}
            </p>
          </div>

          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FCECD1]">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </button>

        {/* 3. L'ANNUAIRE */}
        <button
          onClick={() => onNavigate('annuaire')}
          className="group relative flex flex-col justify-between bg-[#284B3D] text-[#FAF7EE] p-6 sm:p-8 rounded-3xl min-h-[310px] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-left cursor-pointer border border-[#1E3B30]"
        >
          {/* Sketch Icon: Directory Notebook */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 text-white/90 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-current stroke-[2.2]">
              {/* Notebook spine */}
              <rect x="22" y="10" width="56" height="70" rx="6" strokeWidth="2.5" />
              {/* Binder tabs / spirals */}
              <line x1="14" y1="20" x2="22" y2="20" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="30" x2="22" y2="30" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="40" x2="22" y2="40" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="50" x2="22" y2="50" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="60" x2="22" y2="60" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="70" x2="22" y2="70" strokeWidth="2.5" strokeLinecap="round" />
              {/* User Avatar outline on cover */}
              <circle cx="50" cy="38" r="8" strokeWidth="2" />
              <path d="M38 58 C38 50, 62 50, 62 58" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div className="mt-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-black uppercase tracking-wide text-white group-hover:text-[#C9D48D] transition-colors">
              {t.annuaireTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
              {t.annuaireSub}
            </p>
          </div>

          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#C9D48D]">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </button>

        {/* 4. L'ESPACE AGIR */}
        <button
          onClick={() => onNavigate('agir')}
          className="group relative flex flex-col justify-between bg-[#F05727] text-white p-6 sm:p-8 rounded-3xl min-h-[310px] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-left cursor-pointer border border-[#D54519]"
        >
          {/* Sketch Icon: Megaphone */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 text-white/90 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-current stroke-[2.2]">
              {/* Megaphone Cone */}
              <polygon points="36,36 68,20 68,60 36,46" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Back cylinder */}
              <rect x="22" y="36" width="14" height="10" rx="3" strokeWidth="2" />
              {/* Handle */}
              <path d="M28 46 L24 64 L34 64 L34 46" strokeWidth="2" strokeLinejoin="round" />
              {/* Sound waves / sparkles */}
              <path d="M74 30 C78 34, 78 46, 74 50" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M80 24 C86 30, 86 50, 80 56" strokeWidth="2.2" strokeLinecap="round" />
              {/* Small star bursts */}
              <line x1="68" y1="12" x2="68" y2="16" strokeLinecap="round" />
              <line x1="82" y1="16" x2="79" y2="19" strokeLinecap="round" />
            </svg>
          </div>

          <div className="mt-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-black uppercase tracking-wide text-white group-hover:text-[#FDE68A] transition-colors">
              {t.agirTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
              {t.agirSub}
            </p>
          </div>

          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FDE68A]">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </button>
      </div>
    </div>
  );
};
