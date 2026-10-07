import React, { useState } from 'react';
import { Language, ActiveView, User } from '../types';
import { translations } from '../data/translations';
import { Compass, Globe, ChevronDown, User as UserIcon, Shield, LogOut, Building } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  activeView,
  onNavigate,
  currentUser,
  onLogout,
}) => {
  const t = translations[currentLang];
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
        {/* Brand Lockup (No 'retour à l'accueil' button as requested) */}
        <div className="flex items-center gap-3">
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

        {/* Actions, Auth & Language Switcher (Order: Compass | Language | Auth/Account) */}
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

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setUserMenuOpen(false);
              }}
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

          {/* Auth / Account Button (Placed next to Boussole and Langue) */}
          <div className="relative">
            {currentUser ? (
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setLangMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-[#FAF7EE] bg-[#284B3D] hover:bg-[#1E392E] rounded-full transition-all cursor-pointer shadow-xs"
              >
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-[#F9DE96]" />
                ) : currentUser.role === 'association' ? (
                  <Building className="w-3.5 h-3.5 text-[#F9DE96]" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-[#F9DE96]" />
                )}
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#FAF7EE] bg-[#4A1E0E] hover:bg-[#DF6847] rounded-full transition-all cursor-pointer shadow-xs"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Connexion / Inscription</span>
              </button>
            )}

            {/* User Profile Dropdown Menu */}
            {userMenuOpen && currentUser && (
              <div className="absolute right-0 mt-1.5 w-52 bg-[#FAF7EE] border border-[#284B3D] rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-[#E7DECD] bg-[#F2EBD9] rounded-xl">
                  <div className="font-bold text-xs text-[#4A1E0E] truncate">{currentUser.name}</div>
                  <div className="text-[10px] text-[#786E5D] truncate">{currentUser.email}</div>
                  <div className="mt-1">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-[#DF6847] text-white">
                      {currentUser.role === 'admin'
                        ? 'Administrateur'
                        : currentUser.role === 'association'
                        ? 'Association'
                        : 'Habitant'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigate('myAccount');
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#4A1E0E] hover:bg-[#F2EBD9] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-[#284B3D]" />
                  <span>Mon Compte</span>
                </button>

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#4A1E0E] hover:bg-[#F2EBD9] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-[#DF6847]" />
                    <span>Espace Administration</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onLogout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-700 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer border-t border-[#E7DECD]"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

