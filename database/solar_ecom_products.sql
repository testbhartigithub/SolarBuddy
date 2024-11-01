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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `brandid` int(11) DEFAULT NULL,
  `categoryid` int(11) DEFAULT NULL,
  `subcategoryid` int(11) DEFAULT NULL,
  `productname` varchar(100) DEFAULT NULL,
  `description` text,
  `icon` text,
  PRIMARY KEY (`productid`),
  KEY `fk_brandid_products_idx` (`brandid`),
  KEY `fk_categoryid_products_idx` (`categoryid`),
  KEY `fk_subcategoryid_products_idx` (`subcategoryid`),
  CONSTRAINT `fk_brandid_products` FOREIGN KEY (`brandid`) REFERENCES `brands` (`brandid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_categoryid_products` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,7,5,1,'WAAREE Mono PERC Solar Module','WAAREE 450Wp 144Cells Mono PERC Solar Module','15f360d7-7972-4df4-952d-7089e387cb23.jpg'),(2,7,5,1,'WAAREE Mono PERC Solar Module','WAAREE 545Wp 144Cells Mono PERC Solar Module','eb4d4d4e-8243-4715-abef-2634b2dff896.jpg'),(3,7,5,2,'WAAREE  TOPCON N-Type Framed Dual Glass Bifacial Non-DCR Solar Module','WAAREE 575Wp 144Cells TOPCON N-Type Framed Dual Glass Bifacial Non-DCR Solar Module','23488adc-c5bc-4c1e-a9ae-71c912d83972.jpg'),(4,7,5,3,'WAAREE Polycrystalline EDO PRO Solar Module','WAAREE 335Wp 72Cells Polycrystalline EDO PRO Solar Module','2be3e175-da87-40cb-9cf9-ab7b8c672a5e.jpg'),(5,7,5,3,'Waaree Solar PV Module','Waaree 20Wp 12V Solar PV Module','3eb25ba7-d9d9-4907-b177-2c96b31c1ade.jpg'),(6,7,3,6,'WAAREE Solar Inverter 80 kW ','WAAREE Solar Inverter 80 kW Three Phase Solar On Grid Inverter Charge Controller','f8a4bd9d-e06d-46d1-9d16-8483e0d0d704.jpg'),(7,7,3,7,'WAAREE 3kW Single Phase Solar On Grid Inverter','WAAREE 3kW Single Phase Solar On Grid Inverter','6200bd09-7225-4388-a923-00d19d796081.jpg'),(8,7,3,7,'WAAREE 6kW Single Phase Solar On Grid Inverter','WAAREE 6kW Single Phase Solar On Grid Inverter','aa64ea8d-f3b0-4d3a-bc50-db15a4c00a80.jpg'),(9,7,3,6,'WAAREE 15kW Three Phase Solar On Grid Inverter','WAAREE 15kW Three Phase Solar On Grid Inverter','1a565395-0baf-4dde-8290-d87348e73548.jpg'),(10,7,3,6,'WAAREE 25kW Three Phase Solar On Grid Inverter','WAAREE 25kW Three Phase Solar On Grid Inverter','0e4aad6e-f9f3-4e9e-b174-2f6707e7acda.jpg'),(11,7,3,6,'WAAREE 80kW Three Phase Solar On Grid Inverter','WAAREE 80kW Three Phase Solar On Grid Inverter','152b53b9-4201-43e5-8322-3b655f8334e4.jpg'),(12,7,4,9,'72V/34 Ah Li-Ion NMC Battery Packs For EV - 2 Wheelers','72V/34 Ah Li-Ion NMC Battery Packs For EV - 2 Wheelers','d940ab43-faca-43d8-b628-fb64e5a514da.jpg'),(13,7,4,9,'WAAREE 12.8V/12 Ah Li-Ion Battery Pack For Solar Street Light','WAAREE 12.8V/12 Ah Li-Ion Battery Pack For Solar Street Light','e68ef539-287a-44e5-937a-c61cdb3e3324.jpg'),(14,7,4,10,'WAAREE 12.8V/24 Ah Li-Ion LFP Battery Packs For Solar Street Light','WAAREE 12.8V/24 Ah Li-Ion LFP Battery Packs For Solar Street Light','747c3eec-2c2a-4c1b-8cb4-1fabc8a16e1a.jpg'),(15,7,4,10,'WAAREE 12.8V/30 Ah Li-Ion LFP Battery Pack For Solar Street Light','WAAREE 12.8V/30 Ah Li-Ion LFP Battery Pack For Solar Street Light','b84a4095-996c-405f-b3a8-4183655ed90d.jpg'),(16,7,4,10,'WAAREE 12.8V/36 Ah Li-Ion LFP Battery Packs For Solar Street Light','WAAREE 12.8V/36 Ah Li-Ion LFP Battery Packs For Solar Street Light','a7918001-e33c-49f9-b24c-9f386722ac49.jpg'),(17,7,4,10,'WAAREE 12.8V/42 Ah Li-Ion LFP Battery Packs For Solar Street Light','WAAREE 12.8V/42 Ah Li-Ion LFP Battery Packs For Solar Street Light','0d4809ed-784f-4f91-8f00-869282f8f704.jpg'),(18,7,4,10,'WAAREE 12.8V/48 Ah Li-Ion LFP Battery Packs For Solar Street Light','WAAREE 12.8V/48 Ah Li-Ion LFP Battery Packs For Solar Street Light','f1225d7f-f309-47c6-8695-d0611cf5c3bd.jpg'),(19,1,7,11,'V-Guard Smart Pro 1200 Pure Sine Wave 1000VA IoT Inverter for Home, Office & Shops','V-Guard Smart Pro 1200 Pure Sine Wave 1000VA IoT Inverter for Home, Office & Shops','0b50a3ac-dfb6-42bf-aa63-22c544e38f62.jpg'),(20,2,8,13,'Homehop 60W Led All in One Solar street lights outdoor ','Homehop 60W Led All in One Solar street lights outdoor ','920977ef-0dbc-4b87-ac45-d9ecd4f3fe74.jpg'),(21,7,1,14,'200 LPD ETC V-Guard Winhot Eco H Solar Water Heater','200 LPD ETC V-Guard Winhot Eco H Solar Water Heater','ddb781bd-79d1-4238-9e00-eaf2a5d0109c.jpg'),(22,2,9,15,'Solarverter PCU','Solarverter PCU','ce7ae1e3-ff89-44e3-989b-bbe1e842671d.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01 18:08:05
