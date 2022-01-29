import React, { useEffect, useState } from "react";
import DatePicker, {
  registerLocale,
  setDefaultLocale,
  CalendarContainer
} from "react-datepicker";
import { setDateFromNow } from "./utils";
import "react-datepicker/dist/react-datepicker.css";
import cs from "date-fns/locale/cs";
import { format } from "date-fns";
registerLocale("cs", cs);
setDefaultLocale("cs");

const dateFormat = "dd.MM.yyyy HH:mm";

export const DatePick = ({ updateDate }) => {
  const [startDate, setStartDate] = useState(setDateFromNow(1, 8));
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [endDate, setEndDate] = useState(setDateFromNow(2, 8));
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
  };
  const updateEndDate = (date) => {
    setEndDate(date);
    setIsEndOpen(false);
  };

  const MyContainer = ({ className, children }) => {
    return (
      <CalendarContainer className={className}>
        <div style={{ background: "#f0f0f0" }}>Vyberte datum, čas příjezdu</div>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    );
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
          calendarContainer={MyContainer}
          inline
          onClickOutside={() => setIsStartOpen(false)}
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
