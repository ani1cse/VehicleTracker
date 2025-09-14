import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function useUserRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setRole(null);
        return;
      }
      const tokenResult = await user.getIdTokenResult(true);
      setRole(tokenResult.claims.role || "user");
    });
    return () => unsubscribe();
  }, []);

  return role;
}