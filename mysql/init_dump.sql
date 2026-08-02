-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: diattool_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `diattool_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `diattool_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `diattool_db`;

--
-- Table structure for table `deeplink_access`
--

DROP TABLE IF EXISTS `deeplink_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deeplink_access` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime DEFAULT NULL,
  `disabled_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_deeplink_token` (`token`),
  KEY `idx_deeplink_user_created` (`user_id`,`created_at`),
  CONSTRAINT `deeplink_access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deeplink_access`
--

LOCK TABLES `deeplink_access` WRITE;
/*!40000 ALTER TABLE `deeplink_access` DISABLE KEYS */;
INSERT INTO `deeplink_access` VALUES (1,5,'JUnfQjGB-Pq9OfKTKCtbHunNETWQT7Vo','2026-07-31 19:41:26',NULL,NULL),(2,6,'P3T61Ehz5cVLKKhcZuqizMAnmrVxWH19','2026-07-31 19:41:41',NULL,'2026-07-31 19:41:41'),(3,2,'VXPYpNQNB9VH5x6ApgSUb2ojQ1tMyAZN','2026-07-31 19:42:32',NULL,NULL);
/*!40000 ALTER TABLE `deeplink_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goals` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel',
  `user-id` int NOT NULL COMMENT 'Link User',
  `messuretype_id` int NOT NULL COMMENT 'Link Messwerttyp',
  `messure-value` double NOT NULL COMMENT 'Ziel das erreicht werden soll',
  `goalname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Name des Ziels',
  `createdat` datetime DEFAULT NULL,
  `achieved` datetime DEFAULT NULL,
  `rewardedat` datetime DEFAULT NULL,
  `rewardedwith` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `user-id` (`user-id`),
  KEY `messuretype_id` (`messuretype_id`),
  CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`user-id`) REFERENCES `user` (`id`),
  CONSTRAINT `goals_ibfk_2` FOREIGN KEY (`messuretype_id`) REFERENCES `messuretype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `training_plan_entry`
--

DROP TABLE IF EXISTS `training_plan_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_plan_entry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `weekday_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `focus_text` varchar(160) COLLATE utf8mb4_general_ci NOT NULL,
  `duration_text` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `note_text` text COLLATE utf8mb4_general_ci NOT NULL,
  `valid_from` datetime NOT NULL,
  `deactivated_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_plan_user_active` (`user_id`,`deactivated_at`,`valid_from`),
  KEY `idx_plan_user_day` (`user_id`,`weekday_name`,`deactivated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_plan_entry`
--

LOCK TABLES `training_plan_entry` WRITE;
/*!40000 ALTER TABLE `training_plan_entry` DISABLE KEYS */;
/*!40000 ALTER TABLE `training_plan_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_entry`
--

DROP TABLE IF EXISTS `training_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_entry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `training_date` date NOT NULL,
  `training_text` text COLLATE utf8mb4_general_ci NOT NULL,
  `duration_text` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `limitation_text` text COLLATE utf8mb4_general_ci DEFAULT NULL,
  `load_level` tinyint NOT NULL,
  `pain_level` tinyint NOT NULL,
  `source_plan_day` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source_plan_entry_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_training_user_date` (`user_id`,`training_date`),
  KEY `idx_training_source_plan_entry` (`source_plan_entry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_entry`
--

LOCK TABLES `training_entry` WRITE;
/*!40000 ALTER TABLE `training_entry` DISABLE KEYS */;
/*!40000 ALTER TABLE `training_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `goals`
--

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */;
INSERT INTO `goals` VALUES (14,2,6,118,'Du hast begonnen, lass die Kilos purzeln','2026-06-14 05:00:00','2026-06-14 05:00:00','2026-06-17 05:00:00','Fitnesstracker'),(15,2,6,113,'5kg geschaft','2026-06-14 05:00:00','2026-06-27 05:00:00','2026-07-09 05:00:00','T-Shirt 404club'),(16,2,6,108,'10kg geschaft','2026-06-14 05:00:00','2026-07-16 05:00:00','2026-06-17 05:00:00','2x T-Shirts 404club'),(17,2,6,103,'15kg geschaft','2026-06-14 05:00:00',NULL,NULL,NULL),(18,2,6,99.9,'unter 100kg','2026-06-14 05:00:00',NULL,NULL,NULL),(19,2,6,99,'Halbzeit','2026-06-14 05:00:00',NULL,NULL,NULL),(20,2,6,98,'20kg geschaft','2026-06-14 05:00:00',NULL,NULL,NULL),(21,2,6,93,'25kg geschaft','2026-06-14 05:00:00',NULL,NULL,NULL),(22,2,6,88,'30kg geschaft','2026-06-14 05:00:00',NULL,NULL,NULL),(23,2,6,83,'35kg geschaft','2026-06-14 05:00:00',NULL,NULL,NULL),(24,2,6,80,'Ziel in Sicht','2026-06-14 05:00:00',NULL,NULL,NULL),(25,1,7,110,'Brust unter 110','2026-06-14 05:00:00','2026-07-24 05:00:00','2026-07-25 05:00:00','Neue Trainingsshirt gekauft'),(26,1,8,110,'Bauch unter 110','2026-06-14 05:00:00','2026-07-09 05:00:00','2026-07-10 05:00:00','Kinobesuch als Belohnung');
/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messure`
--

DROP TABLE IF EXISTS `messure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messure` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel',
  `user-id` int NOT NULL COMMENT 'Link User',
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Zeitpunkt der Messung',
  `notes` text COLLATE utf8mb4_general_ci COMMENT 'Notizen',
  `official` bit(1) NOT NULL DEFAULT b'1' COMMENT 'Angabe, ob in genereller Berechnung der Statistik mit einbezogen',
  PRIMARY KEY (`id`),
  KEY `user-id` (`user-id`),
  CONSTRAINT `messure_ibfk_1` FOREIGN KEY (`user-id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messure`
--

LOCK TABLES `messure` WRITE;
/*!40000 ALTER TABLE `messure` DISABLE KEYS */;
INSERT INTO `messure` VALUES (64,2,'2026-06-14 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(65,2,'2026-06-16 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(66,2,'2026-06-18 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(67,2,'2026-06-19 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(68,2,'2026-06-20 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(69,2,'2026-06-21 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(70,2,'2026-06-22 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(71,2,'2026-06-23 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(72,2,'2026-06-24 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(73,2,'2026-06-25 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(74,2,'2026-06-26 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(75,2,'2026-06-27 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(76,2,'2026-06-28 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(77,2,'2026-06-29 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(78,2,'2026-06-30 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(79,2,'2026-07-01 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(80,2,'2026-07-02 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(81,2,'2026-07-03 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(82,2,'2026-07-04 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(83,2,'2026-07-05 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(84,2,'2026-07-06 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(85,2,'2026-07-07 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(86,2,'2026-07-08 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(87,2,'2026-07-09 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(88,2,'2026-07-10 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(89,2,'2026-07-11 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(90,2,'2026-07-12 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(91,2,'2026-07-13 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(92,2,'2026-07-14 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(93,2,'2026-07-15 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(94,2,'2026-07-16 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(95,2,'2026-07-17 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(96,2,'2026-07-18 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(97,2,'2026-07-19 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(98,2,'2026-07-20 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(99,2,'2026-07-21 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(100,2,'2026-07-22 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(101,2,'2026-07-23 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(102,2,'2026-07-24 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(103,2,'2026-07-25 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(104,2,'2026-07-26 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(105,2,'2026-07-27 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(106,2,'2026-07-28 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(107,2,'2026-07-29 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(108,2,'2026-07-30 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary ''),(109,2,'2026-07-31 05:00:00','Import fuer exec (2026-06-14 bis 2026-07-31)',_binary '');
/*!40000 ALTER TABLE `messure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messuretype`
--

DROP TABLE IF EXISTS `messuretype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messuretype` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel',
  `messurement` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Messwertname',
  `unit` varchar(5) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Einheit',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messuretype`
