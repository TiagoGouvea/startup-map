-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 23, 2017 at 01:04 PM
-- Server version: 5.6.36-82.1-log
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `neopange_start`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(9) NOT NULL,
  `id_eventbrite` varchar(15) NOT NULL,
  `title` varchar(200) NOT NULL,
  `created` int(14) NOT NULL,
  `organizer_name` varchar(100) NOT NULL,
  `uri` varchar(200) NOT NULL,
  `start_date` int(14) NOT NULL,
  `end_date` int(14) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `address` varchar(200) NOT NULL,
  `owner_email` varchar(100) DEFAULT NULL,
  `owner_name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `approved` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` int(9) NOT NULL,
  `approved` int(1) DEFAULT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `address` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `uri` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sector` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `owner_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `owner_email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sg_organization_id` int(9) NOT NULL,
  `active` int(11) DEFAULT NULL,
  `start_date` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `end_date` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_ready` int(11) DEFAULT NULL,
  `have_revenue` int(11) DEFAULT NULL,
  `employees` int(11) DEFAULT NULL,
  `investment_received` int(11) DEFAULT NULL,
  `dedicationTime` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `startupDescription` text COLLATE utf8_unicode_ci,
  `projectStage` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `whyIsInovating` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `businessType` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `businessPlan` text COLLATE utf8_unicode_ci,
  `hasMVP` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hasBusinessPlan` tinyint(1) DEFAULT NULL,
  `internationalizable` tinyint(1) DEFAULT NULL,
  `multilanguage` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currentInterest` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bigDifficulties` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `taxation` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profit` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qttEmployees` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gatheringInvestments` tinyint(1) DEFAULT NULL,
  `desiredValue` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `desiredAction` text COLLATE utf8_unicode_ci,
  `percentageWantToOffer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeToRefund` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `members` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `membersGraduation` text COLLATE utf8_unicode_ci,
  `membersOccupation` text COLLATE utf8_unicode_ci,
  `cep` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `number` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `neighborhood` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `complement` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `monthlyProfit` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `monthlyBilling` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `monthlySalaryPayment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `monthlyCosts` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=294;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
