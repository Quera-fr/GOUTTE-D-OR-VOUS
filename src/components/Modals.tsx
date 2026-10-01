import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Send, Mail, HelpCircle, Info, Calendar, Sparkles, Check } from 'lucide-react';

interface ModalsProps {
  currentLang: Language;
  activeModal: 'about' | 'faq' | 'newsletter' | 'contact' | 'submitEvent' | 'postOffer' | 'volunteer' | null;
  onClose: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ currentLang, activeModal, onClose }) => {
  const t = translations[currentLang];

  // Forms states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Général');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Submit event state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventSuccess, setEventSuccess] = useState(false);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-[#FAF7EE] max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white my-8 max-h-[90vh] overflow-y-auto text-[#292524]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EFE8D6] hover:bg-[#E2D8C0] flex items-center justify-center text-[#4A1E0E] cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. ABOUT MODAL */}
        {activeModal === 'about' && (
          <div>
            <div className="flex items-center gap-2 text-[#DF6847] mb-2">
              <Info className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">{t.about}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E]">
              Goutte d’Or & Vous — La boussole du quartier
            </h3>
            <div className="mt-4 text-xs sm:text-sm text-[#4E4338] leading-relaxed space-y-3">
              <p>
                <strong>Goutte d’Or & Vous</strong> est le portail d'information citoyenne, culturelle et solidaire du quartier de la Goutte d'Or (Paris 18e), porté et coordonné par la <strong>Salle Saint-Bruno</strong>.
              </p>
              <p>
                Conçu comme une véritable <em>boussole collective</em>, il réunit en un seul lieu :
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Le Média :</strong> Un espace d'expression libre avec Web TV, Radio locale, enquêtes et archives orales.</li>
                <li><strong>L'Agenda :</strong> Les rendez-vous culturels, spectacles de rue, banquets et ateliers partagés.</li>
                <li><strong>L'Annuaire :</strong> La cartographie interactive des plus de 70 structures associatives, médicales et sociales du quartier.</li>
                <li><strong>L'Espace Agir :</strong> Les offres d'emploi local, de bénévolat et de volontariat au service du bien commun.</li>
              </ul>
              <p className="pt-2 text-[11px] text-[#786E5D] border-t border-[#E3D9C4]">
                Projet subventionné par la Ville de Paris, la Région Île-de-France et l'ANCT dans le cadre de la Politique de la Ville.
              </p>
            </div>
          </div>
        )}

        {/* 2. FAQ MODAL */}
        {activeModal === 'faq' && (
          <div>
            <div className="flex items-center gap-2 text-[#DF6847] mb-2">
              <HelpCircle className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">{t.faq}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E]">
              Foire Aux Questions
            </h3>
            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <div className="bg-[#F2EBD9] p-3.5 rounded-2xl">
                <h4 className="font-bold text-[#4A1E0E]">Qui peut publier un événement sur l'Agenda ?</h4>
                <p className="text-[#63574A] mt-1">Toute association, habitant.e ou collectif organisant une activité gratuite ou à tarif solidaire dans le 18e arrondissement.</p>
              </div>

              <div className="bg-[#F2EBD9] p-3.5 rounded-2xl">
                <h4 className="font-bold text-[#4A1E0E]">Comment proposer un article ou un podcast ?</h4>
                <p className="text-[#63574A] mt-1">Le comité de rédaction citoyen se réunit chaque premier jeudi du mois à la Salle Saint-Bruno. Tout le monde est bienvenu, aucun prérequis n'est nécessaire !</p>
              </div>

              <div className="bg-[#F2EBD9] p-3.5 rounded-2xl">
                <h4 className="font-bold text-[#4A1E0E]">Peut-on emprunter du matériel audiovisuel ?</h4>
                <p className="text-[#63574A] mt-1">Oui ! Le pôle média met à disposition gratuitement des enregistreurs numériques, caméras et micros pour les projets associatifs adhérents.</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. NEWSLETTER MODAL */}
        {activeModal === 'newsletter' && (
          <div>
            <div className="flex items-center gap-2 text-[#DF6847] mb-2">
              <Mail className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">{t.newsletters}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E]">
              Recevez l'essentiel du quartier
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#786E5D]">
              Chaque quinzaine, recevez l'agenda des événements, les nouveaux articles du Média et les missions solidaires à pourvoir.
            </p>

            {newsletterSuccess ? (
              <div className="mt-6 p-4 bg-[#C5D285]/40 border border-[#B3C071] rounded-2xl text-center text-xs font-bold text-[#2A4B3E]">
                🎉 Merci pour votre inscription ! Vous recevrez le prochain numéro dans votre boîte mail.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSuccess(true);
                  setTimeout(() => {
                    setNewsletterSuccess(false);
                    onClose();
                  }, 2000);
                }}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                    Votre adresse email
                  </label>
                  <input
                    required
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="votre.email@domaine.fr"
                    className="w-full bg-white border border-[#D5C9B3] rounded-full px-4 py-2.5 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#655848]">
                  <input type="checkbox" defaultChecked id="weeklyConsent" className="accent-[#DF6847]" />
                  <label htmlFor="weeklyConsent">Je souhaite recevoir la lettre d'information bimensuelle (désinscription en 1 clic)</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#DF6847] hover:bg-[#BA4E30] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>S'inscrire à la newsletter</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 4. CONTACT MODAL */}
        {activeModal === 'contact' && (
          <div>
            <div className="flex items-center gap-2 text-[#DF6847] mb-2">
              <Mail className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">{t.contactUs}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E]">
              Nous contacter
            </h3>
            <p className="mt-1 text-xs text-[#786E5D]">
              Une question, un partenariat, une idée de sujet pour la rédaction ? Écrivez-nous !
            </p>

            {contactSuccess ? (
              <div className="mt-6 p-4 bg-[#C5D285]/40 border border-[#B3C071] rounded-2xl text-center text-xs font-bold text-[#2A4B3E]">
                ✅ Message bien envoyé ! L'équipe de la Salle Saint-Bruno vous répondra sous 48h.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSuccess(true);
                  setTimeout(() => {
                    setContactSuccess(false);
                    onClose();
                  }, 2000);
                }}
                className="mt-4 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                      Nom / Prénom
                    </label>
                    <input
                      required
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="votre@email.fr"
                      className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                    Sujet
                  </label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                  >
                    <option value="General">Renseignements généraux</option>
                    <option value="Media">Proposer un reportage (Le Média)</option>
                    <option value="Agenda">Annoncer un événement (L'Agenda)</option>
                    <option value="Annuaire">Mettre à jour une structure (L'Annuaire)</option>
                    <option value="Agir">Publier une annonce (L'Espace Agir)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                    Votre message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Écrivez votre message ici..."
                    className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4A1E0E] hover:bg-[#341408] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#C9D48D]" />
                  <span>Envoyer mon message</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 5. SUBMIT EVENT MODAL */}
        {activeModal === 'submitEvent' && (
          <div>
            <div className="flex items-center gap-2 text-[#DF6847] mb-2">
              <Calendar className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Agenda participatif</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E]">
              Proposer un événement
            </h3>
            <p className="mt-1 text-xs text-[#786E5D]">
              Faites connaître votre animation, atelier, spectacle ou rencontre aux habitant.es de la Goutte d'Or.
            </p>

            {eventSuccess ? (
              <div className="mt-6 p-4 bg-[#C5D285]/40 border border-[#B3C071] rounded-2xl text-center text-xs font-bold text-[#2A4B3E]">
                ✨ Merci ! Votre événement a été soumis et sera validé par l'équipe de l'Agenda.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEventSuccess(true);
                  setTimeout(() => {
                    setEventSuccess(false);
                    onClose();
                  }, 2000);
                }}
                className="mt-4 space-y-3"
              >
                <div>
                  <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                    Titre de l'événement
                  </label>
                  <input
                    required
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Ex: Balade contée dans les jardins partagés"
                    className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                      Date & Heure
                    </label>
                    <input
                      required
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="Ex: Samedi 26 Septembre à 15h"
                      className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                      Lieu dans le quartier
                    </label>
                    <input
                      required
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="Ex: Square Léon / Rue des Gardes"
                      className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                    Description de l'événement
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Présentez le programme, public cible, gratuité ou tarif..."
                    className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#DF6847] hover:bg-[#BA4E30] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Soumettre à l'Agenda</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 6. POST OFFER MODAL (Espace Agir) */}
        {activeModal === 'postOffer' && (
          <div>
            <div className="flex items-center gap-2 text-[#DF6847] mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Espace Agir</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E]">
              Publier une annonce d'engagement
            </h3>
            <p className="mt-1 text-xs text-[#786E5D]">
              Votre association recherche des bénévoles, un service civique ou un poste salarié ?
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Votre annonce a été transmise à la Salle Saint-Bruno pour publication !");
                onClose();
              }}
              className="mt-4 space-y-3"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                  Nom de votre structure
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ex: Association Solidarité Barbès"
                  className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                    Type d'opportunité
                  </label>
                  <select className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]">
                    <option>Bénévolat</option>
                    <option>Service Civique / Volontariat</option>
                    <option>Emploi (CDD / CDI)</option>
                    <option>Mécénat de compétences</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                    Durée / Disponibilité
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: 2h par semaine"
                    className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">
                  Titre & Mission
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Détaillez la mission et les compétences recherchées..."
                  className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524] focus:outline-none focus:border-[#DF6847]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#284B3D] hover:bg-[#1C362B] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5 text-[#C9D48D]" />
                <span>Publier l'annonce</span>
              </button>
            </form>
          </div>
        )}

        {/* 7. VOLUNTEER IN MEDIA MODAL */}
        {activeModal === 'volunteer' && (
          <div>
            <div className="flex items-center gap-2 text-[#DF6847] mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Le Média citoyen</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#4A1E0E]">
              Devenir bénévole au Média
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#4E4338] leading-relaxed">
              Vous avez envie de réaliser des reportages vidéo, d'animer des émissions de radio, de photographier les événements du quartier ou d'écrire des chroniques ? 
            </p>
            <p className="mt-2 text-xs text-[#786E5D]">
              Le pédia citoyen forme gratuitement tous les habitant.es aux techniques audiovisuelles et journalistiques.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Merci pour votre envie de participer ! Nous vous convions au prochain atelier d'accueil.");
                onClose();
              }}
              className="mt-4 space-y-3"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">Votre prénom et nom</label>
                <input required type="text" placeholder="Ex: Malik Traoré" className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">Votre email ou téléphone</label>
                <input required type="text" placeholder="malik@email.fr ou 06..." className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#786E5D] uppercase mb-1">Vos centres d'intérêt</label>
                <select className="w-full bg-white border border-[#D5C9B3] rounded-xl px-3 py-2 text-xs text-[#292524]">
                  <option>Web Radio & Podcasts</option>
                  <option>Web TV & Vidéo</option>
                  <option>Journalisme écrit & Enquêtes</option>
                  <option>Photographie de quartier</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#DF6847] hover:bg-[#BA4E30] text-white py-2.5 rounded-full text-xs font-bold"
              >
                Rejoindre la rédaction citoyenne
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
