import React from "react";
import { VehicleProvider } from "./context/VehicleContext";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import SummaryCharts from "./components/SummaryCharts";
import Settings from "./components/Settings";
import SettingsForm from "./components/SettingsForm";


export default function App() {
  return (
    <VehicleProvider>
      <div className="mt-6 p-4 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Vehicle Management</h1>
        <Settings /> 
        <VehicleForm/>
        <VehicleList/>
        <SummaryCharts/>
      </div>
      </div>
    </VehicleProvider>
  );
}
