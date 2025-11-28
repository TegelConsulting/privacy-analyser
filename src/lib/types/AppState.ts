import { PaymentPlan } from "../paymentModels";
import { ScanResult } from "./Result/ScanResult";
import { Filter_Label } from "./Filter/Filter_Label";
import { Order } from "./Order/Order";
import { PaymentSlice } from "./Payment/PaymentSlice";
import { PaymentStatus } from "./Payment/PaymentStatus";
import { ScanState } from "./Result/ScanState";

export interface AppState {
  targetUrl: string;
  scannedUrl: string;
  order: Order | null;
  payment: PaymentSlice;
  scan: ScanState;
  scanCount: number;
  pendingCount: number;
  failCount: number;
  successCount: number;
  slug: string;
  plan: PaymentPlan[];

  // Actions
  setTargetUrl: (url: string) => void;
  setScannedUrl: (scannedUrl: string) => void;
  selectPlan: (order: Order) => void;


  selectedFilters: Filter_Label[];
  setSelectedFilters: (
        updater: Filter_Label[] | ((prev: Filter_Label[]) => Filter_Label[])) => void;

  startPaymentPending: (ids: { sessionId: string; orderId: string }) => void;
  setPaymentStatus: (s: PaymentStatus) => void;
  resetPayment: () => void;

  startScan: () => void;
  startScanPending: (url: string) => void;
  setScanSuccess: (result: ScanResult) => void;
  setScanError: (message: string) => void;
  updateScan: (data: Partial<ScanState>) => void;
  pendingScan: (pending: ScanResult) => void;
  resetScan: () => void;
  resetAll: () => void;
  finishScan: (result: ScanResult) => void;
  failScan: (message: string) => void;
}
