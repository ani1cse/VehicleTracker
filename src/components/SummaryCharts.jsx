import React, { useContext, useState } from "react";
import { VehicleContext } from "../context/VehicleContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function SummaryCharts() {
  const { vehicles, settings, updateSettings } = useContext(VehicleContext);
  const [view, setView] = useState("costs");

  const hiddenKeys = settings.hiddenKeys || [];

  const handleLegendClick = (o) => {
    const { dataKey } = o;
    const updatedKeys = hiddenKeys.includes(dataKey)
      ? hiddenKeys.filter((key) => key !== dataKey)
      : [...hiddenKeys, dataKey];
    updateSettings({ hiddenKeys: updatedKeys });
  };

  // Data prep
  const costData = vehicles.map(v => ({
    name: v.name || v.number,
    fuelCost: v.fuelLogs.reduce((sum, log) => sum + (log.price || 0), 0),
    maintenanceCost: (v.maintenanceLogs || []).reduce((sum, log) => sum + (log.cost || 0), 0)
  }));

  const usageData = vehicles.map(v => ({
    name: v.name || v.number,
    distance: v.fuelLogs.length > 1
      ? v.fuelLogs[v.fuelLogs.length - 1].odo - v.fuelLogs[0].odo
      : 0,
    fuelQty: v.fuelLogs.reduce((sum, log) => sum + (log.fuelQty || 0), 0)
  }));

  const combinedData = vehicles.map(v => ({
    name: v.name || v.number,
    fuelCost: v.fuelLogs.reduce((sum, log) => sum + (log.price || 0), 0),
    maintenanceCost: (v.maintenanceLogs || []).reduce((sum, log) => sum + (log.cost || 0), 0),
    distance: v.fuelLogs.length > 1
      ? v.fuelLogs[v.fuelLogs.length - 1].odo - v.fuelLogs[0].odo
      : 0,
    fuelQty: v.fuelLogs.reduce((sum, log) => sum + (log.fuelQty || 0), 0)
  }));

  const chartData =
    view === "costs" ? costData : view === "usage" ? usageData : combinedData;

  const colors = {
    fuelCost: "#ff7300",
    maintenanceCost: "#ff0000",
    distance: "#82ca9d",
    fuelQty: "#8884d8"
  };

  const renderColorfulLegendText = (value) => {
    const isHidden = hiddenKeys.includes(value);
    return (
      <span
        style={{
          color: colors[value] || "#000",
          fontWeight: 500,
          opacity: isHidden ? 0.4 : 1,
          textDecoration: isHidden ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {value === "fuelCost"
          ? "Fuel Cost"
          : value === "maintenanceCost"
          ? "Maintenance Cost"
          : value === "distance"
          ? "Distance"
          : value === "fuelQty"
          ? "Fuel Quantity"
          : value}
      </span>
    );
  };

  return (
    <div className="mt-6">
      {/* Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Summary Charts</h2>
        <div className="flex gap-2">
          {["costs", "usage", "combined"].map(type => (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`px-4 py-1 rounded transition-all duration-300 transform 
                ${view === type
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
                }`}
            >
              {type === "costs"
                ? "Costs"
                : type === "usage"
                ? "Usage"
                : "Combined"}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          {view === "combined" ? (
            <>
              <YAxis yAxisId="left" orientation="left" stroke={colors.fuelCost} />
              <YAxis yAxisId="right" orientation="right" stroke={colors.distance} />
            </>
          ) : (
            <YAxis />
          )}
          <Tooltip
            formatter={(value, name) => {
              if (view === "costs" || view === "combined") {
                if (name === "fuelCost") return [`${settings.currency} ${value}`, "Fuel Cost"];
                if (name === "maintenanceCost") return [`${settings.currency} ${value}`, "Maintenance Cost"];
              }
              if (view === "usage" || view === "combined") {
                if (name === "distance") return [`${value} ${settings.distanceUnit}`, "Distance"];
                if (name === "fuelQty") return [`${value} ${settings.fuelUnit}`, "Fuel Quantity"];
              }
              return [value, name];
            }}
          />
          <Legend
            formatter={renderColorfulLegendText}
            onClick={handleLegendClick}
          />
          {view === "costs" && (
            <>
              {!hiddenKeys.includes("fuelCost") && (
                <Bar dataKey="fuelCost" stackId="cost" fill={colors.fuelCost} isAnimationActive animationDuration={800} />
              )}
              {!hiddenKeys.includes("maintenanceCost") && (
                <Bar dataKey="maintenanceCost" stackId="cost" fill={colors.maintenanceCost} isAnimationActive animationDuration={800} />
              )}
            </>
          )}
          {view === "usage" && (
            <>
              {!hiddenKeys.includes("distance") && (
                <Bar dataKey="distance" stackId="usage" fill={colors.distance} isAnimationActive animationDuration={800} />
              )}
              {!hiddenKeys.includes("fuelQty") && (
                <Bar dataKey="fuelQty" stackId="usage" fill={colors.fuelQty} isAnimationActive animationDuration={800} />
              )}
            </>
          )}
          {view === "combined" && (
            <>
              {!hiddenKeys.includes("fuelCost") && (
                <Bar yAxisId="left" dataKey="fuelCost" stackId="cost" fill={colors.fuelCost} isAnimationActive animationDuration={800} />
              )}
              {!hiddenKeys.includes("maintenanceCost") && (
                <Bar yAxisId="left" dataKey="maintenanceCost" stackId="cost" fill={colors.maintenanceCost} isAnimationActive animationDuration={800} />
              )}
              {!hiddenKeys.includes("distance") && (
                <Bar yAxisId="right" dataKey="distance" stackId="usage" fill={colors.distance} isAnimationActive animationDuration={800} />
              )}
              {!hiddenKeys.includes("fuelQty") && (
                <Bar yAxisId="right" dataKey="fuelQty" stackId="usage" fill={colors.fuelQty} isAnimationActive animationDuration={800} />
              )}
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}