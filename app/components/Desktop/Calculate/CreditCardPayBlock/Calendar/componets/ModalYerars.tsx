"use client";

type YearsProps = {
  handleYearSelect: (year: number) => void;
  showYearModal: boolean;
  yearModalRef: React.RefObject<HTMLDivElement | null>;
  currentYear: number;
  pickerType: "start" | "send";
  date: Date | undefined;
};

const getCountYears = (date?: Date) => {
  if (!date || isNaN(date.getTime())) return 2;

  return date.getFullYear() - new Date().getFullYear() + 1;
};

export const ModalYears = ({
  handleYearSelect,
  showYearModal,
  yearModalRef,
  currentYear,
  pickerType,
  date,
}: YearsProps) => {
  const years =
    pickerType == "start"
      ? Array.from({ length: 2 }, (_, i) => new Date().getFullYear() + i)
      : Array.from({ length: getCountYears(date) }, (_, i) => 2025 + i);

  return (
    <div
      className={`absolute -inset-5 flex items-center justify-center z-40 top-45
      transition-all duration-100 
      ${
        showYearModal
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible pointer-events-none"
      }`}
    >
      <div
        ref={yearModalRef}
        className="bg-white shadow-2xl max-w-[280px] w-full mx-4 rounded-2xl min-h-65"
      >
        <div className="grid grid-cols-3 gap-3 max-h-80  mt-5 p-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`py-3 rounded-lg font-semibold transition-all cursor-pointer
              ${
                year === currentYear
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
