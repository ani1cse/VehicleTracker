import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import AuthForm from "./components/AuthForm";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import useUserRole from "./hooks/useUserRole";

export default function App() {
  const [user, setUser] = useState(undefined);
  const role = useUserRole();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

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
    </div>
  );
}