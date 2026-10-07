import React, { useState } from 'react';
import { User, ActiveView } from '../types';
import { DatabaseService } from '../services/dbService';
import { User as UserIcon, Building, Shield, Lock, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (view: ActiveView) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onNavigate }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'association'>('user');
  const [associationName, setAssociationName] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleQuickLogin = (demoEmail: string) => {
    const users = DatabaseService.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === demoEmail.toLowerCase());
    if (user) {
      if (user.status === 'pending') {
        setErrorMsg('Ce compte association est en attente de validation par un administrateur.');
        return;
      }
      onLoginSuccess(user);
    } else {
      setErrorMsg('Utilisateur démo non trouvé.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const users = DatabaseService.getUsers();

    if (isRegisterMode) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setErrorMsg('Veuillez remplir tous les champs requis.');
        return;
      }

      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        setErrorMsg('Un compte existe déjà avec cette adresse email.');
        return;
      }

      const isAssoc = role === 'association';
      const status = 'approved';
      const newUserId = 'usr-' + Date.now();

      let assocId: string | undefined = undefined;

      if (isAssoc) {
        assocId = 'assoc-' + Date.now();
        const newAssoc = {
          id: assocId,
          name: associationName || name,
          category: 'maison_assoc' as const,
          categoryLabel: 'Maison d’Associations',
          address: 'Goutte d’Or, 75018 Paris',
          publicCible: 'Habitants du quartier & Adhérents',
          horaires: 'Du lundi au samedi',
          phone: '',
          email: email.trim(),
          website: '',
          thematique: 'Vie associative & Quartier',
          contact: email.trim(),
          histoire: 'Association du quartier Goutte d’Or.',
          activites: 'Informations en cours d’actualisation par l’association.',
          fonctionnement: 'Ouvert à tou.tes.',
          contactsDetails: `📍 Goutte d’Or, Paris 18e · ✉️ ${email.trim()}`,
          mapCoords: { x: 50, y: 50 },
          lat: 48.8876 + (Math.random() * 0.004 - 0.002),
          lng: 2.3530 + (Math.random() * 0.004 - 0.002),
          status: 'approved' as const,
        };

        DatabaseService.addAssociation(newAssoc);

        fetch('/api/associations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAssoc),
        }).catch(() => {});
      }

      const newUser: User = {
        id: newUserId,
        email: email.trim(),
        name: isAssoc ? (associationName || name) : name.trim(),
        role: role,
        status: status,
        associationId: assocId,
      };

      DatabaseService.addUser(newUser);

      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      }).catch(() => {});

      setSuccessMsg('Compte et fiche association créés avec succès ! Vous êtes maintenant connecté.');
      onLoginSuccess(newUser);
    } else {
      // Login mode
      const usersList = DatabaseService.getUsers();
      const user = usersList.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!user) {
        // Fallback check physical API users list
        fetch('/api/users')
          .then((res) => res.json())
          .then((apiUsers) => {
            const apiUser = Array.isArray(apiUsers) && apiUsers.find((u: any) => u.email.toLowerCase() === email.trim().toLowerCase());
            if (apiUser) {
              onLoginSuccess(apiUser);
            } else {
              setErrorMsg('Aucun compte trouvé avec cet e-mail.');
            }
          })
          .catch(() => setErrorMsg('Aucun compte trouvé avec cet e-mail.'));
        return;
      }

      onLoginSuccess(user);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#FAF7EE] p-8 rounded-3xl border-2 border-[#E7DECD] shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#DF6847]/10 text-[#DF6847] mb-4">
            {isRegisterMode ? <UserIcon className="h-8 w-8" /> : <Lock className="h-8 w-8" />}
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#4A1E0E]">
            {isRegisterMode ? 'Inscription' : 'Connexion'}
          </h2>
          <p className="mt-2 text-sm text-[#786E5D]">
            {isRegisterMode
              ? 'Rejoignez la communauté Goutte d’Or & Vous'
              : 'Accédez à votre espace membre ou association'}
          </p>
        </div>

        {/* Demo Quick Logins Box */}
        <div className="bg-[#F2EBD9] p-4 rounded-2xl border border-[#E4D9C3] space-y-2">
          <p className="text-xs font-bold text-[#4A1E0E] uppercase tracking-wider text-center mb-1">
            ⚡ Connexion Rapide Démo
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@gouttedor.fr')}
              className="px-1.5 py-1.5 bg-[#DF6847] hover:bg-[#C94F30] text-white rounded-xl text-[10px] font-bold transition-all shadow-2xs flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('contact@sallesaintbruno.org')}
              className="px-1.5 py-1.5 bg-[#284B3D] hover:bg-[#1E392E] text-white rounded-xl text-[10px] font-bold transition-all shadow-2xs flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <Building className="w-3.5 h-3.5" />
              <span>St-Bruno</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('kevin.duranty@quera.fr')}
              className="px-1.5 py-1.5 bg-[#F05727] hover:bg-[#C94F30] text-white rounded-xl text-[10px] font-bold transition-all shadow-2xs flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Quera Fablab</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('jean.dupont@gmail.com')}
              className="px-1.5 py-1.5 bg-[#4A1E0E] hover:bg-[#34150A] text-white rounded-xl text-[10px] font-bold transition-all shadow-2xs flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Habitant</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {isRegisterMode && (
            <>
              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
                  Je m’inscris en tant que :
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      role === 'user'
                        ? 'bg-[#4A1E0E] text-white border-[#4A1E0E]'
                        : 'bg-[#FAF7EE] text-[#5C5042] border-[#E7DECD] hover:bg-[#F2EBD9]'
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Habitant</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('association')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      role === 'association'
                        ? 'bg-[#284B3D] text-white border-[#284B3D]'
                        : 'bg-[#FAF7EE] text-[#5C5042] border-[#E7DECD] hover:bg-[#F2EBD9]'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Association</span>
                  </button>
                </div>
              </div>

              {role === 'association' && (
                <div>
                  <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
                    Nom de l’association *
                  </label>
                  <input
                    type="text"
                    required
                    value={associationName}
                    onChange={(e) => setAssociationName(e.target.value)}
                    placeholder="Ex: Les Amis de la Goutte d'Or"
                    className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] focus:ring-2 focus:ring-[#DF6847] outline-none"
                  />
                  <p className="text-[11px] text-[#DF6847] mt-1 font-medium">
                    ⚠️ Les comptes associations doivent être validés par un admin avant activation.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
                  Nom complet / Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Sarah Martin"
                  className="w-full px-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] focus:ring-2 focus:ring-[#DF6847] outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
              Adresse e-mail *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#786E5D] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.fr"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] focus:ring-2 focus:ring-[#DF6847] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A1E0E] mb-1">
              Mot de passe *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#786E5D] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E7DECD] rounded-xl text-xs font-medium text-[#292524] focus:ring-2 focus:ring-[#DF6847] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#DF6847] hover:bg-[#C94F30] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer mt-2"
          >
            {isRegisterMode ? 'Créer mon compte' : 'Se connecter'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#E7DECD]">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className="text-xs font-bold text-[#4A1E0E] hover:text-[#DF6847] transition-colors cursor-pointer"
          >
            {isRegisterMode
              ? 'Déjà un compte ? Connectez-vous'
              : 'Pas encore de compte ? Inscrivez-vous'}
          </button>
        </div>
      </div>
    </div>
  );
};
