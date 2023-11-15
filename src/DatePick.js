import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { format, setMinutes, setHours } from "date-fns";
import { getDefaultDate, parseDateArray } from "./utils";
import { dateFormat, dateTimeFormat } from "./variables";
import {
  RenderCustomDayLabel,
  DatePickHeaderStartRange
} from "./DateExtensions";
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from "./TimePicker";

export const DatePick = ({
  updateDate,
  dateExclusions,
  isTimeAlert = false,
  setTime
}) => {
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
  const handleTimeChange = (newTime) => {
    if (newTime === "") {
      return false;
    }
    const [hours, minutes] = newTime.split(":");
    const newDateTime = setMinutes(setHours(startDate, hours), minutes);
    setStartDate(newDateTime);
    setTime(newTime);
  };

  return (
    <div className="startDate">
      <label></label>
      <DatePicker
        selected={startDate}
        onChange={setStartDate}
        selectsStart
        startDate={startDate}
        //showTimeSelect
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
      <TimePicker onChange={handleTimeChange} isTimeAlert={isTimeAlert} />
    </div>
  );
};
