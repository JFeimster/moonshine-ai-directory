export function money(value?: number | null) {
  if (value == null) return "Varies";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
export function months(value?: number | null) {
  if (value == null) return "Varies";
  if (value === 0) return "Startup eligible";
  if (value === 12) return "1 year";
  if (value % 12 === 0) return `${value/12} years`;
  return `${value} months`;
}
