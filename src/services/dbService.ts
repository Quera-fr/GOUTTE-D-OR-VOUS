import {
  User,
  DirectoryStructure,
  AgendaEvent,
  AgirOpportunity,
  ArticleItem,
  Comment,
} from '../types';
import {
  mockArticles,
  mockAgendaEvents,
  mockDirectoryStructures,
  mockAgirOpportunities,
} from '../data/mockData';

const DB_KEY_USERS = 'goutte_dor_users';
const DB_KEY_ASSOCS = 'goutte_dor_assocs';
const DB_KEY_EVENTS = 'goutte_dor_events';
const DB_KEY_POSTS = 'goutte_dor_posts';
const DB_KEY_ARTICLES = 'goutte_dor_articles';
const DB_KEY_COMMENTS = 'goutte_dor_comments';

// Initial Users
const initialUsers: User[] = [
  {
    id: 'usr-admin',
    email: 'admin@gouttedor.fr',
    name: 'Administrateur Goutte d’Or',
    role: 'admin',
    status: 'approved',
  },
  {
    id: 'usr-stbruno',
    email: 'contact@sallesaintbruno.org',
    name: 'Salle Saint-Bruno',
    role: 'association',
    status: 'approved',
    associationId: 'salle-saint-bruno',
  },
  {
    id: 'usr-quera',
    email: 'kevin.duranty@quera.fr',
    name: 'Quera Fablab',
    role: 'association',
    status: 'approved',
    associationId: 'quera-fablab',
  },
  {
    id: 'usr-hsm',
    email: 'contact@hsm.com',
    name: 'Home Sweet Mômes',
    role: 'association',
    status: 'approved',
    associationId: 'home-sweet-momes',
  },
  {
    id: 'usr-pending-assoc',
    email: 'contact@eco-gouttedor.org',
    name: 'Éco-Goutte d’Or (En attente)',
    role: 'association',
    status: 'pending',
  },
  {
    id: 'usr-citizen1',
    email: 'jean.dupont@gmail.com',
    name: 'Jean Dupont',
    role: 'user',
    status: 'approved',
  },
];

// Initial 10+ Associations
const initialAssocs: DirectoryStructure[] = [
  {
    id: 'quera-fablab',
    name: 'Quera Fablab',
    logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
    category: 'maison_assoc',
    categoryLabel: 'Maison d’Associations',
    address: '12 rue Polonceau, 75018 Paris',
    publicCible: 'Tout public, makers, jeunes et habitant.es',
    horaires: 'Lundi - Samedi de 10h00 à 19h00',
    phone: '01 40 00 18 18',
    email: 'kevin.duranty@quera.fr',
    website: 'https://quera.fr',
    thematique: 'Fabrication numérique & Tiers-lieu',
    contact: '01 40 00 18 18 - kevin.duranty@quera.fr',
    mapCoords: { x: 35, y: 48 },
    lat: 48.8876,
    lng: 2.3530,
    histoire: `Fablab solidaire implanté au cœur du 18e arrondissement, favorisant l’inclusion numérique, la création artisanale et le bricolage partagé.`,
    activites: `• Impression 3D, découpe laser et broderie numérique.
• Ateliers de réparation et projets de quartier.
• Formation au numérique et accompagnement des jeunes.`,
    fonctionnement: `Ouvert aux adhérents et habitant.es du quartier.`,
    contactsDetails: `📍 12 rue Polonceau, 75018 Paris · ✉️ kevin.duranty@quera.fr`,
    status: 'approved',
  },
  ...mockDirectoryStructures,
  {
    id: 'echo-musee',
    name: 'Echo Musée',
    logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    category: 'culture',
    categoryLabel: 'Culture',
    address: '21 rue Cavé, 75018 Paris',
    publicCible: 'Tout public, artistes et passionnés d’art populaire',
    horaires: 'Du mardi au samedi de 14h00 à 19h00',
    phone: '01 42 23 45 67',
    email: 'contact@echomusee.fr',
    website: 'https://echomusee.fr',
    thematique: 'Art urbain & Mémoire de quartier',
    contact: '01 42 23 45 67 - contact@echomusee.fr',
    mapCoords: { x: 45, y: 52 },
    histoire: `Espace culturel alternatif et indépendant fondé dans les années 90, l'Echo Musée défend la création populaire, les expositions engagées et la mémoire vivante des habitants de la Goutte d'Or.`,
    activites: `• Expositions de peinture, sculpture et street art local.
• Ateliers d'arts plastiques et créatifs pour jeunes et adultes.
• Soirées poésie, théâtre de rue et déambulations culturelles.`,
    fonctionnement: `Association loi 1901 à gestion collective et participative.`,
    contactsDetails: `📍 21 rue Cavé, 75018 Paris · 📞 01 42 23 45 67`,
    status: 'approved',
  },
  {
    id: 'jardin-univert',
    name: 'Jardin L’Univert',
    logo: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&q=80',
    category: 'maison_assoc',
    categoryLabel: 'Maison d’Associations et d’habitant.es',
    address: '35 rue Polonceau, 75018 Paris',
    publicCible: 'Familles, riverains et passionnés de jardinage',
    horaires: 'Mercredi & Samedi 14h00-18h00 / Dimanche 11h-17h',
    phone: '06 98 76 54 32',
    email: 'univert@gouttedor.org',
    website: 'https://lunivert.gouttedor.org',
    thematique: 'Écologie urbaine & Jardinage partagé',
    contact: '06 98 76 54 32 - univert@gouttedor.org',
    mapCoords: { x: 30, y: 42 },
    histoire: `Pionnier de l'agriculture urbaine solidaire à la Goutte d'Or, L'Univert a transformé une friche en un havre de verdure et de biodiversité géré par les habitant.es.`,
    activites: `• Jardinage écologique collectif et bacs de compostage.
• Ateliers Repair Café et bricolage recyclé.
• Repas partagés et événements conviviaux en plein air.`,
    fonctionnement: `Adhésion annuelle symbolique et participation libre aux tâches du jardin.`,
    contactsDetails: `📍 35 rue Polonceau, 75018 Paris`,
    status: 'approved',
  },
];

