SELECT 
  gameoccurrences.player_id AS playerId,
  icons.src AS icon,
  players.username AS username,
  IFNULL(SUM(gameoccurrences.is_win), 0) AS wins, 
  IFNULL(SUM(gameoccurrences.is_lose), 0) AS losses, 
  IFNULL(SUM(gameoccurrences.is_draw), 0) AS draws,
  CAST((IFNULL(SUM(gameoccurrences.is_win), 0) + 0.5 * IFNULL(SUM(gameoccurrences.is_lose), 0)) / (IFNULL(SUM(gameoccurrences.is_draw), 0) + 1) AS DECIMAL(6,2)) AS ratio
FROM gameoccurrences
JOIN 
  players
  ON gameoccurrences.player_id = players.id
JOIN
  icons
  ON players.icon_id = icons.id
GROUP BY player_id
ORDER BY ratio DESC
