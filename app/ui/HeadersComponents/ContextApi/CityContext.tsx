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
