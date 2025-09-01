import React, { useState, useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

const FuelLogForm = ({ vehicleId }) => {
  const { vehicles, setVehicles } = useContext(VehicleContext);
  const [odo, setOdo] = useState("");
  const [fuelQty, setFuelQty] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [date, setDate] = useState(""); // new state for date

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    const lastOdo = vehicle.fuelLogs?.length
      ? vehicle.fuelLogs[vehicle.fuelLogs.length - 1].odo
      : 0;
    const mileage = (odo - lastOdo) / fuelQty;

    const newLog = { id: Date.now(), odo, fuelQty, fuelPrice, mileage, date };
    vehicle.fuelLogs = [...(vehicle.fuelLogs || []), newLog];
    setVehicles([...vehicles]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="ODO" value={odo} onChange={(e) => setOdo(e.target.value)} />
      <input type="number" placeholder="Fuel Qty" value={fuelQty} onChange={(e) => setFuelQty(e.target.value)} />
      <input type="number" placeholder="Fuel Price" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /> {/* new date input */}
      <button type="submit">Add Fuel Log</button>
    </form>
  );
};

export default FuelLogForm;
