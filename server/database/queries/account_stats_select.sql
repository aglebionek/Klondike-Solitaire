SELECT SUM(gameoccurrences.is_win) AS wins, SUM(gameoccurrences.is_lose) AS losses, SUM(gameoccurrences.is_draw) AS draws,
SUM(gameoccurrences.points) as totalPoints,SUM(gameoccurrences.completion_time) as totalTime
FROM gameoccurrences 
GROUP BY player_id
having player_id = ?

