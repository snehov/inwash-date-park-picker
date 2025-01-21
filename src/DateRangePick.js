import React, { useEffect, useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import {
  format,
  addDays,
  isAfter,
  isSameDay,
  setMinutes,
  setHours,
  getHours,
  getMinutes,
} from 'date-fns';
import { parseDateArray, getDefaultDate } from './utils';
import { dateFormat } from './variables';
import {
  RenderCustomDayLabel,
  DatePickHeaderStartRange,
  DatePickHeaderEndRange,
} from './DateExtensions';
import 'react-datepicker/dist/react-datepicker.css';
import { TimePicker } from './TimePicker';

export const DateRangePick = ({
  updateDate,
  dateExclusions,
  setTimeIn,
  setTimeOut,
  isTimeInAlert,
  isTimeOutAlert,
}) => {
  const defaultStartDate = useMemo(
    () => getDefaultDate(1, 8, parseDateArray(dateExclusions.rangeFrom)),
    [dateExclusions.rangeFrom]
  );
  const defaultEndDate = useMemo(
    () =>
      getDefaultDate(
        1,
        8,
        parseDateArray(dateExclusions.rangeTo),
        defaultStartDate
      ),
    [dateExclusions.rangeTo, defaultStartDate]
  );
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [endTimeConstrain, setEndTimeConstrain] = useState(undefined);
  const excludedDatesFrom = useMemo(
    () => parseDateArray(dateExclusions.rangeFrom),
    [dateExclusions]
  );
  const excludedDatesTo = useMemo(
    () => parseDateArray(dateExclusions.rangeTo),
    [dateExclusions]
  );

  // check if there is no need to shift time, due to same day
  useEffect(() => {
    updateDate({ startDate, endDate });
    if (isSameDay(startDate, endDate)) {
      const hours = getHours(startDate).toString().padStart(2, '0');
      const minutes = getMinutes(startDate).toString().padStart(2, '0');
      setEndTimeConstrain(`${hours}:${minutes}`);
    } else {
      setEndTimeConstrain(undefined);
    }
  }, [startDate, endDate]);

  // only checking constraints from parent has changed
  useEffect(() => {
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
  }, [dateExclusions, defaultStartDate, defaultEndDate]);

  const updateStartDate = date => {
    setStartDate(date);
    if (isAfter(date, endDate) || isSameDay(date, endDate)) {
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
  const handleTimeInChange = newTime => {
    if (newTime === '') {
      return false;
    }
    const [hours, minutes] = newTime.split(':');
    const newDateTime = setMinutes(setHours(startDate, hours), minutes);
    setStartDate(newDateTime);
    setTimeIn(newTime);
  };
  const handleTimeOutChange = newTime => {
    if (newTime === '') {
      return false;
    }
    const [hours, minutes] = newTime.split(':');
    const newDateTime = setMinutes(setHours(endDate, hours), minutes);
    setEndDate(newDateTime);
    setTimeOut(newTime);
  };
  const minDateOfTo = useMemo(() => addDays(startDate, 0), [startDate]);

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
          //showTimeSelect
          dateFormat={dateFormat}
          calendarContainer={DatePickHeaderStartRange}
          excludeDates={excludedDatesFrom}
          renderDayContents={(day, date) => (
            <RenderCustomDayLabel
              day={day}
              date={date}
              excludeDates={dateExclusions.rangeFrom}
            />
          )}
          minDate={new Date()}
          customInput={<CustomInput date={startDate} />}
        />
        <TimePicker onChange={handleTimeInChange} isTimeAlert={isTimeInAlert} />
      </div>

      <div className="endDate">
        <label>Do:</label>
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={minDateOfTo}
          //showTimeSelect
          dateFormat={dateFormat}
          calendarContainer={DatePickHeaderEndRange}
          customInput={<CustomInput date={endDate} />}
          excludeDates={excludedDatesTo}
          renderDayContents={(day, date) => (
            <RenderCustomDayLabel
              day={day}
              date={date}
              excludeDates={dateExclusions.rangeTo}
            />
          )}
        />
        <TimePicker
          onChange={handleTimeOutChange}
          isTimeAlert={isTimeOutAlert}
          disabledBeforeTime={endTimeConstrain}
        />
      </div>
    </React.Fragment>
  );
};
