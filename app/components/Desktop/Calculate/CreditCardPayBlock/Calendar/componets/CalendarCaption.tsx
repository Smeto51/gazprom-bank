type CalendarCaptionProps = {
  selectedMonth: Date;
  currentYear: number;
  onYearClick: () => void;
};

export const CalendarCaption = ({
  selectedMonth,
  currentYear,
  onYearClick,
}: CalendarCaptionProps) => {
  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2">
      <span className="capitalize font-semibold text-lg">
        {selectedMonth.toLocaleDateString("ru-RU", { month: "long" })}
      </span>
      <button
        onClick={onYearClick}
        className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors font-semibold z-10 text-lg ml-3"
      >
        {currentYear}
      </button>
    </div>
  );
};
