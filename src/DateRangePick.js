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
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [endDate, setEndDate] = useState(addDateFrom(defaultDayStart, 1, 8));
  const [isEndOpen, setIsEndOpen] = useState(false);

  useEffect(() => {
    updateDate({ startDate, endDate });
  }, [startDate, endDate]);

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
      <div className="startDate">
        <label>Od:</label>
        <button
          onClick={toggleStart}
          className="uneditable-input datePickButton"
        >
          {format(startDate, dateFormat)}
        </button>
        <br />
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
            minDate={new Date()}
          />
        )}
      </div>

      <div className="endDate">
        <label>Do:</label>
        <button onClick={toggleEnd} className="uneditable-input datePickButton">
          {format(endDate, dateFormat)}
        </button>
        <br />
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
      </div>
    </React.Fragment>
  );
};
