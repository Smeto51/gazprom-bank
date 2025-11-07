"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextType = {
  isSearchBlockOpen: boolean;
  setIsSearchBlockOpen: (open: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const SearchBlockProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchBlockOpen, setIsSearchBlockOpen] = useState(true);
  return (
    <ModalContext.Provider value={{ isSearchBlockOpen, setIsSearchBlockOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useSearchBlockContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error(
      "useSearchBlockContext необходимо использовать в SearchBlockProvider"
    );
  }
  return context;
};
