import React, { useContext, useState } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function Settings() {
  const { currency, setCurrency, distanceUnit, setDistanceUnit } = useContext(VehicleContext);
  const [localCurrency, setLocalCurrency] = useState(currency);
  const [localDistance, setLocalDistance] = useState(distanceUnit);

  const handleSave = () => {
    setCurrency(localCurrency);
    setDistanceUnit(localDistance);
    alert("Settings updated!");
  };

  return (
    <div className="p-4 border rounded my-4">
      <h2 className="font-bold mb-2">Settings</h2>

      <div className="flex flex-col gap-2">
        <label>
          Currency:
          <input
            type="text"
            value={localCurrency}
            onChange={e => setLocalCurrency(e.target.value)}
            className="border p-1 rounded ml-2"
          />
        </label>

        <label>
          Distance Unit:
          <select
            value={localDistance}
            onChange={e => setLocalDistance(e.target.value)}
            className="border p-1 rounded ml-2"
          >
            <option value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </label>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
