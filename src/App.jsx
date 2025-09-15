import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import AuthForm from "./components/AuthForm";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import useUserRole from "./hooks/useUserRole";
import SummaryCharts from "./components/SummaryCharts";
import Settings from "./components/Settings";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState(undefined);
  const role = useUserRole();
  const [fuelLogs, setFuelLogs] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch logs for charts
  useEffect(() => {
    if (!auth.currentUser || !role) return;

    let vehicleQuery;
    if (role === "admin") {
      vehicleQuery = collection(db, "vehicles");
    } else {
      vehicleQuery = query(
        collection(db, "vehicles"),
        where("ownerId", "==", auth.currentUser.uid)
      );
    }

    const unsubVehicles = onSnapshot(vehicleQuery, (vehicleSnap) => {
      const vehicleIds = vehicleSnap.docs.map((doc) => doc.id);

      // Listen to all fuel logs
      const fuelUnsubs = vehicleIds.map((vid) =>
        onSnapshot(collection(db, "vehicles", vid, "fuelLogs"), (snap) => {
          setFuelLogs((prev) => {
            const filtered = prev.filter((f) => f.vehicleId !== vid);
            const newLogs = snap.docs.map((d) => ({
              vehicleId: vid,
              id: d.id,
              ...d.data()
            }));
            return [...filtered, ...newLogs];
          });
        })
      );

      // Listen to all maintenance logs
      const maintUnsubs = vehicleIds.map((vid) =>
        onSnapshot(collection(db, "vehicles", vid, "maintenanceLogs"), (snap) => {
          setMaintenanceLogs((prev) => {
            const filtered = prev.filter((m) => m.vehicleId !== vid);
            const newLogs = snap.docs.map((d) => ({
              vehicleId: vid,
              id: d.id,
              ...d.data()
            }));
            return [...filtered, ...newLogs];
          });
        })
      );

      return () => {
        fuelUnsubs.forEach((u) => u());
        maintUnsubs.forEach((u) => u());
      };
    });

    return () => unsubVehicles();
  }, [role]);

  if (user === undefined) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return <AuthForm onAuthSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <div className="flex gap-2 items-center">
          <span className="text-sm">Role: {role}</span>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <VehicleForm />
      <VehicleList role={role} />

      {role === "admin" && (
        <>
          <SummaryCharts fuelLogs={fuelLogs} maintenanceLogs={maintenanceLogs} />
          <Settings />
        </>
      )}
    </div>
  );
}