import React, { useState } from 'react';
import { ArticleItem, Language } from '../types';
import { translations } from '../data/translations';
import { mockArticles } from '../data/mockData';
import { Play, Pause, Volume2, Film, BookOpen, Clock, X, MessageSquare, Send } from 'lucide-react';

interface MediaViewProps {
  currentLang: Language;
  onOpenVolunteerModal: () => void;
}

export const MediaView: React.FC<MediaViewProps> = ({ currentLang, onOpenVolunteerModal }) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'all' | 'Article' | 'Podcast' | 'Web TV' | 'archives'>('all');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  
  // Audio player state for podcasts
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioItem, setActiveAudioItem] = useState<ArticleItem | null>(null);

  // Filtered list
  const filteredArticles = mockArticles.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'archives') return item.id === 'art-4';
    return item.type === activeTab;
  });

  const handlePlayPodcast = (item: ArticleItem) => {
    if (activeAudioItem?.id === item.id) {
      setIsPlayingAudio(!isPlayingAudio);
    } else {
      setActiveAudioItem(item);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Banner Header matching mockup */}
      <div className="w-full bg-[#C9D48D] rounded-3xl p-6 sm:p-8 border border-[#B8C57A] shadow-xs">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wide uppercase">
            {t.mediaTitle}
          </h2>

          {/* Sub tabs in header matching Mockup Page 4 */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-bold text-[#DF6847]">
            <button
              onClick={() => setActiveTab('all')}
              className={`hover:text-[#BA4E30] transition-colors cursor-pointer ${
                activeTab === 'all' ? 'underline underline-offset-4 font-black text-[#4A1E0E]' : ''
              }`}
            >
              {t.allMedia}
            </button>
            <button
              onClick={() => setActiveTab('Article')}
              className={`hover:text-[#BA4E30] transition-colors cursor-pointer ${
                activeTab === 'Article' ? 'underline underline-offset-4 font-black text-[#4A1E0E]' : ''
              }`}
            >
              {t.articles}
            </button>
            <button
              onClick={() => setActiveTab('Web TV')}
              className={`hover:text-[#BA4E30] transition-colors cursor-pointer ${
                activeTab === 'Web TV' ? 'underline underline-offset-4 font-black text-[#4A1E0E]' : ''
              }`}
            >
              {t.webTv}
            </button>
            <button
              onClick={() => setActiveTab('Podcast')}
              className={`hover:text-[#BA4E30] transition-colors cursor-pointer ${
                activeTab === 'Podcast' ? 'underline underline-offset-4 font-black text-[#4A1E0E]' : ''
              }`}
            >
              {t.webRadio}
            </button>
            <button
              onClick={() => setActiveTab('archives')}
              className={`hover:text-[#BA4E30] transition-colors cursor-pointer ${
                activeTab === 'archives' ? 'underline underline-offset-4 font-black text-[#4A1E0E]' : ''
              }`}
            >
              {t.archives}
            </button>
            <button
              onClick={onOpenVolunteerModal}
              className="text-[#DF6847] hover:text-[#BA4E30] transition-colors cursor-pointer font-bold"
            >
              {t.becomeVolunteer}
            </button>
          </div>
        </div>
      </div>

      {/* Persistent mini-audio player bar if audio is playing */}
      {activeAudioItem && (
        <div className="sticky top-16 z-30 bg-[#284B3D] text-white p-3.5 rounded-2xl shadow-lg border border-[#1E3B30] flex items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-10 h-10 rounded-full bg-[#DF6847] flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer"
            >
              {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9D48D] block">
                Radio Goutte d’Or en écoute
              </span>
              <p className="text-xs sm:text-sm font-semibold truncate max-w-xs sm:max-w-md">
                {activeAudioItem.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-[#C9D48D] hidden sm:block" />
            <button
              onClick={() => {
                setIsPlayingAudio(false);
                setActiveAudioItem(null);
              }}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3 Featured Media Cards Grid matching Mockup Page 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* CARD 1: Article */}
        <div
          onClick={() => setSelectedArticle(mockArticles[0])}
          className="group flex flex-col cursor-pointer transition-all"
        >
          {/* Visual Container */}
          <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#5EA3D0] shadow-sm group-hover:shadow-md transition-shadow">
            <img
              src="/src/assets/images/article_garcon_arabe_1790867645835.jpg"
              alt="Les fictions du garçon arabe"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
          </div>

          {/* Caption / Title */}
          <div className="mt-4">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#DF6847] block">
              Article
            </span>
            <h3 className="mt-1 text-base sm:text-lg font-bold text-[#292524] group-hover:text-[#DF6847] transition-colors leading-snug">
              {mockArticles[0].title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-[#786E5D]">
              <Clock className="w-3.5 h-3.5" />
              <span>{mockArticles[0].durationOrReadTime}</span>
              <span>·</span>
              <span>{mockArticles[0].date}</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Podcast */}
        <div
          onClick={() => handlePlayPodcast(mockArticles[1])}
          className="group flex flex-col cursor-pointer transition-all"
        >
          {/* Visual Container */}
          <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#1E7D48] shadow-sm group-hover:shadow-md transition-shadow">
            <img
              src="/src/assets/images/article_mental_health_1790867657219.jpg"
              alt="La santé mentale inclusive"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white/95 text-[#1E7D48] shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                {activeAudioItem?.id === mockArticles[1].id && isPlayingAudio ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-1" />
                )}
              </div>
            </div>
          </div>

          {/* Caption / Title */}
          <div className="mt-4">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#DF6847] block">
              Podcast
            </span>
            <h3 className="mt-1 text-base sm:text-lg font-bold text-[#292524] group-hover:text-[#DF6847] transition-colors leading-snug">
              {mockArticles[1].title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-[#786E5D]">
              <Clock className="w-3.5 h-3.5" />
              <span>{mockArticles[1].durationOrReadTime}</span>
              <span>·</span>
              <span>{mockArticles[1].author}</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Web TV */}
        <div
          onClick={() => setSelectedArticle(mockArticles[2])}
          className="group flex flex-col cursor-pointer transition-all"
        >
          {/* Visual Container with exact graphic geometric artwork from mockup Page 4 */}
          <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#F2C94C] shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <rect width="400" height="300" fill="#E8C339" />
              {/* Overlapping large circles from mockup: yellow background with black and red lenses */}
              <circle cx="120" cy="150" r="105" fill="#1A1A1A" />
              <circle cx="280" cy="150" r="105" fill="#1A1A1A" />
              <ellipse cx="200" cy="150" rx="60" ry="95" fill="#E04828" />
              <ellipse cx="120" cy="150" rx="35" ry="55" fill="#E04828" opacity="0.9" />
              <ellipse cx="280" cy="150" rx="35" ry="55" fill="#E04828" opacity="0.9" />
            </svg>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white/95 text-[#E04828] shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Film className="w-6 h-6 ml-0.5" />
              </div>
            </div>
          </div>

          {/* Caption / Title */}
          <div className="mt-4">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#DF6847] block">
              Web TV
            </span>
            <h3 className="mt-1 text-base sm:text-lg font-bold text-[#292524] group-hover:text-[#DF6847] transition-colors leading-snug">
              {mockArticles[2].title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-[#786E5D]">
              <Clock className="w-3.5 h-3.5" />
              <span>{mockArticles[2].durationOrReadTime}</span>
              <span>·</span>
              <span>{mockArticles[2].author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Modal when clicking an article or Web TV */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative bg-[#FAF7EE] max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#DF6847]/30 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EFE8D6] hover:bg-[#E2D8C0] flex items-center justify-center text-[#4A1E0E] cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-serif text-xl font-bold text-[#DF6847]">
              {selectedArticle.type}
            </span>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E] leading-tight">
              {selectedArticle.title}
            </h2>
            <p className="mt-2 text-sm text-[#786E5D] font-medium">
              Par {selectedArticle.author} · {selectedArticle.date} · {selectedArticle.durationOrReadTime}
            </p>

            {/* Video or image header */}
            {selectedArticle.type === 'Web TV' && (
              <div className="mt-4 rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center relative shadow-inner">
                <video
                  controls
                  className="w-full h-full object-cover"
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                />
              </div>
            )}

            {selectedArticle.image && (
              <div className="mt-4 rounded-2xl overflow-hidden max-h-64">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mt-6 text-[#38322D] text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
              {selectedArticle.content}
            </div>

            {/* Reader Comments Section */}
            <div className="mt-8 pt-6 border-t border-[#E3D9C4]">
              <h4 className="text-sm font-bold text-[#4A1E0E] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#DF6847]" />
                <span>Réactions citoyennes (2)</span>
              </h4>

              <div className="mt-3 space-y-3">
                <div className="bg-[#F2EBD9] p-3 rounded-xl text-xs text-[#4A1E0E]">
                  <span className="font-bold block">Amina (habitant rue Myrha)</span>
                  <span className="text-[#6C604F]">« Merci pour cet article qui remet les pendules à l'heure avec beaucoup de nuance et de chaleur. »</span>
                </div>
                <div className="bg-[#F2EBD9] p-3 rounded-xl text-xs text-[#4A1E0E]">
                  <span className="font-bold block">Karim (animateur jeunesse)</span>
                  <span className="text-[#6C604F]">« Nous allons faire lire cet article aux jeunes de l'atelier média dès mercredi prochain ! »</span>
                </div>
              </div>

              {/* Add comment input */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Laisser un commentaire ou témoignage..."
                  className="flex-1 bg-white border border-[#D5C9B3] rounded-full px-4 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                />
                <button
                  onClick={() => alert("Merci pour votre contribution ! Le commentaire sera publié après modération citoyenne.")}
                  className="bg-[#DF6847] hover:bg-[#BA4E30] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
