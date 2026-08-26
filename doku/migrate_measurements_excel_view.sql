-- Excel-compatible measurement export: one row per user and calendar day.
-- If a measurement type was recorded more than once on a day, the latest
-- value of that type is exported (ties are resolved by the measurement id).

CREATE OR REPLACE SQL SECURITY INVOKER VIEW `messungen_excel` AS
SELECT
    r.`user_id` AS `Benutzer_ID`,
    r.`nick` AS `Benutzer`,
    r.`Datum`,
    MAX(CASE WHEN r.`messurement_key` = 'gewicht' THEN r.`value` END) AS `Gewicht`,
    MAX(CASE WHEN r.`messurement_key` = 'brustumfang' THEN r.`value` END) AS `Brustumfang`,
    MAX(CASE WHEN r.`messurement_key` = 'bauchumfang' THEN r.`value` END) AS `Bauchumfang`,
    MAX(CASE WHEN r.`messurement_key` = 'bundumfang' THEN r.`value` END) AS `Bundumfang`,
    MAX(CASE WHEN r.`messurement_key` = 'poumfang' THEN r.`value` END) AS `Poumfang`
FROM (
    SELECT
        m.`user-id` AS `user_id`,
        u.`nick`,
        DATE(m.`datetime`) AS `Datum`,
        LOWER(TRIM(mt.`messurement`)) AS `messurement_key`,
        mv.`value`,
        ROW_NUMBER() OVER (
            PARTITION BY
                m.`user-id`,
                DATE(m.`datetime`),
                LOWER(TRIM(mt.`messurement`))
            ORDER BY m.`datetime` DESC, m.`id` DESC, mv.`id` DESC
        ) AS `position_am_tag`
    FROM `messure` AS m
    INNER JOIN `user` AS u
        ON u.`id` = m.`user-id`
    INNER JOIN `messurevalue` AS mv
        ON mv.`messure-id` = m.`id`
    INNER JOIN `messuretype` AS mt
        ON mt.`id` = mv.`type-id`
    WHERE LOWER(TRIM(mt.`messurement`)) IN (
        'gewicht',
        'brustumfang',
        'bauchumfang',
        'bundumfang',
        'poumfang'
    )
) AS r
WHERE r.`position_am_tag` = 1
GROUP BY r.`user_id`, r.`nick`, r.`Datum`;

-- MySQL views do not guarantee row order. Use this for the Excel export:
-- SELECT `Datum`, `Gewicht`, `Brustumfang`, `Bauchumfang`, `Bundumfang`, `Poumfang`
-- FROM `messungen_excel`
-- WHERE `Benutzer_ID` = 2
-- ORDER BY `Datum`;
