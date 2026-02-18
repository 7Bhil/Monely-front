# Monely Web - Interface React + TypeScript

Interface web moderne et responsive pour la gestion budgétaire intelligente.

## 🌐 Description

Monely Web est une application web progressive (PWA) offrant une expérience complète de gestion financière depuis n'importe quel navigateur, avec synchronisation en temps réel et intelligence artificielle.

## 🛠️ Stack Technique

- **React 19.2.0** - Framework frontend avec hooks modernes
- **TypeScript** - Typage statique et sécurité du code
- **Vite 7.3.1** - Build tool ultra-rapide
- **Tailwind CSS 3.4.19** - Framework CSS utilitaire
- **Radix UI** - Composants accessibles et personnalisables
- **React Router 7.13.0** - Navigation client-side
- **Axios 1.13.5** - Client HTTP avec intercepteurs
- **Recharts 3.7.0** - Graphiques interactifs
- **Lucide React 0.564.0** - Icônes modernes
- **Google Generative AI 1.41.0** - Intégration IA Gemini

### Outils de Développement
- **ESLint 9.39.1** - Linting et qualité de code
- **PostCSS 8.5.6** - Traitement CSS
- **Autoprefixer 10.4.24** - Compatibilité navigateurs

## 🚀 Installation

### Prérequis
- Node.js (version 18+)
- npm ou yarn
- Clé API Gemini (pour les fonctionnalités IA)

### Étapes

```bash
# 1. Naviguer dans le dossier
cd web

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec votre configuration

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 📁 Structure du Projet

```
web/
├── src/                    # Code source
│   ├── main.tsx           # Point d'entrée
│   ├── App.tsx            # Composant racine
│   ├── components/        # Composants réutilisables
│   │   ├── ui/           # Composants UI de base
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── index.ts   # Barrel exports
│   │   ├── layout/       # Composants de mise en page
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   └── features/      # Composants par fonctionnalité
│   │       ├── auth/      # Authentification
│   │       ├── dashboard/ # Tableau de bord
│   │       ├── transactions/ # Gestion transactions
│   │       ├── wallets/   # Gestion portefeuilles
│   │       └── analytics/ # Analyses
│   ├── pages/             # Pages principales
│   │   ├── HomePage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── TransactionsPage.tsx
│   │   └── SettingsPage.tsx
│   ├── hooks/             # Hooks personnalisés
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useLocalStorage.ts
│   ├── services/          # Services et API
│   │   ├── api.ts         # Configuration Axios
│   │   ├── authService.ts # Service authentification
│   │   ├── transactionService.ts
│   │   └── aiService.ts   # Service IA Gemini
│   ├── utils/             # Utilitaires
│   │   ├── formatters.ts  # Formatage données
│   │   ├── validators.ts  # Validation formulaires
│   │   └── constants.ts   # Constantes de l'app
│   ├── types/             # Définitions de types
│   │   ├── api.ts         # Types API
│   │   ├── user.ts        # Types utilisateur
│   │   └── transaction.ts # Types transactions
│   ├── styles/            # Styles globaux
│   │   ├── globals.css    # Styles de base
│   │   └── components.css # Styles composants
│   └── assets/            # Assets statiques
│       ├── images/        # Images et icônes
│       └── fonts/         # Polices locales
├── public/                # Fichiers publics
│   ├── favicon.ico        # Icône du site
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO
├── dist/                  # Build de production
├── package.json           # Dépendances et scripts
├── tsconfig.json          # Configuration TypeScript
├── vite.config.ts         # Configuration Vite
├── tailwind.config.js     # Configuration Tailwind
├── postcss.config.js      # Configuration PostCSS
├── eslint.config.js       # Configuration ESLint
└── .env.example           # Variables d'environnement
```

## 🎨 Fonctionnalités

### Gestion Financière
- **Dashboard interactif** : Vue d'ensemble avec graphiques en temps réel
- **Portefeuilles multiples** : Gestion des comptes bancaires, cartes, épargne
- **Transactions intelligentes** : Saisie rapide avec catégorisation automatique
- **Budgets et alertes** : Suivi des limites de dépenses par catégorie
- **Objectifs d'épargne** : Définition et suivi des objectifs financiers

### Analyses et Visualisations
- **Graphiques dynamiques** : Évolution des soldes, répartition des dépenses
- **Export de rapports** : PDF et CSV avec périodes personnalisables
- **Filtres avancés** : Recherche et filtrage multi-critères
- **Mode sombre/clair** : Thème adaptatif avec persistance

### Intelligence Artificielle
- **Conseils personnalisés** : Recommandations basées sur l'historique
- **Détection d'anomalies** : Alertes pour dépenses inhabituelles
- **Prédictions budgétaires** : Projections basées sur les tendances
- **Optimisation automatique** : Suggestions d'économies

### Expérience Utilisateur
- **Design responsive** : Adaptation parfaite mobile/desktop/tablette
- **PWA Ready** : Installation possible et mode hors ligne
- **Notifications push** : Alertes en temps réel
- **Accessibilité** : Conforme WCAG 2.1

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run preview          # Aperçu du build

# Qualité	npm run lint             # Linting du code
npm run lint:fix          # Correction automatique

# Tests (à implémenter)
npm test                 # Tests unitaires
npm run test:e2e         # Tests end-to-end
npm run test:coverage    # Tests avec couverture
```

