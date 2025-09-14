import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function VehicleForm() {
  const [number, setNumber] = useState("");
  const [odo, setOdo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      await addDoc(collection(db, "vehicles"), {
        number,
        odo: Number(odo),
        ownerId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      setNumber("");
      setOdo("");
    } catch (err) {
      console.error("Error adding vehicle:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Vehicle Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="ODO"
        value={odo}
        onChange={(e) => setOdo(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button className="bg-blue-500 text-white px-4 rounded">Add</button>
    </form>
  );
}