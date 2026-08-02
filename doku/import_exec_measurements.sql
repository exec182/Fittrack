START TRANSACTION;

SET @user_id := (
    SELECT id
    FROM `user`
    WHERE nick = 'exec'
    LIMIT 1
);

INSERT INTO `messuretype` (`messurement`, `unit`)
SELECT 'Gewicht', 'kg'
WHERE NOT EXISTS (
    SELECT 1 FROM `messuretype` WHERE LOWER(TRIM(`messurement`)) = 'gewicht'
);

INSERT INTO `messuretype` (`messurement`, `unit`)
SELECT 'Brustumfang', 'cm'
WHERE NOT EXISTS (
    SELECT 1 FROM `messuretype` WHERE LOWER(TRIM(`messurement`)) = 'brustumfang'
);

INSERT INTO `messuretype` (`messurement`, `unit`)
SELECT 'Bauchumfang', 'cm'
WHERE NOT EXISTS (
    SELECT 1 FROM `messuretype` WHERE LOWER(TRIM(`messurement`)) = 'bauchumfang'
);

INSERT INTO `messuretype` (`messurement`, `unit`)
SELECT 'Bundumfang', 'cm'
WHERE NOT EXISTS (
    SELECT 1 FROM `messuretype` WHERE LOWER(TRIM(`messurement`)) = 'bundumfang'
);

INSERT INTO `messuretype` (`messurement`, `unit`)
SELECT 'Poumfang', 'cm'
WHERE NOT EXISTS (
    SELECT 1 FROM `messuretype` WHERE LOWER(TRIM(`messurement`)) = 'poumfang'
);

SET @type_gewicht := (
    SELECT id FROM `messuretype`
    WHERE LOWER(TRIM(`messurement`)) = 'gewicht'
    ORDER BY id ASC
    LIMIT 1
);
SET @type_brust := (
    SELECT id FROM `messuretype`
    WHERE LOWER(TRIM(`messurement`)) = 'brustumfang'
    ORDER BY id ASC
    LIMIT 1
);
SET @type_bauch := (
    SELECT id FROM `messuretype`
    WHERE LOWER(TRIM(`messurement`)) = 'bauchumfang'
    ORDER BY id ASC
    LIMIT 1
);
SET @type_bund := (
    SELECT id FROM `messuretype`
    WHERE LOWER(TRIM(`messurement`)) = 'bundumfang'
    ORDER BY id ASC
    LIMIT 1
);
SET @type_po := (
    SELECT id FROM `messuretype`
    WHERE LOWER(TRIM(`messurement`)) = 'poumfang'
    ORDER BY id ASC
    LIMIT 1
);

DELETE mv
FROM `messurevalue` mv
JOIN `messure` m ON m.id = mv.`messure-id`
WHERE m.`user-id` = @user_id
  AND DATE(m.`datetime`) BETWEEN '2026-06-14' AND '2026-07-31';

DELETE FROM `messure`
WHERE `user-id` = @user_id
  AND DATE(`datetime`) BETWEEN '2026-06-14' AND '2026-07-31';

CREATE TEMPORARY TABLE tmp_exec_import (
    mdate DATE NOT NULL,
    gewicht DOUBLE NOT NULL,
    brustumfang DOUBLE NOT NULL,
    bauchumfang DOUBLE NOT NULL,
    bundumfang DOUBLE NOT NULL,
    poumfang DOUBLE NOT NULL
);

