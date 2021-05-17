CREATE TABLE `Players` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `icon_id` int,
  `cardset_id` int,
  `username` varchar(32),
  `email` varchar(32),
  `password` varchar(64) COMMENT 'SHA256 hash',
  `registration_date` datetime DEFAULT NOW(),
  `last_login` datetime,
  `active` boolean COMMENT 'Check if account is active after registration',
  `music` boolean,
  `sounds` boolean
);

CREATE TABLE `GameOccurrences` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `player_id` int,
  `game_id` int,
  `points` integer,
  `completion_time` integer COMMENT 'In seconds',
  `moves` text COMMENT 'Format currently not specified',
  `starting_distribution` text,
  `is_win` boolean
);

CREATE TABLE `Games` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `date_started` datetime,
  `date_ended` datetime
);

CREATE TABLE `CardSets` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(32) COMMENT 'It might be src prefix but idk'
);

CREATE TABLE `Icons` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `src` varchar(255) COMMENT 'I assume that icons will be custom'
);

ALTER TABLE `Players` ADD FOREIGN KEY (`cardset_id`) REFERENCES `CardSets` (`id`);

ALTER TABLE `Players` ADD FOREIGN KEY (`icon_id`) REFERENCES `Icons` (`id`);

ALTER TABLE `GameOccurrences` ADD FOREIGN KEY (`player_id`) REFERENCES `Players` (`id`);

ALTER TABLE `GameOccurrences` ADD FOREIGN KEY (`game_id`) REFERENCES `Games` (`id`);
