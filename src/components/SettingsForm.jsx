import React, { useContext, useState, useEffect } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function SettingsForm() {
  const { settings, updateSettings } = useContext(VehicleContext);

  const [currency, setCurrency] = useState(settings.currency || "৳");
  const [distanceUnit, setDistanceUnit] = useState(settings.distanceUnit || "km");
  const [fuelUnit, setFuelUnit] = useState(settings.fuelUnit || "L");

  // Live update settings on change
  useEffect(() => {
    updateSettings({ currency, distanceUnit, fuelUnit });
  }, [currency, distanceUnit, fuelUnit]);

  return (
    <div className="p-4 border rounded mb-6 bg-gray-50">
      <h3 className="font-bold mb-3">⚙ Settings</h3>
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        
        {/* Currency */}
        <label className="flex flex-col">
          <span className="font-semibold">Currency:</span>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border p-2 rounded"
            placeholder="e.g. ৳, $, €, ₹"
          />
        </label>

        {/* Distance Unit */}
        <label className="flex flex-col">
          <span className="font-semibold">Distance Unit:</span>
          <select
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="km">Kilometers (km)</option>
            <option value="mi">Miles (mi)</option>
          </select>
        </label>

        {/* Fuel Unit */}
        <label className="flex flex-col">
          <span className="font-semibold">Fuel Unit:</span>
          <select
            value={fuelUnit}
            onChange={(e) => setFuelUnit(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="L">Liters (L)</option>
            <option value="gal">Gallons (gal)</option>
          </select>
        </label>

        <p className="text-sm text-gray-500">
          Changes are saved automatically and applied instantly.
        </p>
      </form>
    </div>
  );
}