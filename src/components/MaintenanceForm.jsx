import React, { useState, useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

const MaintenanceForm = () => {
  const { vehicles, addMaintenance, settings } = useContext(VehicleContext);
  const [vehicleId, setVehicleId] = useState("");
  const [odo, setOdo] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleId || !odo || !description || !cost) return;

    addMaintenance(vehicleId, {
      id: Date.now(),
      odo: parseFloat(odo),
      description,
      cost: parseFloat(cost),
      date: new Date().toISOString(),
    });

    setVehicleId("");
    setOdo("");
    setDescription("");
    setCost("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white space-y-2">
      <h2 className="text-lg font-semibold">Add Maintenance / Expense</h2>

      <select
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        className="w-full border rounded px-2 py-1"
      >
        <option value="">Select Vehicle</option>
        {vehicles.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name} {v.model} ({v.number})
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder={`ODO (${settings.distanceUnit})`}
        value={odo}
        onChange={(e) => setOdo(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />

      <input
        type="number"
        placeholder={`Cost (${settings.currency})`}
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default MaintenanceForm;
