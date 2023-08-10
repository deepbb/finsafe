export function getShortForm(string) {
  return string
    .split(" ")
    .map((word) => word.slice(0, 3))
    .join("");
}
