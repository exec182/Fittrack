-- Goals import for user exec (weight milestones + 2 reward test goals)
SET @user_id := (SELECT id FROM `user` WHERE nick = 'exec' LIMIT 1);
SET @type_weight := (
    SELECT id FROM `messuretype`
    WHERE LOWER(TRIM(messurement)) IN ('gewicht', 'weight', 'bodyweight')
    LIMIT 1
);
SET @type_brust := (
    SELECT id FROM `messuretype`
    WHERE LOWER(TRIM(messurement)) LIKE '%brust%'
    LIMIT 1
);
SET @type_bauch := (
    SELECT id FROM `messuretype`
    WHERE LOWER(TRIM(messurement)) LIKE '%bauch%'
    LIMIT 1
);

DELETE FROM `goals`
WHERE `user-id` = @user_id
  AND `messuretype_id` IN (@type_weight, @type_brust, @type_bauch);

INSERT INTO `goals`
(`user-id`, `messuretype_id`, `messure-value`, `goalname`, `createdat`, `achieved`, `rewardedat`, `rewardedwith`)
VALUES
(@user_id, @type_weight, 118.0, 'Du hast begonnen, lass die Kilos purzeln', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 113.0, '5kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 108.0, '10kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 103.0, '15kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 99.9, 'unter 100kg', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 99.0, 'Halbzeit', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 98.0, '20kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 93.0, '25kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 88.0, '30kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 83.0, '35kg geschaft', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_weight, 80.0, 'Ziel in Sicht', '2026-06-14 05:00:00', NULL, NULL, NULL),
(@user_id, @type_brust, 110.0, 'Brust unter 110', '2026-06-14 05:00:00', '2026-07-24 05:00:00', '2026-07-25 05:00:00', 'Neue Trainingsshirt gekauft'),
(@user_id, @type_bauch, 110.0, 'Bauch unter 110', '2026-06-14 05:00:00', '2026-07-09 05:00:00', '2026-07-10 05:00:00', 'Kinobesuch als Belohnung');

UPDATE `goals` g
SET g.`achieved` = COALESCE(
    (
        SELECT MIN(m.`datetime`)
        FROM `messure` m
        JOIN `messurevalue` mv ON mv.`messure-id` = m.id
        WHERE m.`user-id` = @user_id
          AND m.`official` = b'1'
          AND mv.`type-id` = @type_weight
          AND mv.`value` <= g.`messure-value`
        ),
        NULL
)
WHERE g.`user-id` = @user_id
  AND g.`messuretype_id` = @type_weight;
