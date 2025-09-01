import React, { createContext, useState, useEffect } from "react";
import { fetchVehicles, saveVehicles } from "../api/jsonbin";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [currency, setCurrency] = useState("$");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [fuelUnit, setFuelUnit] = useState("liters");

  useEffect(() => {
    fetchVehicles().then(setVehicles);
  }, []);

  useEffect(() => {
    if (vehicles.length) saveVehicles(vehicles);
  }, [vehicles]);

  const addVehicle = (vehicle) => setVehicles([...vehicles, vehicle]);
  const updateVehicle = (id, data) =>
    setVehicles(vehicles.map(v => (v.id === id ? { ...v, ...data } : v)));
  const deleteVehicle = (id) => setVehicles(vehicles.filter(v => v.id !== id));

  return (
    <VehicleContext.Provider value={{
  vehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  currency,
  setCurrency,
  distanceUnit,
  setDistanceUnit,
  fuelUnit,
  setFuelUnit
}}>
      {children}
    </VehicleContext.Provider>
  );
};
