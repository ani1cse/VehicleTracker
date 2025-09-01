import React, { useState, useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";
import { nanoid } from "nanoid";

export default function VehicleForm() {
  const { addVehicle } = useContext(VehicleContext);
  const [number, setNumber] = useState("");
  const [odo, setOdo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle({ id: nanoid(), number, odo: Number(odo), fuelLogs: [], maintenance: [], expenses: [] });
    setNumber(""); setOdo("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded bg-gray-50">
      <h3 className="font-bold mb-2">Add Vehicle</h3>
      <input placeholder="Vehicle Number" value={number} onChange={e => setNumber(e.target.value)} className="border p-1 mr-2 rounded" />
      <input placeholder="ODO" type="number" value={odo} onChange={e => setOdo(e.target.value)} className="border p-1 mr-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
    </form>
  );
}
