"use Client"
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AppState } from "@/lib/types/AppState";
import type { ScanStatus } from "@/lib/types/Scan/ScanStatus";
import { ScanSlice } from "@/lib/types/Scan/ScanSlice";
import type { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import type { PaymentStatus } from "@/lib/types/Payment/PaymentStatus";

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      targetUrl: "",
      order: null,

      payment: { status: "idle" },

      scan: { status: "idle", progress: 0 },

      // 🔹 startvärde för filtren
      selectedFilters: [],

      setTargetUrl: (url) => set({ targetUrl: url }),

      selectPlan: (order) => set({ order }),

      // ✅ RÄTTAD: skriv "selectedFilters" och använd prev-state
      setSelectedFilters: (updater) =>
        set((state) => ({
          selectedFilters:
            typeof updater === "function"
              ? (updater as (prev: Filter_Label[]) => Filter_Label[])(state.selectedFilters)
              : updater,
        })),

      startPaymentPending: ({ sessionId, orderId }) =>
        set({ payment: { sessionId, orderId, status: "pending" } }),

      setPaymentStatus: (status: PaymentStatus) =>
        set({ payment: { ...get().payment, status } }),

      resetPayment: () => set({ payment: { status: "idle" } }),

      startScan: (jobId: string) =>
        set((s) => ({
          scan: { ...s.scan, jobId, status: "queued", progress: 0 },
        })),

      updateScan: (data) =>
        set({
          scan: { ...get().scan, ...data },
        }),

      resetScan: () =>
        set({
          scan: { status: "idle", progress: 0 },
        }),

      resetAll: () =>
        set({
          targetUrl: "",
          order: null,
          payment: { status: "idle" },
          scan: { status: "idle", progress: 0 },
          selectedFilters: [],
        }),
    }),
    {
      name: "security-analyser-store",
      storage: createJSONStorage(() => sessionStorage),
      // här kan du lägga partialize om du vill
    }
  )
);
