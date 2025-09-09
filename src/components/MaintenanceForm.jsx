import React, { useState, useContext } from "react";
import { saveMaintenance } from "../api/jsonbin";
import { VehicleContext } from "../context/VehicleContext";

export default function MaintenanceForm({ vehicle }) {
  const { setVehicles } = useContext(VehicleContext);
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [odo, setOdo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicle?.id) {
      console.error("No vehicle selected");
      return;
    }

    const newRecord = {
      type: type.trim(),
      cost: parseFloat(cost),
      date,
      odo: parseInt(odo, 10)
    };

    const updatedVehicles = await saveMaintenance(vehicle.id, newRecord);
    setVehicles(updatedVehicles);

    // Clear form
    setType("");
    setCost("");
    setDate("");
    setOdo("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block font-medium">Maintenance Type</label>
        <input
          type="text"
          placeholder="e.g. Engine Oil Change"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Cost</label>
        <input
          type="number"
          placeholder="e.g. 7800"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">ODO Reading</label>
        <input
          type="number"
          placeholder="e.g. 79695"
          value={odo}
          onChange={(e) => setOdo(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Maintenance
      </button>
    </form>
  );
}
