-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 11 mai 2024 à 01:58
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `suivi_stage_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `depot_stage`
--

CREATE TABLE `depot_stage` (
  `id_ds` int(11) NOT NULL,
  `id_etu` int(11) NOT NULL,
  `id_os` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `encadrant`
--

CREATE TABLE `encadrant` (
  `id_enc` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `departement` varchar(255) NOT NULL,
  `specialite` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `encadrant`
--

INSERT INTO `encadrant` (`id_enc`, `nom`, `prenom`, `email`, `password`, `departement`, `specialite`, `contact`) VALUES
(1, 'Mtir', 'Mehdi', 'mehdimtir@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'informatique', 'Web Development', '55698712'),
(2, 'Saadaoui', 'Abdelkader', 'abdelkadersaadaoui@gmail.com', '$2b$10$Gl2TH9BnFJcvbbPPn3QqKO/5Q8A0QVwz70DSNESh1txhPPODmsehS', 'Informatique', 'System Embarqué', '56987422'),
(3, 'Mansouri', 'Lamia', 'lamiamansouri@gmail.com', '$2b$10$eOimZUOesebORiWaJEv5rulcvG5oZImRdIMz86G3tAPOJmVnVjCP.', 'Informatique', 'application web', '78945611'),
(4, 'Kacem', 'Souha', 'souhakacem@gmail.com', '$2b$10$eOimZUOesebORiWaJEv5rulcvG5oZImRdIMz86G3tAPOJmVnVjCP.', 'Informatique', 'application web', '78945611'),
(5, 'Hichri', 'Donia', 'doniahichri@gmail.com', '$2b$10$eOimZUOesebORiWaJEv5rulcvG5oZImRdIMz86G3tAPOJmVnVjCP.', 'Informatique', 'application web', '78945611'),
(6, 'Lassoued', 'Mohamed', 'mohamedlassoued@gmail.com', '$2b$10$eOimZUOesebORiWaJEv5rulcvG5oZImRdIMz86G3tAPOJmVnVjCP.', 'Informatique', 'application web', '78945611'),
(7, 'Bjaoui', 'Feteh', 'fetehbjaoui@gmail.com', '$2b$10$eOimZUOesebORiWaJEv5rulcvG5oZImRdIMz86G3tAPOJmVnVjCP.', 'Informatique', 'IOT', '78945611'),
(8, 'Ghlala', 'Riadh', 'riadhghlala@gmail.com', '$2b$10$eOimZUOesebORiWaJEv5rulcvG5oZImRdIMz86G3tAPOJmVnVjCP.', 'Informatique', 'BI ,Big Data', '78945611');

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

CREATE TABLE `entreprise` (
  `id_ent` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `secteuractivite` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `logo` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id_ent`, `nom`, `email`, `password`, `secteuractivite`, `adresse`, `contact`, `logo`, `status`) VALUES
