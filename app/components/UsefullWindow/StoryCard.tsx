"use client";

import Link from "next/link";
import { Slide } from "./data/type";

export const StoryCard = ({ currentData }: { currentData?: Slide }) => {
  if (!currentData) return null;
  return (
    <div className="absolute pt-11 pr-6 pb-8 pl-6 bottom-0 left-0 right-0 text-white z-10">
      <h4 className="font-semibold text-[20px] leading-6 ">
        {currentData.title}
      </h4>
      <p className="text-[16px] leading-5 mt-2">{currentData.description}</p>

      {currentData.linkText && (
        <div className="flex mt-6 items-center justify-center relative z-1">
          <Link
            href="#"
            className="h-12 w-full flex items-center justify-center relative"
          >
            <div className="absolute bg-[#2b61ec] top-0 left-0 w-full h-full -z-1 rounded-md " />
            <span className="text-[18px]">{currentData.linkText}</span>
          </Link>
        </div>
      )}
    </div>
  );
};
