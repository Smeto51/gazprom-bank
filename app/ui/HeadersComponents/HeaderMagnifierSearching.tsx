"use client";
import { memo, useCallback, useState } from "react";
import { Magnifier, CrossSVG } from "../SvgElements";

const BORDER_RADIUS: string = "rounded-[8px]";

const HeaderSearching = memo(() => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleClearInput = useCallback(() => {
    setSearchValue("");
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  return (
    <div className="relative lg:h-auto ">
      <div className="relative w-full flex mx-auto lg:p-10 bg-white z-10 rounded-b-2xl">
        <div className="wrapper flex w-full mx-auto space-x-7 ">
          <div
            className={`
            relative border-1 ${BORDER_RADIUS} w-full border-gray-400 duration-300 focus-within:border-blue-500
            flex items-center p-1 pr-2`}
          >
            <input
              type="text"
              id="HeaderSearching"
              maxLength={57}
              placeholder="Например: Кредитный рейтинг"
              value={searchValue}
              onChange={handleInputChange}
              className={`relative text-[16px] p-3 w-full hover:bg-[#f4f6fa] ${BORDER_RADIUS} duration-300`}
              autoComplete="off"
            />
            <div className="absolute text-gray-400 right-4 ">
              <Magnifier />
            </div>
            {searchValue.length > 0 && (
              <div
                className="flex items-center cursor-pointer"
                onClick={handleClearInput}
              >
                <div
                  className="
                  absolute flex text-gray-400
                  h-6 w-6 right-12"
                >
                  <CrossSVG />
                </div>
              </div>
            )}
          </div>
          <button
            className={`bg-[#2b61ec] cursor-pointer text-white ${BORDER_RADIUS} p-[20px] px-6 hover:bg-[#3356d7] transition-colors duration-200 focus:outline-none`}
          >
            Найти
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 bg-black/50 w-full h-[100vh] z-0 cursor-pointer" />
    </div>
  );
});

HeaderSearching.displayName = "HeaderSearching";

export default HeaderSearching;
