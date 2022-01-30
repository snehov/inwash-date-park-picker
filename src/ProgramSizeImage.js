import { useState, useRef, useMemo } from "react";
import Select from "react-select";
import { sizes } from "./lists";

const options = sizes.map((size) => {
  return {
    value: size.ident,
    label: (
      <div>
        <img
          alt={size.name_cz}
          height="80"
          width="272"
          src={`https://inwash.cz/shop/car-size-${size.ident.toLowerCase()}.gif`}
        />
      </div>
    )
  };
});

export const defaultSize = sizes.find((f) => f.default === true).ident;

export const ProgramSizeImage = ({ currentSize, changeSize }) => {
  //const defaultValue = useRef(currentSize);

  const defaultOption = options.find((f) => f.value === currentSize);

  const internalChangeSize = (newSize) => {
    //console.log("new size ", newSize);
    changeSize(newSize.value);
  };

  //console.log("defaultOption>>", defaultOption, "options", options);

  return (
    <Select
      options={options}
      defaultValue={defaultOption}
      onChange={internalChangeSize}
      isSearchable={false}
    />
  );
};
