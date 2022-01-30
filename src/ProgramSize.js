import { useState } from "react";
export const sizes = [
  {
    id: 0,
    ident: "standard",
    postfix: "",
    name_cz: "Standardní",
    name_en: "Standard",
    default: true
  },
  {
    id: 1,
    ident: "XL",
    postfix: "_xl",
    name_cz: "XL (SUV, MPV, Užitkové)",
    name_en: "XL (SUV, MPV, Utility)"
  }
];

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
