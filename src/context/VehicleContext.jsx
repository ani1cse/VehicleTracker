import React, { createContext, useState, useEffect } from "react";
import { fetchVehicles } from "../api/jsonbin";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [settings, setSettings] = useState({ currency: "৳" });

  useEffect(() => {
    fetchVehicles().then(setVehicles);
  }, []);

  return (
    <VehicleContext.Provider value={{ vehicles, setVehicles, settings }}>
      {children}
    </VehicleContext.Provider>
  );
};