// Initial Articles matching user specified categories
const initialArticles: ArticleItem[] = [
  {
    id: 'art-1',
    type: 'Article',
    title: 'Les fictions du garçon arabe : retour sur un mythe persistant',
    subtitle: 'Analyse critique et représentations contemporaines dans l’espace public parisien.',
    author: 'Rédaction Goutte d’Or & Vous',
    durationOrReadTime: '8 min de lecture',
    image: '/src/assets/images/article_garcon_arabe_1790867645835.jpg',
    date: '12 Septembre 2026',
    category: 'Articles',
    content: `Comment les représentations médiatiques et littéraires ont-elles façonné la figure du "garçon arabe" dans les quartiers populaires ?

Dans cette enquête menée auprès des habitant.es, chercheur.ses et artistes de la Goutte d'Or, nous explorons l'écart abyssal entre les stéréotypes véhiculés depuis des décennies et les réalités plurielles, vivantes et créatives du 18e arrondissement.

À travers des témoignages recueillis lors d'ateliers d'écriture à l'Institut des Cultures d'Islam et à la bibliothèque Fleury, les participant.es déconstruisent les récits dominants pour réaffirmer leurs trajectoires individuelles, leurs aspirations universitaires, artistiques et citoyennes.`,
  },
  {
    id: 'art-2',
    type: 'Podcast',
    title: 'La santé mentale inclusive : Écouter sans tabou',
    subtitle: 'Soins de proximité et accueil inconditionnel à la Goutte d’Or.',
    author: 'Radio Goutte d’Or',
    durationOrReadTime: '24 min',
    image: '/src/assets/images/article_mental_health_1790867657219.jpg',
    date: '15 Septembre 2026',
    category: 'Web Radio',
    audioUrl: 'https://cdn.freesound.org/previews/518/518712_10817342-lq.mp3',
    content: `Dans ce premier volet de notre série sonore consacrée au bien-être psychologique dans le quartier, nous avons tendu le micro aux équipes du Centre de Santé Goutte d'Or, aux médiatrices culturelles de la Salle Saint-Bruno et à des habitant.es.`,
  },
  {
    id: 'art-3',
    type: 'Web TV',
    title: 'Portraits sensibles : Couturier.es de la rue des Gardes',
    subtitle: 'Regards croisés d’artisan.es et créateurs du bas de la rue Myrha.',
    author: 'Web TV Barbès',
    durationOrReadTime: '14 min',
    image: '/src/assets/images/agir_volunteer_woman_1790867671460.jpg',
    date: '18 Septembre 2026',
    category: 'WebTV',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    content: `La rue des Gardes, surnommée "la rue de la mode", abrite des ateliers où s'entremêlent broderie traditionnelle, upcycling moderne et couture sur-mesure.`,
  },
  {
    id: 'art-4',
    type: 'Article',
    title: 'Archives orales : Les bâtisseurs de la Rue Polonceau',
    subtitle: 'Récits des luttes urbaines des années 80 et 90 préservés à la Salle Saint-Bruno.',
    author: 'Comité Histoire & Mémoire',
    durationOrReadTime: '6 min de lecture',
    image: '/src/assets/images/article_garcon_arabe_1790867645835.jpg',
    date: '20 Septembre 2026',
    category: 'Archives Goutte d\'Or',
    content: `Des barricades citoyennes pour préserver l'habitat populaire jusqu'à la création des premiers jardins partagés, replongez dans les archives sonores numérisées du quartier.`,
  },
  {
    id: 'art-5',
    type: 'Article',
    title: 'Guide du bénévole : Comment s’engager à la Goutte d’Or ?',
    subtitle: 'Toutes les clés pour donner de son temps auprès des associations locales.',
    author: 'Equipe Goutte d\'Or & Vous',
    durationOrReadTime: '5 min de lecture',
    image: '/src/assets/images/agir_volunteer_man_1790867682638.jpg',
    date: '25 Septembre 2026',
    category: 'Devenir bénévole',
    content: `Vous habitez le 18e ou les environs et souhaitez vous impliquer dans l'accompagnement scolaire, l'animation culturelle ou la distribution solidaire ? Retrouvez notre guide pratique pas à pas.`,
  },
];

