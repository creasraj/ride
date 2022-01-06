# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.36)
# Database: ride
# Generation Time: 2022-01-06 11:43:48 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bikes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bikes`;

CREATE TABLE `bikes` (
  `BikeId` int(11) NOT NULL,
  `SerialNumber` varchar(16) DEFAULT NULL,
  `InCirculationSince` datetime NOT NULL,
  `BatteryLevel` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`BikeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `bikes` WRITE;
/*!40000 ALTER TABLE `bikes` DISABLE KEYS */;

INSERT INTO `bikes` (`BikeId`, `SerialNumber`, `InCirculationSince`, `BatteryLevel`)
VALUES
	(1,'394937','2020-01-01 00:00:00',60),
	(2,'877888','2020-02-02 00:00:00',80),
	(3,'358999','2020-01-05 00:00:00',30);

/*!40000 ALTER TABLE `bikes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table geolocations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `geolocations`;

CREATE TABLE `geolocations` (
  `GeoId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Latitude` decimal(10,6) DEFAULT NULL,
  `Longitude` decimal(10,6) DEFAULT NULL,
  PRIMARY KEY (`GeoId`),
  KEY `lat` (`Latitude`),
  KEY `long` (`Longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `geolocations` WRITE;
/*!40000 ALTER TABLE `geolocations` DISABLE KEYS */;

INSERT INTO `geolocations` (`GeoId`, `Latitude`, `Longitude`)
VALUES
	(1,1.350000,103.950000),
	(2,1.351500,103.940200),
	(3,1.354948,103.939544);

/*!40000 ALTER TABLE `geolocations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table markers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `markers`;

CREATE TABLE `markers` (
  `MarkerId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `GeoId` int(11) DEFAULT NULL,
  `BikeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`MarkerId`),
  KEY `FK_BikeId` (`BikeId`),
  CONSTRAINT `FK_BikeId` FOREIGN KEY (`BikeId`) REFERENCES `bikes` (`BikeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `markers` WRITE;
/*!40000 ALTER TABLE `markers` DISABLE KEYS */;

INSERT INTO `markers` (`MarkerId`, `GeoId`, `BikeId`)
VALUES
	(1,1,1),
	(2,2,2),
	(3,3,3);

/*!40000 ALTER TABLE `markers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips`;

CREATE TABLE `trips` (
  `TripId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `BikeId` int(11) DEFAULT NULL,
  `Taken` datetime DEFAULT NULL,
  `Length` int(11) DEFAULT NULL,
  `Cost` decimal(11,0) DEFAULT NULL,
  PRIMARY KEY (`TripId`),
  KEY `FK_BIKE` (`BikeId`),
  CONSTRAINT `FK_BIKE` FOREIGN KEY (`BikeId`) REFERENCES `bikes` (`BikeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;

INSERT INTO `trips` (`TripId`, `BikeId`, `Taken`, `Length`, `Cost`)
VALUES
	(1,1,'2022-01-01 00:00:00',1,18),
	(2,2,'2022-01-03 00:00:00',12,290);

/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
