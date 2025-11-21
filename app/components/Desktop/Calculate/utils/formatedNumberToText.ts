const getYearsWord = (years: number): string => {
  if (years === 1) {
    return `${years} год`;
  }
  if (years >= 2 && years <= 4) {
    return `${years} года`;
  }
  return `${years} лет`;
};

export const getWordYearMonth = (month: number): string => {
  const years = Math.floor(month / 12);
  const remainingMonths = month % 12;
  const yearsText = getYearsWord(years);
  const monthsText = getMonthWord(remainingMonths);
  if (remainingMonths == 0) {
    return yearsText;
  }
  return yearsText + " " + remainingMonths + monthsText;
};

export const getMonthWord = (count: number): string => {
  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return " месяц";
  } else if (lastDigit >= 2 && lastDigit <= 4 && count != 13) {
    return " месяца";
  } else {
    return " месяцев";
  }
};
