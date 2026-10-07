import React, { useState, useEffect } from 'react';
import { User, DirectoryStructure, AgendaEvent, AgirOpportunity, ArticleItem, Comment, ActiveView, ArticleCategory } from '../types';
import { DatabaseService } from '../services/dbService';
import { Shield, Check, X, PlusCircle, Building, Calendar, Megaphone, FileText, MessageSquare, AlertCircle, Trash2, Users, Search, UserCheck } from 'lucide-react';

interface AdminViewProps {
  currentUser: User;
  onNavigate: (view: ActiveView) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ currentUser, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'validations' | 'manageAccounts' | 'createAssoc' | 'createEvent' | 'createPost' | 'createArticle'>('validations');

  // Lists from DB
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Account Management state
  const [accountSearch, setAccountSearch] = useState('');
  const [accountRoleFilter, setAccountRoleFilter] = useState<'all' | 'admin' | 'association' | 'user' | 'pending'>('all');

  // Form states for Admin actions
  const [assocName, setAssocName] = useState('');
  const [assocCategory, setAssocCategory] = useState<'sante' | 'culture' | 'jeunesse' | 'education' | 'sport' | 'maison_assoc'>('culture');
  const [assocAddress, setAssocAddress] = useState('');
  const [assocPublic, setAssocPublic] = useState('Tout public');
  const [assocHoraires, setAssocHoraires] = useState('');
  const [assocPhone, setAssocPhone] = useState('');
  const [assocEmail, setAssocEmail] = useState('');
  const [assocHistoire, setAssocHistoire] = useState('');

  // Event form
  const [eventTitle, setEventTitle] = useState('');
  const [eventDay, setEventDay] = useState('15');
  const [eventMonth, setEventMonth] = useState<'Septembre' | 'Octobre' | 'Novembre' | 'Décembre'>('Octobre');
  const [eventLocation, setEventLocation] = useState('');
  const [eventShortDesc, setEventShortDesc] = useState('');
  const [eventFullDesc, setEventFullDesc] = useState('');
  const [eventTime, setEventTime] = useState('14:00 - 17:00');
  const [eventOrganizer, setEventOrganizer] = useState('');

