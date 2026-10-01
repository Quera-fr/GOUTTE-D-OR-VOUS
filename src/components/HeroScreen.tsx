import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight } from 'lucide-react';

interface HeroScreenProps {
  currentLang: Language;
  onExplore: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({ currentLang, onExplore }) => {
  const t = translations[currentLang];

  return (
    <div className="relative w-full h-[calc(100vh-61px)] min-h-[600px] flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden select-none">
      {/* Background Image with warm atmospheric overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_gouttedor_festival_1790867630234.jpg"
          alt="Fête de quartier à la Goutte d’Or"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
        />
        {/* Subtle vintage warm tint gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/50" />
      </div>

      {/* Top spacing */}
      <div className="z-10 w-full" />

      {/* Main Title & Compass Rose Center */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl px-4 py-8 animate-in fade-in zoom-in-95 duration-500">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-wide uppercase drop-shadow-md">
          Goutte d’Or & Vous
        </h1>

        <p className="mt-2 sm:mt-4 text-xl sm:text-2xl md:text-3xl text-white/95 font-medium tracking-normal drop-shadow-sm font-sans">
          {t.tagline}
        </p>

        {/* CTA Button "Explorez ici" */}
        <div className="mt-8 mb-6">
          <button
            onClick={onExplore}
            className="group inline-flex items-center gap-2.5 bg-[#DF6847] hover:bg-[#BA4E30] text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-[#F39C82]/30"
          >
            <span>{t.exploreHere}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Stylized Compass ("La boussole") SVG Icon */}
        <div className="mt-2 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 text-white/90 animate-pulse hover:text-white transition-colors cursor-pointer" onClick={onExplore} title={t.exploreHere}>
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
            {/* Outer rings */}
            <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Top crown / knob for pocket watch compass style */}
            <path d="M85 10 C85 4, 115 4, 115 10" stroke="currentColor" strokeWidth="3" fill="none" />
            <rect x="88" y="10" width="24" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />

            {/* Degree ticks */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const x1 = 100 + 82 * Math.cos(rad);
              const y1 = 100 + 82 * Math.sin(rad);
              const x2 = 100 + 77 * Math.cos(rad);
              const y2 = 100 + 77 * Math.sin(rad);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={i % 4 === 0 ? "2" : "1"} />;
            })}

            {/* 8-pointed Compass Rose Star */}
            {/* Cardinal points */}
            <polygon points="100,18 107,93 100,100" fill="currentColor" opacity="0.95" />
            <polygon points="100,18 93,93 100,100" fill="currentColor" opacity="0.4" />
            
            <polygon points="100,182 93,107 100,100" fill="currentColor" opacity="0.95" />
            <polygon points="100,182 107,107 100,100" fill="currentColor" opacity="0.4" />

            <polygon points="182,100 107,107 100,100" fill="currentColor" opacity="0.95" />
            <polygon points="182,100 107,93 100,100" fill="currentColor" opacity="0.4" />

            <polygon points="18,100 93,93 100,100" fill="currentColor" opacity="0.95" />
            <polygon points="18,100 93,107 100,100" fill="currentColor" opacity="0.4" />

            {/* Intercardinal points */}
            <polygon points="158,42 105,95 100,100" fill="currentColor" opacity="0.8" />
            <polygon points="158,42 98,98 100,100" fill="currentColor" opacity="0.3" />

            <polygon points="42,158 95,105 100,100" fill="currentColor" opacity="0.8" />
            <polygon points="42,158 102,102 100,100" fill="currentColor" opacity="0.3" />

            <polygon points="158,158 98,102 100,100" fill="currentColor" opacity="0.8" />
            <polygon points="158,158 102,98 100,100" fill="currentColor" opacity="0.3" />

            <polygon points="42,42 102,98 100,100" fill="currentColor" opacity="0.8" />
            <polygon points="42,42 98,102 100,100" fill="currentColor" opacity="0.3" />

            {/* Central hub circles */}
            <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Footer attribution */}
      <div className="z-10 w-full flex justify-end">
        <div className="bg-black/40 backdrop-blur-xs text-white/90 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
          {t.projectBy}
        </div>
      </div>
    </div>
  );
};
