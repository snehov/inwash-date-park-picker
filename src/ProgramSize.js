import { useState } from "react";
import { sizes } from "./lists";

export const defaultSize = sizes.find((f) => f.default === true).ident;

export const ProgramSize = ({ currentSize, changeSize }) => {
  const [selectedSize, setSelectedSize] = useState(currentSize);

  const internalChangeSize = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
    changeSize(newSize);
  };

  return (
    <select value={selectedSize} onChange={internalChangeSize}>
      {sizes.map((sizes) => (
        <option key={sizes.ident} value={sizes.ident}>
          {sizes.name_cz}
        </option>
      ))}
    </select>
  );
};
