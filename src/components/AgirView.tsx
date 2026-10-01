import React, { useState } from 'react';
import { AgirFilter, AgirOpportunity, Language } from '../types';
import { translations } from '../data/translations';
import { mockAgirOpportunities } from '../data/mockData';
import { Search, SlidersHorizontal, Check, X, Send, HeartHandshake, Briefcase, PlusCircle } from 'lucide-react';

interface AgirViewProps {
  currentLang: Language;
  onOpenPostOfferModal: () => void;
}

export const AgirView: React.FC<AgirViewProps> = ({ currentLang, onOpenPostOfferModal }) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<AgirFilter[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<AgirOpportunity | null>(null);

  // Application form in modal
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantMotivation, setApplicantMotivation] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const filterOptions: { id: AgirFilter; label: string }[] = [
    { id: 'benevolat', label: t.filterBenevolat },
    { id: 'emploi', label: t.filterEmploi },
    { id: 'volontariat', label: t.filterVolontariat },
    { id: 'mecenat', label: t.filterMecenat },
  ];

  const toggleFilter = (filterId: AgirFilter) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter((f) => f !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };

  const filteredOpportunities = mockAgirOpportunities.filter((opp) => {
    // Filter by type
    if (activeFilters.length > 0 && !activeFilters.includes(opp.type)) {
      return false;
    }
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.orgName.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedOpportunity(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantMotivation('');
    }, 2200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Dark Green Header Banner matching Mockup Page 17 */}
      <div className="w-full bg-[#244738] rounded-3xl p-6 sm:p-8 text-white shadow-xs border border-[#1A382B]">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide">
            {t.agirTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg font-medium text-white/95">
            {t.agirBanner}
          </p>
        </div>
      </div>

      {/* Search Input Bar + Filter Toggle Icon matching Mockup Page 17 & 18 */}
      <div className="relative max-w-2xl mx-auto w-full z-20">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white border-2 border-[#D8CEBA] rounded-full py-3 pl-11 pr-14 text-xs sm:text-sm text-[#383127] placeholder-[#948773] focus:outline-none focus:border-[#DF6847] shadow-xs"
          />
          <Search className="absolute left-4 w-4 h-4 text-[#786E5D]" />

          {/* Filter toggle button with icon matching mockup */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`absolute right-2.5 p-2 rounded-full transition-colors cursor-pointer ${
              filtersOpen || activeFilters.length > 0
                ? 'bg-[#DF6847] text-white'
                : 'text-[#4A1E0E] hover:bg-[#F2EBD9]'
            }`}
            title={t.filterLabel}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Popup Checklist matching Mockup Page 18 */}
        {filtersOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-[#C5D285] rounded-3xl p-4 shadow-xl border-2 border-[#ADC06B] z-30 animate-in fade-in zoom-in-95 duration-150">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B3B15] mb-2 block px-1">
              {t.filterLabel}
            </span>
            <div className="space-y-2">
              {filterOptions.map((opt) => {
                const isChecked = activeFilters.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    onClick={() => toggleFilter(opt.id)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 cursor-pointer text-xs sm:text-sm font-semibold text-[#222E10] transition-colors"
                  >
                    <div
                      className={`w-4 h-4 rounded-md border-2 border-[#222E10] flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-[#222E10] text-white' : 'bg-transparent'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>

            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="mt-3 w-full py-1 text-[11px] font-bold text-[#2B3B15] hover:underline text-center"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3 Featured Action Cards with organic petal backdrops matching Mockup Page 17 & 18 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-2">
        {filteredOpportunities.slice(0, 3).map((opp, idx) => {
          // Card outer color styles
          let cardBg = 'bg-[#DF6847] text-white';
          let btnBg = 'bg-[#4A1E0E] text-white hover:bg-[#321208]';
          if (idx === 1) {
            cardBg = 'bg-[#F2CD60] text-[#3A331E]';
            btnBg = 'bg-[#DF6847] text-white hover:bg-[#BA4E30]';
          } else if (idx === 2) {
            cardBg = 'bg-[#DF6847] text-white';
            btnBg = 'bg-[#284B3D] text-white hover:bg-[#1E3B30]';
          }

          return (
            <div
              key={opp.id}
              className={`rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between items-center text-center transition-all duration-300 transform hover:-translate-y-1.5 min-h-[440px] border border-black/5 ${cardBg}`}
            >
              {/* Distinctive Organic Petal / Flower Backdrop Shape behind portrait matching mockups */}
              <div className="relative w-44 h-44 flex items-center justify-center mb-4">
                {/* Organic double petal background */}
                <div
                  className="absolute inset-0 rounded-[44%_56%_56%_44%/56%_44%_56%_44%] transition-transform duration-500 hover:rotate-12"
                  style={{ backgroundColor: opp.petalColor }}
                />

                {/* Photo Portrait */}
                <div className="relative z-10 w-36 h-36 rounded-full overflow-hidden shadow-inner border-2 border-white/40">
                  {opp.image ? (
                    <img
                      src={opp.image}
                      alt={opp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#3D3528] flex items-center justify-center text-white/80">
                      <Briefcase className="w-12 h-12" />
                    </div>
                  )}
                </div>
              </div>

              {/* Title / Description */}
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-85 mb-1">
                  {opp.orgName} · {opp.typeLabel}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold leading-snug">
                  {opp.title}
                </h3>
              </div>

              {/* Action Button */}
              <div className="mt-6 w-full">
                <button
                  onClick={() => setSelectedOpportunity(opp)}
                  className={`w-full py-3 px-6 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all transform hover:scale-103 active:scale-97 cursor-pointer ${btnBg}`}
                >
                  {opp.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Propose an Offer Button for local charities */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={onOpenPostOfferModal}
          className="inline-flex items-center gap-2 bg-[#FAF7EE] hover:bg-[#F2EBD9] border-2 border-[#DF6847] text-[#4A1E0E] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-xs"
        >
          <PlusCircle className="w-4 h-4 text-[#DF6847]" />
          <span>{t.postOffer}</span>
        </button>
      </div>

      {/* APPLICATION / OFFER DETAILS MODAL */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative bg-[#FAF7EE] max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white my-8 max-h-[90vh] overflow-y-auto text-[#292524]">
            <button
              onClick={() => setSelectedOpportunity(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#EFE8D6] hover:bg-[#E2D8C0] flex items-center justify-center text-[#4A1E0E] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#DF6847]">
              {selectedOpportunity.typeLabel} · {selectedOpportunity.orgName}
            </span>
            <h3 className="mt-1 font-serif text-xl sm:text-2xl font-black text-[#4A1E0E] leading-tight">
              {selectedOpportunity.title}
            </h3>

            <div className="mt-3 text-xs text-[#786E5D] flex items-center gap-2">
              <span className="bg-[#EFEAD9] px-2.5 py-1 rounded-full font-bold">
                Engagement : {selectedOpportunity.duration}
              </span>
            </div>

            {/* Description */}
            <div className="mt-4 text-xs sm:text-sm text-[#4A4035] leading-relaxed">
              {selectedOpportunity.description}
            </div>

            {/* Requirements */}
            <div className="mt-4 pt-3 border-t border-[#E3D9C4]">
              <h4 className="text-xs font-bold uppercase text-[#4A1E0E] mb-2">
                Profil recherché :
              </h4>
              <ul className="space-y-1.5 text-xs text-[#5C5042]">
                {selectedOpportunity.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <span className="text-[#DF6847] font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Form */}
            <div className="mt-6 pt-4 border-t border-[#E3D9C4]">
              <h4 className="text-sm font-bold text-[#4A1E0E] flex items-center gap-2 mb-3">
                <HeartHandshake className="w-4 h-4 text-[#DF6847]" />
                <span>Rejoindre l'aventure (Postuler directement)</span>
              </h4>

              {appliedSuccess ? (
                <div className="p-4 bg-[#C5D285]/40 border border-[#B3C071] rounded-2xl text-center text-xs font-bold text-[#2A4B3E] animate-in zoom-in-95">
                  🎉 Merci pour votre engagement ! Votre candidature a été transmise à {selectedOpportunity.orgName}. L'équipe vous recontactera très rapidement.
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                      Votre prénom et nom
                    </label>
                    <input
                      required
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Ex: Samira Diop"
                      className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="samira@email.fr"
                        className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                        Téléphone
                      </label>
                      <input
                        required
                        type="tel"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="06 12 34 56 78"
                        className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                      Un mot sur vos motivations ou disponibilités
                    </label>
                    <textarea
                      rows={3}
                      value={applicantMotivation}
                      onChange={(e) => setApplicantMotivation(e.target.value)}
                      placeholder="Pourquoi souhaitez-vous vous engager pour cette mission ?"
                      className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#DF6847] hover:bg-[#BA4E30] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer ma candidature</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
