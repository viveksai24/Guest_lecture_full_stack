-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 08:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `guest_lecture`
--

-- --------------------------------------------------------

--
-- Table structure for table `event_dep`
--

CREATE TABLE `event_dep` (
  `id` int(11) NOT NULL,
  `EventID` int(11) DEFAULT NULL,
  `dept` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `event_dep`
--

INSERT INTO `event_dep` (`id`, `EventID`, `dept`) VALUES
(1, 6001, 'cse'),
(2, 6001, 'ece'),
(3, 6001, 'mech'),
(4, 6018, 'cse'),
(12, 6020, 'me'),
(13, 6020, 'eee'),
(14, 6020, 'ce'),
(15, 6020, 'ai'),
(16, 6021, 'cse'),
(17, 6021, 'me'),
(18, 6021, 'ece'),
(19, 6021, 'eee'),
(20, 6022, 'cse'),
(21, 6022, 'mee'),
(22, 6022, 'ece'),
(23, 6022, 'eee'),
(24, 6022, 'cie');

-- --------------------------------------------------------

--
-- Table structure for table `event_details`
--

CREATE TABLE `event_details` (
  `EventID` int(25) NOT NULL,
  `faculty` varchar(100) DEFAULT NULL,
  `Event_name` varchar(50) DEFAULT NULL,
  `descp` text DEFAULT NULL,
  `guestname` varchar(100) DEFAULT NULL,
  `linkedIN` varchar(100) DEFAULT NULL,
  `guestmail` varchar(50) DEFAULT NULL,
  `guestnum` varchar(20) DEFAULT NULL,
  `mode` varchar(15) DEFAULT NULL,
  `platform` varchar(100) DEFAULT NULL,
  `sdt` datetime DEFAULT NULL,
  `edt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `event_details`
--

INSERT INTO `event_details` (`EventID`, `faculty`, `Event_name`, `descp`, `guestname`, `linkedIN`, `guestmail`, `guestnum`, `mode`, `platform`, `sdt`, `edt`) VALUES
(6001, 'John Doe', ' Introduction to Artificial Intelligence', 'This event provides an overview of artificial intelligence concepts and applications.', 'Sarah Johnson', 'www.linkedin.com/in/sarahjohnson', ' sarah.johnson@example.com', '9848032919', 'Online', ' Zoom', '2023-06-16 07:02:00', '2023-06-16 10:02:00'),
(6018, 'John Doe', 'Computer security', 'adfadsfasdfsa', 'Mark Robber', 'hello', 'mark_robber@gmail.com', '123541523612', NULL, 'hoen', '2023-06-11 01:22:00', '2023-06-11 04:22:00'),
(6020, 'John Doe', 'AI', 'akjfdbaksdjf', 'Mark Robber', 'hello', 'mark_robber@gmail.com', '1234', 'option2', 'AB-3 - 201', '2023-06-07 10:56:00', '2023-06-07 19:56:00'),
(6021, 'John Doe', 'AI', 'asdfghfhjkl', 'Mark Robber', 'hello', 'rajinikanth@jackass.com', '+91 923423745', 'option2', 'MS Teams', '2023-06-07 19:38:00', '2023-06-08 01:39:00'),
(6022, 'John Doe', 'CN', 'asdfghjk', 'asdfghj', 'hello', 'mark_robber@gmail.com', '+91 923423745', 'option1', 'Teams', '2023-06-08 01:00:00', '2023-06-08 06:55:00');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `Username` varchar(40) NOT NULL DEFAULT '',
  `Password` varchar(25) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Role` varchar(25) DEFAULT NULL,
  `Dept` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`Username`, `Password`, `Name`, `Role`, `Dept`) VALUES
('cb.en.u4cse20228', 'pass', 'S Karthik', 'student', 'cse'),
('cb.en.u4cse20229', 'pass', 'K Rama Krishna', 'student', 'cse'),
('cb.en.u4cse20232', 'pass', 'K Vivek Sai', 'student', 'cse'),
('cb.en.u4cse20249', 'pass', 'Prasanth R', 'student', 'cse'),
('cb.en.u4cse20251', 'pass', 'N Roshith', 'student', 'cse'),
('harry_potter@cb.amrita.ed', 'pass', 'Harry Potter', 'teacher', 'eee'),
('john_doe@cb.amrita.edu', 'pass', 'John Doe', 'teacher', 'cse'),
('smith_will@cb.amrita.edu', 'pass', 'Will Smith', 'teacher', 'ece');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event_dep`
--
ALTER TABLE `event_dep`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eventDel_fk` (`EventID`);

--
-- Indexes for table `event_details`
--
ALTER TABLE `event_details`
  ADD PRIMARY KEY (`EventID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event_dep`
--
ALTER TABLE `event_dep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `event_details`
--
ALTER TABLE `event_details`
  MODIFY `EventID` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6023;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event_dep`
--
ALTER TABLE `event_dep`
  ADD CONSTRAINT `eventDel_fk` FOREIGN KEY (`EventID`) REFERENCES `event_details` (`EventID`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_dep_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `event_details` (`EventID`),
  ADD CONSTRAINT `event_fk` FOREIGN KEY (`EventID`) REFERENCES `event_details` (`EventID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
