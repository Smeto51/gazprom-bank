"use client";

import Image from "next/image";
import { POPULAR_ITEMS } from "./constant";
import { ArrowSVG } from "@/app/ui/SvgElements";

export const Popular = () => {
  return (
    <div className="pl-11 pr-11 relative xl:max-w-7xl mx-auto">
      <h2 className="text-5xl font-semibold mt-30 mb-20 ">Популярное</h2>
      <div className="flex flex-wrap gap-6  ">
        {POPULAR_ITEMS.map((item, index) => {
          const widthClass =
            index % 3 === 0
              ? "basis-full group"
              : "xl:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_100%] group";
          return (
            <div
              key={index}
              className={`transition-all duration-500 ease-in-out  relative rounded-2xl ${widthClass} overflow-hidden cursor-pointer
            ${item.bgColor} ${item.textColor} `}
            >
              <div
                className={`absolute inset-0 w-full overflow-hidden rounded-2xl h-full
                  transition-transform duration-500
            ${item.imgPos} group-hover:scale-110`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1279px) 100vw, 1280px"
                  className="object-cover "
                />
              </div>
              <div
                className={`relative min-h-100 rounded-2xl p-13 w-[520px] ${
                  index % 3 === 0 ? "" : "xl:w-[425px]"
                }`}
              >
                <h3 className="text-[32px] leading-8 mb-5 font-semibold">
                  {item.title}
                </h3>
                <p>{item.desc}</p>
                <div
                  className={`w-10 h-10 items-center justify-center flex rounded-[8px]
                absolute bottom-13
                ${item.bgArrowColor} `}
                >
                  <button className={`${item.ArrowColor} w-6 `}>
                    <ArrowSVG />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
