/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ActiveView, Language, User } from './types';
import { getViewFromPath, getPathFromView } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroScreen } from './components/HeroScreen';
import { HomePortal } from './components/HomePortal';
import { MediaView } from './components/MediaView';
import { AgendaView } from './components/AgendaView';
import { DirectoryView } from './components/DirectoryView';
import { AgirView } from './components/AgirView';
import { LoginView } from './components/LoginView';
import { MyAccountView } from './components/MyAccountView';
import { AdminView } from './components/AdminView';
import { Modals } from './components/Modals';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    return getViewFromPath(window.location.pathname);
  });
  const [targetEventId, setTargetEventId] = useState<string | null>(null);

  // Synchronize state when browser navigation (back / forward) happens
  useEffect(() => {
    const handlePopState = () => {
      setActiveView(getViewFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation handler updating URL path and state
  const handleNavigate = useCallback((view: ActiveView) => {
    const targetPath = getPathFromView(view);
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // User Authentication state with localStorage persistence
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('goutte_dor_current_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [activeModal, setActiveModal] = useState<
    'about' | 'faq' | 'newsletter' | 'contact' | 'submitEvent' | 'postOffer' | 'volunteer' | null
  >(null);

  // Set document title and direction based on language
  useEffect(() => {
    const isRtl = currentLang === 'ar' || currentLang === 'ps';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [currentLang]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('goutte_dor_current_user', JSON.stringify(user));
    if (user.role === 'admin') {
      handleNavigate('admin');
    } else if (user.role === 'association') {
      handleNavigate('myAccount');
    } else {
      handleNavigate('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('goutte_dor_current_user');
    handleNavigate('home');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('goutte_dor_current_user', JSON.stringify(updatedUser));
  };

  const handleOpenFeaturedEvent = (eventId: string) => {
    setTargetEventId(eventId);
    handleNavigate('agenda');
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#292524] flex flex-col font-sans selection:bg-[#DF6847] selection:text-white">
      {/* Top Bar Header with Logo, Navigation & User Auth */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        activeView={activeView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
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
            currentUser={currentUser}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'agenda' && (
          <AgendaView
            currentLang={currentLang}
            onOpenSubmitEventModal={() => setActiveModal('submitEvent')}
            initialExpandedEventId={targetEventId}
            currentUser={currentUser}
          />
        )}

        {activeView === 'annuaire' && (
          <DirectoryView currentLang={currentLang} />
        )}

        {activeView === 'agir' && (
          <AgirView
            currentLang={currentLang}
            onOpenPostOfferModal={() => setActiveModal('postOffer')}
            currentUser={currentUser}
          />
        )}

        {activeView === 'login' && (
          <LoginView
            onLoginSuccess={handleLoginSuccess}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'myAccount' && currentUser && (
          <MyAccountView
            currentUser={currentUser}
            onNavigate={setActiveView}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {(activeView === 'admin' || activeView === 'createArticle') && currentUser && (
          <AdminView
            currentUser={currentUser}
            onNavigate={setActiveView}
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
