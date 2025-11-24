'use client';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import React, { Suspense, useMemo, useState } from 'react';
import { PaymentPlan } from '@/lib/paymentModels';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/hooks/useAppStore';
import { isValidUrl } from '@/app/functions/isValidUrl';
import { methods } from '@/lib/mock/methods';
import { Method } from '@/lib/types/Payment/Method';
import { Filter_Label } from '@/lib/types/Filter/Filter_Label';

// PaymentOptions.tsx
type Props = {
  plan: PaymentPlan;
  className?: string;
  method: Method;
  setMethod: (method: string) => void;
};

function PaymentOptionsContent({ plan, method, setMethod }: Props) {
  const router = useRouter();
  const { targetUrl, startPaymentPending } = useAppStore();
  const [loadingMethod, setLoadingMethod] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const url = searchParams.get('url') ?? '';
  const filterParam = searchParams.get('filter') ?? '';

  const filters: Filter_Label[] = filterParam
    ? (filterParam.split(',').filter(Boolean) as Filter_Label[])
    : [];

  const planExists = useMemo(() => {
    const ok =
      !!plan && typeof plan.priceLabel === 'string' && isValidUrl(targetUrl);

    if (!ok) {
      if (!plan) {
        console.log('No plan');
      } else if (typeof plan.priceLabel !== 'string') {
        console.log('Price has to be a string');
      } else if (!isValidUrl(targetUrl)) {
        console.log('Targeturl is missing');
      } else return console.error('Nothing is wrong');
      return (
        !!plan && typeof plan.priceLabel === 'string' && isValidUrl(targetUrl)
      );
    }

    return ok;
  }, [plan, targetUrl]);

  const handlePayment = async (methodName: string) => {
    if (!planExists) return;

    try {
      setLoadingMethod(methodName);

      const sessionId = crypto.randomUUID();
      const orderId = crypto.randomUUID();

      startPaymentPending({ sessionId, orderId });
      setMethod(method.name);

      const params = new URLSearchParams();
      if (url) params.set('url', url);
      if (filters.length > 0) params.set('filters', filters.join(','));
      params.set('plan', plan.slug);

      router.push(
        `/betalmodeller/${
          plan.slug
        }/orderbekraftelse?method=${method.id.toLowerCase()}`
      );
      console.log('Payment pushed');
    } finally {
      setLoadingMethod(null);
    }
  };

  return (
    <section
      key={method.id}
      className='flex items-center justify-between border border-slate-200 p-3 rounded-lg hover:bg-slate-100 transition'
    >
      <section className='flex items-center gap-3'>
        <Image src={method.logo} alt={method.name} width={32} height={32} />
        <span className='font-medium text-slate-800'>{method.name}</span>
      </section>
      <Button
        variant='primary'
        size='sm'
        onClick={() => handlePayment(method.name)}
        disabled={!planExists}
      >
        {loadingMethod ? 'Betalar...' : 'Betala'}
      </Button>
    </section>
  );
}

export default function PaymentOptions(props: Props) {
  return (
    <Suspense
      fallback={
        <section className='flex items-center justify-between border border-slate-200 p-3 rounded-lg bg-slate-50'>
          <section className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-slate-200 rounded animate-pulse' />
            <span className='text-slate-400'>Laddar betalningsmetod...</span>
          </section>
          <Button variant='primary' size='sm' disabled>
            Betala
          </Button>
        </section>
      }
    >
      <PaymentOptionsContent {...props} />
    </Suspense>
  );
}
