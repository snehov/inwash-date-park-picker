export const isNil = (value) => {
  return Boolean(value === undefined || value === null);
};

export const stripTags = (content) => {
  return content.replace(/(<([^>]+)>)/gi, "");
};

export function moneyFormat(value) {
  const withFixes = Number(value)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  if (String(withFixes).slice(-3) === ".00") {
    return Number(value)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }
  return withFixes;
}
