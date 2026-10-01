import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  exploreHere: string;
  projectBy: string;
  backToHome: string;
  backToHero: string;
  aLaUne: string;
  aLaUneSub: string;
  featuredHeadline: string;
  featuredText: string;
  discover: string;
  
  // Sections
  mediaTitle: string;
  mediaSub: string;
  agendaTitle: string;
  agendaSub: string;
  annuaireTitle: string;
  annuaireSub: string;
  agirTitle: string;
  agirSub: string;

  // Media tabs
  allMedia: string;
  articles: string;
  webTv: string;
  webRadio: string;
  archives: string;
  becomeVolunteer: string;

  // Agenda
  agendaSubtitleBanner: string;
  selectMonth: string;
  moreDetails: string;
  closeDetails: string;
  locationsTitle: string;
  submitEvent: string;

  // Annuaire
  annuaireBanner: string;
  allCategories: string;
  catSante: string;
  catCulture: string;
  catJeunesse: string;
  catEducation: string;
  catSport: string;
  catMaisonAssoc: string;
  publicLabel: string;
  hoursLabel: string;
  contactLabel: string;
  fullSheet: string;
  history: string;
  activities: string;
  operations: string;
  contacts: string;

  // Agir
  agirBanner: string;
  searchPlaceholder: string;
  filterLabel: string;
  filterBenevolat: string;
  filterEmploi: string;
  filterVolontariat: string;
  filterMecenat: string;
  applyNow: string;
  postOffer: string;

  // Footer
  about: string;
  faq: string;
  newsletters: string;
  contactUs: string;
  rights: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    appName: "Goutte d’Or & Vous",
    tagline: "La boussole du quartier",
    exploreHere: "Explorez ici",
    projectBy: "Un projet porté par la Salle Saint Bruno",
    backToHome: "Retour à l'accueil",
    backToHero: "Retour à la boussole",
    aLaUne: "À LA UNE",
    aLaUneSub: "L'immanquable du moment",
    featuredHeadline: "Le Festival des Jardins partagés de la Goutte d'Or",
    featuredText: "Du 17 septembre au 10 octobre : balades, ateliers cuisine, projections et conférences dans tous les jardins du quartier.",
    discover: "Découvrir l'événement",

    mediaTitle: "LE MÉDIA",
    mediaSub: "Web TV, Radio et journal",
    agendaTitle: "L'AGENDA",
    agendaSub: "Les événements du quartier",
    annuaireTitle: "L'ANNUAIRE",
    annuaireSub: "Les acteur.ices du quartier",
    agirTitle: "L'ESPACE AGIR",
    agirSub: "Les opportunités d'engagement au service du quartier",

    allMedia: "Tous",
    articles: "Articles",
    webTv: "WebTV",
    webRadio: "Web Radio",
    archives: "Archives Goutte d'Or",
    becomeVolunteer: "Devenir bénévole",

    agendaSubtitleBanner: "Un quartier où il se passe TOUJOURS quelque chose",
    selectMonth: "Changer de mois",
    moreDetails: "Voir plus",
    closeDetails: "Fermer les détails",
    locationsTitle: "Lieux principaux",
    submitEvent: "Proposer un événement",

    annuaireBanner: "Un besoin ? Une envie ? À la Goutte d'Or, il y a forcément une structure pour y répondre !",
    allCategories: "Toutes les catégories",
    catSante: "Santé",
    catCulture: "Culture",
    catJeunesse: "Jeunesse",
    catEducation: "Éducation",
    catSport: "Sport",
    catMaisonAssoc: "Maison d'Associations et d'habitant.es",
    publicLabel: "Public",
    hoursLabel: "Horaires",
    contactLabel: "Contacts",
    fullSheet: "Fiche complète",
    history: "HISTOIRE",
    activities: "ACTIVITÉS",
    operations: "FONCTIONNEMENT",
    contacts: "CONTACTS",

    agirBanner: "Comment s’engager pour le quartier ?",
    searchPlaceholder: "Rechercher une mission, association ou mot-clé...",
    filterLabel: "Filtrer les opportunités",
    filterBenevolat: "Bénévolat",
    filterEmploi: "Emploi",
    filterVolontariat: "Volontariat",
    filterMecenat: "Mécénat de compétences",
    applyNow: "Postuler",
    postOffer: "Publier une annonce",

    about: "À propos",
    faq: "Foire Aux Questions",
    newsletters: "Les newsletters",
    contactUs: "Nous contacter",
    rights: "Portail associatif et citoyen de la Goutte d'Or · Paris 18e",
  },

  en: {
    appName: "Goutte d’Or & Vous",
    tagline: "The neighborhood compass",
    exploreHere: "Explore here",
    projectBy: "A community project supported by Salle Saint Bruno",
    backToHome: "Back to Home",
    backToHero: "Back to Cover",
    aLaUne: "FEATURED",
    aLaUneSub: "Highlight of the moment",
    featuredHeadline: "The Goutte d'Or Community Gardens Festival",
    featuredText: "From September 17 to October 10: walks, cooking workshops, screenings and debates across neighborhood shared gardens.",
    discover: "Discover event",

    mediaTitle: "THE MEDIA",
    mediaSub: "Web TV, Radio and journal",
    agendaTitle: "THE AGENDA",
    agendaSub: "Neighborhood events",
    annuaireTitle: "DIRECTORY",
    annuaireSub: "Community actors & centers",
    agirTitle: "ACTION SPACE",
    agirSub: "Volunteer and civic opportunities for the neighborhood",

    allMedia: "All",
    articles: "Articles",
    webTv: "WebTV",
    webRadio: "Web Radio",
    archives: "Archives",
    becomeVolunteer: "Become a volunteer",

    agendaSubtitleBanner: "A neighborhood where something is ALWAYS happening",
    selectMonth: "Change month",
    moreDetails: "See details",
    closeDetails: "Close details",
    locationsTitle: "Key locations",
    submitEvent: "Submit an event",

    annuaireBanner: "A need? A wish? In Goutte d'Or, there is always an organization to help you!",
    allCategories: "All categories",
    catSante: "Health",
    catCulture: "Culture",
    catJeunesse: "Youth",
    catEducation: "Education",
    catSport: "Sports",
    catMaisonAssoc: "Community & Residents Center",
    publicLabel: "Beneficiaries",
    hoursLabel: "Opening hours",
    contactLabel: "Contact",
    fullSheet: "Full profile",
    history: "HISTORY",
    activities: "ACTIVITIES",
    operations: "HOW IT WORKS",
    contacts: "CONTACTS",

    agirBanner: "How to get involved in our neighborhood?",
    searchPlaceholder: "Search for a mission, organization or keyword...",
    filterLabel: "Filter opportunities",
    filterBenevolat: "Volunteering",
    filterEmploi: "Jobs",
    filterVolontariat: "Civic Service",
    filterMecenat: "Skills Sponsorship",
    applyNow: "Apply",
    postOffer: "Post an opportunity",

    about: "About",
    faq: "FAQ",
    newsletters: "Newsletters",
    contactUs: "Contact us",
    rights: "Community portal of Goutte d'Or · Paris 18th district",
  },

  ar: {
    appName: "Goutte d’Or & Vous",
    tagline: "بوصلة الحي",
    exploreHere: "استكشف هنا",
    projectBy: "مشروع تدعمه قاعة سان برونو (Salle Saint Bruno)",
    backToHome: "العودة للرئيسية",
    backToHero: "العودة للبوصلة",
    aLaUne: "في الصدارة",
    aLaUneSub: "الحدث الأبرز حالياً",
    featuredHeadline: "مهرجان الحدائق المشتركة في غوت دور",
    featuredText: "من 17 سبتمبر إلى 10 أكتوبر: جولات وورش طهي وعروض ونقاشات في جميع حدائق الحي.",
    discover: "اكتشف الحدث",

    mediaTitle: "الإعلام",
    mediaSub: "تلفزيون الويب، راديو ومجلة",
    agendaTitle: "الأجندة",
    agendaSub: "فعاليات وأنشطة الحي",
    annuaireTitle: "الدليل",
    annuaireSub: "الجمعيات والمؤسسات الفاعلة في الحي",
    agirTitle: "مساحة المبادرة",
    agirSub: "فرص التطوع والعمل لخدمة الحي",

    allMedia: "الكل",
    articles: "مقالات",
    webTv: "ويب تيفي",
    webRadio: "راديو الويب",
    archives: "أرشيف غوت دور",
    becomeVolunteer: "كن متطوعاً",

    agendaSubtitleBanner: "حي ينبض بالحياة، يحدث فيه دائمًا شيء ما!",
    selectMonth: "اختر الشهر",
    moreDetails: "تفاصيل أكثر",
    closeDetails: "إغلاق",
    locationsTitle: "الأماكن الرئيسية",
    submitEvent: "اقترح فعالية",

    annuaireBanner: "لديك حاجة أو فكرة؟ في حي غوت دور توجد دائمًا جمعية لمساعدتك!",
    allCategories: "جميع الفئات",
    catSante: "الصحة",
    catCulture: "الثقافة",
    catJeunesse: "الشباب",
    catEducation: "التعليم",
    catSport: "الرياضة",
    catMaisonAssoc: "دار الجمعيات والسكان",
    publicLabel: "الجمهور المستهدف",
    hoursLabel: "أوقات العمل",
    contactLabel: "التواصل",
    fullSheet: "الملف الكامل",
    history: "التاريخ",
    activities: "الأنشطة",
    operations: "آلية العمل",
    contacts: "معلومات الاتصال",

    agirBanner: "كيف تشارك وتتطوع في خدمة الحي؟",
    searchPlaceholder: "ابحث عن فرصة أو جمعية أو كلمة مفتاحية...",
    filterLabel: "تصفية الفرص",
    filterBenevolat: "تطوع",
    filterEmploi: "وظائف",
    filterVolontariat: "خدمة مدنية",
    filterMecenat: "مشاركة المهارات",
    applyNow: "تقديم طلب",
    postOffer: "نشر إعلان",

    about: "من نحن",
    faq: "الأسئلة الشائعة",
    newsletters: "النشرات البريدية",
    contactUs: "اتصل بنا",
    rights: "البوابة الأهلية والمجتمعية لحي غوت دور · الدائرة 18 باريس",
  },

  uk: {
    appName: "Goutte d’Or & Vous",
    tagline: "Компас нашого району",
    exploreHere: "Досліджуйте тут",
    projectBy: "Проєкт підтримується Salle Saint Bruno",
    backToHome: "На головну",
    backToHero: "До заставки",
    aLaUne: "НА ГОЛОВНІЙ",
    aLaUneSub: "Головна подія моменту",
    featuredHeadline: "Фестиваль спільних садів Гут д'Ор",
    featuredText: "З 17 вересня по 10 жовтня: екскурсії, кулінарні майстер-класи, кінопокази та дискусії в садах району.",
    discover: "Дізнатися більше",

    mediaTitle: "МЕДІА",
    mediaSub: "Веб-телебачення, радіо та газета",
    agendaTitle: "КАЛЕНДАР",
    agendaSub: "Події та заходи району",
    annuaireTitle: "ДОВІДНИК",
    annuaireSub: "Організації та діячі району",
    agirTitle: "ПРОСТІР ДІЇ",
    agirSub: "Можливості волонтерства та праці для розвитку району",

    allMedia: "Усі",
    articles: "Статті",
    webTv: "Веб-ТБ",
    webRadio: "Веб-радіо",
    archives: "Архіви",
    becomeVolunteer: "Стати волонтером",

    agendaSubtitleBanner: "Район, де ЗАВЖДИ щось відбувається",
    selectMonth: "Вибрати місяць",
    moreDetails: "Детальніше",
    closeDetails: "Закрити",
    locationsTitle: "Основні локації",
    submitEvent: "Запропонувати подію",

    annuaireBanner: "Є потреба чи ініціатива? У Гут д'Ор обов'язково знайдеться організація, яка допоможе!",
    allCategories: "Всі категорії",
    catSante: "Здоров'я",
    catCulture: "Культура",
    catJeunesse: "Молодь",
    catEducation: "Освіта",
    catSport: "Спорт",
    catMaisonAssoc: "Дім асоціацій та жителів",
    publicLabel: "Для кого",
    hoursLabel: "Години роботи",
    contactLabel: "Контакти",
    fullSheet: "Повний профіль",
    history: "ІСТОРІЯ",
    activities: "ДІЯЛЬНІСТЬ",
    operations: "ЯК ЦЕ ПРАЦЮЄ",
    contacts: "КОНТАКТИ",

    agirBanner: "Як долучитися до життя району?",
    searchPlaceholder: "Пошук місії, організації або ключового слова...",
    filterLabel: "Фільтр пропозицій",
    filterBenevolat: "Волонтерство",
    filterEmploi: "Робота",
    filterVolontariat: "Громадська служба",
    filterMecenat: "Обмін досвідом",
    applyNow: "Подати заявку",
    postOffer: "Опублікувати оголошення",

    about: "Про проєкт",
    faq: "Часті запитання",
    newsletters: "Розсилка новин",
    contactUs: "Зв'язатися з нами",
    rights: "Громадський портал Гут д'Ор · 18-й округ Парижа",
  },

  ps: {
    appName: "Goutte d’Or & Vous",
    tagline: "د ګاونډ لارښود او قطب نما",
    exploreHere: "دلته ولټوئ",
    projectBy: "د سال سینټ برونو (Salle Saint Bruno) په ملاتړ پروژه",
    backToHome: "اصلي مخ ته ورګرځېدل",
    backToHero: "لومړي مخ ته ستنېدل",
    aLaUne: "مهم خبرونه",
    aLaUneSub: "د اوسني وخت خورا مهم خبر",
    featuredHeadline: "په ګوت دور کې د شریکو باغونو فیستیوال",
    featuredText: "د سپتمبر له ۱۷ څخه تر اکتوبر ۱۰ پورې: د پخلي ورکشاپونه، نندارتونونه او د بحث غونډې.",
    discover: "نور مالومات",

    mediaTitle: "رسنۍ",
    mediaSub: "ویب ټلویزیون، راډیو او مجله",
    agendaTitle: "کالیزه او اجنډا",
    agendaSub: "د سیمې غونډې او برنامې",
    annuaireTitle: "لارښود لارښود",
    annuaireSub: "د سیمې ټولنې او بنسټونه",
    agirTitle: "د عمل او همکارۍ ځای",
    agirSub: "د مرستې او کار فرصتونه",

    allMedia: "ټول",
    articles: "مقالې",
    webTv: "ویب ټلویزیون",
    webRadio: "ویب راډیو",
    archives: "ارشیف",
    becomeVolunteer: "رضاکار شئ",

    agendaSubtitleBanner: "یو متحرک ګاونډ چیرې چې تل یو څه پېښیږي",
    selectMonth: "میاشت وټاکئ",
    moreDetails: "نور جزئیات",
    closeDetails: "بندول",
    locationsTitle: "اصلي ځایونه",
    submitEvent: "نوې برنامه اضافه کړئ",

    annuaireBanner: "کومه اړتیا لرئ؟ په ګوت دور کې تل ستاسو سره د مرستې لپاره ټولنه شته!",
    allCategories: "ټولې کټګورۍ",
    catSante: "روغتیا",
    catCulture: "کلتور",
    catJeunesse: "ځوانان",
    catEducation: "ښوونه او روزنه",
    catSport: "لوبې",
    catMaisonAssoc: "د اوسېدونکو او ټولنو مرکز",
    publicLabel: "مخاطبین",
    hoursLabel: "کاري ساعتونه",
    contactLabel: "اړیکه",
    fullSheet: "بشپړ مالومات",
    history: "تاریخچه",
    activities: "فعالیتونه",
    operations: "کاري طریقه",
    contacts: "د اړیکې معلومات",

    agirBanner: "څنګه کولای شو له خپل ګاونډ سره مرسته وکړو؟",
    searchPlaceholder: "د دندې، ټولنې یا موضوع په اړه لټون...",
    filterLabel: "فلټر کول",
    filterBenevolat: "رضاکارانه کار",
    filterEmploi: "دندې",
    filterVolontariat: "مدني خدمت",
    filterMecenat: "د وړتیاوو شریکول",
    applyNow: "غوښتنه وسپارئ",
    postOffer: "نوی اعلان خپور کړئ",

    about: "زموږ په اړه",
    faq: "پرله پسې پوښتنې",
    newsletters: "خبرپاڼه",
    contactUs: "موږ سره اړیکه",
    rights: "د ګوت دور ولسي او ټولنیز پورټل · پاریس ۱۸",
  },
};
