import React from "react";
import { VehicleProvider } from "./context/VehicleContext";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import FuelLogForm from "./components/FuelLogForm";
import MaintenanceForm from "./components/MaintenanceForm";
import SettingsPanel from "./components/SettingsPanel";

function App() {
  return (
    <VehicleProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Vehicle Log Manager</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <VehicleForm />
            <FuelLogForm />
            <MaintenanceForm />
            <VehicleList />
          </div>

          <div className="space-y-4">
            <SettingsPanel />
          </div>
        </div>
      </div>
    </VehicleProvider>
  );
}

export default App;
