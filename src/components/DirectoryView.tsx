import React, { useState, useEffect } from 'react';
import { DirectoryCategory, DirectoryStructure, Language } from '../types';
import { translations } from '../data/translations';
import { DatabaseService } from '../services/dbService';
import { geocodeAddress } from '../utils/geocoding';
import { LeafletMap } from './LeafletMap';
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
  Building,
  ExternalLink,
} from 'lucide-react';

interface DirectoryViewProps {
  currentLang: Language;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory>('all');
  const [activePin, setActivePin] = useState<DirectoryStructure | null>(null);
  const [fullSheetStructure, setFullSheetStructure] = useState<DirectoryStructure | null>(null);

  const [associationsList, setAssociationsList] = useState<DirectoryStructure[]>([]);

  const fetchAssociations = () => {
    fetch('/api/associations')
      .then((res) => res.json())
      .then((data) => {
        const rawList = Array.isArray(data) && data.length > 0 ? data : DatabaseService.getAssociations();
        const processed = rawList.map((item: DirectoryStructure) => {
          const geo = geocodeAddress(item.address || item.name);
          return {
            ...item,
            lat: item.lat || geo.lat,
            lng: item.lng || geo.lng,
            mapCoords: item.mapCoords || { x: geo.x, y: geo.y },
          };
        });
        setAssociationsList(processed);
      })
      .catch(() => {
        const rawList = DatabaseService.getAssociations();
        const processed = rawList.map((item: DirectoryStructure) => {
          const geo = geocodeAddress(item.address || item.name);
          return {
            ...item,
            lat: item.lat || geo.lat,
            lng: item.lng || geo.lng,
            mapCoords: item.mapCoords || { x: geo.x, y: geo.y },
          };
        });
        setAssociationsList(processed);
      });
  };

  useEffect(() => {
    fetchAssociations();
  }, []);

  const categories: { id: DirectoryCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.allCategories, icon: <Layers className="w-4 h-4" /> },
    { id: 'sante', label: t.catSante, icon: <Activity className="w-4 h-4" /> },
    { id: 'culture', label: t.catCulture, icon: <Drama className="w-4 h-4" /> },
    { id: 'jeunesse', label: t.catJeunesse, icon: <Baby className="w-4 h-4" /> },
    { id: 'education', label: t.catEducation, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'sport', label: t.catSport, icon: <Trophy className="w-4 h-4" /> },
    { id: 'maison_assoc', label: t.catMaisonAssoc, icon: <Home className="w-4 h-4" /> },
  ];

  const filteredStructures = associationsList.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

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
            {fullSheetStructure.logo && (
              <img
                src={fullSheetStructure.logo}
                alt={fullSheetStructure.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E4D9C3] mb-3 shadow-xs"
              />
            )}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#4A1E0E] uppercase leading-tight tracking-tight">
              {fullSheetStructure.name}
            </h1>
            <p className="mt-2 text-xs font-bold text-[#DF6847] uppercase tracking-wider">
              {fullSheetStructure.categoryLabel}
            </p>
            <p className="mt-3 text-xs text-[#786E5D] leading-relaxed">
              📍 {fullSheetStructure.address}
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

      {/* Main Layout: Sidebar Categories on Left + Real OpenStreetMap Leaflet Map on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Category Selector */}
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

        {/* Real OpenStreetMap Leaflet Map Component (Paris 18e) */}
        <div className="lg:col-span-9">
          <div className="mb-2 text-xs font-bold text-[#4A1E0E] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#DF6847]" />
              <span>Carte interactive OpenStreetMap · Goutte d'Or (Paris 18e)</span>
            </span>
            <span className="text-[#786E5D] text-[11px] font-normal">
              Cliquez sur les marqueurs ou dans le vide pour fermer la fiche
            </span>
          </div>

          <LeafletMap
            associations={filteredStructures}
            selectedAssociation={activePin}
            onSelectAssociation={setActivePin}
            onOpenFullSheet={setFullSheetStructure}
          />
        </div>
      </div>

      {/* Directory Associations Grid Cards List */}
      <div className="mt-8">
        <h3 className="font-serif text-2xl font-bold text-[#4A1E0E] mb-4 flex items-center gap-2">
          <Building className="w-6 h-6 text-[#284B3D]" />
          <span>Toutes les associations du quartier ({filteredStructures.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStructures.map((assoc) => (
            <div
              key={assoc.id}
              className="bg-[#FAF7EE] border-2 border-[#E7DECD] rounded-2xl p-5 shadow-xs hover:border-[#DF6847] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {assoc.logo ? (
                      <img src={assoc.logo} alt={assoc.name} className="w-12 h-12 rounded-xl object-cover border border-[#E7DECD]" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#DF6847]/15 flex items-center justify-center text-[#DF6847]">
                        <Building className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-[#4A1E0E] leading-tight">{assoc.name}</h4>
                      <span className="text-[10px] font-bold text-[#DF6847] uppercase tracking-wider">
                        {assoc.categoryLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#5C5042] mt-2">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#DF6847] shrink-0 mt-0.5" />
                    <span>{assoc.address}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#284B3D] shrink-0 mt-0.5" />
                    <span>{assoc.horaires}</span>
                  </div>
                  {assoc.publicCible && (
                    <div className="text-[11px] bg-[#F2EBD9] px-2.5 py-1 rounded-lg text-[#4A1E0E] font-medium mt-1">
                      Public : {assoc.publicCible}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E7DECD] flex justify-between items-center">
                <button
                  onClick={() => {
                    setActivePin(assoc);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#DF6847] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Voir sur la carte</span>
                </button>
                <button
                  onClick={() => setFullSheetStructure(assoc)}
                  className="px-3 py-1.5 bg-[#4A1E0E] hover:bg-[#34150A] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Fiche détaillée</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
