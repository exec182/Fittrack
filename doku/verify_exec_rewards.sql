SELECT
  g.`messure-value` AS ziel,
  g.achieved AS erreicht_am,
  g.rewardedat AS belohnt_am,
  g.rewardedwith AS belohnung
FROM `goals` g
JOIN `user` u ON u.id = g.`user-id`
JOIN `messuretype` mt ON mt.id = g.`messuretype_id`
WHERE u.nick = 'exec'
  AND LOWER(TRIM(mt.messurement)) IN ('gewicht', 'weight', 'bodyweight')
  AND g.`messure-value` IN (118.0, 113.0, 108.0)
ORDER BY g.`messure-value` DESC;
