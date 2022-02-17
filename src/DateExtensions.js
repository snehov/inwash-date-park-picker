import { CalendarContainer } from "react-datepicker";
import { format, getDate } from "date-fns";
import { excludeDatesArray } from "./utils";
import { dateJsonFormat } from "./variables";
import "react-datepicker/dist/react-datepicker.css";

export const DateFromCustomWrapper = ({ className, children }) => {
  return (
    <CalendarContainer className={className}>
      <div style={{ background: "#f0f0f0" }}>Vyberte datum, čas příjezdu</div>
      <div style={{ position: "relative" }}>{children}</div>
    </CalendarContainer>
  );
};

export const RenderCustomDayLabel = (day, date) => {
  const tooltipText = `Tento den již máme plno`;

  return excludeDatesArray.includes(format(date, dateJsonFormat)) ? (
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
