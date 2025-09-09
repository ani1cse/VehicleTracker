import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";
import FuelLogForm from "./FuelLogForm";
import MaintenanceForm from "./MaintenanceForm";

export default function VehicleList() {
  const { vehicles, deleteVehicle } = useContext(VehicleContext);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {vehicles.map(v => (
        <div key={v.id} className="p-4 border rounded">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{v.number} (ODO: {v.odo})</h3>
            <button className="bg-red-500 text-white p-1 rounded" onClick={()=>deleteVehicle(v.id)}>Delete</button>
          </div>

          <FuelLogForm vehicle={v}/>
          <MaintenanceForm vehicle={v}/>

          <div className="mt-2">
            <h4 className="font-semibold">Fuel Logs</h4>
            <ul>
              {v.fuelLogs.map(f => <li key={f.id}>ODO: {f.odo} | Fuel: {f.liters} | Mileage: {f.mileage.toFixed(2)} | Price: {f.price}</li>)}
            </ul>
          </div>

          <div className="mt-2">
            <h4 className="font-semibold">Maintenance Logs</h4>
            <ul>
              {v.maintenanceLogs.map(m => <li key={m.id}> Date: {m.date} |Maintenance Type: {m.type}| ODO: {m.odo} | Cost: {m.cost}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
