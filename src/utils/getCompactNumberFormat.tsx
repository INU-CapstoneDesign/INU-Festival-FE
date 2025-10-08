export default function getCompactNumberFormatter() {
  return new Intl.NumberFormat("en", { notation: "compact" });
}
