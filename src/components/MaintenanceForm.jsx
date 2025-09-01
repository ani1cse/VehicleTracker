import React, { useState, useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function MaintenanceForm({ vehicle }) {
  const { updateVehicle } = useContext(VehicleContext);
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const newLog = { id: Date.now(), description: desc, cost: Number(cost) };
    updateVehicle(vehicle.id, { maintenanceLogs: [...vehicle.maintenanceLogs, newLog] });
    setDesc(""); setCost("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <input type="text" placeholder="Maintenance Description" value={desc} onChange={e=>setDesc(e.target.value)} required className="border p-2 rounded"/>
      <input type="number" placeholder="Cost" value={cost} onChange={e=>setCost(e.target.value)} required className="border p-2 rounded"/>
      <button className="bg-yellow-500 text-white p-2 rounded">Add Maintenance</button>
    </form>
  );
}
