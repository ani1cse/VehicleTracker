import React, { useContext, useState } from "react";
import FuelLogForm from "./FuelLogForm";
import { VehicleContext } from "../context/VehicleContext";

export default function VehicleDetails({ vehicle }) {
  const { updateVehicle } = useContext(VehicleContext);
  const [fuelLogs, setFuelLogs] = useState(vehicle.fuelLogs || []);

  const addFuel = (log) => {
    const updatedLogs = [...fuelLogs, log];
    setFuelLogs(updatedLogs);

    const sorted = updatedLogs.sort((a,b)=>a.odo-b.odo);
    let mileage = sorted.map((l,i,a) => i===0 ? 0 : (l.odo - a[i-1].odo) / a[i-1].liters);
    updateVehicle(vehicle.id, { fuelLogs: updatedLogs, mileage });
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="font-bold">{vehicle.number}</h3>
      <FuelLogForm addFuel={addFuel} />
      <ul className="mt-2">
        {fuelLogs.map(f => (
          <li key={f.id}>{`ODO: ${f.odo}, Liters: ${f.liters}, Price: ${f.price}`}</li>
        ))}
      </ul>
    </div>
  );
}
