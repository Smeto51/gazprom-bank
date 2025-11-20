export const rangeNewValue = (num: number, min: number, max: number) => {
  if (Number.isNaN(num)) return min;
  return Math.min(max, Math.max(min, num));
};

export const formatedNumberRange = (
  val: string | number,
  min: number,
  max: number
) => {
  let num: number;
  if (typeof val === "number") {
    num = val;
  } else if (typeof val === "string") {
    num = Number(val.replace(/[^\d]/g, ""));
  } else {
    return min;
  }
  return rangeNewValue(num, min, max);
};
