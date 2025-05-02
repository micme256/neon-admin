export const formatAmount = (value) => {
  if (isNaN(value)) return "0.00";

  const rounded = parseFloat(value).toFixed(2); // force 2 decimal places
  const parts = rounded.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${parts[0]}.${parts[1]}`;
};
