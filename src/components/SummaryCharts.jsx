import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SummaryCharts() {
  const { vehicles, distanceUnit, fuelUnit, currency } = useContext(VehicleContext);

  const chartData = vehicles.map(v => {
    const totalFuel = v.fuelLogs.reduce((sum, log) => sum + log.fuelQty, 0);
    const totalDistance = v.fuelLogs.length > 1
      ? v.fuelLogs[v.fuelLogs.length - 1].odo - v.fuelLogs[0].odo
      : 0;
    const avgMileage = totalFuel > 0 ? (totalDistance / totalFuel).toFixed(2) : 0;
    const totalPrice = v.fuelLogs.reduce((sum, log) => sum + log.price, 0);

    return {
      name: v.name,
      totalFuel,
      totalDistance,
      avgMileage,
      totalPrice
    };
  });

  return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">Summary Charts</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name) => {
            if (name === "totalFuel") return [`${value} ${fuelUnit}`, "Fuel"];
            if (name === "totalDistance") return [`${value} ${distanceUnit}`, "Distance"];
            if (name === "avgMileage") return [`${value} ${distanceUnit}/${fuelUnit}`, "Mileage"];
            if (name === "totalPrice") return [`${currency} ${value}`, "Cost"];
            return value;
          }} />
          <Bar dataKey="totalFuel" fill="#8884d8" />
          <Bar dataKey="totalDistance" fill="#82ca9d" />
          <Bar dataKey="avgMileage" fill="#ffc658" />
          <Bar dataKey="totalPrice" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