  // Post form
  const [postTitle, setPostTitle] = useState('');
  const [postOrgName, setPostOrgName] = useState('');
  const [postType, setPostType] = useState<'benevolat' | 'emploi' | 'volontariat' | 'mecenat'>('benevolat');
  const [postDuration, setPostDuration] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postEmail, setPostEmail] = useState('');

  // Article form
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSubtitle, setArticleSubtitle] = useState('');
  const [articleCategory, setArticleCategory] = useState<ArticleCategory>('Articles');
  const [articleAuthor, setArticleAuthor] = useState('Rédaction Goutte d’Or & Vous');
  const [articleContent, setArticleContent] = useState('');
  const [articleType, setArticleType] = useState<'Article' | 'Podcast' | 'Web TV'>('Article');
  const [articleMediaUrl, setArticleMediaUrl] = useState('');

  const [notification, setNotification] = useState('');

  const refreshData = () => {
    // Fetch users from API and fallback to DatabaseService
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
        } else {
          setUsers(DatabaseService.getUsers());
        }
      })
      .catch(() => {
        setUsers(DatabaseService.getUsers());
      });

    setComments(DatabaseService.getAllComments());
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (currentUser.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#4A1E0E]">Accès Réservé aux Administrateurs</h1>
        <p className="text-sm text-[#786E5D] mt-2 mb-6">Vous devez être connecté avec un compte administrateur pour accéder à cet espace.</p>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2.5 bg-[#DF6847] text-white font-bold rounded-xl"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const handleValidateUser = async (userId: string) => {
    DatabaseService.updateUserStatus(userId, 'approved');

    try {
      await fetch('/api/users/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
    } catch (_) {}

    setNotification('Compte validé avec succès !');
    refreshData();
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (userId === currentUser.id) {
      alert('Vous ne pouvez pas supprimer votre propre compte administrateur connecté !');
      return;
    }

    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le compte "${userName}" et ses données associées ?`)) {
      return;
    }

    DatabaseService.deleteUser(userId);

    try {
      await fetch('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
    } catch (_) {}

    setNotification(`Le compte "${userName}" a été supprimé de la base de données.`);
    refreshData();
    setTimeout(() => setNotification(''), 4000);
  };

  const handleApproveComment = (commentId: string) => {
    DatabaseService.updateCommentStatus(commentId, 'approved');
    setNotification('Commentaire approuvé et publié !');
    refreshData();
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDeleteComment = (commentId: string) => {
    DatabaseService.deleteComment(commentId);
    setNotification('Commentaire supprimé.');
    refreshData();
    setTimeout(() => setNotification(''), 3000);
  };

  // Submit Admin Create Association
  const handleCreateAssocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAssoc: DirectoryStructure = {
      id: 'assoc-' + Date.now(),
      name: assocName,
      category: assocCategory,
      categoryLabel: assocCategory === 'sante' ? 'Santé' : assocCategory === 'culture' ? 'Culture' : assocCategory === 'jeunesse' ? 'Jeunesse' : assocCategory === 'education' ? 'Éducation' : assocCategory === 'sport' ? 'Sport' : 'Maison d’Associations',
      address: assocAddress,
      publicCible: assocPublic,
      horaires: assocHoraires,
      phone: assocPhone,
      email: assocEmail,
      thematique: 'Vie associative Goutte d’Or',
      mapCoords: { x: 50, y: 50 },
      histoire: assocHistoire || 'Association nouvellement ajoutée au quartier.',
      activites: 'Activités et permanences de quartier.',
      fonctionnement: 'Association du 18e arrondissement.',
      contactsDetails: `📍 ${assocAddress} · 📞 ${assocPhone} · ✉️ ${assocEmail}`,
      status: 'approved',
    };

    DatabaseService.addAssociation(newAssoc);

    try {
      await fetch('/api/associations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssoc),
      });
    } catch (_) {}

    setNotification(`Association "${assocName}" enregistrée dans la base SQLite (database.sqlite) et affichée sur la carte !`);
    setAssocName(''); setAssocAddress(''); setAssocEmail(''); setAssocPhone(''); setAssocHistoire('');
    setTimeout(() => setNotification(''), 4000);
  };

  // Submit Admin Create Event
  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: AgendaEvent = {
      id: 'ev-' + Date.now(),
      day: eventDay,
      month: eventMonth,
      title: eventTitle,
      shortDesc: eventShortDesc,
      location: eventLocation,
      fullDesc: eventFullDesc,
      colorTheme: 'orange',
      position: 'top',
      time: eventTime,
      organizer: eventOrganizer || currentUser.name,
      status: 'approved',
    };
    DatabaseService.addEvent(newEvent);
    setNotification(`Événement "${eventTitle}" ajouté à l'agenda !`);
    setEventTitle(''); setEventShortDesc(''); setEventFullDesc(''); setEventLocation('');
    setTimeout(() => setNotification(''), 4000);
  };

  // Submit Admin Create Post
  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: AgirOpportunity = {
      id: 'post-' + Date.now(),
      orgName: postOrgName || currentUser.name,
      title: postTitle,
      type: postType,
      typeLabel: postType === 'emploi' ? 'Emploi / CDD' : postType === 'benevolat' ? 'Bénévolat' : postType === 'volontariat' ? 'Volontariat' : 'Mécénat',
      buttonText: 'Je m’engage',
      bgColor: 'red',
      petalColor: '#DF6847',
      image: '',
      duration: postDuration,
      description: postDesc,
      requirements: ['Engagé.e pour la Goutte d’Or'],
      contactEmail: postEmail || currentUser.email,
      status: 'approved',
    };
    DatabaseService.addPost(newPost);
    setNotification(`Annonce "${postTitle}" publiée dans l'Espace Agir !`);
    setPostTitle(''); setPostDesc(''); setPostDuration(''); setPostEmail('');
    setTimeout(() => setNotification(''), 4000);
  };

  // Submit Admin Create Article
  const handleCreateArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArt: ArticleItem = {
      id: 'art-' + Date.now(),
      type: articleType,
      title: articleTitle,
      subtitle: articleSubtitle,
      author: articleAuthor,
      durationOrReadTime: '5 min de lecture',
      image: '/src/assets/images/article_garcon_arabe_1790867645835.jpg',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: articleCategory,
      content: articleContent,
      audioUrl: articleType === 'Podcast' ? articleMediaUrl : undefined,
      videoUrl: articleType === 'Web TV' ? articleMediaUrl : undefined,
    };
    DatabaseService.addArticle(newArt);
    setNotification(`Article "${articleTitle}" publié dans Le Média sous la catégorie "${articleCategory}" !`);
    setArticleTitle(''); setArticleSubtitle(''); setArticleContent(''); setArticleMediaUrl('');
    setTimeout(() => setNotification(''), 4000);
  };

  const pendingAssocs = users.filter((u) => u.role === 'association' && u.status === 'pending');
  const pendingCommentsList = comments.filter((c) => c.status === 'pending');

  // Accounts filtering
  const filteredUsers = users.filter((u) => {
    if (accountRoleFilter === 'admin' && u.role !== 'admin') return false;
    if (accountRoleFilter === 'association' && u.role !== 'association') return false;
    if (accountRoleFilter === 'user' && u.role !== 'user') return false;
    if (accountRoleFilter === 'pending' && u.status !== 'pending') return false;

    if (accountSearch.trim()) {
      const q = accountSearch.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-[#FAF7EE] border-2 border-[#DF6847] rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E7DECD] pb-6 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#DF6847] text-white rounded-2xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#4A1E0E]">Espace Administration</h1>
              <p className="text-xs text-[#786E5D]">
                Gestion des comptes, modération des commentaires et publication de contenus
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#DF6847] text-white text-xs font-bold uppercase rounded-full">
            Admin Connecté
          </span>
        </div>

        {notification && (
          <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#E7DECD] pb-4 mb-6">
          <button
            onClick={() => setActiveTab('validations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'validations'
                ? 'bg-[#DF6847] text-white shadow-xs'
                : 'bg-[#F2EBD9] text-[#5C5042] hover:bg-[#EBE2CD]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Validations en attente</span>
            {(pendingAssocs.length > 0 || pendingCommentsList.length > 0) && (
              <span className="px-2 py-0.5 text-[10px] bg-red-600 text-white rounded-full font-black">
                {pendingAssocs.length + pendingCommentsList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('manageAccounts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'manageAccounts'
                ? 'bg-[#4A1E0E] text-white shadow-xs'
                : 'bg-[#F2EBD9] text-[#5C5042] hover:bg-[#EBE2CD]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gestion des Comptes ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('createAssoc')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'createAssoc'
                ? 'bg-[#284B3D] text-white shadow-xs'
                : 'bg-[#F2EBD9] text-[#5C5042] hover:bg-[#EBE2CD]'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Créer une Asso</span>
          </button>

          <button
            onClick={() => setActiveTab('createEvent')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'createEvent'
                ? 'bg-[#DF6847] text-white shadow-xs'
                : 'bg-[#F2EBD9] text-[#5C5042] hover:bg-[#EBE2CD]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Publier un Événement</span>
          </button>

          <button
            onClick={() => setActiveTab('createPost')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'createPost'
                ? 'bg-[#F05727] text-white shadow-xs'
                : 'bg-[#F2EBD9] text-[#5C5042] hover:bg-[#EBE2CD]'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Publier une Annonce</span>
          </button>

          <button
            onClick={() => setActiveTab('createArticle')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'createArticle'
                ? 'bg-[#4A1E0E] text-white shadow-xs'
                : 'bg-[#F2EBD9] text-[#5C5042] hover:bg-[#EBE2CD]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Créer un Article</span>
          </button>
        </div>

        {/* TAB 1: VALIDATIONS (ASSOCS & COMMENTS) */}
        {activeTab === 'validations' && (
          <div className="space-y-8">
            {/* Associations Pending */}
            <div>
              <h2 className="text-base font-serif font-bold text-[#4A1E0E] mb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#284B3D]" />
                <span>Associations en attente de validation ({pendingAssocs.length})</span>
              </h2>

              {pendingAssocs.length === 0 ? (
                <div className="p-4 bg-[#F2EBD9] rounded-2xl text-xs text-[#786E5D]">
                  Aucune demande d'inscription d'association en attente.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingAssocs.map((assoc) => (
                    <div key={assoc.id} className="p-4 bg-white border border-[#E7DECD] rounded-2xl flex items-center justify-between shadow-2xs">
                      <div>
                        <div className="font-bold text-sm text-[#4A1E0E]">{assoc.name}</div>
                        <div className="text-xs text-[#786E5D]">{assoc.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleValidateUser(assoc.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Check className="w-4 h-4" />
                          <span>Valider l’association</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(assoc.id, assoc.name)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Refuser</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comments Pending */}
            <div>
              <h2 className="text-base font-serif font-bold text-[#4A1E0E] mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#DF6847]" />
                <span>Commentaires d'articles en attente de modération ({pendingCommentsList.length})</span>
              </h2>

              {pendingCommentsList.length === 0 ? (
                <div className="p-4 bg-[#F2EBD9] rounded-2xl text-xs text-[#786E5D]">
                  Tous les commentaires soumis ont été modérés et validés.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingCommentsList.map((comm) => (
                    <div key={comm.id} className="p-4 bg-white border border-[#E7DECD] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-2xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#4A1E0E]">{comm.authorName}</span>
                          <span className="text-[10px] text-[#786E5D]">{comm.date}</span>
                        </div>
                        <p className="text-xs text-[#292524] italic mt-1 bg-[#FAF7EE] p-2 rounded-lg border border-[#E7DECD]">
                          "{comm.content}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleApproveComment(comm.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approuver</span>
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comm.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE ACCOUNTS (FILTER & DELETE ACCOUNTS) */}
        {activeTab === 'manageAccounts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F2EBD9] p-4 rounded-2xl border border-[#E4D9C3]">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#786E5D] absolute left-3 top-3" />
                <input
                  type="text"
                  value={accountSearch}
                  onChange={(e) => setAccountSearch(e.target.value)}
                  placeholder="Rechercher par nom ou email..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                />
              </div>

              {/* Filter Role */}
              <div className="flex flex-wrap items-center gap-1 text-xs">
                {(['all', 'admin', 'association', 'user', 'pending'] as const).map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setAccountRoleFilter(filterKey)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      accountRoleFilter === filterKey
                        ? 'bg-[#DF6847] text-white shadow-2xs'
                        : 'bg-white text-[#4A1E0E] hover:bg-[#FAF7EE] border border-[#E7DECD]'
                    }`}
                  >
                    {filterKey === 'all'
                      ? 'Tous'
                      : filterKey === 'admin'
                      ? 'Admins'
                      : filterKey === 'association'
                      ? 'Associations'
                      : filterKey === 'user'
                      ? 'Habitants'
                      : 'En attente'}
                  </button>
                ))}
              </div>
            </div>

            {/* User Cards Grid */}
            <div className="space-y-3">
              {filteredUsers.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border border-[#E7DECD] text-center text-xs text-[#786E5D]">
                  Aucun compte d'utilisateur ne correspond à votre recherche.
                </div>
              ) : (
                filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="p-4 bg-white border border-[#E7DECD] rounded-2xl flex items-center justify-between gap-4 shadow-2xs hover:border-[#DF6847] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#F2EBD9] text-[#4A1E0E]">
                        {u.role === 'admin' ? (
                          <Shield className="w-5 h-5 text-[#DF6847]" />
                        ) : u.role === 'association' ? (
                          <Building className="w-5 h-5 text-[#284B3D]" />
                        ) : (
                          <Users className="w-5 h-5 text-[#5C5042]" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#4A1E0E] flex items-center gap-2">
                          <span>{u.name}</span>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full ${
                              u.role === 'admin'
                                ? 'bg-[#DF6847] text-white'
                                : u.role === 'association'
                                ? 'bg-[#284B3D] text-white'
                                : 'bg-[#E4D9C8] text-[#4A1E0E]'
                            }`}
                          >
                            {u.role}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                              u.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {u.status === 'approved' ? 'Validé' : 'En attente'}
                          </span>
                        </div>
                        <div className="text-xs text-[#786E5D]">{u.email}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {u.status === 'pending' && (
                        <button
                          onClick={() => handleValidateUser(u.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Valider</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(u.id, u.name)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        title="Supprimer définitivement le compte"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CREATE ASSOC */}
        {activeTab === 'createAssoc' && (
          <form onSubmit={handleCreateAssocSubmit} className="space-y-4">
            <h2 className="text-base font-serif font-bold text-[#4A1E0E]">Créer une nouvelle Association dans l'annuaire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Nom de l’association *</label>
                <input type="text" required value={assocName} onChange={(e) => setAssocName(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" placeholder="Nom..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Catégorie *</label>
                <select value={assocCategory} onChange={(e) => setAssocCategory(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white">
                  <option value="sante">Santé</option>
                  <option value="culture">Culture</option>
                  <option value="jeunesse">Jeunesse</option>
                  <option value="education">Éducation</option>
                  <option value="sport">Sport</option>
                  <option value="maison_assoc">Maison d’Associations</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Adresse *</label>
              <input type="text" required value={assocAddress} onChange={(e) => setAssocAddress(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" placeholder="Adresse complète..." />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-[#284B3D] text-white text-xs font-bold rounded-xl cursor-pointer">
              Enregistrer l'association
            </button>
          </form>
        )}

        {/* TAB 4: CREATE EVENT */}
        {activeTab === 'createEvent' && (
          <form onSubmit={handleCreateEventSubmit} className="space-y-4">
            <h2 className="text-base font-serif font-bold text-[#4A1E0E]">Publier un Événement dans l'Agenda</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Titre de l’événement *</label>
                <input type="text" required value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Jour (ex: 18) *</label>
                <input type="text" required value={eventDay} onChange={(e) => setEventDay(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Mois *</label>
                <select value={eventMonth} onChange={(e) => setEventMonth(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white">
                  <option value="Septembre">Septembre</option>
                  <option value="Octobre">Octobre</option>
                  <option value="Novembre">Novembre</option>
                  <option value="Décembre">Décembre</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Lieu *</label>
              <input type="text" required value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Description courte *</label>
              <input type="text" required value={eventShortDesc} onChange={(e) => setEventShortDesc(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Description complète</label>
              <textarea rows={3} value={eventFullDesc} onChange={(e) => setEventFullDesc(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-[#DF6847] text-white text-xs font-bold rounded-xl cursor-pointer">
              Publier l'événement
            </button>
          </form>
        )}

        {/* TAB 5: CREATE POST */}
        {activeTab === 'createPost' && (
          <form onSubmit={handleCreatePostSubmit} className="space-y-4">
            <h2 className="text-base font-serif font-bold text-[#4A1E0E]">Publier une Annonce dans l'Espace Agir</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Titre de l’annonce *</label>
                <input type="text" required value={postTitle} onChange={(e) => setPostTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Type d’annonce *</label>
                <select value={postType} onChange={(e) => setPostType(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white">
                  <option value="benevolat">Bénévolat</option>
                  <option value="emploi">Emploi / CDD</option>
                  <option value="volontariat">Volontariat / Service Civique</option>
                  <option value="mecenat">Mécénat de compétences</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Description de la mission *</label>
              <textarea rows={3} required value={postDesc} onChange={(e) => setPostDesc(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-[#F05727] text-white text-xs font-bold rounded-xl cursor-pointer">
              Publier l'annonce
            </button>
          </form>
        )}

        {/* TAB 6: CREATE ARTICLE */}
        {activeTab === 'createArticle' && (
          <form onSubmit={handleCreateArticleSubmit} className="space-y-4">
            <h2 className="text-base font-serif font-bold text-[#4A1E0E]">Créer un Article / Média</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Titre de l’article *</label>
                <input type="text" required value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Catégorie d’Article *</label>
                <select
                  value={articleCategory}
                  onChange={(e) => setArticleCategory(e.target.value as ArticleCategory)}
                  className="w-full px-3 py-2 border border-[#DF6847] rounded-xl text-xs font-bold bg-white text-[#4A1E0E]"
                >
                  <option value="Articles">Articles</option>
                  <option value="WebTV">WebTV</option>
                  <option value="Web Radio">Web Radio</option>
                  <option value="Archives Goutte d'Or">Archives Goutte d'Or</option>
                  <option value="Devenir bénévole">Devenir bénévole</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Sous-titre / Résumé</label>
                <input type="text" value={articleSubtitle} onChange={(e) => setArticleSubtitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Format Média</label>
                <select
                  value={articleType}
                  onChange={(e) => setArticleType(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white"
                >
                  <option value="Article">Article Texte</option>
                  <option value="Podcast">Podcast Audio</option>
                  <option value="Web TV">Vidéo WebTV</option>
                </select>
              </div>
            </div>

            {(articleType === 'Podcast' || articleType === 'Web TV') && (
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">URL Média (MP3 / MP4)</label>
                <input type="text" value={articleMediaUrl} onChange={(e) => setArticleMediaUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#4A1E0E] mb-1">Contenu complet de l’article *</label>
              <textarea rows={6} required value={articleContent} onChange={(e) => setArticleContent(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
            </div>

            <button type="submit" className="px-6 py-2.5 bg-[#4A1E0E] hover:bg-[#34150A] text-white text-xs font-bold rounded-xl cursor-pointer shadow-md">
              Publier l'article sur Le Média
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