## ⚙️ Configuration

### Variables d'Environnement

Créer un fichier `.env` à la racine :

```env
# API Configuration
VITE_API_BASE_URL=https://api.monely.com
VITE_API_KEY=votre_cle_api

# Gemini AI
VITE_GEMINI_API_KEY=votre_cle_gemini

# Application
VITE_APP_NAME=Monely
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true

# Development
VITE_DEV_MODE=true
```

### Personnalisation

#### Thème et Couleurs
Modifier `tailwind.config.js` :

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Couleurs personnalisées...
      },
    },
  },
}
```

#### Composants UI
Les composants dans `src/components/ui/` utilisent :
- **Tailwind CSS** pour le style
- **Radix UI** pour l'accessibilité
- **TypeScript** pour la sécurité du typage
- **CVA (Class Variance Authority)** pour les variantes

## 🔗 Intégration API

### Configuration Axios
```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Interceptor pour les tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Services Principaux
- **AuthService** : Gestion authentification (login, register, refresh)
- **TransactionService** : CRUD transactions, filtres, export
- **WalletService** : Gestion portefeuilles, soldes, transferts
- **AnalyticsService** : Statistiques, graphiques, rapports
- **AIService** : Intégration Gemini pour les insights

## 🎯 Architecture

### Pattern par Fonctionnalité
Le code est organisé par fonctionnalités plutôt que par type :
```
src/components/features/
├── auth/          # Tout ce qui concerne l'auth
├── dashboard/     # Composants du dashboard
├── transactions/  # Gestion des transactions
└── analytics/     # Composants d'analyse
```

### État Global
Utilisation des hooks React pour la gestion d'état :
- **Context API** pour l'authentification
- **Custom Hooks** pour la logique métier
- **Local Storage** pour la persistance

### Type Safety
TypeScript strict avec :
- Définitions de types complètes
- Interfaces pour les réponses API
- Types génériques réutilisables

## 📱 Responsive Design

### Points de Rupture
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

### Adaptations
- Navigation mobile avec menu hamburger
- Tableaux avec scroll horizontal sur mobile
- Graphiques adaptatifs selon la taille
- Touch-friendly sur mobile

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

Le dossier `dist/` contient :
- Fichiers HTML/CSS/JS optimisés
- Assets minifiés et versionnés
- Manifest PWA
- Service Worker pour le hors ligne

### Déploiement sur Vercel
1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement sur chaque push

### Déploiement sur Netlify
1. Connecter le repository
2. Configurer : Build command `npm run build`
3. Publish directory : `dist/`
4. Ajouter les variables d'environnement

### Docker (Optionnel)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
```

## 🧪 Tests

### Structure de Tests
```
src/
├── __tests__/              # Fichiers de test
│   ├── components/        # Tests composants
│   ├── hooks/            # Tests hooks
│   ├── services/         # Tests services
│   └── utils/            # Tests utilitaires
└── setup.ts              # Configuration tests
```

### Outils de Test (à ajouter)
- **Vitest** : Framework de tests unitaires
- **React Testing Library** : Tests composants React
- **MSW** : Mock Service Worker pour les API
- **Playwright** : Tests E2E

## 📝 Bonnes Pratiques

### Code Style
- Utiliser ESLint avec configuration stricte
- Formater avec Prettier
- Nommage cohérent (camelCase, PascalCase)
- Commentaires TypeScript pour la documentation

### Performance
- Lazy loading des composants avec React.lazy()
- Optimisation des images avec WebP
- Code splitting automatique avec Vite
- Utilisation de React.memo pour les composants coûteux

### Sécurité
- Validation des entrées utilisateur
- Sanitization des données
- HTTPS obligatoire en production
- Tokens JWT avec expiration
- CSP (Content Security Policy)

### Accessibilité
- Attributs ARIA appropriés
- Navigation au clavier complète
- Contrastes suffisants
- Screen reader friendly
- Tests avec axe-core

## 🔍 Monitoring et Analytics

### Analytics (Optionnel)
```typescript
// Google Analytics 4, Plausible, ou autre
import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      // Initialiser analytics
    }
  }, []);
};
```

### Performance Monitoring
- Core Web Vitals avec Vite
- Error tracking (Sentry, etc.)
- Logs des erreurs côté client

## 🤝 Contribution

1. Forker le projet
2. Créer une branche : `git checkout -b feature/nouvelle-fonctionnalite`
3. Commiter : `git commit -m 'Feat: ajout nouvelle fonctionnalité'`
4. Pousser : `git push origin feature/nouvelle-fonctionnalite`
5. Créer une Pull Request avec :
   - Description claire des changements
   - Captures d'écran si applicable
   - Tests ajoutés si nécessaire

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🔗 Liens Utiles

- [Documentation React](https://react.dev/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Documentation Vite](https://vite.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/)

## 📞 Support

Pour toute question ou problème :
1. Vérifier les issues existantes
2. Créer une nouvelle issue avec :
   - Description détaillée
   - Étapes pour reproduire
   - Navigateur et version
   - Capture d'écran si applicable
   - Console errors si disponibles
