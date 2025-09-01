import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

const VehicleList = () => {
  const { vehicles, deleteVehicle, settings } = useContext(VehicleContext);

  const convertDistance = (val) =>
    settings.distanceUnit === "mi" ? (val * 0.621371).toFixed(2) : val;

  const convertFuel = (val) =>
    settings.fuelUnit === "gallons" ? (val * 0.264172).toFixed(2) : val;

  const calculateMileage = (logs) => {
    if (!logs || logs.length < 2) return 0;
    const sorted = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
    let totalDist = sorted[sorted.length - 1].odo - sorted[0].odo;
    let totalFuel = sorted.reduce((sum, log) => sum + log.fuelQty, 0);
    if (settings.distanceUnit === "mi") totalDist *= 0.621371;
    if (settings.fuelUnit === "gallons") totalFuel *= 0.264172;
    return totalFuel ? (totalDist / totalFuel).toFixed(2) : 0;
  };

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="font-semibold text-lg mb-2">Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles added.</p>
      ) : (
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Number</th>
              <th className="border px-2 py-1">ODO ({settings.distanceUnit})</th>
              <th className="border px-2 py-1">Mileage ({settings.distanceUnit}/{settings.fuelUnit})</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => {
              const lastOdo = v.fuelLogs?.length ? v.fuelLogs[v.fuelLogs.length - 1].odo : 0;
              const mileage = calculateMileage(v.fuelLogs);
              return (
                <tr key={v.id}>
                  <td className="border px-2 py-1">{v.number}</td>
                  <td className="border px-2 py-1">{convertDistance(lastOdo)}</td>
                  <td className="border px-2 py-1">{mileage}</td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => deleteVehicle(v.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehicleList;
