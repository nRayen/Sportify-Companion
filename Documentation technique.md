# Documentation technique - Sportify Companion

## Présentation du projet

Sportify Companion est une application mobile développée avec React Native et Expo qui permet aux utilisateurs de suivre leurs activités sportives, planifier leurs séances d'entraînement, et suivre leur progression. L'application offre une interface utilisateur intuitive et moderne pour améliorer l'expérience des sportifs.

## Architecture technique

### Technologies utilisées

- **React Native** : Framework pour le développement d'applications mobiles cross-platform
- **Expo** : Plateforme et ensemble d'outils pour faciliter le développement React Native
- **TypeScript** : Superset de JavaScript ajoutant le typage statique
- **Tamagui** : Système de design UI pour React Native
- **Expo Router** : Système de navigation basé sur les fichiers pour Expo
- **Zustand** : Bibliothèque de gestion d'état légère
- **React Native Calendars** : Composant de calendrier pour la planification
- **Expo Secure Store** : Stockage sécurisé pour les données sensibles

### Structure du projet

```
sportify-companion/
├── app/                      # Répertoire principal des écrans (utilisant Expo Router)
│   ├── (auth)/               # Routes authentifiées
│   │   ├── (tabs)/           # Onglets principaux de l'application
│   │   │   ├── home.tsx      # Écran d'accueil
│   │   │   ├── exercices.tsx # Écran des exercices
│   │   │   ├── planning.tsx  # Écran de planification
│   │   │   ├── suivi.tsx     # Écran de suivi de progression
│   │   │   ├── settings.tsx  # Écran de paramètres
│   │   │   └── _layout.tsx   # Configuration de la navigation par onglets
│   │   ├── _layout.tsx       # Configuration des routes authentifiées
│   │   └── (modals)/         # Écrans modaux
│   ├── index.tsx             # Écran de démarrage
│   ├── login.tsx             # Écran de connexion
│   ├── register.tsx          # Écran d'inscription
│   └── _layout.tsx           # Configuration globale des routes
├── components/               # Composants réutilisables
│   ├── ui/                   # Composants d'interface utilisateur génériques
│   ├── exercices/            # Composants liés aux exercices
│   └── home/                 # Composants pour l'écran d'accueil
├── hooks/                    # Hooks personnalisés React
├── constants/                # Constantes de l'application
├── libs/                     # Bibliothèques et utilitaires
└── assets/                   # Ressources statiques (images, fonts, etc.)
```

## Fonctionnalités principales

### Authentification
- Inscription avec email et mot de passe
- Connexion sécurisée
- Gestion des sessions utilisateur via Expo Secure Store

### Écran d'accueil
- Tableau de bord avec résumé des activités récentes
- Accès rapide aux fonctionnalités principales

### Gestion des exercices
- Catalogue d'exercices disponibles
- Informations détaillées pour chaque exercice
- Possibilité de créer des exercices personnalisés

### Planning d'entraînement
- Calendrier interactif pour la planification des séances
- Création et personnalisation de programmes d'entraînement
- Rappels et notifications pour les séances programmées

### Suivi de progression
- Visualisation des performances
- Historique des séances effectuées
- Statistiques personnalisées

### Paramètres
- Personnalisation de l'interface
- Gestion du profil utilisateur
- Configuration des préférences de notification

## Architecture logicielle

### Navigation
L'application utilise Expo Router, un système de navigation basé sur les fichiers qui permet une structure intuitive des routes. La navigation principale est organisée autour d'onglets (tabs) pour les fonctionnalités principales.

### Gestion d'état
- **Zustand** : Utilisé pour la gestion globale de l'état de l'application
- **React Context** : Utilisé pour certains contextes spécifiques comme l'authentification

### Modèle de données
L'application gère plusieurs types de données :
- Profil utilisateur
- Exercices et catégories
- Programmes d'entraînement
- Séances d'entraînement
- Historique et statistiques

### UI/UX
- Interface utilisateur construite avec Tamagui
- Support des thèmes clairs et sombres
- Composants personnalisés pour une expérience utilisateur cohérente

## Sécurité
- Stockage sécurisé des informations d'authentification
- Validation des données saisies par l'utilisateur
- Protection contre les attaques courantes

## Perspectives d'évolution
- Intégration avec des appareils connectés (montres, bracelets fitness)
- Fonctionnalités sociales pour partager ses performances
- Analyse avancée des performances avec intelligence artificielle
- Version web complémentaire

## Contraintes et limitations
- Nécessite une connexion internet pour certaines fonctionnalités
- Compatible avec iOS et Android via Expo
- Optimisée pour les smartphones mais adaptable aux tablettes 