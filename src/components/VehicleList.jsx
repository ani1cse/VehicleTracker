import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import FuelLogForm from "./FuelLogForm";
import MaintenanceForm from "./MaintenanceForm";

export default function VehicleList({ role }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return; // wait until logged in

    let q;
    if (role === "admin") {
      q = collection(db, "vehicles");
    } else {
      q = query(
        collection(db, "vehicles"),
        where("ownerId", "==", auth.currentUser.uid)
      );
    }

    const unsub = onSnapshot(
      q,
      (snap) => {
        setVehicles(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        console.error("Error fetching vehicles:", err);
      }
    );

    return () => unsub();
  }, [role]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "vehicles", id));
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  };

  return (
    <div className="mt-4">
      {vehicles.map((v) => (
        <div
          key={v.id}
          className="p-4 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 mb-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold">
              {v.number} (ODO: {v.odo})
            </h3>
            {role === "admin" && (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(v.id)}
              >
                Delete
              </button>
            )}
          </div>

          {/* Forms to add logs */}
          <FuelLogForm vehicleId={v.id} />
          <MaintenanceForm vehicleId={v.id} />

          {/* Lists of logs */}
          <FuelLogsList vehicleId={v.id} />
          <MaintenanceLogsList vehicleId={v.id} />
        </div>
      ))}
    </div>
  );
}

function FuelLogsList({ vehicleId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!vehicleId || !auth.currentUser) return;

    const unsub = onSnapshot(
      collection(db, "vehicles", vehicleId, "fuelLogs"),
      (snap) => {
        setLogs(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        console.error("Error fetching fuel logs:", err);
      }
    );

    return () => unsub();
  }, [vehicleId]);

  return (
    <div className="mt-2">
      <h4 className="font-semibold">Fuel Logs</h4>
      <ul className="text-sm">
        {logs.map((f) => (
          <li key={f.id}>
            Date: {f.date} | ODO: {f.odo} | Liters: {f.liters} | Price: {f.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MaintenanceLogsList({ vehicleId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!vehicleId || !auth.currentUser) return;

    const unsub = onSnapshot(
      collection(db, "vehicles", vehicleId, "maintenanceLogs"),
      (snap) => {
        setLogs(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        console.error("Error fetching maintenance logs:", err);
      }
    );

    return () => unsub();
  }, [vehicleId]);

  return (
    <div className="mt-2">
      <h4 className="font-semibold">Maintenance Logs</h4>
      <ul className="text-sm">
        {logs.map((m) => (
          <li key={m.id}>
            Date: {m.date} | Type: {m.type} | ODO: {m.odo} | Cost: {m.cost}
          </li>
        ))}
      </ul>
    </div>
  );
}