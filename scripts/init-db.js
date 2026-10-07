import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../database.sqlite');
console.log('Initializing SQLite database at:', dbPath);

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Drop tables if reset needed or create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    role TEXT,
    status TEXT,
    associationId TEXT
  );

  CREATE TABLE IF NOT EXISTS associations (
    id TEXT PRIMARY KEY,
    name TEXT,
    logo TEXT,
    category TEXT,
    categoryLabel TEXT,
    address TEXT,
    publicCible TEXT,
    horaires TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    thematique TEXT,
    contact TEXT,
    histoire TEXT,
    activites TEXT,
    fonctionnement TEXT,
    contactsDetails TEXT,
    lat REAL,
    lng REAL,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    day TEXT,
    month TEXT,
    title TEXT,
    shortDesc TEXT,
    location TEXT,
    fullDesc TEXT,
    detailedLocations TEXT,
    colorTheme TEXT,
    position TEXT,
    time TEXT,
    organizer TEXT,
    tag TEXT,
    associationId TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    orgName TEXT,
    title TEXT,
    type TEXT,
    typeLabel TEXT,
    buttonText TEXT,
    bgColor TEXT,
    petalColor TEXT,
    image TEXT,
    duration TEXT,
    description TEXT,
    requirements TEXT,
    contactEmail TEXT,
    associationId TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    type TEXT,
    title TEXT,
    subtitle TEXT,
    author TEXT,
    durationOrReadTime TEXT,
    image TEXT,
    date TEXT,
    category TEXT,
    content TEXT,
    audioUrl TEXT,
    videoUrl TEXT
  );

  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    articleId TEXT,
    userId TEXT,
    authorName TEXT,
    content TEXT,
    date TEXT,
    status TEXT
  );
