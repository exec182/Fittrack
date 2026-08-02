-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 31. Jul 2026 um 06:28
-- Server-Version: 10.11.6-MariaDB-0+deb12u1
-- PHP-Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `diettool`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `goals`
--

CREATE TABLE `goals` (
  `id` int(11) NOT NULL COMMENT 'Primärschlüssel',
  `user-id` int(11) NOT NULL COMMENT 'Link User',
  `messuretype_id` int(11) NOT NULL COMMENT 'Link Messwerttyp',
  `messure-value` double NOT NULL COMMENT 'Ziel das erreicht werden soll',
  `goalname` varchar(50) NOT NULL COMMENT 'Name des Ziels',
  `createdat` datetime DEFAULT NULL COMMENT 'Erstellungszeitpunkt',
  `achieved` datetime DEFAULT NULL COMMENT 'Zeitpunkt des erreichens',
  `rewardedat` datetime DEFAULT NULL COMMENT 'Zeitpunkt der Belohnung',
  `rewardedwith` text DEFAULT NULL COMMENT 'Belohnung als Freitext'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messure`
--

CREATE TABLE `messure` (
  `id` int(11) NOT NULL COMMENT 'Primärschlüssel',
  `user-id` int(11) NOT NULL COMMENT 'Link User',
  `datetime` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Zeitpunkt der Messung',
  `notes` text DEFAULT NULL COMMENT 'Notizen',
  `official` bit(1) NOT NULL DEFAULT b'1' COMMENT 'Angabe, ob in genereller Berechnung der Statistik mit einbezogen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messuretype`
--

CREATE TABLE `messuretype` (
  `id` int(11) NOT NULL COMMENT 'Primärschlüssel',
  `messurement` varchar(20) NOT NULL COMMENT 'Messwertname',
  `unit` varchar(5) NOT NULL COMMENT 'Einheit'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messurevalue`
--

CREATE TABLE `messurevalue` (
  `id` int(11) NOT NULL COMMENT 'Primärschlüssel',
  `messure-id` int(11) NOT NULL COMMENT 'Link Messwertsammlung',
  `type-id` int(11) NOT NULL COMMENT 'Link Messwerttyp',
  `value` double NOT NULL COMMENT 'Wert der Messung'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `deeplink_access` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(128) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime DEFAULT NULL,
  `disabled_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT 'Primärschlüssel',
  `nick` varchar(50) NOT NULL COMMENT 'Benutzername',
  `password` varchar(255) NOT NULL COMMENT 'Passwort zur Anmeldung',
  `goalweight` double DEFAULT NULL COMMENT 'Wunschgewicht'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indizes der exportierten Tabellen
--

--
--
  ADD KEY `messuretype_id` (`messuretype_id`);

--
-- Indizes für die Tabelle `messure`
--
ALTER TABLE `messure`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-id` (`user-id`);

--
-- Indizes für die Tabelle `messuretype`
--
ALTER TABLE `messuretype`
  ADD PRIMARY KEY (`id`);

-- Indizes für die Tabelle `messurevalue`
  ADD KEY `messure-id` (`messure-id`),
  ADD KEY `type-id` (`type-id`);

--
-- Indizes für die Tabelle `deeplink_access`
ALTER TABLE `deeplink_access`

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`


--
-- AUTO_INCREMENT für Tabelle `goals`
--
ALTER TABLE `goals`

ALTER TABLE `messure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primärschlüssel';

-- AUTO_INCREMENT für Tabelle `messuretype`

--
-- AUTO_INCREMENT für Tabelle `messurevalue`
ALTER TABLE `messurevalue`
-- AUTO_INCREMENT für Tabelle `deeplink_access`
--
ALTER TABLE `deeplink_access`

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primärschlüssel';

-- Constraints der exportierten Tabellen
-- Constraints der Tabelle `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`user-id`) REFERENCES `user` (`id`),

--
-- Constraints der Tabelle `messure`
--
ALTER TABLE `messure`
  ADD CONSTRAINT `messure_ibfk_1` FOREIGN KEY (`user-id`) REFERENCES `user` (`id`);

--
-- Constraints der Tabelle `messurevalue`
--
ALTER TABLE `messurevalue`
  ADD CONSTRAINT `messurevalue_ibfk_1` FOREIGN KEY (`messure-id`) REFERENCES `messure` (`id`),
  ADD CONSTRAINT `messurevalue_ibfk_2` FOREIGN KEY (`type-id`) REFERENCES `messuretype` (`id`);

--
-- Constraints der Tabelle `deeplink_access`
--
ALTER TABLE `deeplink_access`
  ADD CONSTRAINT `deeplink_access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
