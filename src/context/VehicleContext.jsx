import React, { createContext, useState, useEffect } from "react";
import { fetchVehicles, saveSettings } from "../api/jsonbin";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [settings, setSettings] = useState({
    currency: "৳",
    distanceUnit: "km",
    fuelUnit: "L",
    hiddenKeys: [],
  });

  useEffect(() => {
    fetchVehicles().then(({ vehicles: v, settings: s }) => {
      setVehicles(v || []);
      if (s) setSettings((prev) => ({ ...prev, ...s }));
    });
  }, []);

  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await saveSettings(newSettings);
  };

  return (
    <VehicleContext.Provider
      value={{ vehicles, setVehicles, settings, updateSettings }}
    >
      {children}
    </VehicleContext.Provider>
  );
};