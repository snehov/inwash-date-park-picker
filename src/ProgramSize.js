import { useState } from "react";
export const sizes = [
  {
    id: 0,
    ident: "std",
    postfix: "",
    name_cz: "Standardní",
    name_en: "Standard"
  },
  {
    id: 1,
    ident: "xl",
    postfix: "_xl",
    name_cz: "XL (SUV, MPV, Užitkové)",
    name_en: "XL (SUV, MPV, Utility)"
  }
];
export const ProgramSize = ({ currentSize, changeSize }) => {
  const [selectedSize, setSelectedSize] = useState(currentSize);

  const internalChangeSize = (e) => {
    const newSize = Number(e.target.value);
    setSelectedSize(newSize);
    changeSize(newSize);
  };
  return (
    <select value={selectedSize} onChange={internalChangeSize}>
      {sizes.map((sizes) => (
        <option key={sizes.ident} value={sizes.id}>
          {sizes.name_cz}
        </option>
      ))}
    </select>
  );
};