INSERT INTO tmp_exec_import (mdate, gewicht, brustumfang, bauchumfang, bundumfang, poumfang) VALUES
('2026-06-14', 118.0, 118.2, 119.4, 119.3, 120.5),
('2026-06-16', 117.6, 117.5, 116.6, 112.6, 120.3),
('2026-06-18', 115.7, 115.5, 117.2, 115.3, 116.8),
('2026-06-19', 115.6, 116.6, 118.3, 110.7, 119.2),
('2026-06-20', 115.5, 116.0, 116.8, 109.7, 117.3),
('2026-06-21', 115.3, 115.9, 114.8, 113.6, 116.7),
('2026-06-22', 115.2, 115.3, 114.1, 110.0, 116.5),
('2026-06-23', 114.9, 115.0, 113.7, 111.1, 114.7),
('2026-06-24', 114.6, 113.6, 117.1, 110.6, 116.7),
('2026-06-25', 114.0, 115.1, 117.6, 108.7, 115.6),
('2026-06-26', 113.3, 114.3, 116.6, 120.0, 116.1),
('2026-06-27', 113.0, 114.3, 116.1, 107.9, 114.6),
('2026-06-28', 112.7, 112.4, 116.4, 110.6, 115.1),
('2026-06-29', 112.8, 113.8, 116.2, 111.7, 114.5),
('2026-06-30', 112.5, 113.5, 116.1, 112.5, 114.8),
('2026-07-01', 112.4, 112.4, 111.9, 110.1, 114.5),
('2026-07-02', 111.7, 110.6, 113.9, 109.5, 113.4),
('2026-07-03', 111.4, 110.7, 111.7, 110.1, 113.5),
('2026-07-04', 110.7, 111.9, 110.6, 106.6, 113.5),
('2026-07-05', 110.9, 111.5, 110.8, 109.4, 113.2),
('2026-07-06', 111.8, 112.7, 111.2, 107.3, 109.9),
('2026-07-07', 110.8, 109.6, 110.1, 108.4, 112.4),
('2026-07-08', 110.4, 108.8, 110.0, 107.0, 111.6),
('2026-07-09', 110.2, 110.7, 108.8, 108.8, 112.8),
('2026-07-10', 109.4, 112.8, 110.2, 107.0, 112.4),
('2026-07-11', 109.3, 110.8, 109.9, 107.7, 112.4),
('2026-07-12', 108.9, 112.1, 109.0, 108.2, 111.2),
('2026-07-13', 109.2, 110.0, 111.4, 107.6, 111.1),
('2026-07-14', 109.2, 110.2, 111.7, 107.7, 111.0),
('2026-07-15', 109.0, 108.8, 108.7, 106.3, 111.9),
('2026-07-16', 107.9, 108.6, 108.0, 107.7, 111.7),
('2026-07-17', 107.7, 110.1, 109.7, 105.2, 111.7),
('2026-07-18', 107.7, 109.5, 109.3, 106.8, 111.3),
('2026-07-19', 108.1, 108.8, 108.8, 108.4, 110.8),
('2026-07-20', 107.9, 108.6, 108.8, 107.6, 111.4),
('2026-07-21', 107.2, 108.3, 108.8, 106.7, 112.0),
('2026-07-22', 106.8, 108.5, 109.7, 105.2, 110.5),
('2026-07-23', 106.4, 108.3, 109.0, 105.8, 110.8),
('2026-07-24', 106.1, 108.0, 108.3, 106.3, 111.1),
('2026-07-25', 105.8, 109.4, 104.5, 105.8, 109.8),
('2026-07-26', 105.5, 108.4, 104.1, 105.8, 110.2),
('2026-07-27', 105.8, 107.4, 103.6, 105.8, 110.5),
('2026-07-28', 105.8, 107.8, 105.5, 105.7, 110.7),
('2026-07-29', 105.7, 107.6, 103.8, 104.1, 111.4),
('2026-07-30', 105.0, 107.0, 103.0, 104.2, 108.9),
('2026-07-31', 104.5, 107.0, 103.0, 104.2, 108.9);

INSERT INTO `messure` (`user-id`, `datetime`, `notes`, `official`)
SELECT
    @user_id,
    CONCAT(mdate, ' 05:00:00'),
    'Import fuer exec (2026-06-14 bis 2026-07-31)',
    b'1'
FROM tmp_exec_import
ORDER BY mdate;

INSERT INTO `messurevalue` (`messure-id`, `type-id`, `value`)
SELECT m.id, @type_gewicht, t.gewicht
FROM tmp_exec_import t
JOIN `messure` m
    ON m.`user-id` = @user_id
 AND m.`datetime` = CONCAT(t.mdate, ' 05:00:00');

INSERT INTO `messurevalue` (`messure-id`, `type-id`, `value`)
SELECT m.id, @type_brust, t.brustumfang
FROM tmp_exec_import t
JOIN `messure` m
    ON m.`user-id` = @user_id
 AND m.`datetime` = CONCAT(t.mdate, ' 05:00:00');

INSERT INTO `messurevalue` (`messure-id`, `type-id`, `value`)
SELECT m.id, @type_bauch, t.bauchumfang
FROM tmp_exec_import t
JOIN `messure` m
    ON m.`user-id` = @user_id
 AND m.`datetime` = CONCAT(t.mdate, ' 05:00:00');

INSERT INTO `messurevalue` (`messure-id`, `type-id`, `value`)
SELECT m.id, @type_bund, t.bundumfang
FROM tmp_exec_import t
JOIN `messure` m
    ON m.`user-id` = @user_id
 AND m.`datetime` = CONCAT(t.mdate, ' 05:00:00');

INSERT INTO `messurevalue` (`messure-id`, `type-id`, `value`)
SELECT m.id, @type_po, t.poumfang
FROM tmp_exec_import t
JOIN `messure` m
    ON m.`user-id` = @user_id
 AND m.`datetime` = CONCAT(t.mdate, ' 05:00:00');

DROP TEMPORARY TABLE IF EXISTS tmp_exec_import;

COMMIT;

SELECT
    u.nick,
    COUNT(DISTINCT m.id) AS measurement_days,
    COUNT(mv.id) AS measurement_values,
    MIN(m.datetime) AS first_measurement,
    MAX(m.datetime) AS last_measurement
FROM `user` u
LEFT JOIN `messure` m ON m.`user-id` = u.id
LEFT JOIN `messurevalue` mv ON mv.`messure-id` = m.id
WHERE u.nick = 'exec'
  AND DATE(m.`datetime`) BETWEEN '2026-06-14' AND '2026-07-31'
GROUP BY u.nick;
