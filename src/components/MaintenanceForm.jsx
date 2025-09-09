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

    const newRecord = {
      type,
      cost: parseFloat(cost),
      date,
      odo: parseInt(odo, 10)
    };

    const updatedVehicles = await saveMaintenance(vehicle.id, newRecord);
    setVehicles(updatedVehicles); // refresh context so UI updates

    // Reset form
    setType("");
    setCost("");
    setDate("");
    setOdo("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Maintenance Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ODO Reading"
        value={odo}
        onChange={(e) => setOdo(e.target.value)}
        required
      />
      <button type="submit">Add Maintenance</button>
    </form>
  );
}
