import React, { useState } from 'react';
import { DirectoryCategory, DirectoryStructure, Language } from '../types';
import { translations } from '../data/translations';
import { mockDirectoryStructures } from '../data/mockData';
import {
  Activity,
  Drama,
  Baby,
  GraduationCap,
  Trophy,
  Home,
  MapPin,
  Clock,
  Phone,
  Mail,
  Plus,
  ArrowLeft,
  X,
  Layers,
} from 'lucide-react';

interface DirectoryViewProps {
  currentLang: Language;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory>('all');
  const [activePin, setActivePin] = useState<DirectoryStructure | null>(null);
  const [fullSheetStructure, setFullSheetStructure] = useState<DirectoryStructure | null>(null);

  const categories: { id: DirectoryCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.allCategories, icon: <Layers className="w-4 h-4" /> },
    { id: 'sante', label: t.catSante, icon: <Activity className="w-4 h-4" /> },
    { id: 'culture', label: t.catCulture, icon: <Drama className="w-4 h-4" /> },
    { id: 'jeunesse', label: t.catJeunesse, icon: <Baby className="w-4 h-4" /> },
    { id: 'education', label: t.catEducation, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'sport', label: t.catSport, icon: <Trophy className="w-4 h-4" /> },
    { id: 'maison_assoc', label: t.catMaisonAssoc, icon: <Home className="w-4 h-4" /> },
  ];

  const filteredStructures = mockDirectoryStructures.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const getCategoryIcon = (cat: DirectoryCategory) => {
    switch (cat) {
      case 'sante':
        return <Activity className="w-4 h-4 text-rose-500" />;
      case 'culture':
        return <Drama className="w-4 h-4 text-amber-600" />;
      case 'jeunesse':
        return <Baby className="w-4 h-4 text-emerald-600" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-blue-600" />;
      case 'sport':
        return <Trophy className="w-4 h-4 text-orange-600" />;
      case 'maison_assoc':
        return <Home className="w-4 h-4 text-purple-600" />;
      default:
        return <MapPin className="w-4 h-4 text-[#DF6847]" />;
    }
  };

  // If Full Sheet View is opened (matching Mockup Page 13)
  if (fullSheetStructure) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6 flex flex-col gap-6 animate-in fade-in duration-300">
        {/* Banner Header */}
        <div className="w-full bg-[#C5D285] rounded-3xl p-6 sm:p-8 text-white shadow-xs border border-[#B3C071]">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide">
              {t.annuaireTitle}
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-[#DF6847]">
              {t.annuaireBanner}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div>
          <button
            onClick={() => setFullSheetStructure(null)}
            className="inline-flex items-center gap-2 bg-[#F2EBD9] hover:bg-[#EBE2CD] text-[#4A1E0E] font-bold text-xs sm:text-sm px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la carte du quartier</span>
          </button>
        </div>

        {/* Big Organization Title & 4 Distinct Colored Columns matching Mockup Page 13 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
          {/* Big Title on Left Column */}
          <div className="lg:col-span-3">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#4A1E0E] uppercase leading-tight tracking-tight">
              {fullSheetStructure.name}
            </h1>
            <p className="mt-2 text-xs font-bold text-[#DF6847] uppercase tracking-wider">
              {fullSheetStructure.categoryLabel}
            </p>
            <p className="mt-3 text-xs text-[#786E5D] leading-relaxed">
              {fullSheetStructure.address}
            </p>
          </div>

          {/* 4 Colored Vertical Cards matching Mockup Page 13 */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* 1. HISTOIRE (Yellow card) */}
            <div className="bg-[#F2CD60] text-[#342D19] p-5 sm:p-6 rounded-3xl shadow-sm border border-[#DEC05B] flex flex-col justify-between min-h-[380px]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#635529] mb-2 block">
                  Genèse
                </span>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {fullSheetStructure.histoire}
                </p>
              </div>
              <div className="mt-6 flex justify-start">
                <span className="bg-[#DF6847] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs rotate-[-3deg] inline-block">
                  {t.history}
                </span>
              </div>
            </div>

            {/* 2. ACTIVITÉS (Coral orange card) */}
            <div className="bg-[#DF6847] text-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#C55738] flex flex-col justify-between min-h-[380px]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2 block">
                  Actions de terrain
                </span>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {fullSheetStructure.activites}
                </p>
              </div>
              <div className="mt-6 flex justify-start">
                <span className="bg-[#4A1E0E] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs rotate-[2deg] inline-block">
                  {t.activities}
                </span>
              </div>
            </div>

            {/* 3. FONCTIONNEMENT (Olive green card) */}
            <div className="bg-[#C5D285] text-[#293214] p-5 sm:p-6 rounded-3xl shadow-sm border border-[#ADC06B] flex flex-col justify-between min-h-[380px]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A5C22] mb-2 block">
                  Modalités d'accès
                </span>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {fullSheetStructure.fonctionnement}
                </p>
              </div>
              <div className="mt-6 flex justify-start">
                <span className="bg-[#DF6847] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs rotate-[-2deg] inline-block">
                  {t.operations}
                </span>
              </div>
            </div>

            {/* 4. CONTACTS (Dark forest green card) */}
            <div className="bg-[#284B3D] text-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#1E3B30] flex flex-col justify-between min-h-[380px]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5D285] mb-2 block">
                  Coordonnées
                </span>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-white/95">
                  {fullSheetStructure.contactsDetails}
                </p>
              </div>
              <div className="mt-6 flex justify-start">
                <span className="bg-[#F05727] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs rotate-[3deg] inline-block">
                  {t.contacts}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header Banner matching Mockup Page 11 */}
      <div className="w-full bg-[#C5D285] rounded-3xl p-6 sm:p-8 text-white shadow-xs border border-[#B3C071]">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide">
            {t.annuaireTitle}
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-[#DF6847]">
            {t.annuaireBanner}
          </p>
        </div>
      </div>

      {/* Main Layout: Sidebar Categories on Left + Stylized Interactive Map on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Category Selector with icons matching Mockup Page 11 */}
        <div className="lg:col-span-3 bg-[#FAF7EE] rounded-3xl p-4 sm:p-5 border border-[#E4D9C3] shadow-xs flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#786E5D] mb-1 px-2">
            Thématiques
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#DF6847] text-white shadow-xs'
                  : 'text-[#4A1E0E] hover:bg-[#F2EBD9]'
              }`}
            >
              <span className={`p-1.5 rounded-lg ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-[#F2EBD9] text-[#DF6847]'}`}>
                {cat.icon}
              </span>
              <span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Stylized Neighborhood Map Container */}
        <div className="lg:col-span-9 relative bg-[#EFEAD9] rounded-3xl p-4 sm:p-6 border border-[#E0D5BE] shadow-md overflow-hidden min-h-[540px]">
          {/* Street Labels & Visual Grid */}
          <div className="absolute top-4 left-6 text-[11px] font-bold tracking-wider text-[#756854] uppercase pointer-events-none">
            Plan interactif · Quartier Goutte d'Or (Paris 18e)
          </div>

          {/* Stylized Vector Urban Blocks representing Goutte d'Or street grid */}
          <svg viewBox="0 0 900 600" className="w-full h-full min-h-[500px]" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="streetGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="#ECE5D4" />
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E2DAC6" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Background base ground */}
            <rect width="900" height="600" fill="url(#streetGrid)" />

            {/* Stylized colored city blocks in warm yellow, green, terracotta palette matching Mockup Page 11 */}
            {/* Boulevard Barbès on left */}
            <rect x="30" y="30" width="100" height="540" fill="#E4DBC5" stroke="#D3C7AB" strokeWidth="2" />
            <text x="80" y="300" transform="rotate(-90 80,300)" fill="#93846C" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="3">BOULEVARD BARBÈS</text>

            {/* Block 1 (North-West) */}
            <polygon points="150,50 320,50 320,170 150,170" fill="#F2CD60" rx="12" />
            <polygon points="160,60 230,60 230,160 160,160" fill="#DF6847" />
            <polygon points="240,60 310,60 310,110 240,110" fill="#C5D285" />
            <polygon points="240,120 310,120 310,160 240,160" fill="#284B3D" />

            {/* Block 2 (Center-North: Rue de la Goutte d'Or & Rue Polonceau) */}
            <polygon points="340,50 510,50 490,170 340,170" fill="#C5D285" />
            <polygon points="350,60 410,60 410,160 350,160" fill="#F2CD60" />
            <polygon points="420,60 490,60 480,160 420,160" fill="#DF6847" />

            {/* Block 3 (North-East: Rue Stephenson & Rue Fleury) */}
            <polygon points="530,50 860,50 860,170 550,170" fill="#F2CD60" />
            <polygon points="550,60 680,60 670,160 550,160" fill="#284B3D" />
            <polygon points="690,60 850,60 850,160 690,160" fill="#DF6847" />

            {/* Wide Street: Rue de la Goutte d'Or */}
            <line x1="140" y1="185" x2="880" y2="185" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" />
            <text x="500" y="190" fill="#93846C" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="2">RUE DE LA GOUTTE D'OR</text>

            {/* Block 4 (West-Center: Château Rouge area) */}
            <polygon points="150,210 320,210 320,380 150,380" fill="#F2CD60" />
            <circle cx="235" cy="295" r="55" fill="#FDF3CF" />
            <polygon points="190,260 280,260 260,330 210,330" fill="#DF6847" />

            {/* Block 5 (Center: Square Léon & Place Saint-Bernard) */}
            <polygon points="340,210 510,210 510,380 340,380" fill="#C5D285" />
            <polygon points="350,220 420,220 420,370 350,370" fill="#DF6847" />
            <polygon points="430,220 500,220 500,290 430,290" fill="#284B3D" />
            <polygon points="430,300 500,300 500,370 430,370" fill="#F2CD60" />

            {/* Block 6 (East: Rue Saint-Luc & Rue Affre) */}
            <polygon points="530,210 860,210 860,380 530,380" fill="#F2CD60" />
            <polygon points="550,220 630,220 630,370 550,370" fill="#284B3D" />
            <polygon points="640,220 730,220 730,370 640,370" fill="#DF6847" />
            <polygon points="740,220 850,220 850,370 740,370" fill="#C5D285" />

            {/* Wide Street: Rue Polonceau */}
            <line x1="140" y1="395" x2="880" y2="395" stroke="#FFFFFF" strokeWidth="22" strokeLinecap="round" />
            <text x="500" y="400" fill="#93846C" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="2">RUE POLONCEAU</text>

            {/* Block 7 (South-West: Rue de la Charbonnière) */}
            <polygon points="150,420 320,420 320,570 150,570" fill="#DF6847" />
            <polygon points="160,430 230,430 230,560 160,560" fill="#F2CD60" />
            <polygon points="240,430 310,430 310,560 240,560" fill="#284B3D" />

            {/* Block 8 (South-Center: Salle Saint-Bruno & Church) */}
            <polygon points="340,420 510,420 510,570 340,570" fill="#C5D285" />
            <polygon points="350,430 420,430 420,560 350,560" fill="#F2CD60" />
            <polygon points="430,430 500,430 500,560 430,560" fill="#DF6847" />

            {/* Block 9 (South-East: Doudeauville) */}
            <polygon points="530,420 860,420 860,570 530,570" fill="#F2CD60" />
            <polygon points="550,430 650,430 650,560 550,560" fill="#284B3D" />
            <polygon points="660,430 750,430 750,560 660,560" fill="#DF6847" />
            <polygon points="760,430 850,430 850,560 760,560" fill="#C5D285" />
          </svg>

          {/* Interactive HTML Pins rendered exactly on map coordinates */}
          {filteredStructures.map((struct) => {
            const isSelected = activePin?.id === struct.id;
            return (
              <div
                key={struct.id}
                style={{ left: `${struct.mapCoords.x}%`, top: `${struct.mapCoords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full z-20 cursor-pointer group"
                onClick={() => setActivePin(struct)}
              >
                {/* Pin Pill Label */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border-2 transition-all duration-200 transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-[#4A1E0E] text-white border-white scale-110 ring-4 ring-[#DF6847]/40'
                      : 'bg-white/95 text-[#302823] border-[#DF6847] hover:bg-white'
                  }`}
                >
                  <span className="p-0.5">{getCategoryIcon(struct.category)}</span>
                  <span className="text-[11px] font-bold whitespace-nowrap">{struct.name}</span>
                </div>

                {/* Pointy tip of pin */}
                <div className="w-2.5 h-2.5 bg-[#DF6847] rotate-45 mx-auto -mt-1 shadow-xs" />
              </div>
            );
          })}

          {/* FLOATING POPUP CARD (matching Mockup Page 12 & 14) */}
          {activePin && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-sm bg-[#FAF7EE] rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-white animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setActivePin(null)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#EFE8D6] hover:bg-[#E2D8C0] flex items-center justify-center text-[#4A1E0E] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Category Icon Badge in colored rounded pill */}
              <div className="w-12 h-12 rounded-2xl bg-[#DF6847]/15 flex items-center justify-center mb-3">
                {getCategoryIcon(activePin.category)}
              </div>

              {/* Title & Street Address */}
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[#4A1E0E] leading-tight">
                {activePin.name}
              </h3>
              <p className="text-xs text-[#786E5D] font-medium mt-1">
                {activePin.address}
              </p>

              {/* Details List */}
              <div className="mt-4 space-y-2.5 text-xs text-[#3D352E]">
                <div>
                  <span className="font-bold text-[#4A1E0E] block">{t.publicLabel} :</span>
                  <span className="text-[#63574A]">{activePin.publicCible}</span>
                </div>

                <div>
                  <span className="font-bold text-[#4A1E0E] block">{t.hoursLabel} :</span>
                  <span className="text-[#63574A]">{activePin.horaires}</span>
                </div>

                <div>
                  <span className="font-bold text-[#4A1E0E] block">{t.contactLabel} :</span>
                  <span className="text-[#63574A] block">{activePin.phone}</span>
                  <span className="text-[#63574A] block">{activePin.email}</span>
                </div>
              </div>

              {/* Open Full Sheet button (+) matching Mockup Page 12 & 14 */}
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => {
                    setFullSheetStructure(activePin);
                    setActivePin(null);
                  }}
                  className="w-10 h-10 rounded-full bg-[#DF6847] hover:bg-[#BA4E30] text-white flex items-center justify-center shadow-md transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title={t.fullSheet}
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
