-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.19-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table kedb.application_category
CREATE TABLE IF NOT EXISTS `application_category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) DEFAULT NULL,
  `category_desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.application_category: ~3 rows (approximately)
/*!40000 ALTER TABLE `application_category` DISABLE KEYS */;
INSERT INTO `application_category` (`category_id`, `category_name`, `category_desc`) VALUES
	(1, 'Claims', 'Claims from Guideware'),
	(2, 'Policy', 'Policy from Guideware'),
	(3, 'Billing', 'Billing from Guideware'),
	(4, 'Rating', 'Rating from mainframes');
/*!40000 ALTER TABLE `application_category` ENABLE KEYS */;

-- Dumping structure for table kedb.app_user
CREATE TABLE IF NOT EXISTS `app_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sso_id` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sso_id` (`sso_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.app_user: ~5 rows (approximately)
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` (`id`, `sso_id`, `password`, `first_name`, `last_name`, `email`) VALUES
	(2, 'vkontham', '$2a$10$RrJHlviqT8F0rFratLpN2eZLBpqLEHoabXmT0CW4bScTtNUBO/0a6', 'Vishal', 'Kontham', 'vishal.kontham@capgemini.com'),
	(4, 'venparva', '$2a$10$YSM6k1UKtMIyLmqlcqJhN.LR7m3UyyjIA84K5ejJCyhZD.d2Q5sQa', 'Venkata', 'Parvatam', 'venkata.parvatam@capgemini.com'),
	(5, 'vmattegu', '$2a$10$nErPp6HBMkBH.hmLrA/TxeaWPyold7SqNE9kg0Lb09ILfQM.ExJ8C', 'Nagasai', 'Mattegunta', 'vmattegu@capgemini.com'),
	(6, 'fkhan1', '123456', 'farhan', 'khan', 'farhan.b.khan@capgemini.com'),
	(7, 'dba', '$2a$10$HjvD4WeM/prGS7YldkgBv.b6dZ0U.TXfY0l3UPNLmqiHBEKhkQ93K', 'farhan', 'khan', 'farhan.b.khan@capgemini.com'),
	(8, 'user', '$2a$10$tZg1.uxjG5PgbD3oG2jmYO6qiFMoP2y1jFBMmWUaeV56DmKwPz1Eq', 'farhan', 'khan', 'farhan.b.khan@capgemini.com');
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;

-- Dumping structure for table kedb.app_user_application_category
CREATE TABLE IF NOT EXISTS `app_user_application_category` (
  `app_user_id` bigint(20) NOT NULL,
  `application_category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`app_user_id`,`application_category_id`),
  KEY `FK_APPLICATION_CATEGORY_ID` (`application_category_id`),
  CONSTRAINT `FK_APPLICATION_CATEGORY_ID` FOREIGN KEY (`application_category_id`) REFERENCES `application_category` (`category_id`),
  CONSTRAINT `FK_APP_USER_ID` FOREIGN KEY (`app_user_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.app_user_application_category: ~0 rows (approximately)
/*!40000 ALTER TABLE `app_user_application_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_user_application_category` ENABLE KEYS */;

-- Dumping structure for table kedb.app_user_user_profile
CREATE TABLE IF NOT EXISTS `app_user_user_profile` (
  `user_id` bigint(20) NOT NULL,
  `user_profile_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`user_profile_id`),
  KEY `FK_USER_PROFILE` (`user_profile_id`),
  CONSTRAINT `FK_APP_USER` FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`),
  CONSTRAINT `FK_USER_PROFILE` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.app_user_user_profile: ~5 rows (approximately)
/*!40000 ALTER TABLE `app_user_user_profile` DISABLE KEYS */;
INSERT INTO `app_user_user_profile` (`user_id`, `user_profile_id`) VALUES
	(2, 1),
	(8, 1),
	(4, 2),
	(6, 2),
	(5, 3),
	(7, 3);
/*!40000 ALTER TABLE `app_user_user_profile` ENABLE KEYS */;

-- Dumping structure for table kedb.persistent_logins
CREATE TABLE IF NOT EXISTS `persistent_logins` (
  `username` varchar(64) NOT NULL,
  `series` varchar(64) NOT NULL,
  `token` varchar(64) NOT NULL,
  `last_used` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`series`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.persistent_logins: ~0 rows (approximately)
/*!40000 ALTER TABLE `persistent_logins` DISABLE KEYS */;
/*!40000 ALTER TABLE `persistent_logins` ENABLE KEYS */;

-- Dumping structure for table kedb.solution
CREATE TABLE IF NOT EXISTS `solution` (
  `solution_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `solution_desc` varchar(50) DEFAULT NULL,
  `solution_search_keyword` varchar(50) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `last_update_date` date DEFAULT NULL,
  `attachment_id` bigint(20) DEFAULT NULL,
  `solution_status_name` varchar(45) DEFAULT NULL,
  `ratingclassvalue` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`solution_id`),
  FULLTEXT KEY `search_keyword` (`solution_search_keyword`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.solution: ~23 rows (approximately)
/*!40000 ALTER TABLE `solution` DISABLE KEYS */;
INSERT INTO `solution` (`solution_id`, `solution_desc`, `solution_search_keyword`, `created_by`, `created_date`, `last_update_date`, `attachment_id`, `solution_status_name`, `ratingclassvalue`) VALUES
	(1, 'unable to login into clarity application', 'unable login', 'pshamala', '2017-08-22', '2017-09-06', NULL, 'Updated', 2),
	(2, 'Not able to access Network', 'login', 'pshamala', '2017-08-22', '2017-09-04', NULL, 'Updated', 5),
	(3, 'Mouse is not working', 'unable', 'pshamala', '2017-08-21', '2017-09-06', NULL, 'Updated', 5),
	(10, 'hi no solution', 'adas', 'pshamala', '2017-08-20', '2017-03-03', NULL, 'Created', 8),
	(11, 'Hi Solution Desc', 'Solution Description', 'pshamala', '2017-08-19', '2017-03-03', NULL, 'Created', 9),
	(12, 'ten', 'search 123', 'vmattegu', '2017-08-18', '2017-03-22', NULL, 'Created', 10),
	(13, 'ten', 'search keywords', 'vmattegu', '2017-08-17', '2017-03-22', NULL, 'Updated', 21),
	(14, 'hi no solution', 'search ', 'vmattegu', '2017-08-14', '2017-03-22', NULL, 'Approved', 19),
	(15, 'hi', 'search keywords1', 'venparva', '2017-08-10', '2017-03-22', NULL, 'Approved', 74),
	(16, 'ten', 'ten', 'venparva', '2017-07-22', '2017-03-22', NULL, 'Approved', 20),
	(17, 'ten', 'ten', 'venparva', '2017-07-22', '2017-03-22', NULL, 'Approved', 81),
	(18, 'hi no solution', 'search keywords123', 'fkhan', '2017-07-02', '2017-03-22', NULL, 'Approved', 100),
	(19, 'hi no solution', 'sample search', 'fkhan', '2017-06-22', '2017-03-22', NULL, 'Approved', 99),
	(20, 'no solution', 'HI', 'fkhan', '2017-03-23', '2017-03-23', NULL, 'Approved', 55),
	(21, 'no solution', 'HI', 'fkhan', '2017-03-23', '2017-03-23', NULL, 'Rejected', 88),
	(22, 'ten', 'file', 'nbogem', '2017-03-23', '2017-03-23', NULL, 'Updated', 75),
	(23, 'ten', 'HI', 'nbogem', '2017-03-23', '2017-03-23', NULL, 'Updated', 66),
	(24, 'hello', 'hello', 'nbogem', '2017-01-23', '2017-03-23', NULL, 'Updated', 88),
	(25, 'unable to login into clarity application', 'unable login', 'fkhan', NULL, '2017-03-23', NULL, 'Rejected', 45),
	(26, 'Key board problem', 'problem', 'fkhan', '2017-09-01', '2017-09-01', NULL, 'Rejected', 88),
	(28, 'Telephone', 'my\r\n extension\r\n s', 'venparva', '2017-09-01', '2017-09-01', NULL, 'Created', 75),
	(30, 'Key board proble', 'key', 'fkhan', '2017-09-01', '2017-09-06', NULL, 'Updated', 98),
	(32, 'key problem', 'key prob,  create log file', 'venparva', '2017-09-04', '2017-09-05', NULL, 'Updated', 42),
	(33, 'Unable to login', 'unable, login', 'anonymousUser', '2017-09-15', '2017-09-15', NULL, 'Created', NULL);
/*!40000 ALTER TABLE `solution` ENABLE KEYS */;

-- Dumping structure for table kedb.solution_id_application_category
CREATE TABLE IF NOT EXISTS `solution_id_application_category` (
  `solution_id` int(11) NOT NULL,
  `application_category_id` int(11) NOT NULL,
  PRIMARY KEY (`solution_id`,`application_category_id`),
  KEY `FK_APPLICATION_CATEGORYID` (`application_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.solution_id_application_category: ~0 rows (approximately)
/*!40000 ALTER TABLE `solution_id_application_category` DISABLE KEYS */;
INSERT INTO `solution_id_application_category` (`solution_id`, `application_category_id`) VALUES
	(32, 1),
	(33, 3);
/*!40000 ALTER TABLE `solution_id_application_category` ENABLE KEYS */;

-- Dumping structure for table kedb.solution_id_ticket_id
CREATE TABLE IF NOT EXISTS `solution_id_ticket_id` (
  `solutions_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  PRIMARY KEY (`solutions_id`,`ticket_id`),
  KEY `FK_TICKET_ID` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.solution_id_ticket_id: ~3 rows (approximately)
/*!40000 ALTER TABLE `solution_id_ticket_id` DISABLE KEYS */;
INSERT INTO `solution_id_ticket_id` (`solutions_id`, `ticket_id`) VALUES
	(1, 1),
	(32, 8),
	(19, 12),
	(33, 19);
/*!40000 ALTER TABLE `solution_id_ticket_id` ENABLE KEYS */;

-- Dumping structure for table kedb.solution_status
CREATE TABLE IF NOT EXISTS `solution_status` (
  `solution_status_name` varchar(20) NOT NULL,
  PRIMARY KEY (`solution_status_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.solution_status: ~4 rows (approximately)
/*!40000 ALTER TABLE `solution_status` DISABLE KEYS */;
INSERT INTO `solution_status` (`solution_status_name`) VALUES
	('Approved'),
	('Created'),
	('Rejected'),
	('Updated');
/*!40000 ALTER TABLE `solution_status` ENABLE KEYS */;

-- Dumping structure for table kedb.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ticket_number` varchar(20) NOT NULL DEFAULT '0',
  `ticket_desc` varchar(200) DEFAULT NULL,
  `ticket_priority` varchar(50) DEFAULT NULL,
  `ticket_status` varchar(50) DEFAULT NULL,
  `category_name` varchar(20) DEFAULT NULL,
  `subcategory_name` varchar(20) DEFAULT NULL,
  `opened_date` date DEFAULT NULL,
  `closed_date` date DEFAULT NULL,
  `ratingClassValue` int(10) DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  UNIQUE KEY `ticket_number` (`ticket_number`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.ticket: ~189 rows (approximately)
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` (`ticket_id`, `ticket_number`, `ticket_desc`, `ticket_priority`, `ticket_status`, `category_name`, `subcategory_name`, `opened_date`, `closed_date`, `ratingClassValue`) VALUES
	(1, 'INC201601', 'Unable to Login into Clarity', 'High', 'Open', 'Claims', 'Claims-A', '2017-08-23', '2017-08-23', 1),
	(2, 'INC201602', 'Mouse is not working', 'Medium', 'In-Progress', 'Claims', 'Claims-A', '2017-08-23', '2017-08-23', 1),
	(3, 'INC201603', 'Network Port is not working', 'High', 'Open', 'Claims', 'Claims-A', '2017-08-23', '2017-08-23', 1),
	(4, 'INC201604', 'Sharepoint access is required', 'Low', 'In-Progress', 'Policy', 'Billing-B', '2017-08-23', '2017-08-23', 1),
	(5, 'INC201605', 'LMS application is down', 'Low', 'Open', 'Policy', 'Billing-B', '2017-08-23', '2017-08-23', 1),
	(6, 'INC201606', 'No user access ', 'Medium', 'Closed', 'Billing', 'Billing-B', '2017-08-23', '2017-08-23', 1),
	(7, 'INC201607', 'Install database server', 'Medium', 'Closed', 'Billing', 'Rating-C', '2017-08-23', '2017-08-23', 1),
	(8, 'INC201608', 'Unable to create log file', 'High', 'Closed', 'Billing', 'Rating-C', '2017-08-23', '2017-08-23', 1),
	(9, 'INC201609', 'port already in use', 'Low', 'Open', 'Policy', 'Rating-C', '2017-08-23', '2017-08-23', 1),
	(10, 'INC2016010', 'Not working in Chrome Browser', 'High', 'Open', 'Billing', 'Rating-C', '2017-08-23', '2017-08-23', 1),
	(11, 'INC2016012', 'Java 1.4 not installed', 'High', 'Open', 'Billing', 'Claims-A', '2017-08-23', '2017-08-23', 1),
	(12, 'INC2016013', 'Sample description search', 'Low', 'Open', 'Rating', 'Billing-B', '2017-08-23', '2017-08-23', 1),
	(13, 'INC2016014', 'Unable to Login into Clarity', 'High', 'Open', 'Claims', 'Billing-B', '2017-09-07', NULL, 1),
	(18, 'INC999100', 'Unable to login application1 due to password issue', 'High', 'Closed', 'Claims', 'Claims-A', '2017-09-11', '2017-09-23', 1),
	(19, 'INC999101', 'Unable to login application2 due to Billing number issue', 'Low', 'Open', 'Billing', 'Billing-B', '2017-09-11', '2017-09-23', 1),
	(20, 'INC999102', 'Unable to login application3 due to password issue in Rating module', 'Medium', 'In-Progress', 'Rating', 'Rating-C', '2017-09-11', '2017-09-23', 1),
	(21, 'INC999103', 'Unable to login application4 due to policy number and policy screen', 'High', 'Closed', 'Policy', 'Policy-D', '2017-09-11', '2017-09-23', 1),
	(22, 'INC999104', 'Unable to login application1 due to password issue', 'Low', 'Closed', 'Claims', 'Claims-A', '2017-09-11', '2017-09-23', 1),
	(23, 'INC999105', 'Unable to login application2 due to Billing number issue', 'Medium', 'Open', 'Billing', 'Billing-B', '2017-09-11', '2017-09-23', 1),
	(24, 'INC999106', 'Unable to login application3 due to password issue in Rating module', 'High', 'In-Progress', 'Rating', 'Rating-C', '2017-09-11', '2017-09-23', 1),
	(25, 'INC999107', 'Unable to login application4 due to policy number and policy screen', 'Low', 'Closed', 'Policy', 'Policy-D', '2017-09-11', '2017-09-23', 1),
	(26, 'INC999108', 'Unable to login application1 due to password issue', 'Medium', 'Closed', 'Claims', 'Claims-A', '2017-09-11', '2017-09-23', 1),
	(27, 'INC999109', 'Unable to login application2 due to Billing number issue', 'High', 'Open', 'Billing', 'Billing-B', '2017-09-11', '2017-09-23', 1),
	(28, 'INC999110', 'Unable to login application3 due to password issue in Rating module', 'Low', 'In-Progress', 'Rating', 'Rating-C', '2017-09-11', '2017-09-23', 1),
	(29, 'INC999111', 'Unable to login application4 due to policy number and policy screen', 'Medium', 'Closed', 'Policy', 'Policy-D', '2017-09-11', '2017-09-23', 1),
	(30, 'INC999112', 'Unable to login application1 due to password issue', 'High', 'Closed', 'Claims', 'Claims-A', '2017-09-11', '2017-09-23', 1),
	(31, 'INC999113', 'Unable to login application2 due to Billing number issue', 'Low', 'Open', 'Billing', 'Billing-B', '2017-09-11', '2017-09-23', 1),
	(32, 'INC999114', 'Unable to login application3 due to password issue in Rating module', 'Medium', 'In-Progress', 'Rating', 'Rating-C', '2017-09-11', '2017-09-23', 1),
	(33, 'INC999115', 'Unable to login application4 due to policy number and policy screen', 'High', 'Closed', 'Policy', 'Policy-D', '2017-09-11', '2017-09-23', 1),
	(36, 'INC999116', 'Reset the server process for machine1 and provide the count', 'Low', 'Open', 'Claims', 'Claims-B', '2017-09-13', '2017-09-24', 1),
	(37, 'INC999117', 'Reset the server process for machine2 and provide the count', 'High', 'In-Progress', 'Billing', 'Billing-A', '2017-09-13', '2017-09-24', 1),
	(38, 'INC999118', 'Reset the server process for machine3 and provide the count', 'Medium', 'Closed', 'Rating', 'Rating-D', '2017-09-13', '2017-09-24', 1),
	(39, 'INC999119', 'Reset the server process for machine4 and provide the count', 'Low', 'Open', 'Policy', 'Policy-C', '2017-09-13', '2017-09-24', 1),
	(40, 'INC999120', 'Provide the count and reset the server process for machine1', 'High', 'In-Progress', 'Claims', 'Claims-B', '2017-09-13', '2017-09-24', 1),
	(41, 'INC999121', 'Provide the count and reset the server process for machine2', 'Medium', 'Closed', 'Billing', 'Billing-A', '2017-09-13', '2017-09-24', 1),
	(42, 'INC999122', 'Provide the count and reset the server process for machine3', 'Low', 'Open', 'Rating', 'Rating-D', '2017-09-13', '2017-09-24', 1),
	(43, 'INC999123', 'Provide the count and reset the server process for machine4', 'High', 'In-Progress', 'Policy', 'Policy-C', '2017-09-13', '2017-09-24', 1),
	(44, 'INC999124', 'Reset the server process for machine1 and provide the count', 'Medium', 'Closed', 'Claims', 'Claims-B', '2017-09-13', '2017-09-24', 1),
	(45, 'INC999125', 'Reset the server process for machine2 and provide the count', 'Low', 'Open', 'Billing', 'Billing-A', '2017-09-13', '2017-09-24', 1),
	(46, 'INC999126', 'Reset the server process for machine3 and provide the count', 'High', 'In-Progress', 'Rating', 'Rating-D', '2017-09-13', '2017-09-24', 1),
	(47, 'INC999127', 'Reset the server process for machine4 and provide the count', 'Medium', 'Closed', 'Policy', 'Policy-C', '2017-09-13', '2017-09-24', 1),
	(48, 'INC999128', 'Provide the count and reset the server process for machine1', 'Low', 'Open', 'Claims', 'Claims-B', '2017-09-13', '2017-09-24', 1),
	(49, 'INC999129', 'Provide the count and reset the server process for machine2', 'High', 'In-Progress', 'Billing', 'Billing-A', '2017-09-13', '2017-09-24', 1),
	(50, 'INC999130', 'Provide the count and reset the server process for machine3', 'Medium', 'Closed', 'Rating', 'Rating-D', '2017-09-13', '2017-09-24', 1),
	(51, 'INC999131', 'Provide the count and reset the server process for machine4', 'Low', 'Open', 'Policy', 'Policy-C', '2017-09-13', '2017-09-24', 1),
	(52, 'INC999132', 'Reset the server process for machine1 and provide the count', 'High', 'In-Progress', 'Claims', 'Claims-B', '2017-09-13', '2017-09-24', 1),
	(53, 'INC999133', 'Reset the server process for machine2 and provide the count', 'Medium', 'Closed', 'Billing', 'Billing-A', '2017-09-13', '2017-09-24', 1),
	(54, 'INC999134', 'Reset the server process for machine3 and provide the count', 'Low', 'Open', 'Rating', 'Rating-D', '2017-09-13', '2017-09-24', 1),
	(55, 'INC999135', 'Reset the server process for machine4 and provide the count', 'High', 'In-Progress', 'Policy', 'Policy-C', '2017-09-13', '2017-09-24', 1),
	(56, 'INC999136', 'Provide the count and reset the server process for machine1', 'Medium', 'Closed', 'Claims', 'Claims-B', '2017-09-13', '2017-09-24', 1),
	(57, 'INC999137', 'Provide the count and reset the server process for machine2', 'Low', 'Open', 'Billing', 'Billing-A', '2017-09-13', '2017-09-24', 1),
	(58, 'INC999138', 'Provide the count and reset the server process for machine3', 'High', 'In-Progress', 'Rating', 'Rating-D', '2017-09-13', '2017-09-24', 1),
	(59, 'INC999139', 'Provide the count and reset the server process for machine4', 'Medium', 'Closed', 'Policy', 'Policy-C', '2017-09-13', '2017-09-24', 1),
	(60, 'INC999140', 'Portal screen is for claim number is not seen. Please provide reason and enabled the same', 'Low', 'Open', 'Claims', 'Claims-B', '2017-09-13', '2017-09-24', 1),
	(61, 'INC999141', 'Portal screen is for Billing number is not seen. Please provide reason and enabled the same', 'High', 'In-Progress', 'Billing', 'Billing-A', '2017-09-13', '2017-09-24', 1),
	(62, 'INC999142', 'Portal screen is for Rating number is not seen. Please provide reason and enabled the same', 'Medium', 'Closed', 'Rating', 'Rating-D', '2017-09-13', '2017-09-24', 1),
	(63, 'INC999143', 'Portal screen is for Policy number is not seen. Please provide reason and enabled the same', 'Low', 'Open', 'Policy', 'Policy-C', '2017-09-13', '2017-09-24', 1),
	(64, 'INC999144', 'Portal screen is for claim number is not seen. Please provide reason and enabled the same', 'High', 'In-Progress', 'Claims', 'Claims-B', '2017-09-13', '2017-09-24', 1),
	(65, 'INC999145', 'Portal screen is for Billing number is not seen. Please provide reason and enabled the same', 'Medium', 'Closed', 'Billing', 'Billing-A', '2017-09-13', '2017-09-24', 1),
	(66, 'INC999146', 'Portal screen is for Rating number is not seen. Please provide reason and enabled the same', 'Low', 'Open', 'Rating', 'Rating-D', '2017-09-13', '2017-09-24', 1),
	(67, 'INC999147', 'Portal screen is for Policy number is not seen. Please provide reason and enabled the same', 'High', 'In-Progress', 'Policy', 'Policy-C', '2017-09-13', '2017-09-24', 1),
	(68, 'INC999148', 'Portal screen is for claim number is not seen. Please provide reason and enabled the same', 'Medium', 'Closed', 'Claims', 'Claims-B', '2017-09-15', '2017-09-24', 1),
	(69, 'INC999149', 'Portal screen is for Billing number is not seen. Please provide reason and enabled the same', 'Low', 'Open', 'Billing', 'Billing-A', '2017-09-15', '2017-09-24', 1),
	(70, 'INC999150', 'Portal screen is for Rating number is not seen. Please provide reason and enabled the same', 'Low', 'In-Progress', 'Rating', 'Rating-D', '2017-09-15', '2017-09-24', 1),
	(71, 'INC999151', 'Portal screen is for Policy number is not seen. Please provide reason and enabled the same', 'High', 'Closed', 'Policy', 'Policy-C', '2017-09-15', '2017-09-24', 1),
	(72, 'INC999152', 'Cannot access VSP QA environment in HK at AIAFC 10/F', 'Low', 'Open', 'Claims', 'Claims-B', '2017-09-15', '2017-09-24', 1),
	(73, 'INC999153', 'This service now is opened to handle the case "clean up Reference" Specifically', 'High', 'In-Progress', 'Billing', 'Billing-A', '2017-09-15', '2017-09-24', 1),
	(74, 'INC999154', 'wEBSITE -WEEKLY APP UNABLE LOGIN', 'Medium', 'Closed', 'Rating', 'Rating-D', '2017-09-15', '2017-09-24', 1),
	(76, 'INC999155', 'VDP data and point calculation dont seem to be working', 'Low', 'Open', 'Policy', 'Policy-C', '2017-09-15', '2017-09-25', 1),
	(77, 'INC999156', 'Property for VMMP Admin Portal in PUAT(melaiqlwas84) environment is incorrectly copied from PSIT,  it has an extra  \'rest \' in the value', 'High', 'In-Progress', 'Claims', 'Claims-B', '2017-09-15', '2017-09-25', 1),
	(78, 'INC999157', 'Need SSL certificate', 'Medium', 'Closed', 'Billing', 'Billing-A', '2017-09-15', '2017-09-25', 1),
	(79, 'INC999158', 'Association type field mandatory and one claim must be a primary ', 'Low', 'Open', 'Rating', 'Rating-D', '2017-09-15', '2017-09-25', 1),
	(80, 'INC999159', 'Change  \'Closed \' date format to DD/MM/YYYY on Summary screen', 'High', 'In-Progress', 'Policy', 'Policy-C', '2017-09-15', '2017-09-25', 1),
	(81, 'INC999160', 'File Intervention - change due date for Property to 25 days  ', 'Medium', 'Closed', 'Claims', 'Claims-B', '2017-09-15', '2017-09-25', 1),
	(82, 'INC999161', 'Problem with link to Adjustor Nam', 'Low', 'Open', 'Billing', 'Billing-A', '2017-09-15', '2017-09-25', 1),
	(83, 'INC999162', 'ERROR A AC0190 219 ATTEMPTED OPEN OF SS&O ALREADY OPEN ON B1B34977-C02', 'High', 'In-Progress', 'Rating', 'Rating-D', '2017-09-15', '2017-09-25', 1),
	(84, 'INC999163', '180 Day ISO Resend rule not working', 'Medium', 'Closed', 'Policy', 'Policy-C', '2017-09-15', '2017-09-25', 1),
	(85, 'INC999164', 'Manually reassigned claim exposures not assigning correctly', 'Low', 'Open', 'Claims', 'Claims-B', '2017-09-15', '2017-09-25', 1),
	(86, 'INC999165', 'Admin Payment Approval Escalation Modification', 'High', 'In-Progress', 'Billing', 'Billing-A', '2017-09-15', '2017-09-25', 1),
	(87, 'INC999166', 'Quick Claim Activities Misfiring', 'Medium', 'Closed', 'Rating', 'Rating-D', '2017-09-15', '2017-09-25', 1),
	(88, 'INC999167', 'Injury Severity Activity Misassigning *Moved 64841*', 'Low', 'Open', 'Policy', 'Policy-C', '2017-09-15', '2017-09-25', 1),
	(89, 'INC999168', 'Claims - Activity and Payment Escalation misassigning for Corp Consultants *Moved Ticket - 64855*', 'High', 'In-Progress', 'Claims', 'Claims-B', '2017-09-15', '2017-09-25', 1),
	(90, 'INC999169', 'Unable to Close WC Claim due to errors', 'Medium', 'Closed', 'Billing', 'Billing-A', '2017-09-15', '2017-09-25', 1),
	(91, 'INC999170', 'user is receiving error message when trying to update exposure screen', 'Low', 'Open', 'Rating', 'Rating-D', '2017-09-15', '2017-09-25', 1),
	(92, 'INC999171', 'Allegient Payment Submitted Before Approval', 'High', 'In-Progress', 'Policy', 'Policy-C', '2017-09-15', '2017-09-25', 1),
	(93, 'INC999172', 'Date Reported to MSA / Agent', 'Medium', 'Closed', 'Claims', 'Claims-B', '2017-09-15', '2017-09-25', 1),
	(94, 'INC999173', 'Main Contact role not updating when  \'Same as reporter \' - FNOL *Moved Ticket - 56655*', 'Low', 'Open', 'Claims', 'Claims-C', '2017-09-15', '2017-09-25', 1),
	(95, 'INC999174', 'Review Claim Activity - *Moved Ticket - 55496*', 'High', 'In-Progress', 'Policy', 'Policy-A', '2017-09-15', '2017-09-25', 1),
	(96, 'INC999175', 'ISO Match reports to stop after claim is closed and re-index if claim is re-opened', 'Medium', 'Closed', 'Rating', 'Rating-B', '2017-09-15', '2017-09-25', 1),
	(97, 'INC999176', 'New Document Window Pane Not Disappearing', 'Low', 'Open', 'Billing', 'Billing-D', '2017-09-15', '2017-09-25', 1),
	(98, 'INC999177', 'Original policy inception date after effective date of policy', 'High', 'In-Progress', 'Claims', 'Claims-C', '2017-09-15', '2017-09-25', 1),
	(99, 'INC999178', 'GWConfigurationException in FNOL Snapshot - Exposures *Moved Ticket - 48132*', 'Medium', 'Closed', 'Policy', 'Policy-A', '2017-09-15', '2017-09-25', 1),
	(100, 'INC999179', 'Business Rule VATR033 Not Working Properly', 'Low', 'Open', 'Rating', 'Rating-B', '2017-09-15', '2017-09-25', 1),
	(101, 'INC999180', '“Pending Approval” check and user edits the check', 'High', 'In-Progress', 'Billing', 'Billing-D', '2017-09-15', '2017-09-25', 1),
	(102, 'INC999181', 'IndexOutOfBoundsException / IllegalStateException', 'Medium', 'Closed', 'Claims', 'Claims-C', '2017-09-15', '2017-09-25', 1),
	(103, 'INC999182', 'Alligient Payment escalations not working properly', 'Low', 'Open', 'Policy', 'Policy-A', '2017-09-15', '2017-09-25', 1),
	(104, 'INC999183', 'Preferred Vendor Admin Role to delete multiple vendors', 'High', 'In-Progress', 'Rating', 'Rating-B', '2017-09-15', '2017-09-25', 1),
	(105, 'INC999184', 'Incorrect assignment GUID from Innovation', 'Medium', 'Closed', 'Billing', 'Billing-D', '2017-09-15', '2017-09-25', 1),
	(106, 'INC999185', 'ISO not sending on Property claims as of 7/21/11 deploy', 'Low', 'Open', 'Claims', 'Claims-C', '2017-09-15', '2017-09-25', 1),
	(107, 'INC999186', 'Script Run to Close Claim', 'High', 'In-Progress', 'Policy', 'Policy-A', '2017-09-15', '2017-09-25', 1),
	(108, 'INC999187', 'Hard Validation Loop - Unverified Claims', 'Medium', 'Closed', 'Rating', 'Rating-B', '2017-09-15', '2017-09-25', 1),
	(109, 'INC999188', 'Manual Checks not properly escalating for payment approval', 'Low', 'Open', 'Billing', 'Billing-D', '2017-09-15', '2017-09-25', 1),
	(110, 'INC999189', ' Change description for Exposure Loss Cause codes  ', 'High', 'In-Progress', 'Claims', 'Claims-C', '2017-09-15', '2017-09-25', 1),
	(111, 'INC999190', ' Nova Scotia Auto Reform ', 'Medium', 'Closed', 'Policy', 'Policy-A', '2017-09-15', '2017-09-25', 1),
	(112, 'INC999191', ' Update exposure loss cause edit to include MP608 with COL  \'LU \'', 'Low', 'Open', 'Rating', 'Rating-B', '2017-09-15', '2017-09-25', 1),
	(113, 'INC999192', ' Activity not showing the Approval/Reject button when a specific user reviews it', 'High', 'In-Progress', 'Billing', 'Billing-D', '2017-09-15', '2017-09-26', 1),
	(114, 'INC999193', ' Missing Vehicle Incident error on a Property Exposure (production fix)', 'Medium', 'Closed', 'Claims', 'Claims-C', '2017-09-15', '2017-09-26', 1),
	(115, 'INC999194', ' Fix error message  \'Invalid License \' to indicate the Party (1st or 3rd)', 'Low', 'Open', 'Policy', 'Policy-A', '2017-09-15', '2017-09-26', 1),
	(116, 'INC999195', 'Activity Pattern - Reserve Adequacy ensure generated as long as exposure is open', 'High', 'In-Progress', 'Rating', 'Rating-B', '2017-09-15', '2017-09-26', 1),
	(117, 'INC999196', 'Review Exposure Loss Cause validation', 'Medium', 'Closed', 'Billing', 'Billing-D', '2017-09-15', '2017-09-26', 1),
	(118, 'INC999197', 'Changes to Broker information is not being updated on the claim ', 'Low', 'Open', 'Claims', 'Claims-C', '2017-09-15', '2017-09-26', 1),
	(119, 'INC999198', 'Review activity – Large Loss Claim', 'High', 'In-Progress', 'Policy', 'Policy-A', '2017-09-15', '2017-09-26', 1),
	(120, 'INC999199', 'Work wrap for the  \'Claimant \' field and Desktop/Claims view.', 'Medium', 'Closed', 'Rating', 'Rating-B', '2017-09-15', '2017-09-26', 1),
	(121, 'INC999200', 'Exposure limit notice to P. Lundy - PR1063468', 'Low', 'Open', 'Billing', 'Billing-D', '2017-09-15', '2017-09-26', 1),
	(122, 'INC999201', 'Recovery Category field protected', 'High', 'In-Progress', 'Claims', 'Claims-C', '2017-09-15', '2017-09-26', 1),
	(123, 'INC999202', 'File Intervention Activity fix ', 'Medium', 'Closed', 'Policy', 'Policy-A', '2017-09-15', '2017-09-26', 1),
	(124, 'INC999203', 'Claims showing loss province/state as ‘90’ instead of ‘US’', 'Low', 'Open', 'Rating', 'Rating-B', '2017-09-15', '2017-09-26', 1),
	(125, 'INC999204', 'Incorrect email address loaded into ClaimZcentre', 'High', 'In-Progress', 'Billing', 'Billing-D', '2017-09-15', '2017-09-26', 1),
	(126, 'INC999205', ' Review issue with the Automated activity -  \'No Open Activity on Open Claim \'  ', 'Medium', 'Closed', 'Claims', 'Claims-C', '2017-09-15', '2017-09-26', 1),
	(127, 'INC999206', 'Activity not consistent - Close Claim ', 'Low', 'Open', 'Policy', 'Policy-A', '2017-09-15', '2017-09-26', 1),
	(128, 'INC999207', 'ClaimZcentre does not always navigate to the top of the Summary screen when selecting a claim ', 'High', 'In-Progress', 'Rating', 'Rating-B', '2017-09-15', '2017-09-26', 1),
	(129, 'INC999208', 'Cashback not calculated correctly', 'Medium', 'Closed', 'Billing', 'Billing-D', '2017-09-15', '2017-09-26', 1),
	(130, 'INC999209', 'Interface job failed due to incorrect data sent by Scheme', 'Low', 'Open', 'Claims', 'Claims-C', '2017-09-15', '2017-09-26', 1),
	(131, 'INC999210', 'Interface job failed due to incorrect data sent by Scheme', 'High', 'In-Progress', 'Policy', 'Policy-A', '2017-09-15', '2017-09-26', 1),
	(132, 'INC999211', 'Default terms and conditions not appearing correctly for new accounts', 'Medium', 'Closed', 'Rating', 'Rating-B', '2017-09-15', '2017-09-26', 1),
	(133, 'INC999212', 'Account blocked with incorrect status code', 'Low', 'Open', 'Billing', 'Billing-D', '2017-09-15', '2017-09-26', 1),
	(134, 'INC999213', 'TRLS and DMLS account not in sync', 'High', 'In-Progress', 'Claims', 'Claims-C', '2017-09-15', '2017-09-26', 1),
	(135, 'INC999214', 'Backdated payment reversal issue', 'Medium', 'Closed', 'Policy', 'Policy-A', '2017-09-15', '2017-09-26', 1),
	(136, 'INC999215', 'Finance Charges incorrectly calculated', 'Low', 'Open', 'Rating', 'Rating-B', '2017-09-15', '2017-09-26', 1),
	(137, 'INC999216', 'Letter not received by Customer', 'High', 'In-Progress', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(138, 'INC999217', 'Finance Charges incorrectly calculated', 'Medium', 'Closed', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(139, 'INC999218', 'Account blocked with incorrect status code', 'Low', 'Open', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(140, 'INC999219', 'Default terms and conditions not appearing correctly for new accounts', 'High', 'In-Progress', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(141, 'INC999220', ' [Severe] [started]  Thread Pool Hogging  – vitcoreonline10 on avpvitcore02', 'Medium', 'Closed', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(142, 'INC999221', '[Severe] [started] Failure rate too high - - on - lv.aiavitality.com.hk', 'Low', 'Open', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(143, 'INC999222', '[Warning] [started]  Infrastructure Disk Utilization Warning – Host-Agent on avpfile01', 'High', 'In-Progress', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(144, 'INC999223', '[Severe] [started] Failure rate too high - - on - lv.aiavitality.com.sg', 'Medium', 'Closed', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(145, 'INC999224', 'Due to an existing bug plastic is not issued when the plastic is requested for Main card holder and associated Auth user on the same day', 'Low', 'Open', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(146, 'INC999225', 'Due to an existing bug plastic is not issued when the plastic is requested for Main card holder and associated Auth user on the same day', 'High', 'In-Progress', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(147, 'INC999226', 'Account went Out of Balance due to Number of posted transactions is beyond permissible daily limit', 'Medium', 'Open', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(148, 'INC999227', 'Due to the incorrect parameter set up, BT is posted on incorrect Promo', 'Low', 'Closed', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(149, 'INC999228', 'The Payment Posted Summary and Payment Reject summary Report is not matching with the Consolidated payment summary report', 'High', 'In-Progress', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(150, 'INC999229', 'Invalid data was populated during the portfolio migration which resulted the job to failed. The incorrect value is corrected.', 'Medium', 'Open', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(151, 'INC999230', 'Due to Incorrect Bank Sort code account combination, DD set is not set up correctly', 'Low', 'Closed', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(152, 'INC999231', 'Due to an inherent issue with Letter CICS region, letter was not generated for the customer.', 'High', 'In-Progress', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(153, 'INC999232', 'Incorrect trailer count sent from AMEX for the rejected dispute file.', 'Medium', 'Open', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(154, 'INC999233', 'Due to the code issue, reward points are not correctly accumulated', 'Low', 'Closed', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(155, 'INC999234', 'Due to the incorrect parameter set up, T&C is not appearing correctly', 'High', 'In-Progress', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(156, 'INC999235', 'Due to an existing bug plastic is not issued when the plastic is requested for Main card holder and associated Auth user on the same day', 'Medium', 'Open', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(157, 'INC999236', 'Due to an existing bug plastic is not issued when the plastic is requested for Main card holder and associated Auth user on the same day', 'Low', 'Closed', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(158, 'INC999237', 'Account went Out of Balance due to Number of posted transactions is beyond permissible daily limit', 'High', 'In-Progress', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(159, 'INC999238', 'Account went Out of Balance due to Number of posted transactions is beyond permissible daily limit', 'Medium', 'Open', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(160, 'INC999239', 'Due to the code issue, reward points are not correctly accumulated', 'Low', 'Closed', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(161, 'INC999240', 'Due to the code issue, reward points are not correctly accumulated', 'High', 'In-Progress', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(162, 'INC999241', 'Due to the code issue, reward points are not correctly accumulated', 'Medium', 'Open', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(163, 'INC999242', 'The backdated payment is not clearing the finance buckets in the correct order', 'Low', 'Closed', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(164, 'INC999243', 'Due to code issue, the cashback is not calculated correctly', 'High', 'In-Progress', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(165, 'INC999244', 'Incorrect trailer count sent from AMEX for the rejected dispute file.', 'Medium', 'Open', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(166, 'INC999245', 'Incorrect trailer count sent from AMEX for the rejected dispute file.', 'Low', 'Closed', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(167, 'INC999246', 'Due to the incorrect parameter set up, T&C is not appearing correctly', 'High', 'In-Progress', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(168, 'INC999247', 'The user has blocked the card with incorrect status code', 'Medium', 'Open', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(169, 'INC999248', 'Due to an issue at DMLS end. The account status is not correctly updated. DADJ applied to correct the account.', 'Low', 'Closed', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(170, 'INC999249', 'The backdated payment is not clearing the finance buckets in the correct order', 'High', 'In-Progress', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(171, 'INC999250', 'Due to the wrong FC1 option being set up, Finance charges incorrectly calculated', 'Medium', 'Open', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(172, 'INC999251', 'Due to an inherent issue with Letter CICS region, letter was not generated for the customer. ', 'Low', 'Closed', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(173, 'INC999252', 'Vitality Daily Data Missing since May 19', 'High', 'In-Progress', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(174, 'INC999253', 'Vitality App - Signup Error since SMS Verification ', 'Medium', 'Open', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(175, 'INC999254', 'Missing Data on June 16th - FTP', 'Low', 'Closed', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(176, 'INC999255', 'Vitality App - QR Code not Registered ', 'High', 'In-Progress', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(177, 'INC999256', 'Source Discovery database- unable to extract data from Wellness Attribute table', 'Medium', 'Open', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(178, 'INC999257', 'Issue in File Movement Report--Myer Voucher Request ', 'Low', 'Closed', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(179, 'INC999258', 'Request for Strava Data Extract ', 'High', 'In-Progress', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(180, 'INC999259', 'Members receiving 999 errors and slow loading on Vitality App', 'Medium', 'Open', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(181, 'INC999260', 'Member \'s Fitness First cashback utilisation not visible. Member # 1000146613', 'Low', 'Closed', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(182, 'INC999261', 'Request for a copy of Fitness First maintenance file', 'High', 'In-Progress', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(183, 'INC999262', 'Inconsistencies in the data recorded for Garmin device', 'Medium', 'Open', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(184, 'INC999263', '5505747179 can not be added as friend with ServcieUnavailable pop up. There are more people who can not be added as friends', 'Low', 'Closed', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(185, 'INC999264', 'When trying to add Friends, we have error message as attached. ', 'High', 'Closed', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(186, 'INC999265', 'Group owner can not add group member once onwer delete the member', 'Medium', 'Open', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(187, 'INC999266', 'Fitbit lync error and error meesage ', 'Low', 'In-Progress', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(188, 'INC999267', 'When look up User in Admin website, this web page  do not support KR chracter', 'High', 'Closed', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(189, 'INC999268', 'App slowness in KR market (Landing page and Barcode) ', 'Medium', 'Open', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(190, 'INC999269', 'Vitality sFTP server is not responding with error', 'Low', 'In-Progress', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(191, 'INC999270', 'Diasble Paris Baguette till DG issue is solved', 'High', 'Closed', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(192, 'INC999271', ' "Network is disconnected " error message thour network is connected', 'Medium', 'Open', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1),
	(193, 'INC999272', 'Network connection error when trying to connect Fitbit', 'Low', 'In-Progress', 'Billing', 'Billing-D', '2017-09-17', '2017-09-26', 1),
	(194, 'INC999273', 'https://10.48.60.123/aia_va/admin/login  is not functioning', 'High', 'Closed', 'Claims', 'Claims-C', '2017-09-17', '2017-09-26', 1),
	(195, 'INC999274', 'Due to the wrong FC1 option being set up, Finance charges incorrectly calculated', 'Medium', 'Open', 'Policy', 'Policy-A', '2017-09-17', '2017-09-26', 1),
	(196, 'INC999275', 'The user has blocked the card with incorrect status code', 'Low', 'In-Progress', 'Rating', 'Rating-B', '2017-09-17', '2017-09-26', 1);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;

-- Dumping structure for table kedb.ticket_category
CREATE TABLE IF NOT EXISTS `ticket_category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `category_description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.ticket_category: ~4 rows (approximately)
/*!40000 ALTER TABLE `ticket_category` DISABLE KEYS */;
INSERT INTO `ticket_category` (`category_id`, `category_name`, `category_description`) VALUES
	(1, 'Claims', 'claims guideware'),
	(2, 'Policy', 'policy guideware'),
	(3, 'Billings', 'Billings guideware'),
	(4, 'Rating', 'Rating guideware');
/*!40000 ALTER TABLE `ticket_category` ENABLE KEYS */;

-- Dumping structure for table kedb.ticket_severity
CREATE TABLE IF NOT EXISTS `ticket_severity` (
  `severity_name` varchar(50) NOT NULL,
  PRIMARY KEY (`severity_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.ticket_severity: ~2 rows (approximately)
/*!40000 ALTER TABLE `ticket_severity` DISABLE KEYS */;
INSERT INTO `ticket_severity` (`severity_name`) VALUES
	('High'),
	('Low'),
	('Medium');
/*!40000 ALTER TABLE `ticket_severity` ENABLE KEYS */;

-- Dumping structure for table kedb.ticket_status
CREATE TABLE IF NOT EXISTS `ticket_status` (
  `ticket_status_name` varchar(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ticket_status_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.ticket_status: ~3 rows (approximately)
/*!40000 ALTER TABLE `ticket_status` DISABLE KEYS */;
INSERT INTO `ticket_status` (`ticket_status_name`) VALUES
	('Closed'),
	('In-Progress'),
	('Open');
/*!40000 ALTER TABLE `ticket_status` ENABLE KEYS */;

-- Dumping structure for table kedb.ticket_subcategory
CREATE TABLE IF NOT EXISTS `ticket_subcategory` (
  `subcategory_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subcategory_name` varchar(50) NOT NULL DEFAULT '0',
  `subcategory_description` varchar(50) DEFAULT '0',
  PRIMARY KEY (`subcategory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.ticket_subcategory: ~0 rows (approximately)
/*!40000 ALTER TABLE `ticket_subcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_subcategory` ENABLE KEYS */;

-- Dumping structure for table kedb.user_profile
CREATE TABLE IF NOT EXISTS `user_profile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table kedb.user_profile: ~3 rows (approximately)
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` (`id`, `type`) VALUES
	(2, 'ADMIN'),
	(3, 'DBA'),
	(1, 'USER');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
