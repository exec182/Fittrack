SELECT mt.messurement, COUNT(*) AS cnt, SUM(CASE WHEN g.rewardedwith <> '' THEN 1 ELSE 0 END) AS rewarded_cnt
FROM goals g
JOIN messuretype mt ON mt.id = g.messuretype_id
JOIN `user` u ON u.id = g.`user-id`
WHERE u.nick = 'exec'
GROUP BY mt.messurement
ORDER BY mt.messurement;
