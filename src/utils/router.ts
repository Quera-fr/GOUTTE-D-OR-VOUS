import { ActiveView } from '../types';

export function getViewFromPath(pathname: string): ActiveView {
  const normalizedPath = pathname.toLowerCase().replace(/\/$/, '') || '/';

  switch (normalizedPath) {
    case '/':
      return 'home';
    case '/le-media':
    case '/media':
      return 'media';
    case '/agenda':
      return 'agenda';
    case '/annuaire':
      return 'annuaire';
    case '/espace-agir':
    case '/agir':
      return 'agir';
    case '/mon-compte':
    case '/my-account':
      return 'myAccount';
    case '/connexion':
    case '/login':
      return 'login';
    case '/admin':
      return 'admin';
    case '/boussole':
    case '/hero':
      return 'hero';
    default:
      return 'home';
  }
}

export function getPathFromView(view: ActiveView): string {
  switch (view) {
    case 'home':
      return '/';
    case 'media':
      return '/le-media';
    case 'agenda':
      return '/agenda';
    case 'annuaire':
      return '/annuaire';
    case 'agir':
      return '/espace-agir';
    case 'myAccount':
      return '/mon-compte';
    case 'login':
      return '/connexion';
    case 'admin':
    case 'createArticle':
      return '/admin';
    case 'hero':
      return '/boussole';
    default:
      return '/';
  }
}
