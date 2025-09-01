import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function FuelLogList({ vehicle }) {
  const { settings } = useContext(VehicleContext);

  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Fuel Logs</h4>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Fuel ({settings.fuelUnit})</th>
            <th className="border px-2 py-1">Price ({settings.currency})</th>
            <th className="border px-2 py-1">ODO ({settings.distanceUnit})</th>
            <th className="border px-2 py-1">Mileage ({settings.distanceUnit}/{settings.fuelUnit})</th>
          </tr>
        </thead>
        <tbody>
          {vehicle.fuelLogs.map((log, i) => {
            const prev = i > 0 ? vehicle.fuelLogs[i - 1] : null;
            const distance = prev ? log.odo - prev.odo : 0;
            const mileage = distance && log.amount ? (distance / log.amount).toFixed(2) : "-";
            return (
              <tr key={i}>
                <td className="border px-2 py-1">{log.date}</td>
                <td className="border px-2 py-1">{log.amount}</td>
                <td className="border px-2 py-1">{log.price}</td>
                <td className="border px-2 py-1">{log.odo}</td>
                <td className="border px-2 py-1">{mileage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
