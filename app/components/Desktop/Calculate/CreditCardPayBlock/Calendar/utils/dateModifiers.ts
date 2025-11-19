export const isWeekendInCurrentMonth = (date: Date, selectedMonth: Date) => {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const isCurrentMonth =
    date.getMonth() === selectedMonth.getMonth() &&
    date.getFullYear() === selectedMonth.getFullYear();
  return isWeekend && isCurrentMonth;
};

export const isWeekendOutsideMonth = (date: Date, selectedMonth: Date) => {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const isOutside =
    date.getMonth() !== selectedMonth.getMonth() ||
    date.getFullYear() !== selectedMonth.getFullYear();
  return isWeekend && isOutside;
};

export const getMinDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  return date;
};

export const getMaxDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 6);
  return date;
};

export const getDayWord = (count: number): string => {
  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return " день";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return " дня";
  } else {
    return " дней";
  }
};
