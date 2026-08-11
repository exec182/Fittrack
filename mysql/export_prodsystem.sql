-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Erstellungszeit: 11. Aug 2026 um 16:26
-- Server-Version: 8.0.43
-- PHP-Version: 8.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `diattool_db`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `deeplink_access`
--

CREATE TABLE `deeplink_access` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `token` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime DEFAULT NULL,
  `disabled_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `deeplink_access`
--

INSERT INTO `deeplink_access` (`id`, `user_id`, `token`, `created_at`, `expires_at`, `disabled_at`) VALUES
(3, 2, 'VXPYpNQNB9VH5x6ApgSUb2ojQ1tMyAZN', '2026-07-31 19:42:32', NULL, NULL),
(5, 1, 'LXtDDNX4rOiTsNKa9Kr9MQQ-nOdQgib0', '2026-07-31 20:27:10', '2026-08-02 23:30:00', NULL),
(6, 2, 'gCquA2YGsFl75cKf0zwmNHDFXw8r6scV', '2026-07-31 20:47:50', '2026-09-16 00:00:00', NULL),
(9, 1, '4V8fWq43GWG7cwrQQSFP181WcA-BkaI7', '2026-08-01 06:34:05', '2026-08-01 06:35:00', NULL),
(10, 2, 'q6BKQwsHgnZdAX7ryw0o6bNXi9TZvWoH', '2026-08-01 12:51:08', '2026-08-09 14:50:00', NULL),
(11, 1, 'rBbHUfYN7dghkh8yt9WOa1dTLXiwKQL6', '2026-08-01 14:20:37', NULL, '2026-08-01 14:20:40'),
(12, 1, 'FMxHBZrB_WarKdtdbrxok_cgkCYjqe9_', '2026-08-01 14:20:58', '2026-08-01 22:00:00', NULL),
(13, 8, '-FxlbartxDqMSwhVEi2x4gcIgR3VCsHs', '2026-08-03 04:54:46', NULL, NULL),
(14, 1, 'sujl3MeUgfn0ILg36oCsjbwjpfwU6QlM', '2026-08-03 08:09:21', '2026-08-05 13:09:00', NULL),
(15, 1, 'bjkOhEQR_hWgqxUMdQqP9Uap8z52d9OW', '2026-08-07 20:15:30', '2026-08-08 00:15:00', NULL),
(16, 2, '1Gz2l6UI3SiVJFHvSTYB8djMKMwyFkGQ', '2026-08-08 14:32:07', '2026-08-09 16:32:00', NULL),
(17, 2, 'pf28qKbU6rXbSDh44LA9cEyXu3iLZhPD', '2026-08-09 13:25:07', '2026-08-10 15:24:00', NULL),
(18, 2, 'k4glNBZcKgq0aGL91Bt4YouYLkZWrxbL', '2026-08-11 11:43:19', '2026-08-13 13:43:00', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `goals`
--

CREATE TABLE `goals` (
  `id` int NOT NULL COMMENT 'Prim├ñrschl├╝ssel',
  `user-id` int NOT NULL COMMENT 'Link User',
  `messuretype_id` int NOT NULL COMMENT 'Link Messwerttyp',
  `messure-value` double NOT NULL COMMENT 'Ziel das erreicht werden soll',
  `goalname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Name des Ziels',
  `createdat` datetime DEFAULT NULL,
  `achieved` datetime DEFAULT NULL,
  `rewardedat` datetime DEFAULT NULL,
  `rewardedwith` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `goals`
--

