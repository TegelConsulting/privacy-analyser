"use Client"// src/hooks/useAppStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AppState } from "@/lib/types/AppState";
import type { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import type { PaymentStatus } from "@/lib/types/Payment/PaymentStatus";
import type { Order } from "@/lib/types/Order/Order";
import { ScanResult } from "@/lib/types/Result/ScanResult";
import { ScanState } from "@/lib/types/Result/ScanState";

const initialScanState: ScanState = {
    status: "idle",
    progress: 0,
    result: null,
    error: null,
      
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      targetUrl: "",
      scannedUrl: "",
      order: null,
      
      payment: { status: "idle" },
      
      scan: initialScanState,
      scanCount: 0,
      pendingCount: 0,
      failCount: 0,
      successCount: 0,
      slug: "",
      plan: [],

      selectedFilters: [],

      setTargetUrl: (url: string) => set({ targetUrl: url }),
      setScannedUrl: (url: string) => set({scannedUrl: url}),

      selectPlan: (order: Order) => set({ order }),

      setSelectedFilters: (
        updater: Filter_Label[] | ((prev: Filter_Label[]) => Filter_Label[])
      ) =>
        set((state) => ({
          selectedFilters:
            typeof updater === "function"
              ? (updater as (prev: Filter_Label[]) => Filter_Label[])(state.selectedFilters)
              : updater,
        })),

      startScanPending: (url: string) =>
        set((state) => ({
          scan: {
            ...state.scan,
            status: "pending",
            progress: 0,
            error: null,
          },
          scannedUrl: url,
          pendingCount: state.pendingCount + 1, 
        })),
      
        setScanSuccess: (result: ScanResult) => {
          set((state) => ({
            scan: {
              ...state.scan,
              status: "completed",
              progress: 100, 
              result,
              error: null,
            },
            successCount: state.successCount + 1,
          }))
        },
       setScanError: (message: string) => {
          set((state)  => ({
            scan: {
              ...state.scan,
              status: "failed",
              progress: 0,
              result: state.scan.result,
              error: message,
            },
            failCount: state.failCount + 1,
          }))
        },
      
        startPaymentPending: ({ sessionId, orderId }) =>
        set({ payment: { sessionId, orderId, status: "pending" } }),

      setPaymentStatus: (status: PaymentStatus) =>
        set({ payment: { ...get().payment, status } }),

      resetPayment: () => set({ payment: { status: "idle" } }),

      updateScan: (data) =>
        set({
          scan: { ...get().scan, ...data },
        }),

      startScan: () =>
        set((state) => ({
          scan: {
            ...state.scan,
            status: "pending",
            progress: 0, 
            error: null,
          },
          pendingCount: state.pendingCount + 1,
        })),
        pendingScan: (pending) =>
          set((state) => ({
            scan: {
              status: "pending",
              progress: 0,
              result: pending,
              error: null,
            },
            pendingCount: state.pendingCount + 1, 
          })),
          

      // 🔹 ingen typ på result → TS fattar från AppState
      finishScan: (result) => {
        set((state) => ({
          scan: {
            status: "completed",
            progress: 100,
            result: result,
            error: null,
          },
          scanCount: state.scanCount + 1,
          successCount: state.successCount + 1,
          pendingCount: Math.max(0, state.pendingCount - 1),
          scannedUrl: state.targetUrl, 
        }))
      },
      failScan: (message: string) =>
        set((state) => ({
          scan: {
              ...state.scan,
              status: "failed",
              progress: 0,
              result: state.scan.result,
              error: message,
           },
            scanCount: state.scanCount + 1,
            pendingCount: Math.max(0, state.pendingCount - 1),
        })),

      resetScan: () =>
        set({
          scan: initialScanState,
        }),

      resetAll: () =>
        set({
          targetUrl: "",
          order: null,
          payment: { status: "idle" },
          scan: initialScanState,
          scanCount: 0,
          selectedFilters: [],
          slug: "",
          plan: [],
        }),
    }),
    {
      name: "security-analyser-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
