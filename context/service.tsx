"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ServiceContextType = {
  service: string;
  setService: (service: string) => void;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }
  return context;
};

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [service, setService] = useState<string>("");

  return (
    <ServiceContext.Provider value={{ service, setService }}>
      {children}
    </ServiceContext.Provider>
  );
};
