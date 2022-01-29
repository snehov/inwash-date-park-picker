import React, { useEffect, useState } from "react";
import { addDays, setHours, setMinutes, setSeconds } from "date-fns";
import DatePicker, {
  registerLocale,
  setDefaultLocale,
  CalendarContainer
} from "react-datepicker";
import { setDateFromNow } from "./utils";
import "react-datepicker/dist/react-datepicker.css";
import cs from "date-fns/locale/cs";
registerLocale("cs", cs);
setDefaultLocale("cs");

export const DatePick = ({ updateDate }) => {
  const [startDate, setStartDate] = useState(setDateFromNow(1, 8));
  const [endDate, setEndDate] = useState(setDateFromNow(2, 8));

  useEffect(() => {
    updateDate({ startDate, endDate });
  }, [startDate, endDate]);

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
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        showTimeSelect
        dateFormat="dd.MM.yyyy hh:mm"
        calendarContainer={MyContainer}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        showTimeSelect
        dateFormat="dd.MM.yyyy hh:mm"
      />
    </React.Fragment>
  );
};
