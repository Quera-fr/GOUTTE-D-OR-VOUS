import React, { useState } from 'react';
import { Language, ActiveView } from '../types';
import { translations } from '../data/translations';
import { Compass, Globe, ChevronDown, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  activeView,
  onNavigate,
}) => {
  const t = translations[currentLang];
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'Anglais' },
    { code: 'ar', label: 'Arabe' },
    { code: 'uk', label: 'Ukrainien' },
    { code: 'ps', label: 'Pashto' },
  ];

  return (
    <header className="w-full bg-[#FAF7EE] border-b border-[#E7DECD] sticky top-0 z-40 px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          {activeView !== 'home' && activeView !== 'hero' && (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#4A1E0E] hover:text-[#DF6847] bg-[#F2EBD9] hover:bg-[#EBE2CD] px-3 py-1.5 rounded-full transition-colors cursor-pointer mr-1"
              title={t.backToHome}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            {/* Stamp Logo Badge */}
            <div className="relative flex flex-col items-center justify-center bg-[#DF6847] text-[#FAF7EE] px-2.5 py-1 rounded-md shadow-xs transition-transform group-hover:scale-105 border border-[#B94E31]">
              <span className="text-[10px] font-bold tracking-tight uppercase leading-none">Goutte</span>
              <div className="flex items-center gap-0.5 leading-none">
                <span className="text-[9px] text-[#F9DE96] font-black">&</span>
                <span className="text-[10px] font-black tracking-tighter">D'OR</span>
              </div>
              <span className="text-[10px] font-bold tracking-tight uppercase leading-none">Vous</span>
            </div>

            <div>
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#4A1E0E] group-hover:text-[#DF6847] transition-colors block leading-tight">
                {t.appName}
              </span>
              <span className="text-[11px] text-[#786E5D] tracking-wide block leading-none">
                {t.tagline}
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Quick Links on larger screens */}
        {activeView !== 'hero' && (
          <nav className="hidden lg:flex items-center gap-1 bg-[#F2EBD9] p-1 rounded-full border border-[#E4D9C3]">
            <button
              onClick={() => onNavigate('media')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeView === 'media'
                  ? 'bg-[#4A1E0E] text-[#FAF7EE] shadow-xs'
                  : 'text-[#5C5042] hover:text-[#4A1E0E]'
              }`}
            >
              {t.mediaTitle}
            </button>
            <button
              onClick={() => onNavigate('agenda')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeView === 'agenda'
                  ? 'bg-[#DF6847] text-white shadow-xs'
                  : 'text-[#5C5042] hover:text-[#DF6847]'
              }`}
            >
              {t.agendaTitle}
            </button>
            <button
              onClick={() => onNavigate('annuaire')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeView === 'annuaire'
                  ? 'bg-[#284B3D] text-[#FAF7EE] shadow-xs'
                  : 'text-[#5C5042] hover:text-[#284B3D]'
              }`}
            >
              {t.annuaireTitle}
            </button>
            <button
              onClick={() => onNavigate('agir')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeView === 'agir'
                  ? 'bg-[#F05727] text-white shadow-xs'
                  : 'text-[#5C5042] hover:text-[#F05727]'
              }`}
            >
              {t.agirTitle}
            </button>
          </nav>
        )}

        {/* Actions & Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Compass / Hero view toggle */}
          <button
            onClick={() => onNavigate(activeView === 'hero' ? 'home' : 'hero')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#5C5042] hover:text-[#4A1E0E] bg-[#F2EBD9] hover:bg-[#EBE2CD] rounded-full transition-colors cursor-pointer"
            title={activeView === 'hero' ? t.backToHome : t.backToHero}
          >
            <Compass className="w-4 h-4 text-[#DF6847]" />
            <span className="hidden sm:inline">
              {activeView === 'hero' ? t.backToHome : 'Boussole'}
            </span>
          </button>

          {/* Language Selector Dropdown matching Mockup */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#4A1E0E] bg-[#FAF7EE] hover:bg-[#F2EBD9] border border-[#DF6847] rounded-full transition-all cursor-pointer shadow-2xs"
              aria-expanded={langMenuOpen}
              aria-label="Sélectionner la langue"
            >
              <Globe className="w-3.5 h-3.5 text-[#DF6847]" />
              <span>{languages.find((l) => l.code === currentLang)?.label || 'Français'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#DF6847] transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-[#FAF7EE] border border-[#DF6847] rounded-2xl shadow-lg p-1.5 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`text-left px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-[#DF6847] text-white'
                        : 'text-[#4A1E0E] hover:bg-[#F2EBD9]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
