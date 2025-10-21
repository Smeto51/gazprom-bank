"use client";

import Link from "next/link";
import { SERVICES_ITEMS } from "./data/constant";
import { ArrowSVG } from "@/app/ui/SvgElements";
import { FallBackImg } from "@/app/utils/FallBackImg";
import { useCallback, useRef, useState } from "react";

export const ServicesForYou = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tempSERVICES_ITEMS, setTempSERVICES_ITEMS] = useState([
    ...SERVICES_ITEMS,
  ]);

  const handleClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      if (scrollRef.current) {
        const cardWidth = window.innerWidth;

        let closestIndex = index;
        const currentScrollIndex = Math.round(
          scrollRef.current.scrollLeft / cardWidth
        );
        const currentCopy = Math.floor(
          currentScrollIndex / SERVICES_ITEMS.length
        );
        closestIndex = index + currentCopy * SERVICES_ITEMS.length;

        if (closestIndex >= tempSERVICES_ITEMS.length) {
          closestIndex = index;
        }

        setCurrentIndex(index);

        scrollRef.current.scrollTo({
          left: closestIndex * cardWidth,
          behavior: "smooth",
        });
      }
    },
    [tempSERVICES_ITEMS]
  );

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = window.innerWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);

      if (scrollLeft > (tempSERVICES_ITEMS.length - 1) * 400 + 20) {
        setTempSERVICES_ITEMS([...tempSERVICES_ITEMS, ...SERVICES_ITEMS]);
      }
    }
  }, [tempSERVICES_ITEMS]);

  const normalizedIndex = currentIndex % SERVICES_ITEMS.length;

  return (
    <>
      <h2 className="text-[28px] font-semibold m-[32px]">Услуги для вас</h2>
      <div>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide overflow-y-hidden snap-x snap-mandatory scroll-smooth"
        >
          {tempSERVICES_ITEMS.map((items, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-screen rounded-2xl min-h-auto snap-start relative"
            >
              <div
                className="absolute inset-0 mx-[16px] rounded-2xl"
                style={{ background: items.bg }}
              />
              <Link className="absolute" href={items.link} />
              <div className="relative z-1 pointer-events-none max-[1023px]:flex-col flex h-full mx-4">
                <div className="max-[1023px]:p-6 p-8 relative flex flex-col justify-between h-full">
                  <div className="relative mb-2 z-2.5 text-[24px] font-semibold leading-6">
                    {items.title}
                  </div>

                  <p className="relative text-[20px] leading-5 font-normal">
                    {items.desc}
                  </p>
                  <Link
                    className="relative h-5 cursor-pointer mt-6 flex items-center"
                    href={items.link}
                  >
                    <span className="text-[14px] leading-4 font-normal mr-2 opacity-[.64] flex">
                      Подробнее
                    </span>{" "}
                    <div className=" h-3 w-6 mb-2 opacity-[.64]">
                      <ArrowSVG />
                    </div>
                  </Link>
                </div>
                <div className="flex justify-center items-center h-auto -ml-4 ">
                  <FallBackImg
                    src={items.icon}
                    offIcon={items.localIcon}
                    alt={items.title}
                    className="w-full min-w-200 min-h-50 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <ul className="flex items-center justify-center w-full h-3 p-0 m-0 mt-4 gap-2">
          {SERVICES_ITEMS.map((items, index) => (
            <li key={items.id}>
              <div
                onClick={() => handleClick(index)}
                className={`w-6 h-[3.5px] cursor-pointer rounded transition-all  ${
                  normalizedIndex == index
                    ? `bg-black`
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
