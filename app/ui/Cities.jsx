"use client";
import { useEffect, useState } from "react";
import CitiesDisplay from "./CitiesDisplay";

const Cities = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleMenu} className="cursor-pointer text-[#4768BF]">
        Мурманск
      </button>
      {isOpen && (
        <div className=" fixed custom-background-cities inset-0 w-[100vw] flex justify-center items-center">
          <div
            className="
              lg:w-[672px] lg:p-[40px] lg:rounded-2xl 
            bg-white h-[100%] lg:h-[80vh] overflow-hidden z-0
            "
          >
            <div className="">
              <h1 className="font-[Arial, sans-serif] text-[28px] font-semibold ">
                Выберите город
              </h1>
              <span
                className={`absolute p-3 mt-5.5 transform transition-all duration-200 -z-1  
                  ${
                    isInputFocused
                      ? "-translate-y-4 text-blue-500 text-[14px]"
                      : "text-gray-400 text-[16px]"
                  }`}
              >
                Поиск по городам
              </span>
              <input
                type="text"
                id="city"
                className="w-[100%] border border-gray-300 rounded-[5px] mt-4 h-14 pl-3 p-7 pb-2 text-[16px] focus:outline-none focus:border-blue-500 "
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              ></input>
            </div>
            <div className="mt-10 overflow-y-auto relative h-[calc(100%-150px)]">
              <div
                className="grid
                min-[1024px]:gap-6
                min-[1280px]:gap-2
                min-[1920px]:grid-cols-4 
            "
              >
                <CitiesDisplay />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cities;
