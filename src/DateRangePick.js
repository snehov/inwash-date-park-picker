import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, addDays, isAfter } from "date-fns";
import { setDateFromNow, excludeDates } from "./utils";
import { dateFormat } from "./variables";
import { RenderCustomDayLabel, DateFromCustomWrapper } from "./DateComponents";
import "react-datepicker/dist/react-datepicker.css";

export const DateRangePick = ({ updateDate }) => {
  const [startDate, setStartDate] = useState(setDateFromNow(1, 8));
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [endDate, setEndDate] = useState(setDateFromNow(2, 8));
  const [isEndOpen, setIsEndOpen] = useState(false);

  useEffect(() => {
    updateDate({ startDate, endDate });
  }, [startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleStart = (e) => {
    e.preventDefault();
    setIsStartOpen(!isStartOpen);
  };
  const toggleEnd = (e) => {
    e.preventDefault();
    setIsEndOpen(!isEndOpen);
  };

  const updateStartDate = (date) => {
    setStartDate(date);
    setIsStartOpen(false);

    if (isAfter(date, endDate)) {
      setEndDate(addDays(date, 1));
    }
  };
  const updateEndDate = (date) => {
    setEndDate(date);
    setIsEndOpen(false);
  };

  return (
    <React.Fragment>
      Od:
      <button onClick={toggleStart}>{format(startDate, dateFormat)}</button>
      {isStartOpen && (
        <DatePicker
          selected={startDate}
          onChange={(date) => updateStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          showTimeSelect
          dateFormat={dateFormat}
          calendarContainer={DateFromCustomWrapper}
          inline
          onClickOutside={() => setIsStartOpen(false)}
          excludeDates={excludeDates}
          renderDayContents={RenderCustomDayLabel}
        />
      )}
      <br />
      <br />
      Do:
      <button onClick={toggleEnd}>{format(endDate, dateFormat)}</button>
      {isEndOpen && (
        <DatePicker
          selected={endDate}
          onChange={(date) => updateEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          showTimeSelect
          dateFormat={dateFormat}
          inline
          onClickOutside={() => setIsEndOpen(false)}
        />
      )}
    </React.Fragment>
  );
};
