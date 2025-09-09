import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function MaintenanceList({ vehicle }) {
  const { settings } = useContext(VehicleContext);

  return (
    <div className="mb-2">
      <h4 className="font-semibold">Maintenance & Expenses</h4>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">ODO Reading</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Cost ({settings.currency})</th>
          </tr>
        </thead>
        <tbody>
          {vehicle.maintenance.map((m, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{m.date}</td>
              <td className="border px-2 py-1">{m.odo}</td>
              <td className="border px-2 py-1">{m.type}</td>
              <td className="border px-2 py-1">{m.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
