import React from "react";
import { VehicleProvider } from "./context/VehicleContext";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import SummaryCharts from "./components/SummaryCharts";
import Settings from "./components/Settings";

export default function App() {
  return (
    <VehicleProvider>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Vehicle Management</h1>
        <Settings /> 
        <VehicleForm/>
        <VehicleList/>
        <SummaryCharts/>
      </div>
    </VehicleProvider>
  );
}