`);

// Insert Default Admin User
const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (id, email, password, name, role, status, associationId)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

insertUser.run('usr-admin', 'admin@gouttedor.fr', 'admin123', 'Administrateur Goutte d’Or', 'admin', 'approved', null);
insertUser.run('usr-stbruno', 'contact@sallesaintbruno.org', 'password', 'Salle Saint-Bruno', 'association', 'approved', 'salle-saint-bruno');
insertUser.run('usr-hsm', 'contact@hsm.com', 'password', 'Home Sweet Mômes', 'association', 'approved', 'home-sweet-momes');
insertUser.run('usr-quera', 'kevin.duranty@quera.fr', 'password123', 'Quera Fablab', 'association', 'approved', 'quera-fablab');
insertUser.run('usr-citizen1', 'jean.dupont@gmail.com', 'user123', 'Jean Dupont', 'user', 'approved', null);

// Insert 10 Initial Associations with Real 18e Paris Coordinates (Goutte d'Or)
const insertAssoc = db.prepare(`
  INSERT OR REPLACE INTO associations (
    id, name, logo, category, categoryLabel, address, publicCible, horaires, phone, email, website, thematique, contact, histoire, activites, fonctionnement, contactsDetails, lat, lng, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const initialAssociations = [
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
    histoire: `Fablab solidaire implanté au cœur du 18e arrondissement, favorisant l’inclusion numérique, la création artisanale et le bricolage partagé.`,
    activites: `• Impression 3D, découpe laser et broderie numérique.
• Ateliers de réparation et projets de quartier.
• Formation au numérique et accompagnement des jeunes.`,
    fonctionnement: `Ouvert aux adhérents et habitant.es du quartier.`,
    contactsDetails: `📍 12 rue Polonceau, 75018 Paris · ✉️ kevin.duranty@quera.fr`,
    lat: 48.8876,
    lng: 2.3530,
    status: 'approved',
  },
  {
    id: 'salle-saint-bruno',
    name: 'Salle Saint-Bruno',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=300&q=80',
    category: 'maison_assoc',
    categoryLabel: 'Maison d’Associations',
    address: '9 place Saint-Bernard, 75018 Paris',
    publicCible: 'Habitant.es, collectifs et associations locales',
    horaires: 'Lundi - Vendredi de 9h00 à 18h30',
    phone: '01 53 09 99 22',
    email: 'contact@sallesaintbruno.org',
    website: 'https://sallesaintbruno.org',
    thematique: 'Maison d’Associations & Vivre ensemble',
    contact: '01 53 09 99 22',
    histoire: `Véritable cœur battant de la vie associative de la Goutte d'Or depuis plus de 40 ans, la Salle Saint-Bruno fédère les énergies citoyennes.`,
    activites: `• Mise à disposition de salles de réunion.
• Coordination des fêtes de quartier.
• Pôle multimédia et accompagnement numérique.`,
    fonctionnement: `Gouvernance associative partagée entre habitant.es et associations du quartier.`,
    contactsDetails: `📍 9 place Saint-Bernard, 75018 Paris · 📞 01 53 09 99 22`,
    lat: 48.8868,
    lng: 2.3542,
    status: 'approved',
  },
  {
    id: 'home-sweet-momes',
    name: 'Home Sweet Mômes',
    logo: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=300&q=80',
    category: 'jeunesse',
    categoryLabel: 'Jeunesse & Enfance',
    address: '16 rue de la Charbonnière, 75018 Paris',
    publicCible: 'Enfants (0-12 ans) et Parents',
    horaires: 'Lundi - vendredi de 10h30 à 16h30 / Mercredi toute la journée',
    phone: '01 53 09 28 06',
    email: 'contact@hsm.com',
    website: 'https://homesweetmomes.paris',
    thematique: 'Petite enfance & Parentalité',
    contact: '01 53 09 28 06',
    histoire: `Home Sweet Mômes anime un espace d'accueil parent-enfant (LAEP) et un café des enfants inclusif au pied de la rue de la Charbonnière.`,
    activites: `• Ateliers d'éveil artistique, sensoriel et musical.
• Cercles de parole de mères et pères.
• Sorties en plein air et vacances familles.`,
    fonctionnement: `Adhésion à prix libre pour toutes les familles.`,
    contactsDetails: `📍 16, rue de la Charbonnière, 75018 Paris · 📞 01 53 09 28 06`,
    lat: 48.8845,
    lng: 2.3530,
    status: 'approved',
  },
  {
    id: 'caarud-ego',
    name: 'CAARUD EGO',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80',
    category: 'sante',
    categoryLabel: 'Santé',
    address: '13 rue Saint-Luc, 75018 Paris',
    publicCible: 'Usagers de drogues en situation de précarité',
    horaires: 'Lundi - vendredi de 10h30 à 16h30',
    phone: '01 53 09 28 06',
    email: 'ego@aurore.asso.fr',
    website: 'https://aurore.asso.fr',
    thematique: 'Santé & Réduction des risques',
    contact: '01 53 09 28 06',
    histoire: `Créé au début des années 1990 au cœur de la Goutte d'Or, le CAARUD EGO est une structure pionnière de la réduction des risques.`,
    activites: `• Accueil de jour et repos.
• Délivrance de matériel stérile.
• Consultations infirmières et soutien social.`,
    fonctionnement: `Accès libre, gratuit et anonyme.`,
    contactsDetails: `📍 13 rue Saint-Luc, 75018 Paris`,
    lat: 48.8878,
    lng: 2.3555,
    status: 'approved',
  },
  {
    id: 'pole-sante-gouttedor',
    name: 'Pôle de Santé Goutte D’Or',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=300&q=80',
    category: 'sante',
    categoryLabel: 'Santé',
    address: '38 rue Polonceau, 75018 Paris',
    publicCible: 'Tout public du quartier sans exclusion',
    horaires: 'Du lundi au samedi de 8h30 à 19h30',
    phone: '01 42 58 60 70',
    email: 'contact@pole-sante-gouttedor.fr',
    website: 'https://pole-sante-gouttedor.fr',
    thematique: 'Médecine générale & Soins',
    contact: '01 42 58 60 70',
    histoire: `Engagé pour un accès universel aux soins en secteur 1 sans dépassement d'honoraires.`,
    activites: `• Médecine générale et pédiatrie.
• Suivi gynécologique par sages-femmes.
• Médiation et interprétariat médical.`,
    fonctionnement: `Tiers-payant intégral et accueil inconditionnel.`,
    contactsDetails: `📍 38 rue Polonceau, 75018 Paris · 📞 01 42 58 60 70`,
    lat: 48.8875,
    lng: 2.3525,
    status: 'approved',
  },
  {
    id: 'institut-cultures-islam',
    name: 'Institut des cultures d’Islam',
    logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    category: 'culture',
    categoryLabel: 'Culture',
    address: '56 rue Stephenson, 75018 Paris',
    publicCible: 'Grand public, scolaires, passionnés d’art',
    horaires: 'Mardi - Dimanche de 11h à 19h',
    phone: '01 53 09 99 80',
    email: 'accueil@ici.paris.fr',
    website: 'https://institut-cultures-islam.org',
    thematique: 'Art contemporain & Cultures du monde',
    contact: '01 53 09 99 80',
    histoire: `Établissement culturel de la Ville de Paris implanté sur deux sites de la Goutte d'Or, l'ICI est un centre d'art contemporain majeur.`,
    activites: `• Expositions d'art visuel et photographies.
• Concerts, conférences et cours d'arabe.
• Restaurant-salon de thé dans le patio.`,
    fonctionnement: `Entrée libre pour toutes les expositions.`,
    contactsDetails: `📍 56 rue Stephenson, 75018 Paris · 📞 01 53 09 99 80`,
    lat: 48.8885,
    lng: 2.3560,
    status: 'approved',
  },
  {
    id: 'les-ethnos',
    name: 'Les Ethnos',
    logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=300&q=80',
    category: 'education',
    categoryLabel: 'Éducation',
    address: '22 rue Saint-Jérôme, 75018 Paris',
    publicCible: 'Enfants scolarisés en primaire et collège',
    horaires: 'Mardi, Jeudi, Vendredi 16h30-19h / Mercredi 14h-18h',
    phone: '01 42 64 12 30',
    email: 'contact@lesethnos.org',
    thematique: 'Soutien scolaire & Réussite éducative',
    contact: '01 42 64 12 30',
    histoire: `Association historique d'accompagnement à la scolarité et d'émancipation culturelle pour la réussite de tous les élèves.`,
    activites: `• Aide aux devoirs et soutien méthodologique.
• Ateliers scientifiques et robotique.
• Sorties musées et théâtre.`,
    fonctionnement: `Équipe d'animateurs et tuteurs bénévoles.`,
    contactsDetails: `📍 22 rue Saint-Jérôme, 75018 Paris`,
    lat: 48.8858,
    lng: 2.3550,
    status: 'approved',
  },
  {
    id: 'motivea',
    name: 'Motivea',
    logo: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=300&q=80',
    category: 'sport',
    categoryLabel: 'Sport & Bien-être',
    address: 'Gymnase Doudeauville, 75018 Paris',
    publicCible: 'Jeunes, adolescents et adultes',
    horaires: 'Lundi, Mercredi, Samedi selon créneaux',
    phone: '06 12 34 56 78',
    email: 'motivea.sport@gmail.com',
    thematique: 'Sport populaire & Inclusion',
    contact: '06 12 34 56 78',
    histoire: `Club omnisports de quartier fondé pour encourager la pratique sportive mixte, la confiance en soi et la santé.`,
    activites: `• Boxe éducative et kick-boxing.
• Futsal et basket 3x3.
• Renforcement musculaire au square.`,
    fonctionnement: `Tarifs solidaires adaptés au quotient familial.`,
    contactsDetails: `📍 Gymnase Doudeauville, 75018 Paris`,
    lat: 48.8890,
    lng: 2.3540,
    status: 'approved',
  },
  {
    id: 'espace-jeunes',
    name: 'Espace Jeunes Goutte d’Or',
    logo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80',
    category: 'jeunesse',
    categoryLabel: 'Jeunesse',
    address: '4 rue Richomme, 75018 Paris',
    publicCible: 'Jeunes de 12 à 25 ans',
    horaires: 'Mardi au Samedi de 14h00 à 19h00',
    phone: '01 42 51 09 88',
    email: 'espace.jeunes@paris.fr',
    thematique: 'Loisirs, Studio & Citoyenneté',
    contact: '01 42 51 09 88',
    histoire: `Équipement municipal dédié à l'autonomie des jeunes, aux cultures urbaines et aux projets de vacances.`,
    activites: `• Studio d'enregistrement son et MAO.
• Espace informatique et aide aux CV.
• Projets citoyens et sorties sportives.`,
    fonctionnement: `Accès gratuit sur inscription.`,
    contactsDetails: `📍 4 rue Richomme, 75018 Paris`,
    lat: 48.8860,
    lng: 2.3515,
    status: 'approved',
  },
  {
    id: 'echo-musee',
    name: 'Echo Musée',
    logo: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=300&q=80',
    category: 'culture',
    categoryLabel: 'Culture',
    address: '21 rue Cavé, 75018 Paris',
    publicCible: 'Tout public, artistes et passionnés d’art populaire',
    horaires: 'Du mardi au samedi de 14h00 à 19h00',
    phone: '01 42 23 45 67',
    email: 'contact@echomusee.fr',
    website: 'https://echomusee.fr',
    thematique: 'Street Art & Mémoire populaire',
    contact: '01 42 23 45 67',
    histoire: `Espace alternatif indépendant défendant l'art engagé et la mémoire des habitant.es depuis 30 ans.`,
    activites: `• Expositions de peinture et street art local.
• Ateliers créatifs intergénérationnels.
• Théâtre ambulant et poésie de rue.`,
    fonctionnement: `Gestion collective et participative.`,
    contactsDetails: `📍 21 rue Cavé, 75018 Paris`,
    lat: 48.8870,
    lng: 2.3535,
    status: 'approved',
  },
  {
    id: 'jardin-univert',
    name: 'Jardin L’Univert',
    logo: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&q=80',
    category: 'maison_assoc',
    categoryLabel: 'Maison d’Associations',
    address: '35 rue Polonceau, 75018 Paris',
    publicCible: 'Familles, riverains et jardinier.es',
    horaires: 'Mercredi & Samedi 14h00-18h00 / Dimanche 11h-17h',
    phone: '06 98 76 54 32',
    email: 'univert@gouttedor.org',
    website: 'https://lunivert.gouttedor.org',
    thematique: 'Jardin partagé & Écologie',
    contact: '06 98 76 54 32',
    histoire: `Pionnier de l'agriculture urbaine solidaire, L'Univert a transformé une friche en havre de biodiversité.`,
    activites: `• Jardinage écologique collectif et compost.
• Atelier Repair Café.
• Repas partagés en plein air.`,
    fonctionnement: `Adhésion symbolique et accès libre.`,
    contactsDetails: `📍 35 rue Polonceau, 75018 Paris`,
    lat: 48.8873,
    lng: 2.3520,
    status: 'approved',
  },
];

