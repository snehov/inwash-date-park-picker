import { useState, useMemo } from "react";
import { differenceInMinutes } from "date-fns";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import {
  getProgramFromDays,
  moneyFormat,
  isDate,
  getProgramData,
  getProgramDesription,
  checkIsParking
} from "./utils";
import { defaultSize } from "./ProgramSize";
import { DateRangePick } from "./DateRangePick";
import { DatePick } from "./DatePick";
import { Input } from "./Input";
import { EXTRA_DAY_PARK } from "./variables";
import { sendOrder } from "./sendOrder";

import "./styles.css";
import cs from "date-fns/locale/cs";
import { ProgramSizeImage } from "./ProgramSizeImage";

registerLocale("cs", cs);
setDefaultLocale("cs");

const programData = getProgramData();
const is_parking = checkIsParking(programData);

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
    return programSize === "standard"
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

  const programDescription = useMemo(
    () => getProgramDesription(chosenProgram),
    [chosenProgram]
  );

  return (
    <div className="App">
      {chosenProgram && (
        <>
          <h1>{chosenProgram.name}</h1>

          <ul className="offerBox__items">
            {programDescription.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      <div style={{ width: "333px" }}>
        <div className="upperLabel">Velikost vozu:</div>
        {/* <ProgramSize currentSize={programSize} changeSize={changeSize} /> */}
        <ProgramSizeImage currentSize={programSize} changeSize={changeSize} />
      </div>
      {is_parking ? (
        <>
          <div>
            <div className="upperLabel">Vyberte rozmezí parkování:</div>
            <DateRangePick updateDate={recountDateRange} />
          </div>
          <div className="important">
            <label></label>počet dní: {daysCalc}
          </div>
        </>
      ) : (
        <div>
          Datum přijetí vozu:
          <br />
          <DatePick updateDate={recountDate} />
        </div>
      )}
      <p>
        <label>SPZ:</label>
        <Input
          onChange={setVrp}
          value={vrp}
          maxLength={8}
          onlyUppercase
          avoidSpaces
        />
      </p>

      <div className="important">
        Finální cena <b>{chosenProgram && moneyFormat(getSizePrice())} Kč</b>
      </div>

      {error !== "" && <p className="errorLabel">{error}</p>}
      <button
        onClick={handleSubmitOrder}
        className="actionButton button offerBox__reserve"
      >
        Objednat
      </button>
    </div>
  );
}
