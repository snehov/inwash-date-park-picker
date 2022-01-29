import "./styles.css";
import { useState } from "react";
import { DatePick } from "./DatePick";
import { ProgramSize } from "./ProgramSize";
import { differenceInMinutes } from "date-fns";
import { Input } from "./Input";
import data from "./data.json";
import { getProgramFromDays, moneyFormat, isDate } from "./utils";
const EXTRA_DAY_PARK = 130;

export default function App() {
  const [daysCalc, setDaysCalc] = useState();
  const [chosenProgram, setChosenProgram] = useState(null);
  const [programSize, setProgramSize] = useState(0);
  const [vrp, setVrp] = useState("");

  const recountDate = ({ startDate, endDate }) => {
    if (!isDate(startDate) || !isDate(endDate)) {
      console.error("neplatny datum");
      return;
    }
    const minutes = differenceInMinutes(endDate, startDate);
    const days = Math.ceil(minutes / 1440);
    const matchedProgram = getProgramFromDays(data, days, EXTRA_DAY_PARK);
    console.log("Program>>>", matchedProgram);
    setChosenProgram(matchedProgram);
    setDaysCalc(days);
  };

  const changeSize = (newSize) => {
    setProgramSize(newSize);
  };

  const getSizePrice = () => {
    return programSize === 0 ? chosenProgram.price : chosenProgram.price_xl;
  };

  return (
    <div className="App">
      <h1> {chosenProgram && chosenProgram.name}</h1>
      <p>
        Velikost:{" "}
        <ProgramSize currentSize={programSize} changeSize={changeSize} />
      </p>
      <div>
        Vyberte rozmezí parkování:
        <br />
        <DatePick updateDate={recountDate} />
      </div>
      <div>Počet dní: {daysCalc}</div>
      <p>
        SPZ:{" "}
        <Input
          onChange={setVrp}
          value={vrp}
          maxLength={8}
          onlyUppercase
          avoidSpaces
        />
      </p>
      <p>
        Finální cena <b>{chosenProgram && moneyFormat(getSizePrice())} Kč</b>
      </p>
    </div>
  );
}
