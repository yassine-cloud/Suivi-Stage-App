-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 09 mars 2024 à 17:49
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
-- Structure de la table `encadrant`
--

CREATE TABLE `encadrant` (
  `id` int(11) NOT NULL,
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

INSERT INTO `encadrant` (`id`, `nom`, `prenom`, `email`, `password`, `departement`, `specialite`, `contact`) VALUES
(1, 'Mtir', 'Mehdi', 'mehdimtir@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'informatique', 'Web Development', '55698712');

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

CREATE TABLE `entreprise` (
  `id` int(11) NOT NULL,
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

INSERT INTO `entreprise` (`id`, `nom`, `email`, `password`, `secteuractivite`, `adresse`, `contact`) VALUES
(1, 'SAGEM', 'SAGEM@email.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique, Gestion', 'Tunis', '911'),
(2, 'STAFIM', 'STAFIM@email.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique, Gestion', 'Tunis', '197');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id` int(11) NOT NULL,
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

INSERT INTO `etudiant` (`id`, `nom`, `prenom`, `email`, `password`, `departement`, `contact`) VALUES
(1, 'Saadaoui', 'Yassine', 'yassinesaadaoui@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '78541236'),
(2, 'Soltani', 'Wissal', 'wissalsoltani@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '98563214'),
(3, 'Mechergui', 'Mohamed Aziz', 'azizmechergui@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '25983247'),
(4, 'Sighari', 'Youssef', 'youssefsighari@isetr.tn', '$2b$10$dHFdSUsjvLywnNr/8M9e8ueCmvOnL67D5dMEyg7hKdG50sScFsqHC', 'Informatique', '55789632');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `encadrant`
--
ALTER TABLE `encadrant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `entreprise`
--
ALTER TABLE `entreprise`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `encadrant`
--
ALTER TABLE `encadrant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
