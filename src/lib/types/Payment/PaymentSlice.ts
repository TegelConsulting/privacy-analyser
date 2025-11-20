import { PaymentStatus } from "./PaymentStatus";

export interface PaymentSlice {
    sessionId?: string;
    orderId?: string;
    status: PaymentStatus;
}