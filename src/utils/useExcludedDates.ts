import { useEffect, useState } from "react";
import { fetchDateExclusions } from "./fetchDateExclusions";

const defaultExcludedDates = {
  singleFrom: [],
  rangeFrom: [],
  rangeTo: []
};

enum RequestStatus {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS
}

export const useExcludedDates = () => {
  const [excludedDates, setExcludedDates] = useState(defaultExcludedDates);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.IDLE
  );

  const fetchData = async () => {
    //await new Promise((r) => setTimeout(r, 5000));
    try {
      const data = await fetchDateExclusions();
      setExcludedDates(data);
      setRequestStatus(RequestStatus.SUCCESS);
    } catch (error) {
      console.log(">>>", error);
      setRequestStatus(RequestStatus.ERROR);
    }
  };
  useEffect(() => {
    setRequestStatus(RequestStatus.LOADING);
    fetchData();
  }, []);

  return { excludedDatesStatus: requestStatus, excludedDates };
};
