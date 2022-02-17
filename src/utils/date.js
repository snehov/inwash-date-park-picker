import { addDays, setHours, setMinutes, setSeconds, isSameDay } from "date-fns";

export function setDateFromNow(inDays, atHour) {
  return setSeconds(
    setMinutes(setHours(addDays(new Date(), inDays), atHour), 0),
    0
  );
}
export function addDateFrom(date, inDays, atHour) {
  return setSeconds(setMinutes(setHours(addDays(date, inDays), atHour), 0), 0);
}

export function isDate(x) {
  return x instanceof Date && !isNaN(x);
}

export function getDefaultDate(inDays, atHour, excludeDates) {
  let nearestDay = setDateFromNow(inDays, atHour);
  let dateCollision = true;
  let inDaysMore = inDays;

  while (dateCollision) {
    if (isCollisionExclDate(excludeDates, nearestDay)) {
      inDaysMore++;
      nearestDay = setDateFromNow(inDaysMore, atHour);
      dateCollision = true;
    } else {
      dateCollision = false;
    }
  }

  return nearestDay;
}

function isCollisionExclDate(exclDates, checkDate) {
  let collision = false;
  exclDates.forEach((exclDay) => {
    if (isSameDay(checkDate, exclDay)) {
      collision = true;
    }
  });
  return collision;
}
