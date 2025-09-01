import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

const SettingsPanel = () => {
  const { settings, setSettings } = useContext(VehicleContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Settings</h2>

      <div className="mb-2">
        <label className="block mb-1">Currency</label>
        <input
          type="text"
          name="currency"
          value={settings.currency}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1">Distance Unit</label>
        <select
          name="distanceUnit"
          value={settings.distanceUnit}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="km">Kilometers</option>
          <option value="mi">Miles</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1">Fuel Unit</label>
        <select
          name="fuelUnit"
          value={settings.fuelUnit}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="liters">Liters</option>
          <option value="gallons">Gallons</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1">Oil Unit</label>
        <select
          name="oilUnit"
          value={settings.oilUnit}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="liters">Liters</option>
          <option value="quarts">Quarts</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;
