"use client";

import { useEffect, useState } from "react";

interface City {
  id: number;
  name: string;
}

interface CitiesData {
  [key: string]: City[];
}

const getCities = async (): Promise<CitiesData | null> => {
  try {
    const getCitites = await fetch("/api/gazprombank");
    const data = await getCitites.json();
    return data.cities as CitiesData;
  } catch (error) {
    console.error("Ошибка при загрузку данных:", error);
    return null;
  }
};

const CitiesDisplay = () => {
  const [cities, setCities] = useState<CitiesData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getCities().then((data) => {
      if (data) {
      setCities(data);
      setIsLoading(true);
      }
    });
  }, []);

  if (!isLoading || !cities) {
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
