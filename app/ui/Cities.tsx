"use client";
import { useCallback, useMemo, useState } from "react";
import CitySearchInput from "./CitiesComponents/CitiesSearchInput";
import CitiesList from "./CitiesComponents/CitiesDisplayList";
import CitiesModal from "./CitiesComponents/CitiesModal";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа

const queryClient = new QueryClient();

type City = {
  id: number;
  name: string;
};

export type CitiesData = Record<string, City[]>;

type CachedCitiesData = {
  data: CitiesData;
  timestamp: number;
};

const fetchCities = async (): Promise<CitiesData | null> => {
  try {
    const cachedCities = localStorage.getItem("cities");
    if (cachedCities) {
      const parsedData: CachedCitiesData = JSON.parse(cachedCities);
      if (Date.now() - parsedData.timestamp < CACHE_DURATION) {
        return parsedData.data;
      }
    }

    const response = await fetch("/api/gazprombank");
    const data: { cities: CitiesData } = await response.json();
    /*const { cities } = await response.json();
    if (cities) {.. Какой вариант лучше c заданной типизацией или автоматической ?*/
    if (data?.cities) {
      const dataToCache = {
        data: data.cities,
        timestamp: Date.now(),
      };
      localStorage.setItem("cities", JSON.stringify(dataToCache));
      return data.cities;
    }
    return null;
  } catch (error: unknown) {
    console.error("Ошибка при загрузку данных:", error);
    return null;
  }
};

const CitiesContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchingCity, setSearchingCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedCity") || "Мурманск";
    }
    return "Мурманск";
  });

  const {
    data: cities,
    isError,
    isLoading,
  } = useQuery<CitiesData | null, Error>({
    queryKey: ["cities"], //Кэшируем данные по уникальному ключу
    queryFn: fetchCities,
    staleTime: CACHE_DURATION, //Повторяет запрос через ...
  });

  const toggleMenu = useCallback((): void => {
    if (!isOpen) {
      setIsOpen(!isOpen);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsOpen(false), 200);
    }
  }, [isOpen]);

  const filteredCities = useMemo(() => {
    if (!cities) return {};
    if (!searchingCity) return cities;

    const result: CitiesData = {};
    const search = searchingCity.toLowerCase();

    Object.keys(cities).forEach((letter) => {
      const filtered = cities[letter].filter((city) =>
        city.name.toLowerCase().includes(search)
      );
      if (filtered.length > 0) {
        result[letter] = filtered;
      }
    });
    return result;
  }, [cities, searchingCity]);

  const handleCitySelect = useCallback((city: string) => {
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 200);
  }, []);

  if (isError)
    return <div className="p-4 text-red-500">Ошибка загрузки данных</div>;

  if (isLoading || !cities) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <button onClick={toggleMenu} className="cursor-pointer text-[#4768BF] ">
        {selectedCity}
      </button>

      {isOpen && (
        <CitiesModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        >
          <CitySearchInput value={searchingCity} onChange={setSearchingCity} />
          <CitiesList cities={filteredCities} onSelect={handleCitySelect} />
        </CitiesModal>
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
