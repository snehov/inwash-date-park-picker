import { useState } from "react";
import { differenceInMinutes } from "date-fns";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { getProgramFromDays, moneyFormat, isDate } from "./utils";
import { ProgramSize, defaultSize } from "./ProgramSize";
import { DateRangePick } from "./DateRangePick";
import { DatePick } from "./DatePick";
import { Input } from "./Input";
import { EXTRA_DAY_PARK } from "./variables";
import { sendOrder } from "./sendOrder";

import "./styles.css";
import cs from "date-fns/locale/cs";
import programData from "./data.json";

registerLocale("cs", cs);
setDefaultLocale("cs");

const is_parking = false;

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

  const recountDateRange = ({ startDate, endDate }) => {
    if (!isDate(startDate) || !isDate(endDate)) {
      console.error("neplatny datum");
      return;
    }

    const minutes = differenceInMinutes(endDate, startDate);
    const days = Math.ceil(minutes / 1440);
    const matchedProgram = getProgramFromDays(
      programData,
      days,
      EXTRA_DAY_PARK
    );

    setDateRange({ startDate, endDate });
    setChosenProgram(matchedProgram);
    setDaysCalc(days);
  };

  const recountDate = ({ startDate, endDate }) => {
    if (!isDate(startDate)) {
      console.error("neplatny datum");
      return;
    }

    const matchedProgram = Array.isArray(programData)
      ? programData[0]
      : programData;
    setDateRange({ startDate, endDate });
    setChosenProgram(matchedProgram);
    setDaysCalc(1);
  };

  const changeSize = (newSize) => {
    setProgramSize(newSize);
  };

  const getSizePrice = () => {
    return programSize == "standard"
      ? chosenProgram.price
      : chosenProgram.price_xl;
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
      {is_parking ? (
        <>
          <div>
            Vyberte rozmezí parkování:
            <br />
            <DateRangePick updateDate={recountDateRange} />
          </div>
          <div>Počet dní: {daysCalc}</div>
        </>
      ) : (
        <div>
          Datum přijetí vozu:
          <br />
          <DatePick updateDate={recountDate} />
        </div>
      )}
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
