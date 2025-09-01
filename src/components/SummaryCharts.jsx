import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

const SummaryCharts = () => {
  const { vehicles, settings } = useContext(VehicleContext);

  const convertDistance = (val) =>
    settings.distanceUnit === "mi" ? (val * 0.621371).toFixed(2) : val;

  const convertFuel = (val) =>
    settings.fuelUnit === "gallons" ? (val * 0.264172).toFixed(2) : val;

  const fuelData = vehicles.map(v => {
    const totalFuel = v.fuelLogs?.reduce((sum, log) => sum + log.fuelQty, 0) || 0;
    return { name: v.number, fuel: parseFloat(convertFuel(totalFuel)) };
  });

  const expenseData = vehicles.map(v => {
    const totalExpense = v.maintenanceLogs?.reduce((sum, log) => sum + log.cost, 0) || 0;
    return { name: v.number, expense: totalExpense };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="p-2 border rounded bg-white">
        <h3 className="font-semibold mb-2">Fuel Usage ({settings.fuelUnit})</h3>
        <BarChart width={350} height={250} data={fuelData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="fuel" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="p-2 border rounded bg-white">
        <h3 className="font-semibold mb-2">Expenses ({settings.currency})</h3>
        <BarChart width={350} height={250} data={expenseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="expense" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default SummaryCharts;
