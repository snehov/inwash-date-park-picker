import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { format, addDays, isAfter, isSameDay } from "date-fns";
import { parseDateArray, getDefaultDate } from "./utils";
import { dateFormat } from "./variables";
import {
  RenderCustomDayLabel,
  DatePickHeaderStartRange,
  DatePickHeaderEndRange
} from "./DateExtensions";
import "react-datepicker/dist/react-datepicker.css";

export const DateRangePick = ({ updateDate, dateExclusions }) => {
  const firstDate = useMemo(
    () => getDefaultDate(1, 8, parseDateArray(dateExclusions.rangeFrom)),
    [dateExclusions.rangeFrom]
  );

  const secondDate = useMemo(
    () =>
      getDefaultDate(1, 8, parseDateArray(dateExclusions.rangeTo), firstDate),
    [dateExclusions.rangeTo, firstDate]
  );
  console.log("SECOND DAYE", secondDate, "FIRST", firstDate);

  const [startDate, setStartDate] = useState(firstDate);
  const [endDate, setEndDate] = useState(secondDate);
  const excludedDatesFrom = useMemo(
    () => parseDateArray(dateExclusions.rangeFrom),
    [dateExclusions]
  );

  useEffect(() => {
    updateDate({ startDate, endDate });
  }, [startDate, endDate]);

  useEffect(() => {
    setStartDate(firstDate);
    setEndDate(secondDate);
  }, [dateExclusions, firstDate, secondDate]);

  const updateStartDate = (date) => {
    setStartDate(date);
    if (isAfter(date, endDate) || isSameDay(date, endDate)) {
      setEndDate(addDays(date, 1));
    }
  };

  const CustomInput = ({ onClick, date }) => {
    return (
      <button onClick={onClick} className="uneditable-input datePickButton">
        {format(date, dateFormat)}
      </button>
    );
  };
  const minDateOfTo = useMemo(() => addDays(startDate, 1), [startDate]);

  return (
    <React.Fragment>
      <div className="startDate">
        <label>Od:</label>
        <DatePicker
          selected={startDate}
          onChange={updateStartDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          showTimeSelect
          dateFormat={dateFormat}
          calendarContainer={DatePickHeaderStartRange}
          excludeDates={excludedDatesFrom}
          renderDayContents={(day, date) => (
            <RenderCustomDayLabel
              day={day}
              date={date}
              excludeDates={dateExclusions.rangeFrom}
            />
          )}
          minDate={new Date()}
          customInput={<CustomInput date={startDate} />}
        />
      </div>

      <div className="endDate">
        <label>Do:</label>
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={minDateOfTo}
          showTimeSelect
          dateFormat={dateFormat}
          calendarContainer={DatePickHeaderEndRange}
          customInput={<CustomInput date={endDate} />}
          renderDayContents={(day, date) => (
            <RenderCustomDayLabel
              day={day}
              date={date}
              excludeDates={dateExclusions.rangeTo}
            />
          )}
        />
      </div>
    </React.Fragment>
  );
};