--

LOCK TABLES `messuretype` WRITE;
/*!40000 ALTER TABLE `messuretype` DISABLE KEYS */;
INSERT INTO `messuretype` VALUES (6,'Gewicht','kg'),(7,'Brustumfang','cm'),(8,'Bauchumfang','cm'),(9,'Bundumfang','cm'),(10,'Poumfang','cm');
/*!40000 ALTER TABLE `messuretype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messurevalue`
--

DROP TABLE IF EXISTS `messurevalue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messurevalue` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel',
  `messure-id` int NOT NULL COMMENT 'Link Messwertsammlung',
  `type-id` int NOT NULL COMMENT 'Link Messwerttyp',
  `value` double NOT NULL COMMENT 'Wert der Messung',
  PRIMARY KEY (`id`),
  KEY `messure-id` (`messure-id`),
  KEY `type-id` (`type-id`),
  CONSTRAINT `messurevalue_ibfk_1` FOREIGN KEY (`messure-id`) REFERENCES `messure` (`id`),
  CONSTRAINT `messurevalue_ibfk_2` FOREIGN KEY (`type-id`) REFERENCES `messuretype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=316 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messurevalue`
--

LOCK TABLES `messurevalue` WRITE;
/*!40000 ALTER TABLE `messurevalue` DISABLE KEYS */;
INSERT INTO `messurevalue` VALUES (1,64,6,118),(2,65,6,117.6),(3,66,6,115.7),(4,67,6,115.6),(5,68,6,115.5),(6,69,6,115.3),(7,70,6,115.2),(8,71,6,114.9),(9,72,6,114.6),(10,73,6,114),(11,74,6,113.3),(12,75,6,113),(13,76,6,112.7),(14,77,6,112.8),(15,78,6,112.5),(16,79,6,112.4),(17,80,6,111.7),(18,81,6,111.4),(19,82,6,110.7),(20,83,6,110.9),(21,84,6,111.8),(22,85,6,110.8),(23,86,6,110.4),(24,87,6,110.2),(25,88,6,109.4),(26,89,6,109.3),(27,90,6,108.9),(28,91,6,109.2),(29,92,6,109.2),(30,93,6,109),(31,94,6,107.9),(32,95,6,107.7),(33,96,6,107.7),(34,97,6,108.1),(35,98,6,107.9),(36,99,6,107.2),(37,100,6,106.8),(38,101,6,106.4),(39,102,6,106.1),(40,103,6,105.8),(41,104,6,105.5),(42,105,6,105.8),(43,106,6,105.8),(44,107,6,105.7),(45,108,6,105),(46,109,6,104.5),(64,64,7,118.2),(65,65,7,117.5),(66,66,7,115.5),(67,67,7,116.6),(68,68,7,116),(69,69,7,115.9),(70,70,7,115.3),(71,71,7,115),(72,72,7,113.6),(73,73,7,115.1),(74,74,7,114.3),(75,75,7,114.3),(76,76,7,112.4),(77,77,7,113.8),(78,78,7,113.5),(79,79,7,112.4),(80,80,7,110.6),(81,81,7,110.7),(82,82,7,111.9),(83,83,7,111.5),(84,84,7,112.7),(85,85,7,109.6),(86,86,7,108.8),(87,87,7,110.7),(88,88,7,112.8),(89,89,7,110.8),(90,90,7,112.1),(91,91,7,110),(92,92,7,110.2),(93,93,7,108.8),(94,94,7,108.6),(95,95,7,110.1),(96,96,7,109.5),(97,97,7,108.8),(98,98,7,108.6),(99,99,7,108.3),(100,100,7,108.5),(101,101,7,108.3),(102,102,7,108),(103,103,7,109.4),(104,104,7,108.4),(105,105,7,107.4),(106,106,7,107.8),(107,107,7,107.6),(108,108,7,107),(109,109,7,107),(127,64,8,119.4),(128,65,8,116.6),(129,66,8,117.2),(130,67,8,118.3),(131,68,8,116.8),(132,69,8,114.8),(133,70,8,114.1),(134,71,8,113.7),(135,72,8,117.1),(136,73,8,117.6),(137,74,8,116.6),(138,75,8,116.1),(139,76,8,116.4),(140,77,8,116.2),(141,78,8,116.1),(142,79,8,111.9),(143,80,8,113.9),(144,81,8,111.7),(145,82,8,110.6),(146,83,8,110.8),(147,84,8,111.2),(148,85,8,110.1),(149,86,8,110),(150,87,8,108.8),(151,88,8,110.2),(152,89,8,109.9),(153,90,8,109),(154,91,8,111.4),(155,92,8,111.7),(156,93,8,108.7),(157,94,8,108),(158,95,8,109.7),(159,96,8,109.3),(160,97,8,108.8),(161,98,8,108.8),(162,99,8,108.8),(163,100,8,109.7),(164,101,8,109),(165,102,8,108.3),(166,103,8,104.5),(167,104,8,104.1),(168,105,8,103.6),(169,106,8,105.5),(170,107,8,103.8),(171,108,8,103),(172,109,8,103),(190,64,9,119.3),(191,65,9,112.6),(192,66,9,115.3),(193,67,9,110.7),(194,68,9,109.7),(195,69,9,113.6),(196,70,9,110),(197,71,9,111.1),(198,72,9,110.6),(199,73,9,108.7),(200,74,9,120),(201,75,9,107.9),(202,76,9,110.6),(203,77,9,111.7),(204,78,9,112.5),(205,79,9,110.1),(206,80,9,109.5),(207,81,9,110.1),(208,82,9,106.6),(209,83,9,109.4),(210,84,9,107.3),(211,85,9,108.4),(212,86,9,107),(213,87,9,108.8),(214,88,9,107),(215,89,9,107.7),(216,90,9,108.2),(217,91,9,107.6),(218,92,9,107.7),(219,93,9,106.3),(220,94,9,107.7),(221,95,9,105.2),(222,96,9,106.8),(223,97,9,108.4),(224,98,9,107.6),(225,99,9,106.7),(226,100,9,105.2),(227,101,9,105.8),(228,102,9,106.3),(229,103,9,105.8),(230,104,9,105.8),(231,105,9,105.8),(232,106,9,105.7),(233,107,9,104.1),(234,108,9,104.2),(235,109,9,104.2),(253,64,10,120.5),(254,65,10,120.3),(255,66,10,116.8),(256,67,10,119.2),(257,68,10,117.3),(258,69,10,116.7),(259,70,10,116.5),(260,71,10,114.7),(261,72,10,116.7),(262,73,10,115.6),(263,74,10,116.1),(264,75,10,114.6),(265,76,10,115.1),(266,77,10,114.5),(267,78,10,114.8),(268,79,10,114.5),(269,80,10,113.4),(270,81,10,113.5),(271,82,10,113.5),(272,83,10,113.2),(273,84,10,109.9),(274,85,10,112.4),(275,86,10,111.6),(276,87,10,112.8),(277,88,10,112.4),(278,89,10,112.4),(279,90,10,111.2),(280,91,10,111.1),(281,92,10,111),(282,93,10,111.9),(283,94,10,111.7),(284,95,10,111.7),(285,96,10,111.3),(286,97,10,110.8),(287,98,10,111.4),(288,99,10,112),(289,100,10,110.5),(290,101,10,110.8),(291,102,10,111.1),(292,103,10,109.8),(293,104,10,110.2),(294,105,10,110.5),(295,106,10,110.7),(296,107,10,111.4),(297,108,10,108.9),(298,109,10,108.9);
/*!40000 ALTER TABLE `messurevalue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Prim├ñrschl├╝ssel',
  `nick` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Benutzername',
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Passwort zur Anmeldung',
  `goalweight` double DEFAULT NULL COMMENT 'Wunschgewicht',
  `height` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'testuser_20260731202234','$argon2id$v=19$m=65536,t=4,p=1$aXlvNXVSRUw1ZmNYYUpTUQ$ixq6taks4qq7Dik3Zwf/SPrMcaFdBeFcrAQheKueTq0',NULL,NULL),(2,'exec','$argon2id$v=19$m=65536,t=4,p=1$aU5oRXBEYklzekJZMEc4UQ$9+AcGLoWB/6eDm69U1QTxeSk6+/wublYEKgYWsPaILY',80,1.82),(3,'csrf_test_212946','$argon2id$v=19$m=65536,t=4,p=1$M2EuZ1J0QXJBOHByOVN6Wg$KzAss4fOazL+c6fH/oEaJAIEgl/7PCGrUx+DYCa/bfA',95,1.78),(4,'deeplink_user_214026','$argon2id$v=19$m=65536,t=4,p=1$SkxPdEsyblNOOFhoR0guQg$eGeDx9LVu4ZKwppLXX1etAYo6vzAd6yRQ4EuL0AJS6E',NULL,NULL),(5,'deeplink_user_214125','$argon2id$v=19$m=65536,t=4,p=1$REs3UWV2VmZ0ZXRkUHMwRg$3q1EcNHq+Z2UblqwLijXaK9xKuYmLaCniasU288zCjo',NULL,NULL),(6,'deeplink_disable_214141','$argon2id$v=19$m=65536,t=4,p=1$UnU4dUouYkh6VUtpYkNwag$5o63Ihcv69yAtG9oIxqSg8nuTAaWPlrDaJ2+HDNkJHQ',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

ALTER TABLE `training_plan_entry`
  ADD CONSTRAINT `fk_training_plan_entry_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

ALTER TABLE `training_entry`
  ADD CONSTRAINT `fk_training_entry_plan` FOREIGN KEY (`source_plan_entry_id`) REFERENCES `training_plan_entry` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_training_entry_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-31 19:50:27
