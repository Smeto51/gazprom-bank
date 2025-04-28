"use client";

import { createContext, useContext, useState } from "react";

type City = {
  id: string;
  name: string;
};

type CityContextType = {
  cityChanged: City[];
  setCityChanged: (cities: City[]) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [cityChanged, setCityChanged] = useState<City[]>([]);

  return (
    <CityContext.Provider value={{ cityChanged, setCityChanged }}>
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
