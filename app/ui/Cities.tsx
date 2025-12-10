"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import CitySearchInput from "./CitiesComponents/CitiesSearchInput";
import CitiesList from "./CitiesComponents/CitiesDisplayList";
import CitiesModal from "./CitiesComponents/CitiesModal";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useCity } from "./HeadersComponents/ContextApi/CityContext";

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

type CitiesContentProps = {
  onCityChange?: () => void;
  onOpenChange?: (isOpenMobile: boolean) => void;
};

const CitiesContent = ({ onCityChange, onOpenChange }: CitiesContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchingCity, setSearchingCity] = useState("");
  const { selectedCity, setSelectedCity } = useCity();

  const [initialCityLoaded, setInitialCityLoaded] = useState(false);

  const {
    data: cities,
    isError,
    isLoading,
  } = useQuery<CitiesData | null, Error>({
    queryKey: ["cities"], //Кэшируем данные по уникальному ключу
    queryFn: fetchCities,
    staleTime: CACHE_DURATION, //Повторяет запрос через ...
  });

  useEffect(() => {
    if (!initialCityLoaded && !isLoading) {
      setInitialCityLoaded(true);
      onCityChange?.();
    }
  }, [onCityChange, initialCityLoaded, isLoading]);

  const toggleMenu = useCallback((): void => {
    if (!isOpen) {
      setIsOpen(!isOpen);
      onOpenChange?.(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      onOpenChange?.(false);

      setTimeout(() => setIsOpen(false), 200);
    }
  }, [isOpen, onOpenChange]);

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

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const handleCitySelect = useCallback(
    (city: string) => {
      setSelectedCity(city);
      localStorage.setItem("selectedCity", city);
      setIsVisible(false);
      onOpenChange?.(false);
      setTimeout(() => setIsOpen(false), 200);
      onCityChange?.();
    },
    [onCityChange, onOpenChange, setSelectedCity]
  );

  if (isError)
    return <div className="p-4 text-red-500">Ошибка загрузки данных</div>;

  if (isLoading || !cities) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className="cursor-pointer text-[#4768BF] whitespace-nowrap"
      >
        <span className="-mr-4">{selectedCity}</span>
      </button>

      {isOpen && (
        <CitiesModal
          isVisible={isVisible}
          onClose={handleCloseModal}
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

type CitiesProps = {
  onCityChange?: () => void;
  onOpenChange?: (isOpenMobile: boolean) => void;
};

const Cities = ({ onCityChange, onOpenChange }: CitiesProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CitiesContent onCityChange={onCityChange} onOpenChange={onOpenChange} />
    </QueryClientProvider>
  );
};

export default Cities;
