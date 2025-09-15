import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // ✅ Import Filler plugin
} from "chart.js";

// ✅ Register Filler plugin along with others
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SummaryCharts({ fuelLogs, maintenanceLogs }) {
  // Sort logs by date
  const sortedFuel = [...fuelLogs].sort((a, b) => (a.date > b.date ? 1 : -1));
  const sortedMaint = [...maintenanceLogs].sort((a, b) => (a.date > b.date ? 1 : -1));

  const fuelData = {
    labels: sortedFuel.map((f) => f.date),
    datasets: [
      {
        label: "Fuel Liters",
        data: sortedFuel.map((f) => f.liters),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.3)",
        fill: sortedFuel.length > 1 // ✅ Only fill if we have enough points
      }
    ]
  };

  const maintData = {
    labels: sortedMaint.map((m) => m.date),
    datasets: [
      {
        label: "Maintenance Cost",
        data: sortedMaint.map((m) => m.cost),
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.3)",
        fill: sortedMaint.length > 1 // ✅ Only fill if we have enough points
      }
    ]
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 border rounded bg-white dark:bg-gray-800">
        <h2 className="font-bold mb-2">Fuel Usage Over Time</h2>
        <Line data={fuelData} />
      </div>
      <div className="p-4 border rounded bg-white dark:bg-gray-800">
        <h2 className="font-bold mb-2">Maintenance Cost Over Time</h2>
        <Line data={maintData} />
      </div>
    </div>
  );
}