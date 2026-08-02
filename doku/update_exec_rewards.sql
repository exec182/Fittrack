SET @user_id := (SELECT id FROM `user` WHERE nick = 'exec' LIMIT 1);
SET @type_weight := (
  SELECT id FROM `messuretype`
  WHERE LOWER(TRIM(messurement)) IN ('gewicht', 'weight', 'bodyweight')
  LIMIT 1
);

UPDATE `goals`
SET
  `achieved` = '2026-06-14 05:00:00',
  `rewardedat` = '2026-06-17 05:00:00',
  `rewardedwith` = 'Fitnesstracker'
WHERE `user-id` = @user_id
  AND `messuretype_id` = @type_weight
  AND `messure-value` = 118.0;

UPDATE `goals`
SET
  `achieved` = '2026-06-27 05:00:00',
  `rewardedat` = '2026-07-09 05:00:00',
  `rewardedwith` = 'T-Shirt'
WHERE `user-id` = @user_id
  AND `messuretype_id` = @type_weight
  AND `messure-value` = 113.0;

UPDATE `goals`
SET
  `achieved` = '2026-07-16 05:00:00',
  `rewardedat` = '2026-06-17 05:00:00',
  `rewardedwith` = '2x T-Shirts'
WHERE `user-id` = @user_id
  AND `messuretype_id` = @type_weight
  AND `messure-value` = 108.0;
