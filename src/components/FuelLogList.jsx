import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function FuelLogList({ vehicle }) {
  const { distanceUnit, fuelUnit, currency } = useContext(VehicleContext);

  const calculateMileage = (log, prevLog) => {
    if (!prevLog) return 0;
    const distance = log.odo - prevLog.odo;
    const fuelUsed = log.fuelQty;
    return distance / fuelUsed;
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">{vehicle.name} Fuel Logs All</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">ODO ({distanceUnit})</th>
            <th className="border p-2">Fuel ({fuelUnit})</th>
            <th className="border p-2">Price ({currency})</th>
            <th className="border p-2">Mileage ({distanceUnit}/{fuelUnit})</th>
          </tr>
        </thead>
        <tbody>
          {vehicle.fuelLogs.map((log, idx) => {
            const mileage = idx > 0 ? calculateMileage(log, vehicle.fuelLogs[idx-1]).toFixed(2) : "-";
            return (
              <tr key={idx}>
                <td className="border p-2">{log.date}</td>
                <td className="border p-2">{log.odo}</td>
                <td className="border p-2">{log.fuelQty}</td>
                <td className="border p-2">{log.price}</td>
                <td className="border p-2">{mileage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
