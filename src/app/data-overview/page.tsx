"use client";

import { Globe, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function DataOverview() {
  const scanResults = [
    { url: "https://example.com", gdpr: true, accessibilityScore: 85 },
    { url: "https://apple.com", gdpr: false, accessibilityScore: 72 },
    { url: "https://openai.com", gdpr: true, accessibilityScore: 91 },
  ];

  return (
    <section className="p-10">
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Privacy Scan Overview
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scanResults.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 10, 
              delay: 1 + index * 0.2
            }}
            className="rounded-xl border p-6 shadow-md bg-white hover:shadow-lg transition"
          >
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Globe size={20} />
              {item.url}
            </div>

            <div className="mt-4 space-y-3">
              <p className="flex items-center gap-2">
                {item.gdpr ? (
                  <ShieldCheck size={20} className="text-green-600" />
                ) : (
                  <ShieldAlert size={20} className="text-red-600" />
                )}
                <span className="font-medium">GDPR:</span>
                {item.gdpr ? "Compliant" : "Not compliant"}
              </p>

              <p className="font-medium text-gray-700">
                Accessibility Score: <span className="font-normal">{item.accessibilityScore}%</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
