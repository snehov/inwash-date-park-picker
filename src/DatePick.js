import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { getDefaultDate, parseDateArray } from "./utils";
import { dateFormat } from "./variables";
import {
  RenderCustomDayLabel,
  DatePickHeaderStartRange
} from "./DateExtensions";
import "react-datepicker/dist/react-datepicker.css";

export const DatePick = ({ updateDate, dateExclusions }) => {
  const excludeDates = useMemo(() => parseDateArray(dateExclusions), [
    dateExclusions
  ]);
  const [startDate, setStartDate] = useState(
    getDefaultDate(1, 8, excludeDates)
  );
  useEffect(() => {
    updateDate({ startDate });
  }, [startDate]);

  useEffect(() => {
    setStartDate(getDefaultDate(1, 8, excludeDates));
  }, [excludeDates]);

  const CustomInput = ({ onClick }) => {
    return (
      <button onClick={onClick} className="uneditable-input datePickButton">
        {format(startDate, dateFormat)}
      </button>
    );
  };

  return (
    <div className="startDate">
      <label></label>
      <DatePicker
        selected={startDate}
        onChange={setStartDate}
        selectsStart
        startDate={startDate}
        showTimeSelect
        dateFormat={dateFormat}
        calendarContainer={DatePickHeaderStartRange}
        excludeDates={excludeDates}
        renderDayContents={(day, date) => (
          <RenderCustomDayLabel
            day={day}
            date={date}
            excludeDates={dateExclusions}
          />
        )}
        minDate={new Date()}
        customInput={<CustomInput />}
      />
    </div>
  );
};
