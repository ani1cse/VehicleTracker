import React, { createContext, useState, useEffect } from "react";
import { fetchVehicles, saveVehicles } from "../api/jsonbin";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [settings, setSettings] = useState({
    currency: "$",
    distanceUnit: "km",
    fuelUnit: "liters"
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchVehicles();
      setVehicles(data.vehicles || []);
      if (data.settings) setSettings(data.settings);
    };
    loadData();
  }, []);

  const saveData = async (newVehicles, newSettings) => {
    await saveVehicles({ vehicles: newVehicles, settings: newSettings || settings });
  };

  const addMaintenance = (vehicleId, log) => {
    const updated = vehicles.map((v) => {
      if (v.id === vehicleId) {
        return { ...v, maintenanceLogs: [...v.maintenanceLogs, log], odo: log.odo };
      }
      return v;
    });
    setVehicles(updated);
    saveData(updated);
  };

  const addFuelLog = (vehicleId, log) => {
    const updated = vehicles.map((v) => {
      if (v.id === vehicleId) {
        return { ...v, fuelLogs: [...v.fuelLogs, log], odo: log.odo };
      }
      return v;
    });
    setVehicles(updated);
    saveData(updated);
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    saveData(vehicles, newSettings);
  };

  return (
    <VehicleContext.Provider value={{ vehicles, settings, addMaintenance, addFuelLog, updateSettings }}>
      {children}
    </VehicleContext.Provider>
  );
};
