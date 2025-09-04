"use client";

import { FallBackImg } from "@/app/utils/FallBackImg";
import { BEST_OFFERS } from "./data/constant";
import Link from "next/link";

export const BestOffers = () => {
  return (
    <div className="pt-8 pb-8 pl-4 pr-4 w-full">
      <h2 className="font-[625] max-[1023px]:text-[28px] max-[1023px]:leading-8">
        Лучшие предложения
      </h2>
      <div className="flex mt-[32px] gap-4 overflow-x-auto overflow-hidden">
        {BEST_OFFERS.map((item) => (
          <article
            key={item.id}
            className="w-full flex-shrink-0 rounded-2xl bg-[#f5f5f5] p-6 "
          >
            <FallBackImg
              src={item.icon}
              offIcon={item.offIcon}
              alt={item.title}
            />
            <h4 className="text-[23px] font-[625] leading-7 mt-3">
              {item.title}
            </h4>
            <p className="mt-2">{item.desc}</p>
            <div className="max-[1023px]:mt-8 -mb-4">
              <Link
                href={item.link}
                className="bg-[#0a0a0b0f] items-center pt-2 p-3 rounded-[8px]"
              >
                Подробнее
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
