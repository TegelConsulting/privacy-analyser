import { Method } from "../types/Payment/Method";
import klarnaLogo from "@/app/assets/payments/klarna.svg";
import paypalLogo from "@/app/assets/payments/paypal.svg";
import applePayLogo from "@/app/assets/payments/applepay.svg";
import swishLogo from "@/app/assets/payments/swish.svg";

 export const methods: Method[] = [
    { id: "klarna", name: "Klarna", logo: klarnaLogo },
    { id: "paypal", name: "PayPal", logo: paypalLogo },
    { id: "applePay", name: "Apple Pay", logo: applePayLogo },
    { id: "swish", name: "Swish", logo: swishLogo },
  ] as const;
