"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Search } from "lucide-react";

export default function AnalysisFilterBar() {
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("");
  const [domain, setDomain] = useState("");
  const [date, setDate] = useState("");

  const clearAll = () => {
    setSearch("");
    setRisk("");
    setDomain("");
    setDate("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full p-4 bg-white rounded-xl shadow-md border flex flex-col gap-4 md:flex-row md:items-center"
    >
      {/* Search */}
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-1/3">
        <Search className="size-4 text-gray-500" />
        <input
          type="text"
          placeholder="Sök analyser..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none w-full"
        />
      </div>

      {/* Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full md:w-auto"
      />

      {/* Risk level */}
      <select
        value={risk}
        onChange={(e) => setRisk(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full md:w-auto"
      >
        <option value="">Risknivå</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Domain filter */}
      <select
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full md:w-auto"
      >
        <option value="">Domän</option>
        <option value="web">Web</option>
        <option value="api">API</option>
        <option value="pdf">PDF</option>
      </select>

      {/* Clear button */}
      <button
        onClick={clearAll}
        className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium"
      >
        <X className="size-4" />
        Rensa
      </button>
    </motion.div>
  );
}