(1, 'SAGEM Com', 'SAGEM@isetr.tn', '$2b$10$QBWhrbyz.s79K2MpiC3yfuocA/htu8xW.Ku64U1znmbe0i3IkIXIW', 'Informatique, Gestion, Réseau', 'Tunis', '9111', 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/cc/LOGO_SAGEMCOM.png/800px-LOGO_SAGEMCOM.png?20200213095826', 1),
(2, 'STAFIM', 'STAFIM@isetr.tn', '$2b$10$QBWhrbyz.s79K2MpiC3yfuocA/htu8xW.Ku64U1znmbe0i3IkIXIW', 'Informatique, Gestion, Voiture', 'Tunis', '19789', 'https://www.taa.tn/wp-content/uploads/2023/08/stafim-1.jpg', 1),
(3, 'Rades', 'RAdes@isetr.tn', '$2b$10$KpmGB/DugYn0WDUDQjDpRuOHI4hrkaBIVCKTofHBb8ruu6QdI4ZUK', 'info, gestion', 'Rades', '54879632', 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Graduation_hat.svg', 1),
(4, 'OACA', 'oaca@isetr.tn', '$2b$10$ekn8FlAJ6JBj8hOnCkpjdOw2P5uFQ/cKL9zw/SJscSfPV4UPF2JZy', 'avion', 'Aeroport', '12345678', 'https://www.oaca.nat.tn/o/landrick-theme/images/logo-light.png', 1),
(5, 'Mech3al', 'Mech3al@gmail.com', '$2b$10$dcBZzstPbIfcNlgXiZbax.9tjUDdg1SS3NS8dGuT3g7uRlpE7fgUm', 'Management ', 'Sky', '911', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Fire_in_Ranua.JPG/1200px-Fire_in_Ranua.JPG', 1),
(6, 'Tunisie Telecom', 'tunisietelecom@gmail.com', '$2b$10$dcBZzstPbIfcNlgXiZbax.9tjUDdg1SS3NS8dGuT3g7uRlpE7fgUm', 'Télécommunications', 'Avenue de la République, Tunis, Tunisie', '71 130 000', 'https://upload.wikimedia.org/wikipedia/fr/f/f9/LOGO_TT_.jpg', 1),
(7, 'Société Tunisienne de Banque (STB)', 'stb@gmail.com', '$2b$10$dcBZzstPbIfcNlgXiZbax.9tjUDdg1SS3NS8dGuT3g7uRlpE7fgUm', 'Services bancaires', 'Avenue Habib Bourguiba, Tunis, Tunisie', ' 71 341 000', 'https://upload.wikimedia.org/wikipedia/commons/0/06/Logo_STB.png', 1),
(8, 'Groupe Poulina', 'poulina@gmail.com', '$2b$10$dcBZzstPbIfcNlgXiZbax.9tjUDdg1SS3NS8dGuT3g7uRlpE7fgUm', 'Agroalimentaire', 'Rue de l\'Industrie, Monastir, Tunisie', '73 460 000', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaelt9Ge1GvsKSjJWzjyRxff6U00iXAy5vaTS1-ohCJw&s', 1),
(9, 'Carthage Cement', 'cement@gmail.com', '$2b$10$dcBZzstPbIfcNlgXiZbax.9tjUDdg1SS3NS8dGuT3g7uRlpE7fgUm', 'Industrie du ciment', 'Route de Gafsa, Djebel Ressas, Tunisie', '71 390 888', 'https://carthagecement.com.tn/sites/default/files/2021-02/cc1.jpg', 1),
(10, 'Orange Tunisie', 'orange@gmail.com', '$2b$10$dcBZzstPbIfcNlgXiZbax.9tjUDdg1SS3NS8dGuT3g7uRlpE7fgUm', 'Télécommunications', 'Rue du Lac Constance, Les Berges du Lac, Tunisie', '71 101 010', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png', 1);

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id_etu` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `departement` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `cv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id_etu`, `nom`, `prenom`, `email`, `password`, `departement`, `contact`, `cv`) VALUES
(1, 'Saadaoui', 'Yassine\r\n', 'yassinesaadaoui@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '78541236', 'Etudiant1714734093312--Chapitre-1-2021.pdf'),
(2, 'Soltani', 'Wissal', 'wissalsoltani@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '98563214', ''),
(3, 'Mechergui', 'Mohamed Aziz', 'azizmechergui@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '25983247', ''),
(4, 'Sighari', 'Youssef', 'youssefsighari@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '55789632', ''),
(7, 'Mesarati', 'Lina', 'linamesarati@isetr.tn', '$2b$10$1Iy8PXv2tHfdUAnwirvvT.lb5COFmyJ9Xg.mq9x.PrptI0gQbxBTS', 'Informatique', '69874533', ''),
(9, 'Ben Ahmed', 'Amira', 'amira.benahmed@example.com', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '22 333 444', ''),
(10, 'Khedher', 'Anis', 'anis.khedher@example.com', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Génie Civil', '71 555 666', ''),
(11, 'Mejri', 'Samia', 'samia.mejri@example.com', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Gestion', '98 777 888', ''),
(12, 'Chaabani', 'Yassine', 'yassine.chaabani@example.com', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Mécanique', '71 999 000', ''),
(13, 'Bouazizi', 'Fatma', 'fatma.bouazizi@example.com', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Electrique', '98 111 222', '');

-- --------------------------------------------------------

--
-- Structure de la table `jurie`
--

CREATE TABLE `jurie` (
  `id_jur` int(11) NOT NULL,
  `id_enc` int(11) NOT NULL,
  `id_stg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `livret_stage`
--

CREATE TABLE `livret_stage` (
  `id_ls` int(11) NOT NULL,
  `date` date NOT NULL,
  `tache` text NOT NULL,
  `id_stg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `offre_stage`
--

CREATE TABLE `offre_stage` (
  `id_os` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` int(11) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `id_ent` int(11) NOT NULL,
  `nombre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `offre_stage`
--

INSERT INTO `offre_stage` (`id_os`, `titre`, `description`, `type`, `date_debut`, `date_fin`, `id_ent`, `nombre`) VALUES
(1, 'Offre de stage dans STAFIM', 'description', 1, '2024-01-11', '2024-02-03', 2, 10),
(2, 'Offre de stage dans SAGEM', 'description2', 2, '2024-01-11', '2024-02-03', 1, 3),
(3, 'demande de Stagier pour STAFIM', 'Informatique', 2, '2024-01-11', '2024-02-11', 2, 5),
(5, 'Développement Web Full Stack', 'Ce stage consiste à développer des applications web complètes en utilisant les technologies front-end et back-end modernes.', 3, '2024-06-01', '2024-09-01', 10, 3),
(6, 'Marketing Digital', 'Ce stage vise à mettre en pratique les techniques de marketing digital, y compris la gestion des réseaux sociaux, le référencement et la publicité en ligne.', 2, '2024-07-15', '2024-08-30', 7, 2),
(7, 'Conception Assistée par Ordinateur (CAO)', 'Ce stage permettra aux stagiaires d\'acquérir des compétences pratiques dans l\'utilisation de logiciels de CAO pour la conception de produits et de pièces mécaniques.', 1, '2024-05-10', '2024-06-30', 8, 1),
(8, 'Analyse Financière', 'Ce stage offre une expérience pratique dans l\'analyse des états financiers, la modélisation financière et l\'évaluation d\'entreprises.', 3, '2024-08-01', '2024-11-30', 9, 2),
(9, 'Développement Mobile avec Flutter', 'Ce stage permettra aux stagiaires de développer des applications mobiles multiplateformes en utilisant le framework Flutter de Google.', 2, '2024-06-20', '2024-08-15', 10, 3);

-- --------------------------------------------------------

--
-- Structure de la table `stage`
--

CREATE TABLE `stage` (
  `id_stg` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` int(11) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `id_ent` int(11) NOT NULL,
  `id_etu` int(11) NOT NULL,
  `id_enc` int(11) DEFAULT NULL,
  `valide` tinyint(1) DEFAULT NULL,
  `note` float DEFAULT NULL,
  `date_sout` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stage`
--

INSERT INTO `stage` (`id_stg`, `titre`, `description`, `type`, `date_debut`, `date_fin`, `id_ent`, `id_etu`, `id_enc`, `valide`, `note`, `date_sout`) VALUES
(12, 'Développement Web Full Stack', 'Ce stage consiste à développer des applications web complètes en utilisant les technologies front-end et back-end modernes.', 3, '2024-06-01', '2024-09-01', 10, 7, NULL, NULL, NULL, NULL),
(13, 'Développement Web Full Stack', 'Ce stage consiste à développer des applications web complètes en utilisant les technologies front-end et back-end modernes.', 3, '2024-06-01', '2024-09-01', 10, 1, NULL, NULL, NULL, NULL),
(14, 'Marketing Digital', 'Ce stage vise à mettre en pratique les techniques de marketing digital, y compris la gestion des réseaux sociaux, le référencement et la publicité en ligne.', 2, '2024-07-15', '2024-08-30', 7, 3, NULL, NULL, NULL, NULL),
(15, 'Marketing Digital', 'Ce stage vise à mettre en pratique les techniques de marketing digital, y compris la gestion des réseaux sociaux, le référencement et la publicité en ligne.', 2, '2024-07-15', '2024-08-30', 7, 4, NULL, NULL, NULL, NULL),
(16, 'Conception Assistée par Ordinateur (CAO)', 'Ce stage permettra aux stagiaires d\'acquérir des compétences pratiques dans l\'utilisation de logiciels de CAO pour la conception de produits et de pièces mécaniques.', 1, '2024-05-10', '2024-06-30', 8, 2, NULL, NULL, NULL, NULL),
(17, 'Analyse Financière', 'Ce stage offre une expérience pratique dans l\'analyse des états financiers, la modélisation financière et l\'évaluation d\'entreprises.', 3, '2024-08-01', '2024-11-30', 9, 9, NULL, NULL, NULL, NULL),
(18, 'Développement Mobile avec Flutter', 'Ce stage permettra aux stagiaires de développer des applications mobiles multiplateformes en utilisant le framework Flutter de Google.', 2, '2024-06-20', '2024-08-15', 10, 13, NULL, NULL, NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `depot_stage`
--
ALTER TABLE `depot_stage`
  ADD PRIMARY KEY (`id_ds`),
  ADD KEY `id_etudiant` (`id_etu`),
  ADD KEY `id_entreprise` (`id_os`);

--
-- Index pour la table `encadrant`
--
ALTER TABLE `encadrant`
  ADD PRIMARY KEY (`id_enc`);

--
-- Index pour la table `entreprise`
--
ALTER TABLE `entreprise`
  ADD PRIMARY KEY (`id_ent`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id_etu`);

--
-- Index pour la table `jurie`
--
ALTER TABLE `jurie`
  ADD PRIMARY KEY (`id_jur`),
  ADD KEY `FK_jur_enc` (`id_enc`),
  ADD KEY `FK_jur_stg` (`id_stg`);

--
-- Index pour la table `livret_stage`
--
ALTER TABLE `livret_stage`
  ADD PRIMARY KEY (`id_ls`),
  ADD KEY `FK_ls_stg` (`id_stg`);

--
-- Index pour la table `offre_stage`
--
ALTER TABLE `offre_stage`
  ADD PRIMARY KEY (`id_os`),
  ADD KEY `FK_os_ent` (`id_ent`);

--
-- Index pour la table `stage`
--
ALTER TABLE `stage`
  ADD PRIMARY KEY (`id_stg`),
  ADD KEY `FK_stg_ent` (`id_ent`),
  ADD KEY `FK_stg_enc` (`id_enc`),
  ADD KEY `FK_stg_etu` (`id_etu`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `depot_stage`
--
ALTER TABLE `depot_stage`
  MODIFY `id_ds` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `encadrant`
--
ALTER TABLE `encadrant`
  MODIFY `id_enc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id_ent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id_etu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `jurie`
--
ALTER TABLE `jurie`
  MODIFY `id_jur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `livret_stage`
--
ALTER TABLE `livret_stage`
  MODIFY `id_ls` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `offre_stage`
--
ALTER TABLE `offre_stage`
  MODIFY `id_os` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `stage`
--
ALTER TABLE `stage`
  MODIFY `id_stg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `depot_stage`
--
ALTER TABLE `depot_stage`
  ADD CONSTRAINT `FK_ds_et` FOREIGN KEY (`id_etu`) REFERENCES `etudiant` (`id_etu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ds_os` FOREIGN KEY (`id_os`) REFERENCES `offre_stage` (`id_os`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `jurie`
--
ALTER TABLE `jurie`
  ADD CONSTRAINT `FK_jur_enc` FOREIGN KEY (`id_enc`) REFERENCES `encadrant` (`id_enc`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_jur_stg` FOREIGN KEY (`id_stg`) REFERENCES `stage` (`id_stg`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `livret_stage`
--
ALTER TABLE `livret_stage`
  ADD CONSTRAINT `FK_ls_stg` FOREIGN KEY (`id_stg`) REFERENCES `stage` (`id_stg`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `offre_stage`
--
ALTER TABLE `offre_stage`
  ADD CONSTRAINT `FK_os_ent` FOREIGN KEY (`id_ent`) REFERENCES `entreprise` (`id_ent`);

--
-- Contraintes pour la table `stage`
--
ALTER TABLE `stage`
  ADD CONSTRAINT `FK_stg_enc` FOREIGN KEY (`id_enc`) REFERENCES `encadrant` (`id_enc`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `FK_stg_ent` FOREIGN KEY (`id_ent`) REFERENCES `entreprise` (`id_ent`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_stg_etu` FOREIGN KEY (`id_etu`) REFERENCES `etudiant` (`id_etu`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
