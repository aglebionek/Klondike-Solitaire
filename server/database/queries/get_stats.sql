SELECT 
  gameoccurrences.player_id AS playerId,
  icons.src AS icon,
  players.username AS username,
  COUNT(gameoccurrences.is_win) AS wins, 
  COUNT(gameoccurrences.is_lose) AS losses, 
  COUNT(gameoccurrences.is_draw) AS draws,
  CAST((COUNT(gameoccurrences.is_win) + 0.5 * COUNT(gameoccurrences.is_draw)) / (COUNT(gameoccurrences.is_lose) + 1) AS DECIMAL(10,6)) AS ratio
FROM gameoccurrences
JOIN 
  players
  ON gameoccurrences.player_id = players.id
JOIN
  icons
  ON players.icon_id = icons.id
GROUP BY player_id
ORDER BY ratio DESC
