import { useEffect, useState } from 'react';
import {
  AVAILABLE_TIMES,
  findNearesTimeAfterConstraint,
  depencencyMoveTime,
} from './variables';
import { CloseFullscreen } from '@mui/icons-material';
export const TimePicker = ({
  onChange,
  isTimeAlert = false,
  defaultValue = '',
  disabledBeforeTime = undefined,
}) => {
  const [lastValue, setLastValue] = useState(defaultValue);

  const handleChange = newTime => {
    onChange(newTime);
    setLastValue(newTime);
  };
  useEffect(() => {
    if (!disabledBeforeTime) {
      return;
    }
    const newTime = depencencyMoveTime(disabledBeforeTime, lastValue);
    handleChange(newTime);
  }, [disabledBeforeTime]);

  const hasConstrainOnIndex = findNearesTimeAfterConstraint(disabledBeforeTime);
  return (
    <>
      <select
        className={isTimeAlert ? 'alert' : ''}
        onChange={e => handleChange(e.target.value)}
        defaultValue={defaultValue}
        style={{
          height: '45px',
          display: 'inlineBlock',
          margin: '3px',
          fontSize: '19px',
          padding: '0px 15px',
        }}
      >
        {lastValue === '' ? <option value="">Zvolte čas</option> : null}
        {AVAILABLE_TIMES.map((time, index) => (
          <option
            value={time}
            key={time}
            selected={time === lastValue}
            disabled={hasConstrainOnIndex ? hasConstrainOnIndex > index : false}
          >
            {time}
          </option>
        ))}
      </select>
    </>
  );
};
