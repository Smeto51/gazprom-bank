"use client";

import { useEffect, useState } from "react";

interface City {
  id: number;
  name: string;
}

interface CitiesData {
  [key: string]: City[];
}

interface CachedData {
  data: CitiesData;
  timestamp: number;
}

const CACHE_DURATION = 3 * 60 * 60 * 1000;

const getCities = async (): Promise<CitiesData | null> => {
  const cachedCities = localStorage.getItem('cities');
  if (cachedCities) {
    const parseData: CachedData = JSON.parse(cachedCities);
    const isCacheValid = Date.now() - parseData.timestamp < CACHE_DURATION;
    if (isCacheValid) {
      return parseData.data;
    } 
  }
  try {
    const getCitites = await fetch("/api/gazprombank");
    const data = await getCitites.json();

    if (data.cities) {
      const dataToCache: CachedData = {
        data: data.cities,
        timestamp: Date.now()
      };
      localStorage.setItem('cities', JSON.stringify(dataToCache));
      return data.cities;
    }
    return null;
  } catch (error) {
    console.error("Ошибка при загрузку данных:", error);
    return null;
  }
};

const CitiesDisplay = () => {
  const [cities, setCities] = useState<CitiesData | null>(null)

  useEffect(() => {
    getCities().then(setCities);
  }, []);

  if (!cities) {
    return <div>Загрузка...</div>;
  }

  const letters = Object.keys(cities);

  return (
    <>
      {" "}
      {letters.map((letter) => (
        <div key={letter} className="">
          <h2 className="font-semibold text-xl mt-4 text-[#476bf0] lg:pb-[8px]">
            {letter}
          </h2>
          <ul>
            {cities[letter].map((city) => (
              <li
                key={city.id}
                className="lg:pb-0 text-base leading-[20px] hover:text-[#4768BF] transform transition-all duration-200"
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default CitiesDisplay;
