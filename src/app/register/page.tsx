"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineUser, HiOutlineMail, HiLockClosed } from "react-icons/hi";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Ett fel uppstod vid registrering.");
        setLoading(false);
        return;
      }

      // ✅ Registrering lyckades – logga in automatiskt
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginRes?.error) {
        setMessage("Registrering lyckades, men inloggningen misslyckades.");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Ett oväntat fel inträffade.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Skapa konto
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col w-full">
            <label className="mb-1 text-gray-700 dark:text-gray-200 font-medium text-sm">
              Användarnamn
            </label>
            <div className="relative w-full">
              <HiOutlineUser
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />
              <input
                type="text"
                placeholder="Ange användarnamn"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col w-full">
            <label className="mb-1 text-gray-700 dark:text-gray-200 font-medium text-sm">
              E-post
            </label>
            <div className="relative w-full">
              <HiOutlineMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />
              <input
                type="email"
                placeholder="Ange din e-post"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col w-full">
            <label className="mb-1 text-gray-700 dark:text-gray-200 font-medium text-sm">
              Lösenord
            </label>
            <div className="relative w-full">
              <HiLockClosed
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />
              <input
                type="password"
                placeholder="Välj ett lösenord"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium transition mt-2 ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? "Registrerar..." : "Registrera"}
          </button>

          {message && (
            <p className="text-center text-sm text-red-500 mt-2">{message}</p>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Har du redan ett konto?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Logga in här
          </a>
        </p>
      </div>
    </div>
  );
}
