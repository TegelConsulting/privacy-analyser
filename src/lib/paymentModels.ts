// src/lib/paymentModels.ts
export type PaymentModel = {
    id: string;
    title: string;
    description: string;
    pricePerMonth: number | null; // null = offert
    analysesPerMonth: number; // -1 = obegränsat
    recommended?: boolean;
  };
  
  export const paymentModels: PaymentModel[] = [
    {
      id: 'free',
      title: 'Gratis',
      description: 'Begränsad åtkomst — perfekt för utvärdering och små projekt.',
      pricePerMonth: 0,
      analysesPerMonth: 30,
      recommended: false
    },
    {
      id: 'pro',
      title: 'Pro',
      description: 'För konsulter och små team med regelbundna analyser.',
      pricePerMonth: 495,
      analysesPerMonth: 1000,
      recommended: true
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      description: 'Skräddarsytt avtal, obegränsad analyskapacitet och SLA.',
      pricePerMonth: null,
      analysesPerMonth: -1,
      recommended: false
    }
  ];
  