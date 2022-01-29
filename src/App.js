import "./styles.css";
import { useState } from "react";
import { DatePick } from "./DatePick";
import { ProgramSize } from "./ProgramSize";
import { differenceInMinutes } from "date-fns";
import data from "./data.json";
import { getProgramFromDays, moneyFormat } from "./utils";
const EXTRA_DAY_PARK = 130;

export default function App() {
  const [daysCalc, setDaysCalc] = useState();
  const [chosenProgram, setChosenProgram] = useState(null);
  const [programSize, setProgramSize] = useState(0);

  const recountDate = ({ startDate, endDate }) => {
    //its not proper NaN date validation
    if (Number.isNaN(startDate) || Number.isNaN(endDate)) {
      console.log("neplatny datum");
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
      <h1>Vybírač progarmu</h1>
      Velikost:
      <br />
      <ProgramSize currentSize={programSize} changeSize={changeSize} />
      (tzn:{programSize})<p>Počet dní: {daysCalc}</p>
      {chosenProgram !== null && (
        <div>
          {chosenProgram.name} za {moneyFormat(getSizePrice())} Kč
        </div>
      )}
      <DatePick updateDate={recountDate} />
    </div>
  );
}
