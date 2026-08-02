SELECT
  SUM(CASE WHEN achieved IS NULL THEN 1 ELSE 0 END) AS achieved_null,
  SUM(CASE WHEN rewardedat IS NULL THEN 1 ELSE 0 END) AS rewardedat_null,
  SUM(CASE WHEN rewardedwith IS NULL THEN 1 ELSE 0 END) AS rewardedwith_null
FROM goals g
JOIN `user` u ON u.id = g.`user-id`
WHERE u.nick = 'exec';
