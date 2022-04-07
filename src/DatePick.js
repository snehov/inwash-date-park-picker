import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { excludeDates, getDefaultDate } from "./utils";
import { dateFormat } from "./variables";
import { RenderCustomDayLabel, DateFromCustomWrapper } from "./DateExtensions";
import "react-datepicker/dist/react-datepicker.css";

export const DatePick = ({ updateDate }) => {
  const [startDate, setStartDate] = useState(
    getDefaultDate(1, 8, excludeDates)
  );
  useEffect(() => {
    updateDate({ startDate });
  }, [startDate]);

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
        calendarContainer={DateFromCustomWrapper}
        excludeDates={excludeDates}
        renderDayContents={RenderCustomDayLabel}
        minDate={new Date()}
        customInput={<CustomInput />}
      />
    </div>
  );
};
