"use client";
import { useState } from "react";
import CitiesDisplay from "./CitiesDisplay";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа

const queryClient = new QueryClient();

const fetchCities = async () => {
  const cachedCities = localStorage.getItem("cities");
  if (cachedCities) {
    const parsedData = JSON.parse(cachedCities);
    const isCacheValid = Date.now() - parsedData.timestamp < CACHE_DURATION;
    if (isCacheValid) {
      //return parsedData.data;
    }
  }
  try {
    const getCities = await fetch("/api/gazprombank");
    const data = await getCities.json();

    if (data.cities) {
      const dataToCache = {
        data: data.cities,
        timestamp: Date.now(),
      };
      localStorage.setItem("cities", JSON.stringify(dataToCache));
      return data.cities;
    }
    return null;
  } catch (error) {
    console.error("Ошибка при загрузку данных:", error);
    return null;
  }
};

const CitiesContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    data: cities,
    //isLoading,
    isError,
  } = useQuery({
    queryKey: ["cities"], //Кэшируем данные по уникальному ключу
    queryFn: fetchCities,
    staleTime: CACHE_DURATION, //Повторяет запрос через ...
  });

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(!isOpen);
      setTimeout(() => setIsVisible(true), 10);
    }
  };

  //if (isLoading) return <div className="p-4">Загрузка городов...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Ошибка загрузки данных</div>;
  //if (!cities) return <div className="p-4">Нет данных о городах</div>;

  return (
    <>
      <button onClick={toggleMenu} className="cursor-pointer text-[#4768BF] ">
        Мурманск
      </button>
      {isOpen && (
        <div
          className={`
          fixed inset-0 custom-background-cities w-[100vw] flex justify-center items-center transition-opacity duration-200 ease-in-out
          ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`lg:w-[672px] lg:p-[40px] lg:rounded-2xl 
            bg-white h-[100%] lg:h-[80vh] overflow-hidden z-0
            duration-400
            ${isVisible ? "opacity-100 -translate-y-5" : "opacity-0"}`}
          >
            <div className="">
              <h1 className="font-[Arial, sans-serif] text-[28px] font-semibold ">
                Выберите город
              </h1>
              <span
                className={`absolute p-3 mt-5.5 transform transition-all duration-5400 -z-1  
                  ${
                    isInputFocused
                      ? "-translate-y-5 text-blue-500 text-[14px]"
                      : "text-gray-500 text-[16px]"
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
              />
            </div>
            <div className="mt-10 overflow-y-auto relative h-[calc(100%-150px)]">
              <div
                className="grid
                min-[1024px]:gap-6
                min-[1280px]:gap-2
                min-[1920px]:grid-cols-4 
            "
              >
                <CitiesDisplay cities={cities} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Cities = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CitiesContent />
    </QueryClientProvider>
  );
};

export default Cities;
