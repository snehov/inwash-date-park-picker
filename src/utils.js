import { addDays, setHours, setMinutes, setSeconds } from "date-fns";
import programData from "./data.json"; //TODO: remove before going to production

export const excludeDatesArray =
  typeof window.APP_DATA === "object" &&
  Array.isArray(window.APP_DATA.excludeDates)
    ? window.APP_DATA.excludeDates
    : [];

export const excludeDates = Array.isArray(excludeDatesArray)
  ? excludeDatesArray.map((date) => new Date(date))
  : [];

export const getProgramData = () => {
  return typeof window.APP_DATA === "object" &&
    window.APP_DATA.program === "object"
    ? window.APP_DATA.program
    : programData;
};

export const checkIsParking = (programData) => {
  if (Array.isArray(programData)) {
    return Boolean(programData[0].is_parking == "1"); //eslint-disable-line eqeqeq
  }
  if (typeof programData === "object") {
    return Boolean(programData.is_parking == "1"); //eslint-disable-line eqeqeq
  }
  return false;
};

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

export const getProgramDesription = (chosenProgram) => {
  if (chosenProgram === null) {
    return ["..."];
  }
  if (typeof chosenProgram.description === "object") {
    return chosenProgram.description;
  }
  if (
    typeof chosenProgram.description === "string" &&
    chosenProgram.description.substring(0, 1) === "["
  ) {
    let programList = [];
    try {
      programList = JSON.parse(chosenProgram.description);
    } catch (err) {
      return [""];
    }
    return programList;
  }
};
