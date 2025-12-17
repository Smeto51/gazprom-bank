"use client";

import { getBrowserName } from "@/app/utils/getBrowserName";
import { createContext, useContext, useEffect, useState } from "react";

type City = {
  id: string;
  name: string;
};

type CityContextType = {
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  cityChanged: City[];
  setCityChanged: (cities: City[]) => void;
};

type BankCity = {
  id: string;
  name: string;
  nameWithRegion?: string;
  lat: string;
  lng: string;
};

type BankCitiesResponse = {
  cities: Record<string, BankCity[]>;
};

const flattenCities = (data: BankCitiesResponse): BankCity[] => {
  const citiesObjectToArray = Object.values(data.cities);
  return citiesObjectToArray.flat();
};

const haversineKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;
  const toRad = (v: number) => (v * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const findNearestCity = (
  cities: BankCity[],
  userLat: number,
  userLng: number
) => {
  let nearest = null;
  let minDistance = Infinity;

  for (const city of cities) {
    const lat = Number(city.lat);
    const lng = Number(city.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    const distance = haversineKm(userLat, userLng, lat, lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = city;
    }
  }
  return nearest;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCityState, setSelectedCityState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedCity") || "Мурманск";
    }
    return "Мурманск";
  });

  const [cityChanged, setCityChanged] = useState<City[]>([]);

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCity", city);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedCity");
      if (saved && saved !== selectedCityState) {
        setSelectedCityState(saved);
      }
    }
  }, [selectedCityState]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("selectCity");
    if (saved) return;
    if (!("geolocation" in navigator)) return;

    let cancelled = false;

    const run = async () => {
      try {
        const response = await fetch("/api/gazprombank");
        const browserName = getBrowserName(navigator.userAgent);
        console.log(`Ваш браузер: ${browserName}`);
        if (!response.ok) return;
        const data = (await response.json()) as BankCitiesResponse;

        const allCities = flattenCities(data);
        if (allCities.length === 0) return 0;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (cancelled) return;

            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const nearestCity = findNearestCity(allCities, userLat, userLng);

            if (!nearestCity) return;

            setSelectedCity(nearestCity.name);
          },
          () => {},
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 60000,
          }
        );
        //console.log("allCities", allCities);
      } catch (e) {
        console.error("Ошибка определения города", e);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <CityContext.Provider
      value={{
        selectedCity: selectedCityState,
        setSelectedCity,
        cityChanged,
        setCityChanged,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context)
    throw new Error("useCity необходимо использовать в CityProvider");
  return context;
};

type CititesModalType = {
  isCitiesOpen: boolean;
  setIsCitiesOpen: (value: boolean) => void;
};

const CititesModalContext = createContext<CititesModalType | undefined>(
  undefined
);

export const CitiesModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);

  return (
    <CititesModalContext.Provider value={{ isCitiesOpen, setIsCitiesOpen }}>
      {children}
    </CititesModalContext.Provider>
  );
};

export const useCititesModal = () => {
  const context = useContext(CititesModalContext);
  if (!context)
    throw new Error(
      "useCitiesModal необходимо использовать в CitiesModalProvider"
    );
  return context;
};
