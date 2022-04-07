import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, addDays, isAfter } from "date-fns";
import { excludeDates, getDefaultDate, addDateFrom } from "./utils";
import { dateFormat } from "./variables";
import { RenderCustomDayLabel, DateFromCustomWrapper } from "./DateExtensions";
import "react-datepicker/dist/react-datepicker.css";

const defaultDayStart = getDefaultDate(1, 8, excludeDates);

export const DateRangePick = ({ updateDate }) => {
  const [startDate, setStartDate] = useState(defaultDayStart);
  const [endDate, setEndDate] = useState(addDateFrom(defaultDayStart, 1, 8));

  useEffect(() => {
    updateDate({ startDate, endDate });
  }, [startDate, endDate]);

  const updateStartDate = (date) => {
    setStartDate(date);

    if (isAfter(date, endDate)) {
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
          calendarContainer={DateFromCustomWrapper}
          excludeDates={excludeDates}
          renderDayContents={RenderCustomDayLabel}
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
          minDate={startDate}
          showTimeSelect
          dateFormat={dateFormat}
          customInput={<CustomInput date={endDate} />}
        />
      </div>
    </React.Fragment>
  );
};
