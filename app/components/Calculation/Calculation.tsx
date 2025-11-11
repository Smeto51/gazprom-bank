"use client";

import { FallBackImg } from "@/app/utils/FallBackImg";
import { CALCULATION_ITEMS } from "./data/constant";
import { useState } from "react";
import { DepositsBlock } from "../Desktop/Calculate/Deposits";

export const Calculation = () => {
  const [activePage, setActivPage] = useState(0);
  return (
    <div className="max-lg:pt-8 max-lg:pb-8 lg:mt-20  xl:max-w-[1280px] xl:pl-7 xl:pr-7 mx-auto">
      <div
        className="max-lg:bg-[#F5F5F5] pt-6 pb-6 rounded-2xl max-lg:max-w-3xl max-lg:ml-auto max-lg:mr-auto max-lg:w-full
      lg:flex lg:flex-col lg:mx-auto"
      >
        <h2
          className="text-[28px] lg:text-[40px] leading-8 font-semibold pl-4 pr-4
        lg:mx-auto "
        >
          Рассчитайте
        </h2>
        <p className="text-[#6f6f6f] leading-5 pt-4 pl-4 pr-4 lg:hidden">
          Платежи по кредитке, кредит наличными, доход от вклада или автокредит
        </p>
        <div
          className="flex pt-4 gap-3 overflow-x-auto pl-4 pr-4 scrollbar-hide lg:justify-center 
        lg:pt-20"
        >
          <div className="flex border-gray-200 border rounded-[8px] justify-center mx-auto p-1 gap-2">
            {CALCULATION_ITEMS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActivPage(index)}
                className={`relative rounded-2xl  pl-3 pr-3 overflow-hidden transition-colors duration-300 ease-in-out
                max-lg:bg-white max-lg:min-w-[140px] max-lg:pt-4 max-lg:pb-30
                lg:py-3 lg:rounded-[8px] cursor-pointer
                  ${
                    activePage == index
                      ? "bg-black text-white "
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
              >
                <p className="font-medium">{item.title}</p>

                <span className="absolute left-5 top-20 min-w-[140px] lg:hidden">
                  <FallBackImg
                    src={item.icon}
                    offIcon={item.localIcon}
                    alt={item.title}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-[60px] pb-[64px] max-w-[1536px] ">
          <DepositsBlock />
        </div>
      </div>
    </div>
  );
};
