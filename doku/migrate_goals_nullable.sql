ALTER TABLE `goals`
  MODIFY `createdat` DATETIME NULL,
  MODIFY `achieved` DATETIME NULL,
  MODIFY `rewardedat` DATETIME NULL,
  MODIFY `rewardedwith` TEXT NULL;

UPDATE `goals`
SET `achieved` = NULL
WHERE `achieved` = '1970-01-01 00:00:00';

UPDATE `goals`
SET `rewardedat` = NULL
WHERE `rewardedat` = '1970-01-01 00:00:00';

UPDATE `goals`
SET `rewardedwith` = NULL
WHERE TRIM(COALESCE(`rewardedwith`, '')) = '';
