"use client";
import { USESFUL_TIPS } from "./Variable";
import { UsefullWindow } from "./Usefull_Window";
import { useState } from "react";

export const SectionUsefull = () => {
  const [isUsefullWindowOpen, setIsUsefullWindowOpen] = useState(false);
  //const [selectedTip, setSelectedTip] = useState<any>(null);

  const handleTipClick = () => {
    //setSelectedTip(item);
    setIsUsefullWindowOpen(true);
  };

  const handleCloseUsefullWindow = () => {
    setIsUsefullWindowOpen(false);
    //setSelectedTip(null);
  };

  return (
    <>
      <section className="ml-auto mr-auto w-full pl-4">
        {" "}
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide w-full">
          {USESFUL_TIPS.map((item) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 flex items-center justify-center min-w-24 w-24 cursor-pointer"
              onClick={handleTipClick}
            >
              <div className="flex w-[96px] h-[108px] items-center justify-center border-orange-400 border-1 rounded-2xl">
                <picture>
                  <source type="image/webp" srcSet={item.srcsetWebp} />
                  <source type="image/png" srcSet={item.srcsetPng} />
                  <img
                    className="rounded-xl"
                    src={item.srcImg}
                    alt={item.title}
                  />
                </picture>
              </div>
              <div className="absolute rounded-xl w-22 h-25 bg-[rgba(30,34,46,0.32)]" />
              <p className="font-semibold text-[12px] leading-4 absolute top-4 w-19 text-white">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>
      {isUsefullWindowOpen && (
        <UsefullWindow onClose={handleCloseUsefullWindow} />
      )}
    </>
  );
};
