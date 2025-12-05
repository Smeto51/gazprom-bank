"use client";

import Link from "next/link";

type PropsDopBlock = {
  handleClick: () => void;
  checkBox: boolean;
};

export const DopOptionsBlock = ({ handleClick, checkBox }: PropsDopBlock) => {
  return (
    <>
      <h3 className="text-[24px] font-semibold mb-5 mt-10">
        Дополнительные опции
      </h3>
      <div className="relative flex items-center gap-2">
        <span
          onClick={handleClick}
          className={`w-[36px] h-[20px] rounded-[96px] cursor-pointer duration-200 
              ${checkBox ? "bg-blue-600" : "bg-[#a5a5a5]"} `}
        />
        <span
          onClick={handleClick}
          className={`absolute h-3 w-3 left-0 rounded-[50%] bg-white duration-200 cursor-pointer
                ${checkBox ? "translate-x-5" : "translate-x-1"} `}
        />
        <span onClick={handleClick} className="cursor-pointer">
          Снизить процентную ставку
        </span>
        <div className="absolute right-0 top-0 bg-[#43bb3a] p-1 text-white rounded-[8px] w-10 text-[12px] justify-center flex">
          -15%
        </div>
      </div>

      <Link href="#" className="text-blue-600 text-sm mx-11">
        Подробнее
      </Link>
    </>
  );
};
