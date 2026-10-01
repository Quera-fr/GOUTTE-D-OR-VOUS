import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Facebook, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenModal: (modal: 'about' | 'faq' | 'newsletter' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenModal }) => {
  const t = translations[currentLang];

  return (
    <footer className="w-full bg-[#FAF7EE] border-t border-[#E7DECD] py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation links matching mockup */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs md:text-sm font-semibold text-[#DF6847]">
          <button
            onClick={() => onOpenModal('about')}
            className="hover:text-[#BA4E30] transition-colors cursor-pointer"
          >
            {t.about}
          </button>
          <button
            onClick={() => onOpenModal('faq')}
            className="hover:text-[#BA4E30] transition-colors cursor-pointer"
          >
            {t.faq}
          </button>
          <button
            onClick={() => onOpenModal('newsletter')}
            className="hover:text-[#BA4E30] transition-colors cursor-pointer"
          >
            {t.newsletters}
          </button>
          <button
            onClick={() => onOpenModal('contact')}
            className="hover:text-[#BA4E30] transition-colors cursor-pointer"
          >
            {t.contactUs}
          </button>
        </div>

        {/* Project attribution and socials */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-[#786E5D] hidden sm:inline flex items-center gap-1">
            <span>{t.projectBy}</span>
            <Heart className="w-3 h-3 text-[#DF6847] fill-[#DF6847]" />
          </span>

          <div className="flex items-center gap-3 text-[#DF6847]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-[#F2EBD9] rounded-full transition-colors cursor-pointer"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-[#F2EBD9] rounded-full transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
