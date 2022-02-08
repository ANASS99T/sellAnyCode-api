-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2022 at 01:40 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sellanycode`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('12325117-f27d-4cbc-8b9a-740b21de60ab', 'game templates', '2022-01-30 21:51:04', '2022-01-30 21:51:04'),
('3edd4d14-4502-424d-863f-ec708e5a4cef', 'Scripts & code', '2022-01-30 21:57:56', '2022-01-30 21:57:56'),
('4b0f7d34-ba09-4f2a-a16b-402566decac8', 'Graphics', '2022-01-30 21:54:43', '2022-01-30 21:54:43'),
('9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', 'app templates', '2022-01-30 21:51:57', '2022-01-30 21:51:57'),
('d6378f4c-b719-4705-993b-26d32db1315b', 'plugins', '2022-01-30 21:53:14', '2022-01-30 21:53:14'),
('d6d6ced0-b328-470b-be10-8367467015ea', 'Themes', '2022-01-30 21:55:47', '2022-01-30 21:55:47');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `product` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `shortDescription` varchar(90) NOT NULL,
  `description` text NOT NULL,
  `features` text NOT NULL,
  `operatingSystems` varchar(255) DEFAULT NULL,
  `filesIncluded` varchar(255) DEFAULT NULL,
  `supportedCms` varchar(255) DEFAULT NULL,
  `htmlFrameworks` varchar(255) DEFAULT NULL,
  `jsFrameworks` varchar(255) DEFAULT NULL,
  `softwareVersions` varchar(255) DEFAULT NULL,
  `softwareFrameworks` varchar(255) DEFAULT NULL,
  `database` varchar(255) DEFAULT NULL,
  `liveDemo` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `preview` varchar(255) DEFAULT NULL,
  `screenshot1` varchar(255) DEFAULT NULL,
  `screenshot2` varchar(255) DEFAULT NULL,
  `screenshot3` varchar(255) DEFAULT NULL,
  `screenshot4` varchar(255) DEFAULT NULL,
  `screenshot5` varchar(255) DEFAULT NULL,
  `screenshot6` varchar(255) DEFAULT NULL,
  `screenshot7` varchar(255) DEFAULT NULL,
  `screenshot8` varchar(255) DEFAULT NULL,
  `mainZip` varchar(255) DEFAULT NULL,
  `priceSingle` double NOT NULL DEFAULT 0,
  `priceMultiple` double NOT NULL DEFAULT 0,
  `category` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `subcategory` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `likes` int(11) NOT NULL DEFAULT 0,
  `status` text NOT NULL DEFAULT 'new',
  `sales` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `shortDescription`, `description`, `features`, `operatingSystems`, `filesIncluded`, `supportedCms`, `htmlFrameworks`, `jsFrameworks`, `softwareVersions`, `softwareFrameworks`, `database`, `liveDemo`, `icon`, `preview`, `screenshot1`, `screenshot2`, `screenshot3`, `screenshot4`, `screenshot5`, `screenshot6`, `screenshot7`, `screenshot8`, `mainZip`, `priceSingle`, `priceMultiple`, `category`, `subcategory`, `user`, `views`, `likes`, `status`, `sales`, `createdAt`, `updatedAt`) VALUES
('3304e1fb-4d33-4026-b653-61c9471efaad', 'Madeline Gilliam', 'Aut minim error numq', '<p>werwerererwer</p>\r\n', '<p>wewqwqeqwewe qwe qwe qweqw eqwe qwe</p>\r\n', NULL, '.js;.h;.nib;.dex;.unityproj;.ai;.c;.html;.vb;.db;.css;.flv;.cs;.pch;.prefab;.aspx;.fbx;.xml;.epx;.build.setting;.muse;.Layered.psd;.py', NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.rihesewanivif.co.uk', '1643923822760_Screenshot 2022-01-27 162959.png', '1643923822863_PoppySuperAdventureRun_sellanycode_screenshot_1643908193.png', '1643923822901_Screenshot 2022-01-13 231258.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1644081398267_Screenshot 2022-01-27 162959.zip', 100, 300, '12325117-f27d-4cbc-8b9a-740b21de60ab', 'c261b788-ce58-486c-87b1-7cc6b03c7809', 'fe3b4415-7a46-4b13-8e95-d69b6cf3834a', 11, 0, 'new', 0, '2022-02-03 21:30:23', '2022-02-07 22:54:19'),
('79176e12-a5c2-4bb4-8072-f392fb310a21', 'Product Name', 'This is short description for the product', '<p><strong>This </strong> is a description, you can customize it as you want :)</p>\r\n', '<p>you can also add images, imojies, paragraphs and even code if you like</p>\r\n', NULL, '.php;.dex;.c;.sql', NULL, NULL, NULL, NULL, NULL, NULL, 'http://www.google.com', '1644081396032_PoppySuperAdventureRun_sellanycode_screenshot_1643908195.png', '1644081396044_PoppySuperAdventureRun_sellanycode_featured_image_1643908254.png', '1644081396076_Screenshot 2022-01-27 162959.png', '1644081398221_PoppySuperAdventureRun_sellanycode_screenshot_1643908193.png', NULL, NULL, NULL, NULL, NULL, NULL, '1644081398267_Screenshot 2022-01-27 162959.zip', 20, 150, '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '4d15a887-3c71-4bb7-83d1-7a9b08d8e5b4', '3c798676-757e-4193-8dec-87278fb739f9', 45, 0, 'new', 0, '2022-02-05 17:16:38', '2022-02-08 00:34:35'),
('f3fb8fb2-0f0d-4248-91a7-9d4c4744fe0a', 'Thaddeus Burton', 'Proident explicabo', '<p>trrrrrrrrrrrrrrrrrrrrrrrrrrrrr</p>\r\n', '<p>rwwwwwwwwwwwwwwwwww</p>\r\n', NULL, '.sql;.m;.db;.prefab;.less;.csproj;.epx;.muse;.php;.nib;.lua;.rb;.vb;.css;.dat;.java;.aspx;.xib;.fbx;.xml;.cpp', 'Joomla 4.0.x;Joomla 3.7.x;Joomla 3.6.x;Joomla 3.3.x;Joomla 3.1.x;Joomla 3.0.x;WordPress 4.9;WordPress 4.8;WordPress 4.7;WordPress 4.6;WordPress 4.4;WordPress 4.1;WordPress 3.9;WordPress 3.8;Magento 2.0.x;Magento 1.7;Drupal 8.0;Drupal 7.0;osCommerce 3.0.x;', 'Bootstrap;Less;Semantic UI;Skeleton;YAML', 'jQuery;YUI;Node.js', NULL, NULL, NULL, 'https://www.gerozukymapez.ca', '1643924363762_PoppySuperAdventureRun_sellanycode_icon_1643908256.png', '1643924363764_PoppySuperAdventureRun_sellanycode_screenshot_1643908195.png', '1643924363767_PoppySuperAdventureRun_sellanycode_screenshot_1643908195.png', '1643924366021_PoppySuperAdventureRun_sellanycode_screenshot_1643908193.png', '1643924366034_PoppySuperAdventureRun_sellanycode_featured_image_1643908254.png', NULL, NULL, NULL, NULL, NULL, '1644081398267_Screenshot 2022-01-27 162959.zip', 100, 200, '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '4d15a887-3c71-4bb7-83d1-7a9b08d8e5b4', 'fe3b4415-7a46-4b13-8e95-d69b6cf3834a', 262, 5, 'new', 0, '2022-02-03 21:39:26', '2022-02-08 00:32:15');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `product` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `product` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `user`, `product`, `createdAt`, `updatedAt`) VALUES
('fe3b4415-7a46-4b13-8e95-d69b6cf31111', 'fe3b4415-7a46-4b13-8e95-d69b6cf3834a', '3304e1fb-4d33-4026-b653-61c9471efaad', '2022-02-06 21:31:36', '2022-02-06 21:31:36');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `category`, `createdAt`, `updatedAt`) VALUES
('02c001fc-8638-4eeb-930c-f2660fa69568', 'OpenCart Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:39', '2022-01-30 21:56:39'),
('07fe3fe3-5d15-4d0d-95c5-b038138eecb1', 'Shopify Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:21', '2022-01-30 21:56:21'),
('11cd2e38-8441-4032-90ab-8f8d8b5ad5e2', 'nopCommer Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:54:03', '2022-01-30 21:54:03'),
('19a76a59-51a1-4667-a792-0d09cdb6ae58', 'cordova', '12325117-f27d-4cbc-8b9a-740b21de60ab', '2022-01-30 21:51:30', '2022-01-30 21:51:30'),
('1ccbad00-4a59-4fba-bb94-430f267ff669', 'cocos2d', '12325117-f27d-4cbc-8b9a-740b21de60ab', '2022-01-30 21:51:44', '2022-01-30 21:51:44'),
('234d63ca-4362-4eea-b732-4a2d3641c522', 'Drupal Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:57:32', '2022-01-30 21:57:32'),
('23b27957-55a9-4be6-a4be-af66ec8bed3e', 'Magento Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:57:08', '2022-01-30 21:57:08'),
('252102ec-01bb-4e3c-83a1-74b777e785ad', 'Print', '4b0f7d34-ba09-4f2a-a16b-402566decac8', '2022-01-30 21:55:12', '2022-01-30 21:55:12'),
('2562951a-86fb-4115-a717-c5c5410cdc03', 'unity', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:10', '2022-01-30 21:52:10'),
('2fa04348-778d-4a09-bc5f-382aa50747d6', 'construct 2', '12325117-f27d-4cbc-8b9a-740b21de60ab', '2022-01-30 21:51:38', '2022-01-30 21:51:38'),
('3886a262-5c3e-44eb-986d-cc3f228d43b5', 'iOS', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:22', '2022-01-30 21:52:22'),
('3ebb2dd4-3ad6-4770-ae71-6a8b393f3ef2', 'Joomla Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:54:20', '2022-01-30 21:54:20'),
('4150f94a-46d0-4a2e-be52-bc50904fc423', 'Miscellaneous', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:57:03', '2022-01-30 21:57:03'),
('41ee6d35-7e98-44c0-94c2-d7c33f498153', 'PrestaShop Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:27', '2022-01-30 21:56:27'),
('442f64ec-fde9-461d-903b-5b8e3ab54581', 'Muse Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:59', '2022-01-30 21:56:59'),
('4577b675-350a-4493-9297-09681b958824', 'User Interface', '4b0f7d34-ba09-4f2a-a16b-402566decac8', '2022-01-30 21:55:00', '2022-01-30 21:55:00'),
('4830bfc5-6a98-4b9a-908c-8a7794c4357b', 'WordPress Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:00', '2022-01-30 21:56:00'),
('4af39bf1-0d53-42bf-8dbc-18c5c4a8a53d', 'PHP Scripts', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:21', '2022-01-30 21:58:21'),
('4b226f82-3886-4a0c-b7e2-ad090f23f5dd', 'MyDB Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:54', '2022-01-30 21:56:54'),
('4d15a887-3c71-4bb7-83d1-7a9b08d8e5b4', 'titanuim', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:14', '2022-01-30 21:52:14'),
('4d820766-1a0e-46d7-9454-1142b140072a', 'buildbox', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:49', '2022-01-30 21:52:49'),
('4f780af7-5852-4e59-84c8-b769c2617312', 'Java', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:31', '2022-01-30 21:58:31'),
('512468f6-ccd9-4eb2-aae2-1ea831eff61f', 'WordPress Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:53:37', '2022-01-30 21:53:37'),
('539f092c-38ce-45e7-9bef-784fe45a9ebf', 'JavaScript', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:28', '2022-01-30 21:58:28'),
('552b1daf-0347-45d0-b675-042e68fe037b', 'cordova', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:38', '2022-01-30 21:52:38'),
('56727511-ccbb-4d16-bafa-e0a1724471e1', 'react', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:18', '2022-01-30 21:52:18'),
('62023014-bebf-48b4-832e-7a850373ce8a', 'android', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:53:02', '2022-01-30 21:53:02'),
('625b4849-4d72-4b2a-9ae4-7b8131e3d08f', 'construct 2', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:45', '2022-01-30 21:52:45'),
('677a390d-9673-4d39-a4a8-05df2e14931d', 'OpenCart Pluginss', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:54:08', '2022-01-30 21:54:08'),
('68af7b2c-fbf1-4e48-a3be-e632934870f1', 'Drupal Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:54:25', '2022-01-30 21:54:25'),
('6b0d609c-ecde-4703-8af4-5a8ca6b90cd6', 'Logos', '4b0f7d34-ba09-4f2a-a16b-402566decac8', '2022-01-30 21:55:16', '2022-01-30 21:55:16'),
('713d0109-cf56-4048-9d27-a8f97cb48921', 'ionic', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:26', '2022-01-30 21:52:26'),
('75d5d53b-9a3b-4873-9bd1-fd4199cc7ada', 'Texture', '4b0f7d34-ba09-4f2a-a16b-402566decac8', '2022-01-30 21:55:04', '2022-01-30 21:55:04'),
('7bca013f-d499-4ed5-bf20-9948510b9c5c', 'PrestaShop Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:53:48', '2022-01-30 21:53:48'),
('7cc95824-55a1-4694-bc97-c426a32f8b40', 'osClass Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:53:58', '2022-01-30 21:53:58'),
('8067bcff-2612-4f39-9239-3bbb6de21f80', 'X-Cart', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:53:31', '2022-01-30 21:53:31'),
('86be9cfb-0577-43b0-b812-4b8e28f80b81', 'untiy', '12325117-f27d-4cbc-8b9a-740b21de60ab', '2022-01-30 21:51:24', '2022-01-30 21:51:24'),
('8a8afc28-0827-4b18-b162-55ddaafcf6f3', 'Game Assets', '4b0f7d34-ba09-4f2a-a16b-402566decac8', '2022-01-30 21:55:25', '2022-01-30 21:55:25'),
('8e8bf32b-2caf-44b4-a911-d959ba705107', 'WeeCommerce Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:53:42', '2022-01-30 21:53:42'),
('905b2215-aaa1-4436-8faf-84bd3bd44a2b', 'Python', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:16', '2022-01-30 21:58:16'),
('9245caa5-c043-4efe-9dd0-23f62a794bd8', 'Ghost Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:57:25', '2022-01-30 21:57:25'),
('935db868-07f5-4cc9-bfb6-cb9901b0d011', 'Icons', '4b0f7d34-ba09-4f2a-a16b-402566decac8', '2022-01-30 21:55:20', '2022-01-30 21:55:20'),
('97f803e8-cd71-4660-a0c5-a6cc72519d6d', 'HTML Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:57:19', '2022-01-30 21:57:19'),
('a4c966a8-eff8-4520-8648-a6650ffc058a', 'CSS', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:36', '2022-01-30 21:58:36'),
('bbc5cc00-89dd-4e30-8b99-97b4b06f2bf9', 'Other Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:54:35', '2022-01-30 21:54:35'),
('be182ce8-9120-4905-b314-5cc4620ae76a', 'xamrin', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:08', '2022-01-30 21:52:08'),
('c261b788-ce58-486c-87b1-7cc6b03c7809', 'buildbox', '12325117-f27d-4cbc-8b9a-740b21de60ab', '2022-01-30 21:51:48', '2022-01-30 21:51:48'),
('c306538f-cbff-49b4-9796-534e024e735e', 'nopCommerce Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:46', '2022-01-30 21:56:46'),
('c31547a3-19a9-454b-942b-c7a2ce3150cd', 'CS-cart Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:54:29', '2022-01-30 21:54:29'),
('cf754b3f-c029-4c0b-b01f-4549feadf125', 'Megento Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:54:14', '2022-01-30 21:54:14'),
('d2ccff7c-cbe0-48b2-887f-763755e3f758', 'Miscellaneous', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:24', '2022-01-30 21:58:24'),
('da43a1ed-fcbc-4822-93a7-bfa6f3970306', 'corona', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:33', '2022-01-30 21:52:33'),
('db00fc3b-2e28-42d7-9746-55ccd00955af', 'C#', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:42', '2022-01-30 21:58:42'),
('dde387d4-8fa9-47bd-8654-1687259b5df7', 'osClass Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:32', '2022-01-30 21:56:32'),
('dfe64744-d1c7-4f30-9503-d8e66fbd8b4a', 'flutter', '9c58db6a-8f7c-49ab-aeb7-10bdb1260b91', '2022-01-30 21:52:30', '2022-01-30 21:52:30'),
('e70c34a3-3925-4809-a502-be4955bdf0c7', 'Ruby', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:12', '2022-01-30 21:58:12'),
('e873cdf8-0cf6-4f9c-98f1-2b38d7dc9ee5', 'Tumblr Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:16', '2022-01-30 21:56:16'),
('eb04f591-6d00-4a1a-8677-3ddaed1afa35', 'osCommerce Plugins', 'd6378f4c-b719-4705-993b-26d32db1315b', '2022-01-30 21:53:53', '2022-01-30 21:53:53'),
('ecb42c08-546c-4050-b581-018349a77b4e', 'Joomla Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:57:13', '2022-01-30 21:57:13'),
('eccb1eff-8acd-4d6c-9a53-df3daa19a09e', 'C & C++', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:48', '2022-01-30 21:58:48'),
('f477af64-1e5e-4db5-93a3-0d62c8cd89c2', 'Product Mockups', '4b0f7d34-ba09-4f2a-a16b-402566decac8', '2022-01-30 21:55:08', '2022-01-30 21:55:08'),
('f4cb798c-d5ee-4584-b479-af5f2b275e3d', 'VB.NET', '3edd4d14-4502-424d-863f-ec708e5a4cef', '2022-01-30 21:58:05', '2022-01-30 21:58:05'),
('f9b599e1-f1a8-49ea-bcab-5872b592b460', 'Woocommerce Themes', 'd6d6ced0-b328-470b-be10-8367467015ea', '2022-01-30 21:56:09', '2022-01-30 21:56:09');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `reference` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Failed',
  `user` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `product` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `reference`, `type`, `status`, `user`, `product`, `amount`, `createdAt`, `updatedAt`) VALUES
('45a4aa49-1c5e-4574-ab88-e88530354d63', '-', 'Item Purchase', 'failed', 'fe3b4415-7a46-4b13-8e95-d69b6cf3834a', '79176e12-a5c2-4bb4-8072-f392fb310a21', 20, '2022-02-08 00:34:03', '2022-02-08 00:34:03'),
('796ccfec-8087-4060-8570-a30b9af574e9', '-', 'Item Purchase', 'failed', 'fe3b4415-7a46-4b13-8e95-d69b6cf3834a', 'f3fb8fb2-0f0d-4248-91a7-9d4c4744fe0a', 100, '2022-02-08 00:32:20', '2022-02-08 00:32:20'),
('ce71d733-d298-4613-b7f0-b63ad07ee5dd', '-', 'Item Purchase', 'failed', 'fe3b4415-7a46-4b13-8e95-d69b6cf3834a', '79176e12-a5c2-4bb4-8072-f392fb310a21', 20, '2022-02-08 00:34:46', '2022-02-08 00:34:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `paypalEmail` varchar(255) DEFAULT NULL,
  `devloperType` varchar(255) DEFAULT NULL,
  `operatingSystem` varchar(255) DEFAULT NULL,
  `frameworks` varchar(255) DEFAULT NULL,
  `devlopingExperience` varchar(255) DEFAULT NULL,
  `publicContact` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `income` double DEFAULT 0,
  `withdraw` double DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `username`, `email`, `password`, `paypalEmail`, `devloperType`, `operatingSystem`, `frameworks`, `devlopingExperience`, `publicContact`, `avatar`, `income`, `withdraw`, `createdAt`, `updatedAt`) VALUES
('165c319a-b089-4e60-8d53-baca19b9ab70', 'Wong', 'banubyp', 'myvaro@mailinator.com', '$2b$10$oIyrauI3iJJQFNDHJLVnEuyPNv0AklKj6gRw3UA78SSB8Y.VmC2Bi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-01-29 22:11:17', '2022-01-29 22:11:17'),
('3c798676-757e-4193-8dec-87278fb739f9', 'Test User', 'User13', 'admin@gmail.com', '$2b$10$INF07R9OtB/AG8x7gBWwu.AiZNSGXMOlouzpiWskcUHf/i/uTFn26', NULL, 'developement agency', 'iOS;Android', NULL, NULL, NULL, NULL, 0, 0, '2022-02-05 17:12:36', '2022-02-05 17:18:13'),
('47321379-bc22-4f20-b09b-74cff6a4c6c8', 'Richmond', 'tiqaveh', 'nerukygur@mailinator.com', '$2b$10$L2RREHV0V.YVjFh.C7G1Yu/mR6KHB8KVBMII9N4Yvy/YU3hmTVOru', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-01-29 22:11:54', '2022-01-29 22:11:54'),
('56bf21ef-909f-4f03-a7ce-ecebd2f1816a', 'Harper', 'gegirupih', 'jovuho@mailinator.com', '$2b$10$Ne9zi1J.9L6g9LsUv1KTqOgKLUsbFnZgl/iYbf6XsAgIt.iScVRFS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-01-29 22:14:39', '2022-01-29 22:14:39'),
('58a9a25c-45bf-417b-b7cb-401af6f52281', 'Clemons', 'voxydy', 'waly@mailinator.com', '$2b$10$uvwaXLewSwbGHlXnfxLcAO5zpO2wSkR09NuKKlemVvWrXCii0U9I2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-01-29 22:09:53', '2022-01-29 22:09:53'),
('88dfb1c0-7573-4ea7-b032-ef46ff372d87', 'Holcomb', 'kixipov', 'xytefozemy@mailinator.com', '$2b$10$AUrS2LFW9phyvOAZSEj.3uOindUcSpfV1dxW004dvE7Nu/l3d4tPK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-01-29 22:29:54', '2022-01-29 22:29:54'),
('cbdc1bbd-7842-40d7-ac97-f5db0cc5d14f', 'Anass', 'TestTest1', 'test@gmail.com', '$2b$10$XsgqAebC8dapRvkPFBTcZeuuhx15xh2vlDbvJ.Eh8TUNQ6KMM.Jgi', NULL, NULL, 'iOS;Unity', NULL, NULL, NULL, NULL, 0, 0, '2022-02-05 16:36:30', '2022-02-05 16:40:12'),
('d82b3284-0ce9-4169-a3ba-3491145bcac8', 'Head', 'repihyzara', 'nybonudamy@mailinator.com', '$2b$10$pyk4h6r9rCrgNqxf8oFb2.8KNH5wgvFQ3b65Ia4T4WsFJ3mvqtLcG', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-01-29 22:09:05', '2022-01-29 22:09:05'),
('fe3b4415-7a46-4b13-8e95-d69b6cf3834a', 'Anass', 'OAnass1', 'anass.taher@gmail.com', '$2b$10$K29iaqGaIO9VeoD.KoNWuucVzREHtWDoWyW.7gmEdBz/bWuJwx91i', 'anass.taher@gmail.com', 'developement agency', 'iOS;Android', 'Native iOS;Native Android;Cocos2d', 'More than 5 years', 'anass.taher@gmail.com', '1643577716321_1bc9861aefa97aa980f405978fe0bcaf.jpg', 0, 0, '2022-01-29 17:53:35', '2022-01-30 21:21:56');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `product` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `user`, `product`, `createdAt`, `updatedAt`) VALUES
('8fd909de-c833-44c1-9710-94d8db23a860', '3c798676-757e-4193-8dec-87278fb739f9', 'f3fb8fb2-0f0d-4248-91a7-9d4c4744fe0a', '2022-02-05 17:13:48', '2022-02-05 17:13:48'),
('d7892db3-7cdf-42b8-b506-d07be8227b89', 'fe3b4415-7a46-4b13-8e95-d69b6cf3834a', 'f3fb8fb2-0f0d-4248-91a7-9d4c4744fe0a', '2022-02-06 21:43:14', '2022-02-06 21:43:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`),
  ADD KEY `subcategory` (`subcategory`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `product` (`product`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`product`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subcategory`) REFERENCES `subcategories` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product`) REFERENCES `products` (`id`);

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`product`) REFERENCES `products` (`id`);

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`product`) REFERENCES `products` (`id`);

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wishlists_ibfk_2` FOREIGN KEY (`product`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
