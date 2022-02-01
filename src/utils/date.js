import { addDays, setHours, setMinutes, setSeconds } from "date-fns";

export function setDateFromNow(inDays, atHour) {
  return setSeconds(
    setMinutes(setHours(addDays(new Date(), inDays), atHour), 0),
    0
  );
}

export function isDate(x) {
  return x instanceof Date && !isNaN(x);
}
