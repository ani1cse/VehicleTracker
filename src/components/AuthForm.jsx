import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";

export default function AuthForm({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess();
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created! You can now log in.");
        setMode("login");
      } else if (mode === "reset") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent!");
        setMode("login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onAuthSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : "Reset Password"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full mb-3 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />

        {mode !== "reset" && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full mb-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : "Send Reset Email"}
        </button>

        {mode === "login" && (
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-3 bg-red-500 text-white p-2 w-full rounded hover:bg-red-600"
          >
            Continue with Google
          </button>
        )}

        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 flex flex-col gap-1">
          {mode !== "login" && (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="underline"
            >
              Back to Login
            </button>
          )}
          {mode === "login" && (
            <>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="underline"
              >
                Create an account
              </button>
              <button
                type="button"
                onClick={() => setMode("reset")}
                className="underline"
              >
                Forgot password?
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}