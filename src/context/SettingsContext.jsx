import React, { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrency] = useState("$");
  const [distanceUnit, setDistanceUnit] = useState("km");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    const savedDistanceUnit = localStorage.getItem("distanceUnit");
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedDistanceUnit) setDistanceUnit(savedDistanceUnit);
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
    localStorage.setItem("distanceUnit", distanceUnit);
  }, [currency, distanceUnit]);

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, distanceUnit, setDistanceUnit }}>
      {children}
    </SettingsContext.Provider>
  );
};
