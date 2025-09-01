import React, { useState, useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function FuelLogForm({ vehicle }) {
  const { updateVehicle } = useContext(VehicleContext);
  const [liters, setLiters] = useState("");
  const [odo, setOdo] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastOdo = vehicle.fuelLogs.length ? vehicle.fuelLogs[vehicle.fuelLogs.length-1].odo : vehicle.odo;
    const distance = Number(odo) - lastOdo;
    const mileage = distance / Number(liters);
    const newLog = { id: Date.now(), odo: Number(odo), liters: Number(liters), distance, mileage, price: Number(price) };
    updateVehicle(vehicle.id, { fuelLogs: [...vehicle.fuelLogs, newLog] });
    setOdo(""); setLiters(""); setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <input type="number" placeholder="ODO Reading" value={odo} onChange={e => setOdo(e.target.value)} required className="border p-2 rounded" />
      <input type="number" placeholder="Fuel (liters)" value={liters} onChange={e => setLiters(e.target.value)} required className="border p-2 rounded" />
      <input type="number" placeholder="Fuel Price" value={price} onChange={e => setPrice(e.target.value)} required className="border p-2 rounded" />
      <button className="bg-green-500 text-white p-2 rounded">Add Fuel Log</button>
    </form>
  );
}
