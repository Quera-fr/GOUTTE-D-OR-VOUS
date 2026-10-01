/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveView, Language } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroScreen } from './components/HeroScreen';
import { HomePortal } from './components/HomePortal';
import { MediaView } from './components/MediaView';
import { AgendaView } from './components/AgendaView';
import { DirectoryView } from './components/DirectoryView';
import { AgirView } from './components/AgirView';
import { Modals } from './components/Modals';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [targetEventId, setTargetEventId] = useState<string | null>(null);

  const [activeModal, setActiveModal] = useState<
    'about' | 'faq' | 'newsletter' | 'contact' | 'submitEvent' | 'postOffer' | 'volunteer' | null
  >(null);

  // Set document title and direction based on language
  useEffect(() => {
    const isRtl = currentLang === 'ar' || currentLang === 'ps';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [currentLang]);

  const handleOpenFeaturedEvent = (eventId: string) => {
    setTargetEventId(eventId);
    setActiveView('agenda');
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#292524] flex flex-col font-sans selection:bg-[#DF6847] selection:text-white">
      {/* Top Bar Header with Logo & Language Switcher */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        activeView={activeView}
        onNavigate={setActiveView}
      />

      {/* Main Content Area based on activeView */}
      <main className="flex-1 flex flex-col">
        {activeView === 'hero' && (
          <HeroScreen
            currentLang={currentLang}
            onExplore={() => setActiveView('home')}
          />
        )}

        {activeView === 'home' && (
          <HomePortal
            currentLang={currentLang}
            onNavigate={setActiveView}
            onOpenEvent={handleOpenFeaturedEvent}
          />
        )}

        {activeView === 'media' && (
          <MediaView
            currentLang={currentLang}
            onOpenVolunteerModal={() => setActiveModal('volunteer')}
          />
        )}

        {activeView === 'agenda' && (
          <AgendaView
            currentLang={currentLang}
            onOpenSubmitEventModal={() => setActiveModal('submitEvent')}
            initialExpandedEventId={targetEventId}
          />
        )}

        {activeView === 'annuaire' && (
          <DirectoryView currentLang={currentLang} />
        )}

        {activeView === 'agir' && (
          <AgirView
            currentLang={currentLang}
            onOpenPostOfferModal={() => setActiveModal('postOffer')}
          />
        )}
      </main>

      {/* Footer matching Mockups */}
      {activeView !== 'hero' && (
        <Footer
          currentLang={currentLang}
          onOpenModal={(modal) => setActiveModal(modal)}
        />
      )}

      {/* Global Modals: About, FAQ, Newsletter, Contact, Propose Event, Volunteer */}
      <Modals
        currentLang={currentLang}
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
