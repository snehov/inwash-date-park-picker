import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { setDateFromNow, excludeDates } from "./utils";
import { dateFormat } from "./variables";
import { RenderCustomDayLabel, DateFromCustomWrapper } from "./DateExtensions";
import "react-datepicker/dist/react-datepicker.css";

export const DatePick = ({ updateDate }) => {
  const [startDate, setStartDate] = useState(setDateFromNow(1, 8));
  const [isStartOpen, setIsStartOpen] = useState(false);
  useEffect(() => {
    updateDate({ startDate });
  }, [startDate]);
  const pageEndRef = useRef(null);

  const scrollToBottom = () => {
    console.log("scroll down");
    setTimeout(() => {
      pageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  const toggleStart = (e) => {
    e.preventDefault();
    if (!isStartOpen) {
      scrollToBottom();
    }
    setIsStartOpen(!isStartOpen);
  };

  const updateStartDate = (date) => {
    setStartDate(date);
    setIsStartOpen(false);
  };

  return (
    <div className="startDate">
      <label></label>
      <button onClick={toggleStart} className="uneditable-input datePickButton">
        {format(startDate, dateFormat)}
      </button>
      <br ref={pageEndRef} />
      {isStartOpen && (
        <DatePicker
          selected={startDate}
          onChange={(date) => updateStartDate(date)}
          selectsStart
          startDate={startDate}
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
  );
};
