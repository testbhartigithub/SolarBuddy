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
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subcategory` (
  `subcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `brandid` int(11) DEFAULT NULL,
  `categoryid` int(11) DEFAULT NULL,
  `subcategoryname` varchar(100) DEFAULT NULL,
  `icon` text,
  PRIMARY KEY (`subcategoryid`),
  KEY `fk_brandid_idx` (`brandid`),
  KEY `fk_categoryid_idx` (`categoryid`),
  CONSTRAINT `fk_brandid_subcategory` FOREIGN KEY (`brandid`) REFERENCES `brands` (`brandid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_categoryid_subcategory` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,7,5,'Mono PERC Solar Module','5feb4c98-30d7-4b6f-a302-bc38416b9771.jpg'),(2,7,5,'Mono PERC Bifacial Solar Module','35182e18-516a-48c9-bd70-2ac5334372c3.jpg'),(3,7,5,'Solar PV Modules','d74d440d-b44b-4ff1-b1ca-c1e4fe8d0a9c.jpg'),(4,7,4,'LI_ION BATTERY','daf5fdb3-141e-4b8a-9407-b92fecc20d88.jpg'),(5,7,6,'SOLAR CABELS','f981e2bc-6407-4706-a96c-de9c6a490600.jpg'),(6,7,3,'Three Phase Solar On Grid Inverter Charge Controller','ec4143f9-11f6-47e7-80c0-2f718ca7c060.jpg'),(7,7,3,'Single Phase Solar On Grid Inverter Charge Controller','4f20be75-8038-4b1a-a867-d0ab8f4b28b5.jpg'),(9,7,4,' Li-Ion NMC Battery Packs ','b43f44b2-da93-4fed-9956-3928a46dc610.jpg'),(10,7,4,' Li-Ion LFP Battery Pack ','a339c848-4249-42e3-8d49-11ff8fb51489.jpg'),(11,1,7,'Pure Sine Wave ','d139f58f-b834-4718-b4f9-c785f9f91b16.jpg'),(13,2,8,'street lights','08261e60-2a04-4639-a878-19b519372fb4.jpg'),(14,7,1,' Eco H Solar Water Heater','ebf939cb-acca-459b-a471-36f833ff7add.jpg'),(15,2,9,'Solarverter','a305ffb5-c616-411d-a6dd-d29f3b763e48.jpg');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01 18:08:03
