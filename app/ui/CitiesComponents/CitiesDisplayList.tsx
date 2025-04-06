"use client";

import { memo, useCallback, useRef, useState } from "react";
import { CitiesData } from "../Cities";

type CitiesListProps = {
  cities: CitiesData;
  onSelect: (city: string) => void;
};

type CityItem = {
  name: string;
  onSelect: (city: string) => void;
};

const CityItem = memo(({ name, onSelect }: CityItem) => (
  <li
    className="lg:pb-0 text-base leading-[20px] hover:text-[#4768BF] transform transition-all duration-200 cursor-pointer"
    onClick={() => onSelect(name)}
  >
    {name}
  </li>
));
CityItem.displayName = "CityItem";

const CitiesList = memo(({ cities, onSelect }: CitiesListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopGradient, setShowTopGradient] = useState(false);

  const handleScroll = useCallback((): void => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      setShowTopGradient(scrollTop > 0);
    }
  }, []);

  const letters: string[] = Object.keys(cities);
  const hasLetters: boolean = letters.length > 0;

  return (
    <div className="mt-10 relative h-[calc(100%-150px)]">
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto h-full custom-scrollbar custom-scrollbarCity"
        onScroll={handleScroll}
      >
        {hasLetters && (
          <div
            className="grid
              min-[1024px]:gap-6 min-[1024px]:grid-cols-3 
              min-[1280px]:gap-2
              min-[1920px]:grid-cols-4"
          >
            {letters.map((letter) => (
              <div key={letter}>
                <h2 className="font-semibold text-xl text-[#476bf0] lg:pb-[8px]">
                  {letter}
                </h2>
                <ul>
                  {cities[letter].map((city) => (
                    <CityItem
                      key={city.id}
                      name={city.name}
                      onSelect={onSelect}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div
          className={`absolute top-0 left-0 right-0 h-[30px] pointer-events-none w-[calc(100%-var(--scrollbar-width,8px))] ${
            showTopGradient
              ? "bg-gradient-to-b from-white to-transparent opacity-100 transition-all duration-300"
              : "opacity-0"
          }`}
        ></div>
        <div className="sticky -bottom-1 left-0 right-0 h-[30px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
});

CitiesList.displayName = "CitiesList";

export default CitiesList;
