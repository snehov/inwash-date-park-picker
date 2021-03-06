import { useState, useMemo, useRef } from "react";
import { differenceInMinutes } from "date-fns";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import {
  getProgramFromDays,
  moneyFormat,
  isDate,
  getProgramData,
  getProgramDescription,
  checkIsParking,
  stripTags,
  isNil
} from "./utils";
import { useExcludedDates } from "./utils/useExcludedDates";
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
  const [errors, setError] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const { excludedDatesStatus, excludedDates } = useExcludedDates();
  const pageEndRef = useRef(null);

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
      setError([...errors, { ident: "vrp", label: "Nen?? zadan?? SPZ" }]);
      return false;
    }
    setIsSending(true);
    setError([]);
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
        setError([]);
      })
      .catch((err) => {
        setError([{ ident: "sendErr", label: err.message }]);
        setIsSending(false);
      });
    //.finally(() => setIsSending(false));
  };

  const programDescription = useMemo(
    () => getProgramDescription(chosenProgram),
    [chosenProgram]
  );

  return isNil(programData) ? (
    <div>Program nenalezen</div>
  ) : (
    <div className="App">
      {chosenProgram && (
        <>
          <h1>{chosenProgram.name}</h1>

          <ul className="offerBox__items">
            {programDescription.map((item) => (
              <li key={item}>{stripTags(item)}</li>
            ))}
          </ul>
        </>
      )}

      <div style={{ width: "333px" }}>
        <div className="upperLabel">Velikost vozu:</div>
        <ProgramSizeImage currentSize={programSize} changeSize={changeSize} />
      </div>

      {is_parking ? (
        <>
          <div>
            <div className="upperLabel">Vyberte rozmez?? parkov??n??:</div>
            <DateRangePick
              updateDate={recountDateRange}
              dateExclusions={excludedDates}
            />
          </div>
          <div className="important">
            <label></label>po??et dn??: {daysCalc}
          </div>
        </>
      ) : (
        <div>
          <div className="upperLabel">Datum p??ijet?? vozu:</div>
          <DatePick
            updateDate={recountDate}
            pageEndRef={pageEndRef}
            dateExclusions={excludedDates.singleFrom}
          />
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
          className={errors.find((f) => f.ident === "vrp") ? "alert" : ""}
        />
      </p>

      <div className="important">
        Fin??ln?? cena <b>{chosenProgram && moneyFormat(getSizePrice())} K??</b>
      </div>

      {errors.length > 0 && (
        <p className="errorLabel">{errors.map((error) => error.label)}</p>
      )}

      <button
        onClick={handleSubmitOrder}
        className="actionButton button offerBox__reserve"
        disabled={isSending}
      >
        {isSending ? "Odes??l??m..." : "Objednat"}
      </button>
      <div ref={pageEndRef} className="REF" />
    </div>
  );
}
