import { Filter_Label } from "./Filter/Filter_Label";
import { Order } from "./Order/Order";
import { PaymentSlice } from "./Payment/PaymentSlice";
import { PaymentStatus } from "./Payment/PaymentStatus";
import { ScanSlice } from "./Scan/ScanSlice";

export interface AppState {
  targetUrl: string;
  order: Order | null;
  payment: PaymentSlice;
  scan: ScanSlice;

  // Actions
  setTargetUrl: (url: string) => void;
  selectPlan: (order: Order) => void;


  selectedFilters: Filter_Label[];
  setSelectedFilters: (
    updater: Filter_Label[] | ((prev: Filter_Label[]) => Filter_Label[])) => void;

  startPaymentPending: (ids: { sessionId: string; orderId: string }) => void;
  setPaymentStatus: (s: PaymentStatus) => void;
  resetPayment: () => void;

  startScan: (jobId: string) => void;
  updateScan: (data: Partial<Pick<ScanSlice, "status" | "progress">>) => void;
  resetScan: () => void;

  resetAll: () => void;
}
