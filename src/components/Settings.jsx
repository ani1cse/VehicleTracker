import React, { useContext, useState, useEffect } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function Settings() {
  const { settings, updateSettings } = useContext(VehicleContext);

  // Local state mirrors settings for editing
  const [localCurrency, setLocalCurrency] = useState(settings.currency || "৳");
  const [localDistance, setLocalDistance] = useState(settings.distanceUnit || "km");
  const [localFuelUnit, setLocalFuelUnit] = useState(settings.fuelUnit || "L");
  const [darkMode, setDarkMode] = useState(
    settings.theme === "dark" ||
    document.documentElement.classList.contains("dark")
  );

  const [showConfirm, setShowConfirm] = useState(false);

  // Apply theme instantly when toggled
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSave = () => {
    updateSettings({
      currency: localCurrency,
      distanceUnit: localDistance,
      fuelUnit: localFuelUnit,
      theme: darkMode ? "dark" : "light"
    });
    alert("Settings updated and synced!");
  };

  const handleResetConfirmed = () => {
    const defaults = {
      currency: "৳",
      distanceUnit: "km",
      fuelUnit: "L",
      theme: "light"
    };
    setLocalCurrency(defaults.currency);
    setLocalDistance(defaults.distanceUnit);
    setLocalFuelUnit(defaults.fuelUnit);
    setDarkMode(false);
    updateSettings(defaults);
    setShowConfirm(false);
    alert("Settings reset to defaults!");
  };

  return (
    <div className="p-4 border rounded my-4 bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300">
      <h2 className="font-bold mb-4">Settings</h2>

      <div className="flex flex-col gap-4">
        {/* Currency */}
        <label className="flex items-center">
          <span className="w-32">Currency:</span>
          <input
            type="text"
            value={localCurrency}
            onChange={(e) => setLocalCurrency(e.target.value)}
            className="border p-1 rounded flex-1 dark:bg-gray-700 dark:border-gray-600"
          />
        </label>

        {/* Distance Unit */}
        <label className="flex items-center">
          <span className="w-32">Distance Unit:</span>
          <select
            value={localDistance}
            onChange={(e) => setLocalDistance(e.target.value)}
            className="border p-1 rounded flex-1 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </label>

        {/* Fuel Unit */}
        <label className="flex items-center">
          <span className="w-32">Fuel Unit:</span>
          <select
            value={localFuelUnit}
            onChange={(e) => setLocalFuelUnit(e.target.value)}
            className="border p-1 rounded flex-1 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="L">L</option>
            <option value="gal">gal</option>
          </select>
        </label>

        {/* Dark Mode Toggle */}
        <label className="flex items-center">
          <span className="w-32">Theme:</span>
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1 rounded transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 text-gray-100"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {darkMode ? "🌙 Dark Mode" : "☀ Light Mode"}
          </button>
        </label>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save Settings
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Reset</h3>
            <p className="mb-6">
              Are you sure you want to reset all settings to their default values? 
              This will overwrite your current preferences.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleResetConfirmed}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}