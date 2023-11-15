import { CalendarContainer } from "react-datepicker";
import { format, getDate } from "date-fns";
import { dateJsonFormat } from "./variables";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickHeaderStartRange = ({ className, children }) => {
  return (
    <CalendarContainer className={className}>
      <div style={{ background: "#f0f0f0" }}>Vyberte datum příjezdu</div>
      <div style={{ position: "relative" }}>{children}</div>
    </CalendarContainer>
  );
};

export const DatePickHeaderEndRange = ({ className, children }) => {
  return (
    <CalendarContainer className={className}>
      <div style={{ background: "#f0f0f0" }}>Vyberte datum odjezdu</div>
      <div style={{ position: "relative" }}>{children}</div>
    </CalendarContainer>
  );
};

export const RenderCustomDayLabel = ({ day, date, excludeDates }) => {
  const tooltipText = `Tento den již máme plno`;
  return excludeDates?.includes(format(date, dateJsonFormat)) ? (
    <span
      title={tooltipText}
      style={{ color: "red", textDecoration: "line-through" }}
    >
      {getDate(date)}
    </span>
  ) : (
    getDate(date)
  );
};
