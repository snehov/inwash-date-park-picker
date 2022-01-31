import { useState } from "react";

export const Input = ({
  avoidSpaces,
  value = "",
  onChange,
  onlyUppercase,
  maxLength,
  className = ""
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleLocalChange = (e) => {
    let value = e.target.value;
    if (avoidSpaces) {
      value = value.replace(" ", "");
    }
    if (onlyUppercase) {
      value = value.toUpperCase();
    }
    onChange(value);
    setInputValue(value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleLocalChange}
      maxLength={maxLength}
      className={className}
    />
  );
};
