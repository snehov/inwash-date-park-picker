import programData from "../data.json"; //TODO: remove before going to production, testing purpose only
import { isNil, isArray } from "./common";
import { isBefore, isToday } from "date-fns";

export const removePastDates = (dates = [], before = new Date()) => {
  if (!isArray(dates)) {
    return dates;
  }
  let newDates = [];
  dates.forEach((date) => {
    if (!isBefore(new Date(date), before) || isToday(new Date(date))) {
      newDates.push(date);
    }
  });
  return newDates;
};

export const excludeDatesArray =
  !isNil(window?.APP_DATA) && Array.isArray(window.APP_DATA.excludeDates)
    ? removePastDates(window.APP_DATA.excludeDates)
    : [];

export const excludeDates = Array.isArray(excludeDatesArray)
  ? excludeDatesArray.map((date) => new Date(date))
  : [];

export const getProgramData = () => {
  return programData;
  /*!isNil(window?.APP_DATA?.program)
    ? window.APP_DATA.program
    : null /* programData  =>for testing purpose of date range*/
};

export const checkIsParking = (programData) => {
  if (isNil(programData)) {
    return false;
  }
  if (Array.isArray(programData)) {
    return Boolean(programData[0].is_parking == "1"); //eslint-disable-line eqeqeq
  }
  if (typeof programData === "object") {
    return Boolean(programData.is_parking == "1"); //eslint-disable-line eqeqeq
  }
  return false;
};

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

export const getProgramDescription = (chosenProgram) => {
  if (isNil(chosenProgram)) {
    return null;
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
