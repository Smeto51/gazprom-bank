"use client";

import React, { useEffect, useState } from "react";

interface City {
  id: number;
  name: string;
}

interface CitiesData {
  [key: string]: City[];
}

// Пропсы для компонента CitiesDisplay
interface CitiesDisplayProps {
  cities: CitiesData | null;
}

const CitiesDisplay: React.FC<CitiesDisplayProps> = ({ cities }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (cities) {
      setIsLoading(false); // Данные загружены
    }
  }, [cities]);

  if (isLoading || !cities) {
    return <div>Загрузка...</div>;
  }

  const letters = Object.keys(cities);

  return (
    <>
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

export default React.memo(CitiesDisplay);