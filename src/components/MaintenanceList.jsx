import React, { useContext } from "react";
import { VehicleContext } from "../context/VehicleContext";

export default function MaintenanceList({ vehicle }) {
  const { settings, vehicles } = useContext(VehicleContext);

  console.log("All vehicles:", vehicles);
  console.log("Current vehicle:", vehicle);
  console.log("Maintenance logs:", vehicle.maintenanceLogs);

  return (
    // your table JSX
  );
}
