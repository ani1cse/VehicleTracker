import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function FuelLogForm({ vehicleId }) {
  const [odo, setOdo] = useState("");
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleId) return;

    try {
      await addDoc(collection(db, "vehicles", vehicleId, "fuelLogs"), {
        odo: Number(odo),
        liters: Number(liters),
        price: Number(price),
        date,
        createdAt: serverTimestamp()
      });
      setOdo("");
      setLiters("");
      setPrice("");
      setDate("");
    } catch (err) {
      console.error("Error adding fuel log:", err);
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
        type="number"
        placeholder="ODO"
        value={odo}
        onChange={(e) => setOdo(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="number"
        placeholder="Liters"
        value={liters}
        onChange={(e) => setLiters(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-1 rounded"
      />
      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
        Add Fuel
      </button>
    </form>
  );
}