const initialComments: Comment[] = [
  {
    id: 'com-1',
    articleId: 'art-1',
    userId: 'usr-citizen1',
    authorName: 'Jean Dupont',
    content: 'Article passionnant et très bien documenté ! Merci pour cette mise en lumière.',
    date: '14 Septembre 2026 à 10:15',
    status: 'approved',
  },
  {
    id: 'com-2',
    articleId: 'art-1',
    userId: 'usr-citizen1',
    authorName: 'Amine K.',
    content: 'En tant qu’habitant de la rue Myrha depuis 20 ans, je valide totalement cette analyse.',
    date: '15 Septembre 2026 à 14:20',
    status: 'approved',
  },
  {
    id: 'com-3',
    articleId: 'art-2',
    userId: 'usr-citizen1',
    authorName: 'Sophie M.',
    content: 'Un podcast touchant et très utile. Bravo à la Web Radio !',
    date: '16 Septembre 2026 à 18:00',
    status: 'pending', // En attente de validation admin !
  },
];

// Helper functions for localStorage persistence
const getItem = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setItem = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export class DatabaseService {
  // Database Initialization
  static initDB() {
    if (!localStorage.getItem(DB_KEY_USERS)) setItem(DB_KEY_USERS, initialUsers);
    if (!localStorage.getItem(DB_KEY_ASSOCS)) setItem(DB_KEY_ASSOCS, initialAssocs);
    if (!localStorage.getItem(DB_KEY_EVENTS)) setItem(DB_KEY_EVENTS, mockAgendaEvents);
    if (!localStorage.getItem(DB_KEY_POSTS)) setItem(DB_KEY_POSTS, mockAgirOpportunities);
    if (!localStorage.getItem(DB_KEY_ARTICLES)) setItem(DB_KEY_ARTICLES, initialArticles);
    if (!localStorage.getItem(DB_KEY_COMMENTS)) setItem(DB_KEY_COMMENTS, initialComments);
  }

  // Address-to-Coordinates helper for 18e arrondissement Paris map
  static calculateCoordsFromAddress(address: string): { x: number; y: number } {
    const lower = (address || '').toLowerCase();
    if (lower.includes('saint-luc') || lower.includes('affre')) return { x: 74, y: 58 };
    if (lower.includes('charbonnière')) return { x: 38, y: 77 };
    if (lower.includes('polonceau')) return { x: 35, y: 48 };
    if (lower.includes('stephenson')) return { x: 57, y: 39 };
    if (lower.includes('saint-bernard')) return { x: 60, y: 74 };
    if (lower.includes('saint-jérôme')) return { x: 62, y: 78 };
    if (lower.includes('doudeauville')) return { x: 61, y: 84 };
    if (lower.includes('richomme')) return { x: 34, y: 66 };
    if (lower.includes('cavé')) return { x: 45, y: 52 };
    if (lower.includes('myrha') || lower.includes('gardes')) return { x: 48, y: 62 };
    if (lower.includes('barbès') || lower.includes('château rouge')) return { x: 25, y: 50 };
    // Pseudo-random deterministic placement inside Goutte d'Or 18e map rectangle
    let hash = 0;
    for (let i = 0; i < address.length; i++) hash = (hash << 5) - hash + address.charCodeAt(i);
    const posX = 25 + (Math.abs(hash) % 55);
    const posY = 30 + (Math.abs(hash >> 3) % 50);
    return { x: posX, y: posY };
  }

  // --- USERS & AUTH ---
  static getUsers(): User[] {
    return getItem(DB_KEY_USERS, initialUsers);
  }

  static addUser(user: User): User {
    const users = this.getUsers();
    users.push(user);
    setItem(DB_KEY_USERS, users);
    return user;
  }

  static deleteUser(userId: string): void {
    let users = this.getUsers();
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser && targetUser.associationId) {
      this.deleteAssociation(targetUser.associationId);
    }
    users = users.filter((u) => u.id !== userId);
    setItem(DB_KEY_USERS, users);
  }

  static deleteAssociation(assocId: string): void {
    let assocs = this.getAllAssociations();
    assocs = assocs.filter((a) => a.id !== assocId);
    setItem(DB_KEY_ASSOCS, assocs);
  }

  static updateUserStatus(userId: string, status: 'approved' | 'pending'): void {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users[index].status = status;
      setItem(DB_KEY_USERS, users);

      // If user has associated associationId, approve the association in directory too!
      if (users[index].associationId) {
        const assocs = this.getAllAssociations();
        const aIdx = assocs.findIndex((a) => a.id === users[index].associationId);
        if (aIdx !== -1) {
          assocs[aIdx].status = status;
          setItem(DB_KEY_ASSOCS, assocs);
        }
      }
    }
  }

  // --- ASSOCIATIONS (ANNUAIRE) ---
  static getAssociations(): DirectoryStructure[] {
    const assocs = getItem(DB_KEY_ASSOCS, initialAssocs);
    return assocs.filter((a) => a.status === undefined || a.status === 'approved');
  }

  static getAllAssociations(): DirectoryStructure[] {
    return getItem(DB_KEY_ASSOCS, initialAssocs);
  }

  static addAssociation(assoc: DirectoryStructure): DirectoryStructure {
    const assocs = this.getAllAssociations();
    // Resolve coordinates if missing or default
    if (!assoc.mapCoords || (assoc.mapCoords.x === 50 && assoc.mapCoords.y === 50)) {
      assoc.mapCoords = this.calculateCoordsFromAddress(assoc.address || assoc.name);
    }
    if (!assoc.status) {
      assoc.status = 'approved';
    }
    assocs.push(assoc);
    setItem(DB_KEY_ASSOCS, assocs);
    return assoc;
  }

  static updateAssociation(id: string, updatedData: Partial<DirectoryStructure>): DirectoryStructure | null {
    const assocs = this.getAllAssociations();
    const index = assocs.findIndex((a) => a.id === id);
    if (index !== -1) {
      assocs[index] = { ...assocs[index], ...updatedData };
      setItem(DB_KEY_ASSOCS, assocs);
      return assocs[index];
    }
    return null;
  }

  // --- AGENDA EVENTS ---
  static getEvents(): AgendaEvent[] {
    const events = getItem(DB_KEY_EVENTS, mockAgendaEvents);
    return events.filter((e) => e.status === undefined || e.status === 'approved');
  }

  static addEvent(event: AgendaEvent): AgendaEvent {
    const events = getItem(DB_KEY_EVENTS, mockAgendaEvents);
    events.unshift(event);
    setItem(DB_KEY_EVENTS, events);
    return event;
  }

  // --- POSTS / OPPORTUNITIES (ESPACE AGIR) ---
  static getPosts(): AgirOpportunity[] {
    const posts = getItem(DB_KEY_POSTS, mockAgirOpportunities);
    return posts.filter((p) => p.status === undefined || p.status === 'approved');
  }

  static addPost(post: AgirOpportunity): AgirOpportunity {
    const posts = getItem(DB_KEY_POSTS, mockAgirOpportunities);
    posts.unshift(post);
    setItem(DB_KEY_POSTS, posts);
    return post;
  }

  // --- ARTICLES & MEDIA ---
  static getArticles(): ArticleItem[] {
    return getItem(DB_KEY_ARTICLES, initialArticles);
  }

  static addArticle(article: ArticleItem): ArticleItem {
    const articles = this.getArticles();
    articles.unshift(article);
    setItem(DB_KEY_ARTICLES, articles);
    return article;
  }

  // --- COMMENTS ---
  static getComments(articleId?: string): Comment[] {
    const comments = getItem(DB_KEY_COMMENTS, initialComments);
    if (articleId) {
      return comments.filter((c) => c.articleId === articleId && c.status === 'approved');
    }
    return comments;
  }

  static getAllComments(): Comment[] {
    return getItem(DB_KEY_COMMENTS, initialComments);
  }

  static addComment(comment: Comment): Comment {
    const comments = this.getAllComments();
    comments.push(comment);
    setItem(DB_KEY_COMMENTS, comments);
    return comment;
  }

  static updateCommentStatus(commentId: string, status: 'approved' | 'pending'): void {
    const comments = this.getAllComments();
    const index = comments.findIndex((c) => c.id === commentId);
    if (index !== -1) {
      comments[index].status = status;
      setItem(DB_KEY_COMMENTS, comments);
    }
  }

  static deleteComment(commentId: string): void {
    let comments = this.getAllComments();
    comments = comments.filter((c) => c.id !== commentId);
    setItem(DB_KEY_COMMENTS, comments);
  }
}

// Initialize on module load
DatabaseService.initDB();
