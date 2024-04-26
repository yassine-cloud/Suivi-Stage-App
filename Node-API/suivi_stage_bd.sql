-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 27 avr. 2024 à 01:29
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

--
-- Déchargement des données de la table `depot_stage`
--

INSERT INTO `depot_stage` (`id_ds`, `id_etu`, `id_os`, `date`, `status`) VALUES
(12, 1, 1, '2024-04-26', 'Accepté'),
(13, 1, 2, '2024-04-26', 'En cours'),
(14, 3, 3, '2024-04-26', 'Refusé'),
(15, 2, 1, '2024-04-26', 'En cours');

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
(3, 'Mansouri', 'Lamia', 'lamiamansouri@gmail.com', '$2b$10$eOimZUOesebORiWaJEv5rulcvG5oZImRdIMz86G3tAPOJmVnVjCP.', 'Informatique', 'application web', '78945611');

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
(1, 'SAGEM Com', 'SAGEM@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique, Gestion, Réseau', 'Tunis', '9111', 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/cc/LOGO_SAGEMCOM.png/800px-LOGO_SAGEMCOM.png?20200213095826', 1),
(2, 'STAFIM', 'STAFIM@isetr.tn', '$2b$10$QBWhrbyz.s79K2MpiC3yfuocA/htu8xW.Ku64U1znmbe0i3IkIXIW', 'Informatique, Gestion, Voiture', 'Tunis', '19789', 'https://www.taa.tn/wp-content/uploads/2023/08/stafim-1.jpg', 1),
(3, 'Rades', 'RAdes@isetr.tn', '$2b$10$KpmGB/DugYn0WDUDQjDpRuOHI4hrkaBIVCKTofHBb8ruu6QdI4ZUK', 'info, gestion', 'Rades', '54879632', 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Graduation_hat.svg', 1),
(4, 'OACA', 'oaca@isetr.tn', '$2b$10$ekn8FlAJ6JBj8hOnCkpjdOw2P5uFQ/cKL9zw/SJscSfPV4UPF2JZy', 'avion', 'Aeroport', '12345678', 'https://www.oaca.nat.tn/o/landrick-theme/images/logo-light.png', 1),
(5, 'Mech3al', 'Mech3al@gmail.com', '$2b$10$dcBZzstPbIfcNlgXiZbax.9tjUDdg1SS3NS8dGuT3g7uRlpE7fgUm', 'Management ', 'Sky', '911', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Fire_in_Ranua.JPG/1200px-Fire_in_Ranua.JPG', 1);

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
  `contact` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id_etu`, `nom`, `prenom`, `email`, `password`, `departement`, `contact`) VALUES
(1, 'Saadaoui', 'Yassine\r\n', 'yassinesaadaoui@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '78541236'),
(2, 'Soltani', 'Wissal', 'wissalsoltani@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '98563214'),
(3, 'Mechergui', 'Mohamed Aziz', 'azizmechergui@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '25983247'),
(4, 'Sighari', 'Youssef', 'youssefsighari@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '55789632'),
(7, 'Mesarati', 'Lina', 'linamesarati@isetr.tn', '$2b$10$1Iy8PXv2tHfdUAnwirvvT.lb5COFmyJ9Xg.mq9x.PrptI0gQbxBTS', 'Informatique', '69874533');

-- --------------------------------------------------------

--
-- Structure de la table `livret_stage`
--

CREATE TABLE `livret_stage` (
  `id_ls` int(11) NOT NULL,
  `date` date NOT NULL,
  `tache` text NOT NULL,
  `id_etu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `livret_stage`
--

INSERT INTO `livret_stage` (`id_ls`, `date`, `tache`, `id_etu`) VALUES
(1, '2024-01-17', 'Rejoindre le groupe de l\'entreprise', 1),
(2, '2024-01-12', 'Participer aux différentes taches', 1),
(6, '2024-04-12', 'fin Stage', 1);

-- --------------------------------------------------------

--
-- Structure de la table `offre_stage`
--

CREATE TABLE `offre_stage` (
  `id_os` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `id_ent` int(11) NOT NULL,
  `nombre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `offre_stage`
--

INSERT INTO `offre_stage` (`id_os`, `titre`, `description`, `date_debut`, `date_fin`, `id_ent`, `nombre`) VALUES
(1, 'Offre de stage dans STAFIM', 'description', '2024-01-11', '2024-02-03', 2, 10),
(2, 'Offre de stage dans SAGEM', 'description2', '2024-01-11', '2024-02-03', 1, 3),
(3, 'demande de Stagier pour STAFIM', 'Informatique', '2024-01-11', '2024-02-11', 2, 5),
(4, 'X', 'desc', '2024-04-03', '2024-04-18', 5, 10);

-- --------------------------------------------------------

--
-- Structure de la table `stage`
--

CREATE TABLE `stage` (
  `id_stg` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `id_ent` int(11) NOT NULL,
  `id_etu` int(11) NOT NULL,
  `id_enc` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stage`
--

INSERT INTO `stage` (`id_stg`, `titre`, `description`, `date_debut`, `date_fin`, `id_ent`, `id_etu`, `id_enc`) VALUES
(1, 'Offre de stage dans STAFIM', 'description', '2024-01-11', '2024-02-03', 2, 1, NULL),
(3, 'Offre de stage dans SAGEM', 'description2', '2024-01-11', '2024-02-03', 1, 3, 1);

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
-- Index pour la table `livret_stage`
--
ALTER TABLE `livret_stage`
  ADD PRIMARY KEY (`id_ls`),
  ADD KEY `FK_ls_etu` (`id_etu`);

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
  MODIFY `id_ds` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `encadrant`
--
ALTER TABLE `encadrant`
  MODIFY `id_enc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id_ent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id_etu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `livret_stage`
--
ALTER TABLE `livret_stage`
  MODIFY `id_ls` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `offre_stage`
--
ALTER TABLE `offre_stage`
  MODIFY `id_os` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `stage`
--
ALTER TABLE `stage`
  MODIFY `id_stg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Contraintes pour la table `livret_stage`
--
ALTER TABLE `livret_stage`
  ADD CONSTRAINT `FK_ls_etu` FOREIGN KEY (`id_etu`) REFERENCES `etudiant` (`id_etu`) ON DELETE CASCADE ON UPDATE CASCADE;

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
