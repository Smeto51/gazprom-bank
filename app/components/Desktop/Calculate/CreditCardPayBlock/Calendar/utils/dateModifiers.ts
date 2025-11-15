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
