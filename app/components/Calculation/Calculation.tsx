"use client";

import { FallBackImg } from "@/app/utils/FallBackImg";
import { CALCULATION_ITEMS } from "./data/constant";

export const Calculation = () => {
  return (
    <div className="pt-8 pb-8">
      <div className="bg-[#F5F5F5] pt-6 pb-6 rounded-2xl max-w-3xl ml-auto mr-auto w-full">
        <h3 className="text-[28px] leading-8 font-semibold pl-4 pr-4">
          Рассчитайте
        </h3>
        <p className="text-[#6f6f6f] leading-5 pt-4 pl-4 pr-4">
          Платежи по кредитке, кредит наличными, доход от вклада или автокредит
        </p>
        <div className="flex pt-4 gap-3 overflow-x-auto pl-4 pr-4 scrollbar-hide">
          {CALCULATION_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl min-w-[140px] pt-4 pl-3 pr-3 pb-25 overflow-hidden"
            >
              <p className="font-medium">{item.title}</p>
              <span className="absolute left-7 top-20 ">
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
    </div>
  );
};
