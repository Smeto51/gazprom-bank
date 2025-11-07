"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextType = {
  isUsefullWindowOpen: boolean;
  setIsUsefullWindowOpen: (open: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isUsefullWindowOpen, setIsUsefullWindowOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{ isUsefullWindowOpen, setIsUsefullWindowOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext необходимо использовать в ModalProvider");
  }
  return context;
};
