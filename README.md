# 🧙‍♂️ Harry Potter Card Collection

Bienvenue sur le dépôt de **Harry Potter Card Collection**, un site web permettant de collectionner des cartes de l'univers de **Harry Potter**. 
Ce projet a été réalisé avec **Node.js, Express.js et Prisma**.

## ✨ Aperçu

Le site permet aux utilisateurs de collectionner, gérer et visualiser des cartes inspirées du monde de **Harry Potter**.
Chaque carte possède ses propres caractéristiques et rareté.

## 🚀 Fonctionnalités

- 📜 **Gestion des cartes** : Ajout, suppression et modification des cartes de collection.
- 🏆 **Système de rareté** : Classement des cartes en fonction de leur rareté (commune, rare, légendaire).
- 👤 **Gestion des utilisateurs** : Inscription, connexion et gestion du profil des collectionneurs.
- 💾 **Stockage des données** avec **Prisma** et une base de données SQL.
- 🔍 **Recherche et filtres** : Trouvez facilement vos cartes préférées.
- 🔐 **Authentification sécurisée** avec gestion des sessions.

## 🛠 Technologies utilisées

-**Frontend** : HTML, CSS, JS
- **Backend** : Node.js, Express.js
- **Base de données** : Prisma ORM (MySQL)
- **Gestion des dépendances** : npm

## 🔧 Installation et utilisation

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/Nico-Sung/Harry_Potter_Card.git
   ```

2. **Accéder au répertoire du projet** :

   ```bash
   cd Harry_Potter_Card
   ```

3. **Installer les dépendances** :

   ```bash
   npm install
   ```

4. **Configurer la base de données** :

   - Dans le fichier `.env`, ajoutez votre URL de base de données Prisma :
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/harry_potter_cards"
     ```
   - Exécutez la migration Prisma :
     ```bash
     npx prisma migrate dev
     ```

5. **Lancer le serveur backend** :

   ```bash
   npm run dev
   ```

   Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

---

✨ Merci de découvrir **Harry Potter Card Collection** ! Que la magie soit avec vous ! 🪄🔮
