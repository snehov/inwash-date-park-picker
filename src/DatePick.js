import React, { useEffect, useState } from "react";
import DatePicker, {
  registerLocale,
  setDefaultLocale,
  CalendarContainer
} from "react-datepicker";
import { setDateFromNow } from "./utils";
import "react-datepicker/dist/react-datepicker.css";
import cs from "date-fns/locale/cs";
import { format, getDate, addDays, isAfter } from "date-fns";
import excludeDatesList from "./excludeDates.json";
const excludeDates = Array.isArray(excludeDatesList)
  ? excludeDatesList.map((date) => new Date(date))
  : [];

registerLocale("cs", cs);
setDefaultLocale("cs");

const dateFormat = "dd.MM.yyyy HH:mm";
const dateJsonFormat = "yyyy-MM-dd";

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

    if (isAfter(date, endDate)) {
      setEndDate(addDays(date, 1));
    }
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

  const renderDayContents = (day, date) => {
    const tooltipText = `Tento den již máme plno`;

    return excludeDatesList.includes(format(date, dateJsonFormat)) ? (
      <span title={tooltipText} style={{ color: "red" }}>
        {getDate(date)}
      </span>
    ) : (
      <span>{getDate(date)}</span>
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
          excludeDates={excludeDates}
          renderDayContents={renderDayContents}
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
