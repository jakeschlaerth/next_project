CREATE DATABASE `portfolio`;

CREATE TABLE `portfolio`.`user` (
  `id` bigint(20) unsigned PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4