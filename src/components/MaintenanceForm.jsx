import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function MaintenanceForm({ vehicleId }) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [odo, setOdo] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleId) return;

    try {
      await addDoc(collection(db, "vehicles", vehicleId, "maintenanceLogs"), {
        date,
        type,
        odo: Number(odo),
        cost: Number(cost),
        createdAt: serverTimestamp()
      });
      setDate("");
      setType("");
      setOdo("");
      setCost("");
    } catch (err) {
      console.error("Error adding maintenance log:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2 flex-wrap">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="number"
        placeholder="ODO"
        value={odo}
        onChange={(e) => setOdo(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        className="border p-1 rounded"
      />
      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
        Add Maintenance
      </button>
    </form>
  );
}