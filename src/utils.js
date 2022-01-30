import { addDays, setHours, setMinutes, setSeconds } from "date-fns";

export function setDateFromNow(inDays, atHour) {
  return setSeconds(
    setMinutes(setHours(addDays(new Date(), inDays), atHour), 0),
    0
  );
}

export function modifyProgramByExtraDays(
  origProgram,
  addExtraDays,
  EXTRA_DAY_PARK
) {
  const modifiedProgram = { ...origProgram };
  const addedPrice = addExtraDays * EXTRA_DAY_PARK;
  modifiedProgram.price = Number(origProgram.price) + addedPrice;
  modifiedProgram.price_xl = Number(origProgram.price_xl) + addedPrice;
  modifiedProgram.name = `${origProgram.name} + extra dny (${addExtraDays})`;
  modifiedProgram.extraDays = addExtraDays;
  return modifiedProgram;
}

export function getProgramFromDays(data, days, EXTRA_DAY_PARK) {
  let res = null;
  let highestDay = 0;
  let highestDayProgram = null;
  data.forEach((program) => {
    const dayRange = program.note.split("-");
    if (days >= Number(dayRange[0]) && days <= Number(dayRange[1])) {
      res = program;
    }
    if (Number(dayRange[1]) > highestDay) {
      highestDay = Number(dayRange[1]);
      highestDayProgram = program;
    }
  });

  if (res === null) {
    const addExtraDays = days - highestDay;
    return modifyProgramByExtraDays(
      highestDayProgram,
      addExtraDays,
      EXTRA_DAY_PARK
    );
  }
  return res;
}

export function moneyFormat(value) {
  const withFixes = Number(value)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  if (String(withFixes).slice(-3) === ".00") {
    return Number(value)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }
  return withFixes;
}

export function isDate(x) {
  return x instanceof Date && !isNaN(x);
}
