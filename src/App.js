import "./styles.css";
import data from "./data.json";
import { getProgramFromDays, moneyFormat, isDate } from "./utils";
import { ProgramSize, defaultSize } from "./ProgramSize";
import { useState } from "react";
import { DatePick } from "./DatePick";
import { differenceInMinutes } from "date-fns";
import { Input } from "./Input";
import { EXTRA_DAY_PARK } from "./variables";
import { sendOrder } from "./sendOrder";

export default function App() {
  const [daysCalc, setDaysCalc] = useState();
  const [chosenProgram, setChosenProgram] = useState(null);
  const [programSize, setProgramSize] = useState(defaultSize);
  const [vrp, setVrp] = useState("");
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const recountDate = ({ startDate, endDate }) => {
    if (!isDate(startDate) || !isDate(endDate)) {
      console.error("neplatny datum");
      return;
    }

    const minutes = differenceInMinutes(endDate, startDate);
    const days = Math.ceil(minutes / 1440);
    const matchedProgram = getProgramFromDays(data, days, EXTRA_DAY_PARK);

    setDateRange({ startDate, endDate });
    setChosenProgram(matchedProgram);
    setDaysCalc(days);
  };

  const changeSize = (newSize) => {
    setProgramSize(newSize);
  };

  const getSizePrice = () => {
    return programSize === 0 ? chosenProgram.price : chosenProgram.price_xl;
  };

  const handleSubmitOrder = () => {
    if (vrp === "") {
      setError("Není zadaná SPZ");
      return false;
    }
    setError("");
    const data = {
      from: dateRange.startDate,
      to: dateRange.endDate,
      vrp,
      productId: chosenProgram.id_service,
      size: programSize,
      daysOver: chosenProgram.extraDays ?? 0
    };
    sendOrder(data)
      .then((res) => {
        setError("");
      })
      .catch((err) => {
        setError(err);
      });
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
      {error !== "" && <p>{error}</p>}
      <button onClick={handleSubmitOrder}>Objednat</button>
    </div>
  );
}
