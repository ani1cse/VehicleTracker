import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function MaintenanceLogList({ vehicle }) {
  const { distanceUnit, currency } = useContext(VehicleContext);

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">{vehicle.name} Maintenance Logs</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">ODO ({distanceUnit})</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Cost ({currency})</th>
          </tr>
        </thead>
        <tbody>
          {(vehicle.maintenanceLogs || []).map((log, idx) => (
            <tr key={log.id || idx}>
              <td className="border p-2">{log.date || "—"}</td>
              <td className="border p-2">{log.odo ?? "—"}</td>
              <td className="border p-2">{log.type || "—"}</td>
              <td className="border p-2">{log.cost ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}