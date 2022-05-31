const EXCL_DATES_PATH = "./dateExclusions.json";

export const fetchDateExclusions = async () => {
  try {
    const response = await fetch(EXCL_DATES_PATH, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    if (data?.singleFrom && data.rangeFrom && data.rangeTo) {
      return data;
    } else {
      throw new Error("Date exclustions improper format");
    }
  } catch (e) {
    throw new Error("Date exclustions fetch fail");
  }
};
