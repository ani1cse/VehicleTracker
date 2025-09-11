import React, { useState, useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";
import { v4 as uuid } from "uuid";

export default function VehicleForm() {
  const { addVehicle } = useContext(VehicleContext);
  const [number, setNumber] = useState("");
  const [odo, setOdo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle({
      id: uuid(),
      number,
      odo: Number(odo),
      fuelLogs: [],
      maintenanceLogs: []
    });
    setNumber("");
    setOdo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 transition-colors duration-300"
    >
      <input
        type="text"
        placeholder="Vehicle Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
        className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
      <input
        type="number"
        placeholder="ODO Reading"
        value={odo}
        onChange={(e) => setOdo(e.target.value)}
        required
        className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
      <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Vehicle
      </button>
    </form>
  );
}