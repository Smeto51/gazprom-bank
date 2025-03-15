import { useRef, useState } from "react";

const Cities = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={toggleMenu} className="cursor-pointer text-[#4768BF]">
        Мурманск
      </button>
      <div className="block">
        <div
          className="
          fixed custom-background-cities 
          inset-0 w-[100vw] flex justify-center items-center"
        >
          <div
            className="
              relative lg:w-[672px] lg:p-[40px] lg:rounded-2xl z-50 
            bg-white h-[90vh] lg:h-[80vh] overflow-y-hidden"
          >
            <div className="">
              <h1 className="font-[Arial, sans-serif] text-[28px] font-semibold">
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
                ref={inputRef}
                className="w-[100%] border border-gray-300 rounded-[5px] mt-4 h-14 p-3 pt-7 text-[16px] focus:outline-none focus:border-blue-500 "
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              ></input>
              {/*<label
                className={`absolute p-5 mt-3 left-8 transform transition-all duration-200 -z-2
                ${
                  isInputFocused
                    ? "opacity-100  text-blue-500 -translate-y-4"
                    : "opacity-0"
                }`}
              >
                Поиск по городам
              </label>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cities;
