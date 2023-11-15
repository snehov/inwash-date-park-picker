import { useState } from "react";
import { AVAILABLE_TIMES } from "./variables";
export const TimePicker = ({ onChange, defaultValue = "" }) => {
  const [lastValue, setLastValue] = useState(defaultValue);
  const handleChange = (e) => {
    onChange(e.target.value);
    setLastValue(e.target.value);
  };
  return (
    <>
      <select
        onChange={handleChange}
        defaultValue={defaultValue}
        style={{
          height: "45px",
          display: "inlineBlock",
          margin: "3px",
          fontSize: "19px",
          padding: "0px 15px"
        }}
      >
        {lastValue === "" ? <option value="">Zvolte čas</option> : null}
        {AVAILABLE_TIMES.map((time) => (
          <option value={time} key={time}>
            {time}
          </option>
        ))}
      </select>
    </>
  );
};
