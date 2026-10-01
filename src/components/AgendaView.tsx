import React, { useState } from 'react';
import { AgendaEvent, Language } from '../types';
import { translations } from '../data/translations';
import { mockAgendaEvents } from '../data/mockData';
import { Plus, Undo2, Calendar, MapPin, Clock, PlusCircle } from 'lucide-react';

interface AgendaViewProps {
  currentLang: Language;
  onOpenSubmitEventModal: () => void;
  initialExpandedEventId?: string | null;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  currentLang,
  onOpenSubmitEventModal,
  initialExpandedEventId,
}) => {
  const t = translations[currentLang];
  const [selectedMonth, setSelectedMonth] = useState<'Septembre' | 'Octobre' | 'Novembre' | 'Décembre'>('Septembre');
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(initialExpandedEventId || null);

  const months: ('Septembre' | 'Octobre' | 'Novembre' | 'Décembre')[] = [
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  const currentEvents = mockAgendaEvents.filter((ev) => ev.month === selectedMonth);
  const expandedEvent = mockAgendaEvents.find((ev) => ev.id === expandedEventId);

  // Card color styling map matching mockups
  const cardColorClasses = {
    orange: 'bg-[#DF6847] text-white border-[#C45738]',
    yellow: 'bg-[#F2CD60] text-[#3A331E] border-[#DDB84E]',
    coral: 'bg-[#E35D5B] text-white border-[#C94A48]',
    mauve: 'bg-[#B09995] text-[#2E2625] border-[#9E8783]',
    beige: 'bg-[#E4D9C8] text-[#3D3528] border-[#D1C4B0]',
    olive: 'bg-[#C9D48D] text-[#303816] border-[#B5C276]',
  };

  const badgeColorClasses = {
    orange: 'bg-[#DF6847] text-white',
    yellow: 'bg-[#F2CD60] text-[#3A331E]',
    coral: 'bg-[#E35D5B] text-white',
    mauve: 'bg-[#B09995] text-[#2E2625]',
    beige: 'bg-[#E4D9C8] text-[#3D3528]',
    olive: 'bg-[#C9D48D] text-[#303816]',
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Terracotta Header Banner matching Mockup Page 6 */}
      <div className="w-full bg-[#DF6847] rounded-3xl p-6 sm:p-8 text-white shadow-xs border border-[#C55738]">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide">
            {t.agendaTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg font-medium text-white/95">
            {t.agendaSubtitleBanner}
          </p>
        </div>
      </div>

      {/* Month Selector Bar & Submit Event Button */}
      <div className="flex items-center justify-between gap-4 relative z-20">
        {/* Calendar Icon & Month Dropdown matching Mockup Page 7 */}
        <div className="relative">
          <button
            onClick={() => setMonthMenuOpen(!monthMenuOpen)}
            className="flex items-center gap-2 bg-[#FAF7EE] hover:bg-[#F2EBD9] border-2 border-[#DF6847] px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold text-[#4A1E0E] shadow-xs transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#DF6847]" />
            <span>{selectedMonth}</span>
            <span className="text-[10px] text-[#DF6847]">▼</span>
          </button>

          {/* Month Popover Menu matching Mockup Page 7 */}
          {monthMenuOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-[#FAF7EE] border-2 border-[#DF6847] rounded-2xl shadow-xl p-2 z-30 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150">
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedMonth(m);
                    setMonthMenuOpen(false);
                  }}
                  className={`text-left px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedMonth === m
                      ? 'bg-[#DF6847] text-white shadow-2xs'
                      : 'text-[#4A1E0E] hover:bg-[#F2EBD9]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Propose an Event CTA */}
        <button
          onClick={onOpenSubmitEventModal}
          className="flex items-center gap-1.5 bg-[#4A1E0E] hover:bg-[#341408] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#C9D48D]" />
          <span>{t.submitEvent}</span>
        </button>
      </div>

      {/* Main Interactive Timeline / Sinuous Path View */}
      <div className="relative w-full py-8 overflow-x-auto min-h-[640px] flex items-center justify-center">
        {/* Background Winding Path SVG (triple line sine wave connecting all nodes) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center min-w-[980px]">
          <svg
            viewBox="0 0 1200 480"
            className="w-full h-full stroke-[#4A1E0E]/20 fill-none"
            preserveAspectRatio="none"
          >
            {/* Triple parallel sinuous lines */}
            <path
              d="M 50,240 C 200,60 300,420 450,240 C 600,60 700,420 850,240 C 950,120 1050,360 1150,240"
              strokeWidth="4"
              stroke="#685743"
              strokeLinecap="round"
            />
            <path
              d="M 50,234 C 200,54 300,414 450,234 C 600,54 700,414 850,234 C 950,114 1050,354 1150,234"
              strokeWidth="1.5"
              stroke="#8A775E"
            />
            <path
              d="M 50,246 C 200,66 300,426 450,246 C 600,66 700,426 850,246 C 950,126 1050,366 1150,246"
              strokeWidth="1.5"
              stroke="#8A775E"
            />
          </svg>
        </div>

        {/* Event Cards Layout: Two staggered rows (top & bottom) matching mockup */}
        <div className="relative z-10 w-full min-w-[980px] flex flex-col justify-between h-[600px] px-4">
          {/* Top Row Cards */}
          <div className="flex items-start justify-around w-full">
            {currentEvents
              .filter((ev) => ev.position === 'top')
              .map((ev) => (
                <div key={ev.id} className="relative flex flex-col items-center">
                  {/* Event Card */}
                  <div
                    className={`relative w-48 sm:w-56 p-4 sm:p-5 rounded-3xl shadow-md border transition-all duration-200 transform hover:-translate-y-1.5 ${
                      cardColorClasses[ev.colorTheme]
                    }`}
                  >
                    {/* Floating Date Badge */}
                    <div
                      className={`absolute -top-4 -left-4 w-11 h-11 rounded-full border-2 border-white shadow-md flex items-center justify-center font-bold text-base ${
                        badgeColorClasses[ev.colorTheme]
                      }`}
                    >
                      {ev.day}
                    </div>

                    <h4 className="mt-2 font-serif text-lg font-bold leading-tight">
                      {ev.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed opacity-90 line-clamp-3">
                      {ev.shortDesc}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] opacity-85">
                      <span className="truncate max-w-[120px]">{ev.location}</span>
                      <button
                        onClick={() => setExpandedEventId(ev.id)}
                        className="w-7 h-7 rounded-full bg-white text-[#4A1E0E] flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer ml-1"
                        title={t.moreDetails}
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Connecting Node Pin to the wavy timeline path */}
                  <div className="w-4 h-4 rounded-full bg-[#DF6847] border-2 border-white shadow-xs mt-3" />
                </div>
              ))}
          </div>

          {/* Bottom Row Cards */}
          <div className="flex items-end justify-around w-full">
            {currentEvents
              .filter((ev) => ev.position === 'bottom')
              .map((ev) => (
                <div key={ev.id} className="relative flex flex-col items-center">
                  {/* Connecting Node Pin to the wavy timeline path */}
                  <div className="w-4 h-4 rounded-full bg-[#DF6847] border-2 border-white shadow-xs mb-3" />

                  {/* Event Card */}
                  <div
                    className={`relative w-48 sm:w-56 p-4 sm:p-5 rounded-3xl shadow-md border transition-all duration-200 transform hover:-translate-y-1.5 ${
                      cardColorClasses[ev.colorTheme]
                    }`}
                  >
                    {/* Floating Date Badge */}
                    <div
                      className={`absolute -top-4 -left-4 w-11 h-11 rounded-full border-2 border-white shadow-md flex items-center justify-center font-bold text-base ${
                        badgeColorClasses[ev.colorTheme]
                      }`}
                    >
                      {ev.day}
                    </div>

                    <h4 className="mt-2 font-serif text-lg font-bold leading-tight">
                      {ev.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed opacity-90 line-clamp-3">
                      {ev.shortDesc}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] opacity-85">
                      <span className="truncate max-w-[120px]">{ev.location}</span>
                      <button
                        onClick={() => setExpandedEventId(ev.id)}
                        className="w-7 h-7 rounded-full bg-white text-[#4A1E0E] flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer ml-1"
                        title={t.moreDetails}
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* EXPANDED DETAILED CARD OVERLAY (matching Mockup Page 8 & 9) */}
        {expandedEvent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="relative bg-[#FAF7EE] max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white my-8 max-h-[90vh] overflow-y-auto">
              {/* Inner card with color theme background */}
              <div
                className={`w-full rounded-2xl p-6 sm:p-8 relative ${
                  cardColorClasses[expandedEvent.colorTheme]
                }`}
              >
                {/* Large Date Badge Circle matching Mockup Page 8 */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#4A1E0E] flex items-center justify-center font-serif text-2xl sm:text-3xl font-black shadow-lg mb-4">
                  {expandedEvent.day}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-black leading-tight">
                  {expandedEvent.title}
                </h3>

                {expandedEvent.tag && (
                  <span className="text-xs font-bold uppercase tracking-wider opacity-85 mt-1 block">
                    {expandedEvent.tag}
                  </span>
                )}

                {/* Long description text */}
                <div className="mt-4 text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-line opacity-95">
                  {expandedEvent.fullDesc}
                </div>

                {/* Detailed Locations */}
                {expandedEvent.detailedLocations && (
                  <div className="mt-4 pt-3 border-t border-black/15 text-xs">
                    <p className="font-bold flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t.locationsTitle} :</span>
                    </p>
                    <p className="opacity-90">{expandedEvent.detailedLocations}</p>
                  </div>
                )}

                {/* Return curved arrow button matching Mockup Page 8 & 9 */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setExpandedEventId(null)}
                    className="p-3 rounded-full bg-black/20 hover:bg-black/35 text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 text-xs font-bold"
                    title={t.closeDetails}
                  >
                    <span>{t.closeDetails}</span>
                    <Undo2 className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
