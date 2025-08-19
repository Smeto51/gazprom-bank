"use client";
import Link from "next/link";
import { FINANCIAL_PRODUCTS_ITEMS } from "./Variable";
import { ArrowSVG } from "./ui/SvgElements";

import { SectionUsefull } from "./sectionUsefullWindow";

export default function Home() {
  console.log("Загруженно Home");
  return (
    <div>
      <div className="max-[1024]:max-w-3xl max-[1024]:ml-auto max-[1024]:mr-auto min-[1024]:hidden">
        <section className="flex h-45 pl-4 pr-4 gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide">
          {FINANCIAL_PRODUCTS_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative block flex-shrink-0 min-[360]:w-80 rounded-2xl w-[calc(100vw-40px)] h-full"
              style={{ backgroundColor: item.bg }}
            >
              <span className="block w-35 ml-auto items-center ">
                <picture className="">
                  <source type="image/webp" srcSet={item.srcsetWebp} />
                  <source type="image/png" srcSet={item.srcsetPng} />
                  <img
                    className="max-[1023px]:w-35 object-contain h-[170px]"
                    src={item.srcImg}
                    alt={item.title}
                  />
                </picture>
              </span>
              <span className="absolute top-0 left-0 w-full h-full p-5">
                <h3
                  className="max-[1023]:text-[23px] max-[1023]:leading-7 font-semibold max-w-46 "
                  style={{ color: item?.titleColor }}
                >
                  {item.title}
                </h3>
                <p className="hidden" style={{ color: item?.titleColor }}>
                  {item.description}
                </p>
                <button
                  className="absolute flex w-8 h-8 bottom-5 left-5 items-center justify-center rounded-[12px] hover:bg-[#E2E2E5] cursor-pointer transition-colors duration-200"
                  style={{ background: item?.titleColor }}
                >
                  <div
                    className="flex h-4 w-4 "
                    style={{ color: item?.ArrowColor }}
                  >
                    <ArrowSVG />
                  </div>
                </button>
              </span>
            </Link>
          ))}
        </section>

        <div className="pb-8" />
        <SectionUsefull />
      </div>
    </div>
  );
}
