-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 16 mars 2024 à 16:01
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
-- Structure de la table `condidature_stage`
--

CREATE TABLE `condidature_stage` (
  `id_cs` int(11) NOT NULL,
  `id_etu` int(11) NOT NULL,
  `id_os` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `condidature_stage`
--

INSERT INTO `condidature_stage` (`id_cs`, `id_etu`, `id_os`, `date`, `status`) VALUES
(1, 1, 1, '2023-12-20', 'accepter'),
(2, 2, 2, '2023-12-29', 'accepter');

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
(1, 'Mtir', 'Mehdi', 'mehdimtir@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'informatique', 'Web Development', '55698712');

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
  `contact` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id_ent`, `nom`, `email`, `password`, `secteuractivite`, `adresse`, `contact`) VALUES
(1, 'SAGEM', 'SAGEM@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique, Gestion', 'Tunis', '911'),
(2, 'STAFIM', 'STAFIM@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique, Gestion', 'Tunis', '197');

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
(4, 'Sighari', 'Youssef', 'youssefsighari@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '55789632');

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
(2, 'Offre de stage dans SAGEM', 'description2', '2024-01-11', '2024-02-03', 1, 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `condidature_stage`
--
ALTER TABLE `condidature_stage`
  ADD PRIMARY KEY (`id_cs`),
  ADD KEY `FK_cs_etu` (`id_etu`),
  ADD KEY `FK_cs_os` (`id_os`);

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
-- Index pour la table `offre_stage`
--
ALTER TABLE `offre_stage`
  ADD PRIMARY KEY (`id_os`),
  ADD KEY `FK_os_ent` (`id_ent`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `condidature_stage`
--
ALTER TABLE `condidature_stage`
  MODIFY `id_cs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `encadrant`
--
ALTER TABLE `encadrant`
  MODIFY `id_enc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id_ent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id_etu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `offre_stage`
--
ALTER TABLE `offre_stage`
  MODIFY `id_os` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `condidature_stage`
--
ALTER TABLE `condidature_stage`
  ADD CONSTRAINT `FK_cs_etu` FOREIGN KEY (`id_etu`) REFERENCES `etudiant` (`id_etu`),
  ADD CONSTRAINT `FK_cs_os` FOREIGN KEY (`id_os`) REFERENCES `offre_stage` (`id_os`);

--
-- Contraintes pour la table `offre_stage`
--
ALTER TABLE `offre_stage`
  ADD CONSTRAINT `FK_os_ent` FOREIGN KEY (`id_ent`) REFERENCES `entreprise` (`id_ent`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