for (const a of initialAssociations) {
  insertAssoc.run(
    a.id, a.name, a.logo, a.category, a.categoryLabel, a.address, a.publicCible, a.horaires, a.phone, a.email, a.website, a.thematique, a.contact, a.histoire, a.activites, a.fonctionnement, a.contactsDetails, a.lat, a.lng, a.status
  );
}

// Insert Initial Events
const insertEvent = db.prepare(`
  INSERT OR REPLACE INTO events (
    id, day, month, title, shortDesc, location, fullDesc, detailedLocations, colorTheme, position, time, organizer, tag, associationId, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertEvent.run('ev-06', '06', 'Septembre', 'Théâtre ambulant', 'La ballade de Worms au départ de l’Echo Musée', 'Echo Musée', 'Une déambulation théâtrale à travers les cours intérieures.', '21 rue Cavé', 'orange', 'bottom', '18:30 - 20:30', 'Echo Musée', 'Spectacle vivant', 'echo-musee', 'approved');
insertEvent.run('ev-13', '13', 'Septembre', 'Vide-placards solidaire', 'Vide grenier réservé aux habitant.es de la Goutte d’Or', 'Rue Charbonnière', 'Grand vide-grenier solidaire et réemploi.', 'Rue Charbonnière piétonnisée', 'orange', 'top', '09:00 - 18:00', 'Collectif Habitants', 'Solidarité', null, 'approved');

// Insert Initial Posts
const insertPost = db.prepare(`
  INSERT OR REPLACE INTO posts (
    id, orgName, title, type, typeLabel, buttonText, bgColor, petalColor, image, duration, description, requirements, contactEmail, associationId, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertPost.run('post-1', 'Home Sweet Mômes', 'Recherche coordinateur.trice pédagogique petite enfance', 'emploi', 'Emploi / CDD', 'Découvrir l’offre', 'red', '#DF6847', '', 'CDD 12 mois (35h)', 'Coordination pédagogique du café des enfants.', '["Diplôme EJE ou équivalent"]', 'contact@hsm.com', 'home-sweet-momes', 'approved');

// Insert Initial Articles
const insertArticle = db.prepare(`
  INSERT OR REPLACE INTO articles (
    id, type, title, subtitle, author, durationOrReadTime, image, date, category, content, audioUrl, videoUrl
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertArticle.run('art-1', 'Article', 'Les fictions du garçon arabe : retour sur un mythe', 'Analyse critique et représentations contemporaines.', 'Rédaction Goutte d’Or', '8 min de lecture', '/src/assets/images/article_garcon_arabe_1790867645835.jpg', '12 Septembre 2026', 'Articles', 'Enquête menée auprès des habitant.es et chercheur.ses du 18e arrondissement.', null, null);
insertArticle.run('art-2', 'Podcast', 'La santé mentale inclusive : Écouter sans tabou', 'Soins de proximité à la Goutte d’Or.', 'Radio Goutte d’Or', '24 min', '/src/assets/images/article_mental_health_1790867657219.jpg', '15 Septembre 2026', 'Web Radio', 'Entretien sonore avec l’équipe du Centre de Santé Goutte d’Or.', 'https://cdn.freesound.org/previews/518/518712_10817342-lq.mp3', null);

console.log('SQLite database initialized successfully!');
db.close();
