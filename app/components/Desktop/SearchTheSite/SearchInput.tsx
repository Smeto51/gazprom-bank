"use client";

import { CrossSVG, Magnifier } from "@/app/ui/SvgElements";

const BORDER_RADIUS: string = "rounded-[8px]";

type SeacrhProps = {
  searchValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearInput: () => void;
  handleSearch: () => void;
  id?: string;
};

export const SearchInput = ({
  searchValue,
  handleInputChange,
  handleClearInput,
  handleSearch,
  id = "",
}: SeacrhProps) => (
  <>
    <div
      className={`
    relative border-1 ${BORDER_RADIUS} w-full border-gray-400 duration-300 focus-within:border-blue-500
    flex items-center p-1 pr-2 `}
    >
      <input
        type="text"
        id={id}
        maxLength={57}
        placeholder="Например: Кредитный рейтинг"
        value={searchValue}
        onChange={handleInputChange}
        className={`relative text-[16px] p-3 w-full hover:bg-[#f4f6fa] ${BORDER_RADIUS} duration-300`}
        autoComplete="off"
      />
      <div className="absolute text-gray-400 right-4 ">
        <Magnifier />
      </div>
      {searchValue.length > 0 && (
        <div
          className="flex items-center cursor-pointer"
          onClick={handleClearInput}
        >
          <div
            className="
          absolute flex text-gray-400
          h-6 w-6 right-12"
          >
            <CrossSVG />
          </div>
        </div>
      )}
    </div>
    <button
      className={`bg-[#2b61ec] cursor-pointer text-white ${BORDER_RADIUS} p-[20px] px-6 hover:bg-[#3356d7] transition-colors duration-200 focus:outline-none`}
      onClick={handleSearch}
    >
      Найти
    </button>
  </>
);
