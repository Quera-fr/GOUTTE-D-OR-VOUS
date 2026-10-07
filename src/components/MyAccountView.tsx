import React, { useState, useEffect } from 'react';
import { User, DirectoryStructure, ActiveView, DirectoryCategory } from '../types';
import { DatabaseService } from '../services/dbService';
import { geocodeAddress } from '../utils/geocoding';
import { User as UserIcon, Building, Save, CheckCircle, Image as ImageIcon, MapPin, Clock, Phone, Mail, Tag, Users } from 'lucide-react';

interface MyAccountViewProps {
  currentUser: User;
  onNavigate: (view: ActiveView) => void;
  onUpdateUser: (updatedUser: User) => void;
}

export const MyAccountView: React.FC<MyAccountViewProps> = ({
  currentUser,
  onNavigate,
  onUpdateUser,
}) => {
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);

  // Association specific editable state
  const [assocData, setAssocData] = useState<DirectoryStructure | null>(null);
  const [logo, setLogo] = useState('');
  const [assocName, setAssocName] = useState('');
  const [address, setAddress] = useState('');
  const [publicCible, setPublicCible] = useState('Tout public');
  const [horaires, setHoraires] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [thematique, setThematique] = useState('Éducation & Scolarité');
  const [histoire, setHistoire] = useState('');
  const [activites, setActivites] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const publicOptions = [
    'Tout public',
    'Enfants & Jeunesse (0-18 ans)',
    'Familles & Parents',
    'Seniors & Aînés',
    'Usagers de santé & Précarité',
    'Habitants du quartier',
  ];

  const thematiqueCategoryMap: { id: DirectoryCategory; label: string; catLabel: string }[] = [
    { id: 'sante', label: 'Santé & Prévention', catLabel: 'Santé' },
    { id: 'culture', label: 'Culture & Art', catLabel: 'Culture' },
    { id: 'jeunesse', label: 'Jeunesse & Enfance', catLabel: 'Jeunesse' },
    { id: 'education', label: 'Éducation & Scolarité', catLabel: 'Éducation' },
    { id: 'sport', label: 'Sport & Bien-être', catLabel: 'Sport' },
    { id: 'maison_assoc', label: 'Maison d’Associations & Habitants', catLabel: 'Maison d’Associations' },
  ];

  useEffect(() => {
    if (currentUser.associationId) {
      fetch('/api/associations/all')
        .then((res) => res.json())
        .then((data) => {
          const found = Array.isArray(data)
            ? data.find((a: any) => a.id === currentUser.associationId)
            : null;
          const assoc = found || DatabaseService.getAllAssociations().find((a) => a.id === currentUser.associationId);

          if (assoc) {
            setAssocData(assoc);
            setLogo(assoc.logo || '');
            setAssocName(assoc.name);
            setAddress(assoc.address);
            setPublicCible(assoc.publicCible || 'Tout public');
            setHoraires(assoc.horaires || '');
            setPhone(assoc.phone || '');
            setEmail(assoc.email || '');
            setThematique(assoc.thematique || 'Éducation & Scolarité');
            setHistoire(assoc.histoire || '');
            setActivites(assoc.activites || '');
          }
        })
        .catch(() => {
          const assoc = DatabaseService.getAllAssociations().find((a) => a.id === currentUser.associationId);
          if (assoc) {
            setAssocData(assoc);
            setLogo(assoc.logo || '');
            setAssocName(assoc.name);
            setAddress(assoc.address);
            setPublicCible(assoc.publicCible || 'Tout public');
            setHoraires(assoc.horaires || '');
            setPhone(assoc.phone || '');
            setEmail(assoc.email || '');
            setThematique(assoc.thematique || 'Éducation & Scolarité');
            setHistoire(assoc.histoire || '');
            setActivites(assoc.activites || '');
          }
        });
    }
  }, [currentUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(false);

    // Update User Profile
    const updatedUser: User = {
      ...currentUser,
      name: userName,
      email: userEmail,
    };

    onUpdateUser(updatedUser);

    // If Association account, update Association in DB and SQLite file
    if (currentUser.associationId) {
      const selectedThemeObj = thematiqueCategoryMap.find(
        (t) => t.label === thematique || t.id === (thematique as any)
      );
      const targetCategory = selectedThemeObj ? selectedThemeObj.id : ('education' as const);
      const targetCategoryLabel = selectedThemeObj ? selectedThemeObj.catLabel : 'Éducation';

      // Geocode latitude & longitude based on address
      const geo = geocodeAddress(address);

      const updatedAssoc: DirectoryStructure = {
        id: currentUser.associationId,
        name: assocName,
        logo: logo,
        category: targetCategory,
        categoryLabel: targetCategoryLabel,
        address: address,
        publicCible: publicCible,
        horaires: horaires,
        phone: phone,
        email: email,
        website: assocData?.website || '',
        thematique: selectedThemeObj?.label || thematique,
        contact: `${phone} - ${email}`,
        histoire: histoire,
        activites: activites,
        fonctionnement: assocData?.fonctionnement || 'Ouvert à tou.tes.',
        contactsDetails: `📍 ${address} · 📞 ${phone} · ✉️ ${email}`,
        mapCoords: { x: geo.x, y: geo.y },
        lat: geo.lat,
        lng: geo.lng,
        status: 'approved',
      };

      DatabaseService.updateAssociation(currentUser.associationId, updatedAssoc);

      try {
        await fetch('/api/associations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedAssoc),
        });
      } catch (_) {}
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-[#FAF7EE] border-2 border-[#E7DECD] rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E7DECD] pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#DF6847]/10 text-[#DF6847] rounded-2xl">
              {currentUser.role === 'association' ? (
                <Building className="w-8 h-8" />
              ) : (
                <UserIcon className="w-8 h-8" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#4A1E0E]">Mon Compte</h1>
              <p className="text-xs text-[#786E5D]">
                Gérez vos informations personnelles {currentUser.role === 'association' && 'et votre profil association'}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#284B3D] text-white text-xs font-bold uppercase tracking-wider rounded-full">
            {currentUser.role === 'admin'
              ? 'Administrateur'
              : currentUser.role === 'association'
              ? 'Association'
              : 'Habitant'}
          </span>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Vos informations ont été enregistrées avec succès dans la base de données (database.sqlite) et sont publiées dans l'annuaire !</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* General User Profile Info */}
          <div className="bg-[#F2EBD9] p-5 rounded-2xl border border-[#E4D9C3] space-y-4">
            <h2 className="text-sm font-bold text-[#4A1E0E] uppercase tracking-wider flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[#DF6847]" />
              <span>Informations du Compte</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
                  Nom d’utilisateur / Responsable
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
                  Adresse e-mail de connexion
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                />
              </div>
            </div>
          </div>

          {/* Association Detailed Editing Section */}
          {(currentUser.role === 'association' || currentUser.associationId) && (
            <div className="bg-[#FAF7EE] p-5 rounded-2xl border-2 border-[#284B3D]/30 space-y-4">
              <h2 className="text-base font-serif font-bold text-[#284B3D] flex items-center gap-2 border-b border-[#E7DECD] pb-2">
                <Building className="w-5 h-5 text-[#284B3D]" />
                <span>Informations de l’Association (Fiche Annuaire)</span>
              </h2>

              <div className="space-y-4">
                {/* Logo & Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A1E0E] mb-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#DF6847]" />
                      <span>Nom de l’association *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={assocName}
                      onChange={(e) => setAssocName(e.target.value)}
                      placeholder="Ex: Quera Fablab"
                      className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A1E0E] mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-[#DF6847]" />
                      <span>Logo / Image (URL)</span>
                    </label>
                    <input
                      type="text"
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                      placeholder="https://exemple.com/logo.jpg"
                      className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                    />
                  </div>
                </div>

                {/* Address & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A1E0E] mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#DF6847]" />
                      <span>Adresse complète (Affichée sur la carte) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: 16 rue Ernestine, 75018 Paris"
                      className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A1E0E] mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#DF6847]" />
                      <span>Téléphone de contact</span>
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 01 40 00 18 18"
                      className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                    />
                  </div>
                </div>

                {/* Dropdowns: Public & Thématique */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A1E0E] mb-1 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#284B3D]" />
                      <span>Public cible *</span>
                    </label>
                    <select
                      value={publicCible}
                      onChange={(e) => setPublicCible(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-bold text-[#4A1E0E] outline-none focus:ring-2 focus:ring-[#DF6847] cursor-pointer"
                    >
                      {publicOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A1E0E] mb-1 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-[#284B3D]" />
                      <span>Thématique (Catégorie Annuaire) *</span>
                    </label>
                    <select
                      value={thematique}
                      onChange={(e) => setThematique(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-bold text-[#4A1E0E] outline-none focus:ring-2 focus:ring-[#DF6847] cursor-pointer"
                    >
                      {thematiqueCategoryMap.map((opt) => (
                        <option key={opt.id} value={opt.label}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Horaires & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A1E0E] mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#DF6847]" />
                      <span>Horaires d’ouverture *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={horaires}
                      onChange={(e) => setHoraires(e.target.value)}
                      placeholder="Ex: Lundi - Samedi de 10h00 à 19h00"
                      className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A1E0E] mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#DF6847]" />
                      <span>Email public de l’association</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kevin.duranty@quera.fr"
                      className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                    />
                  </div>
                </div>

                {/* Description & Activities */}
                <div>
                  <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
                    Histoire & Présentation de l’association
                  </label>
                  <textarea
                    rows={3}
                    value={histoire}
                    onChange={(e) => setHistoire(e.target.value)}
                    placeholder="Présentez l'histoire et la mission de votre structure..."
                    className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
                    Activités principales
                  </label>
                  <textarea
                    rows={3}
                    value={activites}
                    onChange={(e) => setActivites(e.target.value)}
                    placeholder="Décrivez vos ateliers, permanences, événements..."
                    className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] outline-none focus:ring-2 focus:ring-[#DF6847]"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E7DECD]">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 bg-[#F2EBD9] hover:bg-[#EBE2CD] text-[#4A1E0E] font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#DF6847] hover:bg-[#C94F30] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
