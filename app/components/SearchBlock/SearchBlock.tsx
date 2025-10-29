"use client";

import { Magnifier, SVGComponet } from "@/app/ui/SvgElements";
import Link from "next/link";

const links = [
  {
    href: "javascript:void(0)",
    text: "Для всех",
    icon: <SVGComponet.ForEveryone />,
  },
  { href: "javascript:void(0)", text: "МСБ", icon: <SVGComponet.MSB /> },
  {
    href: "javascript:void(0)",
    text: "Крупному бизнесу",
    icon: <SVGComponet.Ecosystem />,
  },
  {
    href: "javascript:void(0)",
    text: "Экосистема",
    icon: <SVGComponet.Ecosystem />,
  },
];

export const SearchHome = ({ searchIndex }: { searchIndex: number }) => {
  console.log(searchIndex);
  return (
    <div
      className="fixed bottom-0 max-w-3xl z-1000 flex flex-col gap-3 p-4 left-0 right-0 bg-white border-t 
    border-gray-300 rounded-t-[12px] "
    >
      <div className="flex gap-3 items-center">
        <div className=" flex gap-3 text-black/50 bg-[#0a0a0b14] p-2 rounded-[8px] w-full">
          <Magnifier />
          <p>Поиск</p>
        </div>
        <button className=" text-black/50 "></button>
        <div className="items-center flex w-10">
          <div className="p-2 bg-[#0a0a0b14] rounded-[12px]">
            <SVGComponet.Microphone />
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap ">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link}
            className={`bg-[#0a0a0b14] px-3 py-1 rounded-[8px] flex gap-2 
                ${searchIndex == index ? "text-white bg-black" : "text-black"}`}
          >
            <div className="flex w-5 h-5 my-0.5">{link.icon}</div>

            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
