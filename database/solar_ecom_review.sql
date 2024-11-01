CREATE DATABASE  IF NOT EXISTS `solar_ecom` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `solar_ecom`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: solar_ecom
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `rating` int(11) NOT NULL,
  `productdetailid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productdetailid_idx` (`productdetailid`),
  CONSTRAINT `fkk_productdetaild_id` FOREIGN KEY (`productdetailid`) REFERENCES `productdetails` (`productdetailid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'ds','ss',4,NULL),(2,'ds','ss',4,NULL),(3,'ds','ss',4,NULL),(4,'ds','ss',4,NULL),(5,'ds','ss',4,NULL),(6,'ds','ss',4,NULL),(7,'ds','ss',4,NULL),(8,'ds','ss',4,NULL),(9,'ds','ss',4,NULL),(10,'Bhartiii','wonderful ',4,NULL),(11,'bharti','hello',4,NULL),(12,'bharti','hello',4,19),(13,'bharti','hello',4,19),(14,'bharti','hello',4,19),(15,'bharti','hello',4,19),(16,'bharti','hello',4,19),(17,'bharti','hello',4,19),(18,'bharti','hello',4,19),(19,'bharti','hello',4,19),(20,'bharti','hello',4,19),(21,'bharti','hello',4,19),(22,'bharti','hello',4,19),(23,'bharti','hello',4,19),(24,'bharti','hello',4,19),(25,'bharti','hello',4,19),(26,'bharti','hello',4,19),(27,'bharti','hello',4,19),(28,'bharti','hello',4,19),(29,'bharti','hello',4,19),(30,'2','w',4,1);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01 18:08:04
