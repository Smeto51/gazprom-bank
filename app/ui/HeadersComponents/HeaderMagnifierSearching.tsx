"use client";
import { Magnifier } from "../SvgElements";
//relative lg:h-22 h-full -z-1 border-b border-gray-300
const HeaderSearching = () => {
  const borderRadius: string = "rounded-[8px]";
  return (
    <div className="relative lg:border-b lg:rounded-2xl lg:h-auto">
      <div className="flex mx-auto space-x-7 wrapper lg:p-10">
        <div
          className={`
            relative border-1 ${borderRadius} p-1 w-full border-gray-400 duration-300 focus-within:border-blue-500
            flex items-center`}
        >
          <input
            type="text"
            id="HeaderSearching"
            maxLength={57}
            placeholder="Например: Кредитный рейтинг"
            className={`relative text-[16px] p-3 w-full hover:bg-[#f4f6fa] ${borderRadius} duration-300`}
          />
          <div className="absolute text-gray-400 right-4">
            <Magnifier />
          </div>
        </div>
        <button
          className={`bg-[#2b61ec] cursor-pointer text-white ${borderRadius} p-[20px] hover:bg-[#3356d7] transition-colors duration-200`}
        >
          Найти
        </button>
      </div>
    </div>
  );
};

export default HeaderSearching;
