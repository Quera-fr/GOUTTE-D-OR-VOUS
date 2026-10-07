import React, { useState, useEffect } from 'react';
import { ArticleItem, Language, User, ArticleCategory, Comment, ActiveView } from '../types';
import { translations } from '../data/translations';
import { DatabaseService } from '../services/dbService';
import { Play, Pause, Volume2, Film, BookOpen, Clock, X, MessageSquare, Send, CheckCircle2, User as UserIcon } from 'lucide-react';

interface MediaViewProps {
  currentLang: Language;
  onOpenVolunteerModal: () => void;
  currentUser?: User | null;
  onNavigate?: (view: ActiveView) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({
  currentLang,
  onOpenVolunteerModal,
  currentUser,
  onNavigate,
}) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('Tous');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Audio player state for podcasts
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioItem, setActiveAudioItem] = useState<ArticleItem | null>(null);

  // Articles & Comments state
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentAuthorName, setCommentAuthorName] = useState(currentUser?.name || '');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const refreshArticlesAndComments = () => {
    const fetchedArticles = DatabaseService.getArticles();
    setArticles(fetchedArticles);
  };

  useEffect(() => {
    refreshArticlesAndComments();
  }, []);

  useEffect(() => {
    if (selectedArticle) {
      const artComments = DatabaseService.getComments(selectedArticle.id);
      setComments(artComments);
    }
  }, [selectedArticle]);

  // Categories list matching user request
  const categoryFilters: ArticleCategory[] = [
    'Tous',
    'Articles',
    'WebTV',
    'Web Radio',
    'Archives Goutte d\'Or',
    'Devenir bénévole',
  ];

  const filteredArticles = articles.filter((item) => {
    if (selectedCategory === 'Tous') return true;
    return item.category === selectedCategory || (item.type as string) === (selectedCategory as string);
  });

  const handlePlayPodcast = (item: ArticleItem) => {
    if (activeAudioItem?.id === item.id) {
      setIsPlayingAudio(!isPlayingAudio);
    } else {
      setActiveAudioItem(item);
      setIsPlayingAudio(true);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedArticle) return;

    const authorName = currentUser?.name || commentAuthorName.trim() || 'Visiteur Goutte d’Or';
    const newComment: Comment = {
      id: 'com-' + Date.now(),
      articleId: selectedArticle.id,
      userId: currentUser?.id || 'guest-' + Date.now(),
      authorName: authorName,
      content: commentText.trim(),
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) + ' à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'pending', // Requires admin approval!
    };

    DatabaseService.addComment(newComment);
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 5000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 sm:py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="w-full bg-[#C9D48D] rounded-3xl p-6 sm:p-8 border border-[#B8C57A] shadow-xs">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wide uppercase">
            {t.mediaTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm font-bold text-[#4A1E0E]">
            Le journal sonore, visuel et écrit des habitant.es de la Goutte d’Or
          </p>

          {/* Sub tabs in header for Category Filtering */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#DF6847] text-white shadow-xs font-black'
                    : 'bg-[#FAF7EE] text-[#4A1E0E] hover:bg-[#DF6847] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
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
                Web Radio Goutte d’Or en écoute
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
              className="text-white/60 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {filteredArticles.length === 0 ? (
          <div className="col-span-3 text-center py-12 bg-[#F2EBD9] rounded-3xl p-6 border border-[#E4D9C3]">
            <p className="text-sm font-bold text-[#4A1E0E]">Aucun article trouvé dans cette catégorie pour le moment.</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => {
                if (article.type === 'Podcast') {
                  handlePlayPodcast(article);
                } else {
                  setSelectedArticle(article);
                }
              }}
              className="group flex flex-col cursor-pointer transition-all bg-[#FAF7EE] rounded-2xl p-4 border border-[#E7DECD] hover:border-[#DF6847] hover:shadow-md"
            >
              {/* Media Container */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#E4D9C8] shadow-xs group-hover:shadow-sm">
                {article.type === 'Web TV' ? (
                  <div className="relative w-full h-full bg-[#DF6847] flex items-center justify-center">
                    <Film className="w-12 h-12 text-white/90" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white text-[#DF6847] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>
                ) : article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-[#284B3D] flex items-center justify-center text-white">
                    <BookOpen className="w-12 h-12 text-[#C9D48D]" />
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-[#DF6847] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                  {article.category || article.type}
                </div>
              </div>

              {/* Caption / Title */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#292524] group-hover:text-[#DF6847] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#786E5D] line-clamp-2">
                    {article.subtitle}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-[#786E5D] pt-2 border-t border-[#E7DECD]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#DF6847]" />
                    <span>{article.durationOrReadTime}</span>
                  </div>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          ))
        )}
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

            <span className="font-serif text-sm font-bold text-[#DF6847] uppercase tracking-wider">
              {selectedArticle.category || selectedArticle.type}
            </span>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E] leading-tight">
              {selectedArticle.title}
            </h2>
            <p className="mt-2 text-xs text-[#786E5D] font-medium">
              Par {selectedArticle.author} · {selectedArticle.date} · {selectedArticle.durationOrReadTime}
            </p>

            {/* Video or image header */}
            {selectedArticle.type === 'Web TV' && (
              <div className="mt-4 rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center relative shadow-inner">
                <video
                  controls
                  className="w-full h-full object-cover"
                  src={selectedArticle.videoUrl || "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"}
                />
              </div>
            )}

            {selectedArticle.image && selectedArticle.type !== 'Web TV' && (
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
                <span>Réactions des lecteurs ({comments.length})</span>
              </h4>

              {commentSuccess && (
                <div className="mt-3 p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Merci ! Votre commentaire a été enregistré et sera publié dès validation par un administrateur.</span>
                </div>
              )}

              <div className="mt-3 space-y-3">
                {comments.length === 0 ? (
                  <p className="text-xs text-[#786E5D] italic">Aucun commentaire publié pour l'instant. Soyez le premier à réagir !</p>
                ) : (
                  comments.map((comm) => (
                    <div key={comm.id} className="bg-[#F2EBD9] p-3 rounded-xl text-xs text-[#4A1E0E]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">{comm.authorName}</span>
                        <span className="text-[10px] text-[#786E5D]">{comm.date}</span>
                      </div>
                      <p className="text-[#4A1E0E] font-medium">« {comm.content} »</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add comment input form */}
              <form onSubmit={handleSendComment} className="mt-4 space-y-2">
                {!currentUser && (
                  <div>
                    <input
                      type="text"
                      required
                      value={commentAuthorName}
                      onChange={(e) => setCommentAuthorName(e.target.value)}
                      placeholder="Votre nom / pseudo..."
                      className="w-full bg-white border border-[#D5C9B3] rounded-xl px-4 py-2 text-xs text-[#292524] outline-none focus:border-[#DF6847]"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Laisser un commentaire ou réagir..."
                    className="flex-1 bg-white border border-[#D5C9B3] rounded-full px-4 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                  />
                  <button
                    type="submit"
                    className="bg-[#DF6847] hover:bg-[#BA4E30] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer</span>
                  </button>
                </div>
                <p className="text-[10px] text-[#786E5D]">
                  🔒 Les commentaires sont soumis à la modération d'un administrateur avant publication.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
