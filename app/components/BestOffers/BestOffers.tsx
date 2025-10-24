"use client";

import { FallBackImg } from "@/app/utils/FallBackImg";
import { BEST_OFFERS } from "./data/constant";
import Link from "next/link";
import { UIEvent, useRef, useState } from "react";

export const BestOffers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<(HTMLElement | null)[]>([]);

  const moveSlider = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const width = target.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollToIndex = (i: number) => {
    const scroller = scrollRef.current;
    console.log("scroller = " + scroller);
    if (!scroller) return;

    const slider = sliderRef.current[i];
    if (!slider) return;

    const left = slider.offsetLeft;

    scroller.scrollTo({
      left: left,
      behavior: "smooth",
    });
  };

  return (
    <div className="pt-8 pb-8 w-full">
      <h2 className="font-[625] max-[1023px]:text-[28px] pl-4 max-[1023px]:leading-8">
        Лучшие предложения
      </h2>
      <div
        ref={scrollRef}
        className="flex mt-[32px]  overflow-x-auto overflow-y-hidden px-4 gap-4
        snap-x snap-mandatory scroll-px-4 scroll-smooth scrollbar-hide"
        onScroll={moveSlider}
      >
        {BEST_OFFERS.map((item, i: number) => (
          <article
            key={item.id}
            ref={(el) => {
              sliderRef.current[i] = el;
            }}
            className="w-full flex-shrink-0 rounded-2xl bg-[#f5f5f5] p-6 
            snap-center min-w-[280px]"
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
      <ul className="  flex justify-center gap-4 mt-4 w-full ">
        {BEST_OFFERS.map((_, i) => (
          <li key={i} onClick={() => scrollToIndex(i)}>
            <div
              className={`h-[3px] w-10 rounded-sm ${
                i === activeIndex ? "bg-black" : "bg-[#0a0a0b14]"
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