INSERT INTO `goals` (`id`, `user-id`, `messuretype_id`, `messure-value`, `goalname`, `createdat`, `achieved`, `rewardedat`, `rewardedwith`) VALUES
(14, 2, 6, 118, 'Du hast begonnen, lass die Kilos purzeln', '2026-06-14 05:00:00', '2026-06-14 05:00:00', '2026-06-17 05:00:00', 'Fitnesstracker'),
(15, 2, 6, 113, '5kg geschaft', '2026-06-14 05:00:00', '2026-06-27 05:00:00', '2026-07-09 05:00:00', 'T-Shirt 404club'),
(16, 2, 6, 108, '10kg geschaft', '2026-06-14 05:00:00', '2026-07-16 05:00:00', '2026-06-17 05:00:00', '2x T-Shirts 404club'),
(17, 2, 6, 103, '15kg geschaft', '2026-06-14 05:00:00', '2026-08-09 05:31:00', '2026-08-10 05:48:17', 'Kochbuch mit leckeren Rezepten die für die Diät gut sind (Zana)'),
(18, 2, 6, 99.9, 'unter 100kg', '2026-06-14 05:00:00', NULL, NULL, NULL),
(19, 2, 6, 99, 'Halbzeit', '2026-06-14 05:00:00', NULL, NULL, NULL),
(20, 2, 6, 98, '20kg geschaft Valdone', '2026-06-14 05:00:00', NULL, NULL, NULL),
(21, 2, 6, 93, '25kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(22, 2, 6, 88, '30kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(23, 2, 6, 83, '35kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(24, 2, 6, 80, 'Mein Wunschgewicht', '2026-06-14 05:00:00', NULL, NULL, NULL),
(25, 1, 7, 110, 'Brust unter 110', '2026-06-14 05:00:00', '2026-07-24 05:00:00', '2026-07-25 05:00:00', 'Neue Trainingsshirt gekauft'),
(26, 1, 8, 110, 'Bauch unter 110', '2026-06-14 05:00:00', '2026-07-09 05:00:00', '2026-07-10 05:00:00', 'Kinobesuch als Belohnung'),
(27, 2, 8, 100, 'nur noch nen Meter', '2026-06-14 05:00:00', '2026-08-10 07:39:27', '2026-08-11 07:32:51', 'KOMPASS Erfolgsjournal'),
(28, 2, 8, 120, 'Start', '2026-06-14 05:00:00', '2026-06-14 05:00:00', '2026-08-06 22:48:00', 'Kurze Hose'),
(29, 8, 6, 58, 'Endziel', '2026-08-01 00:00:00', NULL, NULL, NULL),
(30, 2, 8, 91, 'Idealmaß', '2026-08-02 11:04:32', NULL, NULL, NULL),
(31, 2, 6, 73.5, 'Idealgewicht', '2026-08-02 11:06:07', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `Messungen_mit_Werten`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `Messungen_mit_Werten` (
`datetime` datetime
,`messurement` varchar(20)
,`nick` varchar(50)
,`unit` varchar(5)
,`value` double
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messure`
--

CREATE TABLE `messure` (
  `id` int NOT NULL COMMENT 'Prim├ñrschl├╝ssel',
  `user-id` int NOT NULL COMMENT 'Link User',
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Zeitpunkt der Messung',
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Notizen',
  `official` bit(1) NOT NULL DEFAULT b'1' COMMENT 'Angabe, ob in genereller Berechnung der Statistik mit einbezogen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `messure`
--

INSERT INTO `messure` (`id`, `user-id`, `datetime`, `notes`, `official`) VALUES
(64, 2, '2026-06-14 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(65, 2, '2026-06-16 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(66, 2, '2026-06-18 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(67, 2, '2026-06-19 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(68, 2, '2026-06-20 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(69, 2, '2026-06-21 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(70, 2, '2026-06-22 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(71, 2, '2026-06-23 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(72, 2, '2026-06-24 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(73, 2, '2026-06-25 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(74, 2, '2026-06-26 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(75, 2, '2026-06-27 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(76, 2, '2026-06-28 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(77, 2, '2026-06-29 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(78, 2, '2026-06-30 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(79, 2, '2026-07-01 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(80, 2, '2026-07-02 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(81, 2, '2026-07-03 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(82, 2, '2026-07-04 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(83, 2, '2026-07-05 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(84, 2, '2026-07-06 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(85, 2, '2026-07-07 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(86, 2, '2026-07-08 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(87, 2, '2026-07-09 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(88, 2, '2026-07-10 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(89, 2, '2026-07-11 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(90, 2, '2026-07-12 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(91, 2, '2026-07-13 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(92, 2, '2026-07-14 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(93, 2, '2026-07-15 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(94, 2, '2026-07-16 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(95, 2, '2026-07-17 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(96, 2, '2026-07-18 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(97, 2, '2026-07-19 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(98, 2, '2026-07-20 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(99, 2, '2026-07-21 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(100, 2, '2026-07-22 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(101, 2, '2026-07-23 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(102, 2, '2026-07-24 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(103, 2, '2026-07-25 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(104, 2, '2026-07-26 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(105, 2, '2026-07-27 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(106, 2, '2026-07-28 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(107, 2, '2026-07-29 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(108, 2, '2026-07-30 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(109, 2, '2026-07-31 05:00:00', 'Import fuer exec (2026-06-14 bis 2026-07-31)', b'1'),
(127, 1, '2026-08-01 01:09:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(128, 1, '2026-08-01 01:10:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(129, 2, '2026-08-01 06:38:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(130, 2, '2026-08-01 06:43:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(131, 2, '2026-08-01 07:48:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(132, 8, '2026-08-01 15:31:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(133, 2, '2026-08-02 04:42:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(134, 2, '2026-08-02 08:33:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(135, 2, '2026-08-02 11:08:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(136, 2, '2026-08-03 05:54:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(137, 2, '2026-08-04 07:08:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(138, 1, '2026-08-04 07:12:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(139, 2, '2026-08-07 06:40:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(140, 2, '2026-08-07 07:30:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(141, 1, '2026-08-07 07:36:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(142, 2, '2026-08-07 08:14:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(143, 2, '2026-08-08 07:19:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(144, 2, '2026-08-09 05:31:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(145, 2, '2026-08-09 17:41:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(146, 2, '2026-08-10 07:39:00', 'Erfasst ueber Dashboard-Formular', b'1'),
(147, 2, '2026-08-11 06:44:00', 'Erfasst ueber Dashboard-Formular', b'1');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messuretype`
--

CREATE TABLE `messuretype` (
  `id` int NOT NULL COMMENT 'Prim├ñrschl├╝ssel',
  `messurement` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Messwertname',
  `unit` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Einheit'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `messuretype`
--

INSERT INTO `messuretype` (`id`, `messurement`, `unit`) VALUES
(6, 'Gewicht', 'kg'),
(7, 'Brustumfang', 'cm'),
(8, 'Bauchumfang', 'cm'),
(9, 'Bundumfang', 'cm'),
(10, 'Poumfang', 'cm'),
(11, 'Oberschenkelumfang', 'cm'),
(12, 'Oberarmumfang', 'cm'),
(13, 'Unterbrustumfang', 'cm');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messurevalue`
--

CREATE TABLE `messurevalue` (
  `id` int NOT NULL COMMENT 'Prim├ñrschl├╝ssel',
  `messure-id` int NOT NULL COMMENT 'Link Messwertsammlung',
  `type-id` int NOT NULL COMMENT 'Link Messwerttyp',
  `value` double NOT NULL COMMENT 'Wert der Messung'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `messurevalue`
--

INSERT INTO `messurevalue` (`id`, `messure-id`, `type-id`, `value`) VALUES
(1, 64, 6, 118),
(2, 65, 6, 117.6),
(3, 66, 6, 115.7),
(4, 67, 6, 115.6),
(5, 68, 6, 115.5),
(6, 69, 6, 115.3),
(7, 70, 6, 115.2),
(8, 71, 6, 114.9),
(9, 72, 6, 114.6),
(10, 73, 6, 114),
(11, 74, 6, 113.3),
(12, 75, 6, 113),
(13, 76, 6, 112.7),
(14, 77, 6, 112.8),
(15, 78, 6, 112.5),
(16, 79, 6, 112.4),
(17, 80, 6, 111.7),
(18, 81, 6, 111.4),
(19, 82, 6, 110.7),
(20, 83, 6, 110.9),
(21, 84, 6, 111.8),
(22, 85, 6, 110.8),
(23, 86, 6, 110.4),
(24, 87, 6, 110.2),
(25, 88, 6, 109.4),
(26, 89, 6, 109.3),
(27, 90, 6, 108.9),
(28, 91, 6, 109.2),
(29, 92, 6, 109.2),
(30, 93, 6, 109),
(31, 94, 6, 107.9),
(32, 95, 6, 107.7),
(33, 96, 6, 107.7),
(34, 97, 6, 108.1),
(35, 98, 6, 107.9),
(36, 99, 6, 107.2),
(37, 100, 6, 106.8),
(38, 101, 6, 106.4),
(39, 102, 6, 106.1),
(40, 103, 6, 105.8),
(41, 104, 6, 105.5),
(42, 105, 6, 105.8),
(43, 106, 6, 105.8),
(44, 107, 6, 105.7),
(45, 108, 6, 105),
(46, 109, 6, 104.5),
(64, 64, 7, 118.2),
(65, 65, 7, 117.5),
(66, 66, 7, 115.5),
(67, 67, 7, 116.6),
(68, 68, 7, 116),
(69, 69, 7, 115.9),
(70, 70, 7, 115.3),
(71, 71, 7, 115),
(72, 72, 7, 113.6),
(73, 73, 7, 115.1),
(74, 74, 7, 114.3),
(75, 75, 7, 114.3),
(76, 76, 7, 112.4),
(77, 77, 7, 113.8),
(78, 78, 7, 113.5),
(79, 79, 7, 112.4),
(80, 80, 7, 110.6),
(81, 81, 7, 110.7),
(82, 82, 7, 111.9),
(83, 83, 7, 111.5),
(84, 84, 7, 112.7),
(85, 85, 7, 109.6),
(86, 86, 7, 108.8),
(87, 87, 7, 110.7),
(88, 88, 7, 112.8),
(89, 89, 7, 110.8),
(90, 90, 7, 112.1),
(91, 91, 7, 110),
(92, 92, 7, 110.2),
(93, 93, 7, 108.8),
(94, 94, 7, 108.6),
(95, 95, 7, 110.1),
(97, 97, 7, 108.8),
(99, 99, 7, 108.3),
(100, 100, 7, 108.5),
(102, 102, 7, 108),
(103, 103, 7, 109.4),
(105, 105, 7, 107.4),
(106, 106, 7, 107.8),
(107, 107, 7, 107.6),
(108, 108, 7, 107),
(127, 64, 8, 119.4),
(128, 65, 8, 116.6),
(129, 66, 8, 117.2),
(130, 67, 8, 118.3),
(131, 68, 8, 116.8),
(132, 69, 8, 114.8),
(133, 70, 8, 114.1),
(134, 71, 8, 113.7),
(135, 72, 8, 117.1),
(136, 73, 8, 117.6),
(137, 74, 8, 116.6),
(138, 75, 8, 116.1),
(139, 76, 8, 116.4),
(140, 77, 8, 116.2),
(141, 78, 8, 116.1),
(142, 79, 8, 111.9),
(143, 80, 8, 113.9),
(144, 81, 8, 111.7),
(145, 82, 8, 110.6),
(146, 83, 8, 110.8),
(147, 84, 8, 111.2),
(148, 85, 8, 110.1),
(149, 86, 8, 110),
(150, 87, 8, 108.8),
(151, 88, 8, 110.2),
(152, 89, 8, 109.9),
(153, 90, 8, 109),
(154, 91, 8, 111.4),
(155, 92, 8, 111.7),
(156, 93, 8, 108.7),
(157, 94, 8, 108),
(158, 95, 8, 109.7),
(160, 97, 8, 108.8),
(162, 99, 8, 108.8),
(163, 100, 8, 109.7),
(165, 102, 8, 108.3),
(166, 103, 8, 104.5),
(168, 105, 8, 103.6),
(169, 106, 8, 105.5),
(170, 107, 8, 103.8),
(171, 108, 8, 103),
(190, 64, 9, 119.3),
(191, 65, 9, 112.6),
(192, 66, 9, 115.3),
(193, 67, 9, 110.7),
(194, 68, 9, 109.7),
(195, 69, 9, 113.6),
(196, 70, 9, 110),
(197, 71, 9, 111.1),
(198, 72, 9, 110.6),
(199, 73, 9, 108.7),
(200, 74, 9, 120),
(201, 75, 9, 107.9),
(202, 76, 9, 110.6),
(203, 77, 9, 111.7),
(204, 78, 9, 112.5),
(205, 79, 9, 110.1),
(206, 80, 9, 109.5),
(207, 81, 9, 110.1),
(208, 82, 9, 106.6),
(209, 83, 9, 109.4),
(210, 84, 9, 107.3),
(211, 85, 9, 108.4),
(212, 86, 9, 107),
(213, 87, 9, 108.8),
(214, 88, 9, 107),
(215, 89, 9, 107.7),
(216, 90, 9, 108.2),
(217, 91, 9, 107.6),
(218, 92, 9, 107.7),
(219, 93, 9, 106.3),
(220, 94, 9, 107.7),
(221, 95, 9, 105.2),
(223, 97, 9, 108.4),
(225, 99, 9, 106.7),
(226, 100, 9, 105.2),
(228, 102, 9, 106.3),
(229, 103, 9, 105.8),
(231, 105, 9, 105.8),
(232, 106, 9, 105.7),
(233, 107, 9, 104.1),
(234, 108, 9, 104.2),
(253, 64, 10, 120.5),
(254, 65, 10, 120.3),
(255, 66, 10, 116.8),
(256, 67, 10, 119.2),
(257, 68, 10, 117.3),
(258, 69, 10, 116.7),
(259, 70, 10, 116.5),
(260, 71, 10, 114.7),
(261, 72, 10, 116.7),
(262, 73, 10, 115.6),
(263, 74, 10, 116.1),
(264, 75, 10, 114.6),
(265, 76, 10, 115.1),
(266, 77, 10, 114.5),
(267, 78, 10, 114.8),
(268, 79, 10, 114.5),
(269, 80, 10, 113.4),
(270, 81, 10, 113.5),
(271, 82, 10, 113.5),
(272, 83, 10, 113.2),
(273, 84, 10, 109.9),
(274, 85, 10, 112.4),
(275, 86, 10, 111.6),
(276, 87, 10, 112.8),
(277, 88, 10, 112.4),
(278, 89, 10, 112.4),
(279, 90, 10, 111.2),
(280, 91, 10, 111.1),
(281, 92, 10, 111),
(282, 93, 10, 111.9),
(283, 94, 10, 111.7),
(284, 95, 10, 111.7),
(286, 97, 10, 110.8),
(288, 99, 10, 112),
(289, 100, 10, 110.5),
(291, 102, 10, 111.1),
(292, 103, 10, 109.8),
(294, 105, 10, 110.5),
(295, 106, 10, 110.7),
(296, 107, 10, 111.4),
(297, 108, 10, 108.9),
(316, 127, 6, 103),
(317, 128, 6, 104.5),
(318, 129, 6, 105),
(319, 130, 7, 108.8),
(320, 130, 8, 103.8),
(321, 130, 9, 104.3),
(322, 130, 10, 110.9),
(323, 131, 12, 33.9),
(324, 131, 11, 60.5),
(325, 132, 6, 62.2),
(326, 132, 8, 74),
(327, 133, 12, 32.3),
(328, 133, 11, 58.4),
(329, 133, 8, 102.5),
(330, 133, 7, 107.7),
(331, 133, 9, 103.6),
(332, 133, 6, 104.2),
(333, 133, 10, 109),
(334, 134, 6, 103.8),
(335, 135, 13, 103.7),
(336, 136, 13, 102.2),
(337, 136, 8, 102.2),
(338, 136, 7, 106),
(339, 136, 9, 102.5),
(340, 136, 6, 103.8),
(341, 136, 10, 108.7),
(342, 137, 8, 103.2),
(343, 137, 7, 104.9),
(344, 137, 9, 104.7),
(345, 137, 10, 109.2),
(346, 137, 13, 102.1),
(347, 138, 8, 103.2),
(348, 138, 7, 104.9),
(349, 138, 9, 104.7),
(350, 138, 10, 109.2),
(351, 138, 13, 102.1),
(352, 139, 6, 104.9),
(353, 140, 8, 103.1),
(354, 140, 7, 104.9),
(355, 140, 9, 104.1),
(356, 140, 12, 33),
(357, 140, 11, 63.2),
(358, 140, 10, 108.9),
(359, 140, 13, 102.8),
(360, 141, 8, 103.1),
(361, 141, 7, 104.9),
(362, 141, 9, 104.1),
(363, 141, 12, 33),
(364, 141, 11, 63.2),
(365, 141, 10, 108.9),
(366, 141, 13, 102.8),
(367, 142, 6, 104.7),
(368, 143, 6, 103.5),
(369, 143, 8, 102.6),
(370, 143, 7, 104.7),
(371, 143, 9, 103.2),
(372, 143, 12, 34.6),
(373, 143, 11, 59.9),
(374, 143, 10, 107.9),
(375, 143, 13, 101.4),
(376, 144, 6, 103),
(377, 145, 8, 101.3),
(378, 146, 6, 102.8),
(379, 146, 7, 106.3),
(380, 146, 8, 100),
(381, 146, 9, 102.1),
(382, 146, 10, 107.4),
(383, 146, 11, 60.6),
(384, 146, 12, 34.5),
(385, 147, 8, 99.4),
(386, 147, 7, 105.4),
(387, 147, 9, 102.3),
(388, 147, 6, 102.9),
(389, 147, 12, 34.7),
(390, 147, 11, 59.8),
(391, 147, 10, 107.5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `training_entry`
--

CREATE TABLE `training_entry` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `training_date` date NOT NULL,
  `training_text` text COLLATE utf8mb4_general_ci NOT NULL,
  `duration_text` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `limitation_text` text COLLATE utf8mb4_general_ci,
  `load_level` tinyint NOT NULL,
  `pain_level` tinyint NOT NULL,
  `source_plan_day` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source_plan_entry_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `training_entry`
--

INSERT INTO `training_entry` (`id`, `user_id`, `training_date`, `training_text`, `duration_text`, `limitation_text`, `load_level`, `pain_level`, `source_plan_day`, `source_plan_entry_id`, `created_at`) VALUES
(1, 2, '2026-08-01', 'Längere Cardioeinheit\nSpaziergang Strecke war jetzt 6,3km', '1h 21min', 'Starke Anstiege', 4, 3, 'Samstag', 13, '2026-08-01 10:31:09'),
(5, 8, '2026-08-01', 'Laengere Cardioeinheit\nSpaziergang, Radfahren oder Schwimmen; Intensitaet so, dass Unterhaltung moeglich bleibt', '1h 21min', '', 3, 1, 'Samstag', 6, '2026-08-01 13:38:08'),
(6, 2, '2026-08-02', 'Erholung\nLockerer Spaziergang, 3,71km', '44 Min.', '', 2, 2, 'Sonntag', 81, '2026-08-02 08:33:42'),
(10, 2, '2026-07-27', 'Radtour zum Takko und Edeka und wieder zurück', '1h 13min', '', 2, 1, '', NULL, '2026-08-02 09:19:18'),
(11, 2, '2026-08-03', 'URLAUB 21280 Schritte', 'über den Tag verteilt', '', 2, 2, '', NULL, '2026-08-05 06:01:26'),
(12, 2, '2026-08-04', 'URLAUB 18103 Schritte', 'Über den Tag verteilt', 'Oberschenkel Krampf mit Entzündung', 2, 4, '', NULL, '2026-08-05 06:03:54'),
(13, 2, '2026-08-05', 'URLAUB 24761 Schritte', 'Über den Tag verteilt', 'Oberschenkel Krampf mit Entzündung', 4, 3, '', NULL, '2026-08-06 06:03:54'),
(14, 2, '2026-08-06', 'URLAUB 14170 Schritte', 'Über den Tag verteilt', 'Oberschenkel Krampf mit Entzündung', 3, 3, '', NULL, '2026-08-06 06:03:54'),
(15, 2, '2026-08-07', 'Spaziergang am Abend ~2km', '28min', NULL, 1, 2, 'Freitag', 72, '2026-08-08 06:52:36'),
(16, 2, '2026-08-07', 'Radtour am Vormittag zum Einkaufen', '48Min', '', 2, 2, '', NULL, '2026-08-08 06:59:52'),
(17, 2, '2026-08-08', 'Längere Cardioeinheit\nSpaziergang (6,13km; HF 95bpm)', '1h 30 Min', '', 3, 2, 'Samstag', 80, '2026-08-08 10:22:43'),
(18, 2, '2026-08-09', 'Erholung\nLockerer Spaziergang mit Familie', '18 Min.', '', 1, 1, 'Sonntag', 81, '2026-08-09 18:02:17'),
(19, 2, '2026-08-09', 'Erholung\nLockerer Spaziergang 3,27km HF 103', '37 Min.', '', 2, 1, 'Sonntag', 81, '2026-08-09 20:39:40'),
(20, 2, '2026-08-10', 'Spaziergang\nZügiger Spaziergang 3,27km HF103', '46 Min.', '', 4, 2, 'Montag', 73, '2026-08-10 20:05:55'),
(21, 2, '2026-08-11', 'Cardio\n45-60 Min Wandern mit Höhenmetern (5km HF106', '54 Min.', '', 3, 2, 'Dienstag', 75, '2026-08-11 09:31:41');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `training_plan_entry`
--

CREATE TABLE `training_plan_entry` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `weekday_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `focus_text` varchar(160) COLLATE utf8mb4_general_ci NOT NULL,
  `duration_text` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `note_text` text COLLATE utf8mb4_general_ci NOT NULL,
  `valid_from` datetime NOT NULL,
  `deactivated_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `training_plan_entry`
--

INSERT INTO `training_plan_entry` (`id`, `user_id`, `weekday_name`, `focus_text`, `duration_text`, `note_text`, `valid_from`, `deactivated_at`, `created_at`) VALUES
(1, 8, 'Montag', 'Krafttraining + Spaziergang', '60 Min.', '30 Min Ganzkoerper (3x10 Kniebeugen, 3x10 erhoehte Liegestuetz, 3x12 Rudern, 3x15 Hueftheben, 3x30s Plank), danach 30 Min zuegiges Gehen', '2026-08-01 00:00:00', NULL, '2026-08-01 13:37:06'),
(2, 8, 'Dienstag', 'Cardio', '55-70 Min.', '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen', '2026-08-01 00:00:00', NULL, '2026-08-01 13:37:06'),
(3, 8, 'Mittwoch', 'Krafttraining', '50-60 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdruecken, 3x12 Rudern, 3x30s Plank), danach 20 Min Spaziergang', '2026-08-01 00:00:00', NULL, '2026-08-01 13:37:06'),
(4, 8, 'Donnerstag', 'Aktive Erholung', '75 Min.', '60 Min lockeres Gehen plus 15 Min Mobilitaet und Dehnen', '2026-08-01 00:00:00', NULL, '2026-08-01 13:37:06'),
(5, 8, 'Freitag', 'Krafttraining', '50-70 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x12 Liegestuetz an der Wand, 3x15 Hueftheben, 3x12 Rudern, 3x40s Plank), danach 20-30 Min lockeres Gehen', '2026-08-01 00:00:00', NULL, '2026-08-01 13:37:06'),
(6, 8, 'Samstag', 'Laengere Cardioeinheit', '60-90 Min.', 'Spaziergang, Radfahren oder Schwimmen; Intensitaet so, dass Unterhaltung moeglich bleibt', '2026-08-01 00:00:00', NULL, '2026-08-01 13:37:06'),
(7, 8, 'Sonntag', 'Erholung', '30-45 Min.', 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitaetstraining', '2026-08-01 00:00:00', NULL, '2026-08-01 13:37:06'),
(8, 2, 'Montag', 'Krafttraining + Spaziergang', '60 Min.', '30 Min Ganzkörper (3x10 Kniebeugen, 3x10 erhöhte Liegestütz, 3x12 Rudern, 3x15 Hüftheben, 3x8 Crunches), danach 30 Min zügiges Gehen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 13:40:25'),
(9, 2, 'Dienstag', 'Cardio', '55-70 Min.', '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 13:40:25'),
(10, 2, 'Mittwoch', 'Krafttraining', '50-60 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdrücken, 3x12 Rudern, 3x10 Crunches), danach 20 Min Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 13:40:25'),
(11, 2, 'Donnerstag', 'Aktive Erholung', '75 Min.', '60 Min lockeres Gehen plus 15 Min Mobilität und Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 13:40:25'),
(12, 2, 'Freitag', 'Krafttraining', '50-70 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x12 Liegestütz an der Wand, 3x15 Hüftheben, 3x12 Rudern, 3x10 Crunches), danach 20-30 Min lockeres Gehen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 13:40:25'),
(13, 2, 'Samstag', 'Längere Cardioeinheit', '60-90 Min.', 'Spaziergang, Radfahren oder Schwimmen; Intensität so, dass Unterhaltung möglich bleibt', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 13:40:25'),
(14, 2, 'Sonntag', 'Erholung', '30-45 Min.', 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitätstraining', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 13:40:25'),
(29, 2, 'Montag', 'Krafttraining + Spaziergang', '60 Min.', '30 Min Ganzkörper (3x10 Kniebeugen, 3x10 erhöhte Liegestütz, 3x12 Rudern, 3x15 Hüftheben, 3x8 Crunches), danach 30 Min zügiges Gehen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:16:55'),
(30, 2, 'Dienstag', 'Cardio', '55-70 Min.', '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:16:55'),
(31, 2, 'Mittwoch', 'Krafttraining', '50-60 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdrücken, 3x12 Rudern, 3x10 Crunches), danach 20 Min Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:16:55'),
(32, 2, 'Donnerstag', 'Aktive Erholung', '75 Min.', '60 Min lockeres Gehen plus 15 Min Mobilität und Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:16:55'),
(33, 2, 'Freitag', 'Krafttraining', '50-70 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x12 Liegestütz an der Wand, 3x15 Hüftheben, 3x12 Rudern, 3x10 Crunches), danach 20-30 Min lockeres Gehen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:16:55'),
(34, 2, 'Samstag', 'Längere Cardioeinheit', '60-90 Min.', 'Spaziergang, Radfahren oder Schwimmen; Intensität so, dass Unterhaltung möglich bleibt', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:16:55'),
(35, 2, 'Sonntag', 'Erholung', '30-45 Min.', 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitätstraining', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:16:55'),
(36, 2, 'Montag', 'Spaziergang', '30 Min.', 'Zügiger Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:16:55'),
(37, 2, 'Montag', 'Spaziergang', '30 Min.', 'Zügiger Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:17:34'),
(38, 2, 'Montag', 'Krafttraining + Spaziergang', '30 Min.', '30 Min Ganzkörper (3x10 Kniebeugen, 3x10 erhöhte Liegestütz, 3x12 Rudern, 3x15 Hüftheben, 3x8 Crunches)', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:17:34'),
(39, 2, 'Dienstag', 'Cardio', '55-70 Min.', '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:17:34'),
(40, 2, 'Mittwoch', 'Krafttraining', '50-60 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdrücken, 3x12 Rudern, 3x10 Crunches), danach 20 Min Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:17:34'),
(41, 2, 'Donnerstag', 'Aktive Erholung', '75 Min.', '60 Min lockeres Gehen plus 15 Min Mobilität und Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:17:34'),
(42, 2, 'Freitag', 'Krafttraining', '50-70 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x12 Liegestütz an der Wand, 3x15 Hüftheben, 3x12 Rudern, 3x10 Crunches), danach 20-30 Min lockeres Gehen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:17:34'),
(43, 2, 'Samstag', 'Längere Cardioeinheit', '60-90 Min.', 'Spaziergang, Radfahren oder Schwimmen; Intensität so, dass Unterhaltung möglich bleibt', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:17:34'),
(44, 2, 'Sonntag', 'Erholung', '30-45 Min.', 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitätstraining', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:17:34'),
(45, 2, 'Montag', 'Krafttraining', '30 Min.', 'Ganzkörper (3x10 Kniebeugen, 3x10 erhöhte Liegestütz, 3x12 Rudern, 3x15 Hüftheben, 3x8 Crunches)', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:18:07'),
(46, 2, 'Montag', 'Spaziergang', '30 Min.', 'Zügiger Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:18:07'),
(47, 2, 'Dienstag', 'Cardio', '55-70 Min.', '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:18:07'),
(48, 2, 'Mittwoch', 'Krafttraining', '50-60 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdrücken, 3x12 Rudern, 3x10 Crunches), danach 20 Min Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:18:07'),
(49, 2, 'Donnerstag', 'Aktive Erholung', '75 Min.', '60 Min lockeres Gehen plus 15 Min Mobilität und Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:18:07'),
(50, 2, 'Freitag', 'Krafttraining', '50-70 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x12 Liegestütz an der Wand, 3x15 Hüftheben, 3x12 Rudern, 3x10 Crunches), danach 20-30 Min lockeres Gehen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:18:07'),
(51, 2, 'Samstag', 'Längere Cardioeinheit', '60-90 Min.', 'Spaziergang, Radfahren oder Schwimmen; Intensität so, dass Unterhaltung möglich bleibt', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:18:07'),
(52, 2, 'Sonntag', 'Erholung', '30-45 Min.', 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitätstraining', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-01 14:18:07'),
(53, 2, 'Montag', 'Spaziergang', '30 Min.', 'Zügiger Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(54, 2, 'Montag', 'Krafttraining', '30 Min.', 'Ganzkörper (3x10 Kniebeugen, 3x10 erhöhte Liegestütz, 3x12 Rudern, 3x15 Hüftheben, 3x8 Crunches)', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(55, 2, 'Dienstag', 'Cardio', '55-70 Min.', '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(56, 2, 'Mittwoch', 'Krafttraining', '20-30 Min.', 'Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdrücken, 3x12 Rudern, 3x10 Crunches)', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(57, 2, 'Donnerstag', 'Aktive Erholung', '75 Min.', '60 Min lockeres Gehen plus 15 Min Mobilität und Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(58, 2, 'Freitag', 'Krafttraining', '50-70 Min.', '30-40 Min Kraft (3x12 Kniebeugen, 3x12 Liegestütz an der Wand, 3x15 Hüftheben, 3x12 Rudern, 3x10 Crunches), danach 20-30 Min lockeres Gehen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(59, 2, 'Samstag', 'Längere Cardioeinheit', '60-90 Min.', 'Spaziergang, Radfahren oder Schwimmen; Intensität so, dass Unterhaltung möglich bleibt', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(60, 2, 'Sonntag', 'Erholung', '30-45 Min.', 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitätstraining', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(61, 2, 'Mittwoch', 'Spaziergang', '20 Min.', 'gemütlicher Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:24:22'),
(62, 2, 'Montag', 'Krafttraining', '30 Min.', 'Ganzkörper (3x10 Kniebeugen, 3x10 erhöhte Liegestütz, 3x12 Rudern, 3x15 Hüftheben, 3x8 Crunches)', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(63, 2, 'Montag', 'Spaziergang', '30 Min.', 'Zügiger Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(64, 2, 'Dienstag', 'Cardio', '55-70 Min.', '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(65, 2, 'Mittwoch', 'Spaziergang', '20 Min.', 'gemütlicher Spaziergang', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(66, 2, 'Mittwoch', 'Krafttraining', '20-30 Min.', 'Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdrücken, 3x12 Rudern, 3x10 Crunches)', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(67, 2, 'Donnerstag', 'Aktive Erholung', '75 Min.', '60 Min lockeres Gehen plus 15 Min Mobilität und Dehnen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(68, 2, 'Freitag', 'Krafttraining', '30-40 Min.', 'Kraft (3x12 Kniebeugen, 3x12 Liegestütz an der Wand, 3x15 Hüftheben, 3x12 Rudern, 3x10 Crunches)', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(69, 2, 'Samstag', 'Längere Cardioeinheit', '60-90 Min.', 'Spaziergang, Radfahren oder Schwimmen; Intensität so, dass Unterhaltung möglich bleibt', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(70, 2, 'Sonntag', 'Erholung', '30-45 Min.', 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitätstraining', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(71, 2, 'Montag', 'Spaziergang', '20-30 Min.', 'lockeres Gehen', '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-08-02 06:25:49'),
(72, 2, 'Freitag', 'Spaziergang', '20-30 Min.', 'lockeres Gehen', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(73, 2, 'Montag', 'Spaziergang', '30 Min.', 'Zügiger Spaziergang', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(74, 2, 'Montag', 'Krafttraining', '30 Min.', 'Ganzkörper (3x10 Kniebeugen, 3x10 erhöhte Liegestütz, 3x12 Rudern, 3x15 Hüftheben, 3x8 Crunches)', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(75, 2, 'Dienstag', 'Cardio', '55-70 Min.', '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(76, 2, 'Mittwoch', 'Krafttraining', '20-30 Min.', 'Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdrücken, 3x12 Rudern, 3x10 Crunches)', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(77, 2, 'Mittwoch', 'Spaziergang', '20 Min.', 'gemütlicher Spaziergang', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(78, 2, 'Donnerstag', 'Aktive Erholung', '75 Min.', '60 Min lockeres Gehen plus 15 Min Mobilität und Dehnen', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(79, 2, 'Freitag', 'Krafttraining', '30-40 Min.', 'Kraft (3x12 Kniebeugen, 3x12 Liegestütz an der Wand, 3x15 Hüftheben, 3x12 Rudern, 3x10 Crunches)', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(80, 2, 'Samstag', 'Längere Cardioeinheit', '60-90 Min.', 'Spaziergang, Radfahren oder Schwimmen; Intensität so, dass Unterhaltung möglich bleibt', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59'),
(81, 2, 'Sonntag', 'Erholung', '30-45 Min.', 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitätstraining', '2026-08-01 00:00:00', NULL, '2026-08-02 06:26:59');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL COMMENT 'Prim├ñrschl├╝ssel',
  `nick` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Benutzername',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Passwort zur Anmeldung',
  `goalweight` double DEFAULT NULL COMMENT 'Wunschgewicht',
  `height` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`id`, `nick`, `password`, `goalweight`, `height`) VALUES
(1, 'testuser_20260731202234', '$argon2id$v=19$m=65536,t=4,p=1$aXlvNXVSRUw1ZmNYYUpTUQ$ixq6taks4qq7Dik3Zwf/SPrMcaFdBeFcrAQheKueTq0', NULL, NULL),
(2, 'exec', '$argon2id$v=19$m=65536,t=4,p=1$aU5oRXBEYklzekJZMEc4UQ$9+AcGLoWB/6eDm69U1QTxeSk6+/wublYEKgYWsPaILY', 80, 1.82),
(8, 'lostres', '$argon2id$v=19$m=65536,t=4,p=1$ZHc4emh6UDA5NTFUb0ZxMQ$fIpYBm72TURiYOxvTSw0bsk6hkblLNVgy9XOw7xlMpA', 58, 1.68);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `deeplink_access`
--
ALTER TABLE `deeplink_access`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_deeplink_token` (`token`),
  ADD KEY `idx_deeplink_user_created` (`user_id`,`created_at`);

--
-- Indizes für die Tabelle `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-id` (`user-id`),
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

--
-- Indizes für die Tabelle `messurevalue`
--
ALTER TABLE `messurevalue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messure-id` (`messure-id`),
  ADD KEY `type-id` (`type-id`);

--
-- Indizes für die Tabelle `training_entry`
--
ALTER TABLE `training_entry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_training_user_date` (`user_id`,`training_date`),
  ADD KEY `idx_training_source_plan_entry` (`source_plan_entry_id`);

--
-- Indizes für die Tabelle `training_plan_entry`
--
ALTER TABLE `training_plan_entry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_plan_user_active` (`user_id`,`deactivated_at`,`valid_from`),
  ADD KEY `idx_plan_user_day` (`user_id`,`weekday_name`,`deactivated_at`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `deeplink_access`
--
ALTER TABLE `deeplink_access`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT für Tabelle `goals`
--
ALTER TABLE `goals`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel', AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT für Tabelle `messure`
--
ALTER TABLE `messure`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel', AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT für Tabelle `messuretype`
--
ALTER TABLE `messuretype`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel', AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT für Tabelle `messurevalue`
--
ALTER TABLE `messurevalue`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel', AUTO_INCREMENT=392;

--
-- AUTO_INCREMENT für Tabelle `training_entry`
--
ALTER TABLE `training_entry`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT für Tabelle `training_plan_entry`
--
ALTER TABLE `training_plan_entry`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel', AUTO_INCREMENT=9;

-- --------------------------------------------------------

--
-- Struktur des Views `Messungen_mit_Werten`
--
DROP TABLE IF EXISTS `Messungen_mit_Werten`;

CREATE ALGORITHM=UNDEFINED DEFINER=`diattool_user`@`%` SQL SECURITY DEFINER VIEW `Messungen_mit_Werten`  AS SELECT `u`.`nick` AS `nick`, `m`.`datetime` AS `datetime`, `mt`.`messurement` AS `messurement`, `mv`.`value` AS `value`, `mt`.`unit` AS `unit` FROM (((`messurevalue` `mv` join `messuretype` `mt` on((`mv`.`type-id` = `mt`.`id`))) join `messure` `m` on((`m`.`id` = `mv`.`messure-id`))) join `user` `u` on((`u`.`id` = `m`.`user-id`))) ORDER BY `m`.`datetime` DESC ;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `deeplink_access`
--
ALTER TABLE `deeplink_access`
  ADD CONSTRAINT `deeplink_access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`user-id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `goals_ibfk_2` FOREIGN KEY (`messuretype_id`) REFERENCES `messuretype` (`id`);

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
-- Constraints der Tabelle `training_entry`
--
ALTER TABLE `training_entry`
  ADD CONSTRAINT `fk_training_entry_plan` FOREIGN KEY (`source_plan_entry_id`) REFERENCES `training_plan_entry` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_training_entry_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `training_plan_entry`
--
ALTER TABLE `training_plan_entry`
  ADD CONSTRAINT `fk_training_plan_entry_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
