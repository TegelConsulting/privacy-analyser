'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail, HiLockClosed } from 'react-icons/hi';
import { Button } from '@/components/ui/Button';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const registered = searchParams.get('registered');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Felaktig email eller lösenord');
        setLoading(false);
        return;
      }

      // Login successful, redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('Något gick fel. Försök igen.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-900'>
          Logga in
        </h1>

        {registered && (
          <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm'>
            Registrering lyckades! Du kan nu logga in.
          </div>
        )}

        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col w-full'>
            <label className='mb-1 text-gray-700 font-medium text-sm'>
              Email
            </label>
            <div className='relative w-full'>
              <HiOutlineMail
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                size={22}
              />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Din email'
                required
                className='w-full pl-12 pr-4 py-3 border rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              />
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <label className='mb-1 text-gray-700 font-medium text-sm'>
              Lösenord
            </label>
            <div className='relative w-full'>
              <HiLockClosed
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                size={22}
              />
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Ditt lösenord'
                required
                className='w-full pl-12 pr-4 py-3 border rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              />
            </div>
          </div>

          <Button
            variant='primary'
            type='submit'
            disabled={loading}
            className='disabled:opacity-50 disabled:cursor-not-allowed bg-black font-semibold text-white cursor-pointer hover:scale-105'
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </Button>
        </form>

        <div className='my-6 flex items-center gap-3'>
          <span className='border-t border-gray-300 flex-1'></span>
          <span className='text-gray-500 text-sm'>eller</span>
          <span className='border-t border-gray-300 flex-1'></span>
        </div>

        <Button
          variant='primary'
          onClick={handleGoogleSignIn}
          className='flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-3 hover:scale-105 font-medium cursor-pointer'
        >
          <FcGoogle className='w-6 h-6' />
          Logga in med Google
        </Button>

        <p className='mt-6 text-center text-sm text-gray-600'>
          Har du inget konto?{' '}
          <Link
            href='/register'
            className='text-blue-600 hover:text-blue-700 font-medium'
          >
            Registrera dig här
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
          <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
            <div className='animate-pulse space-y-4'>
              <div className='h-8 bg-gray-200 rounded w-1/2 mx-auto'></div>
              <div className='h-12 bg-gray-200 rounded'></div>
              <div className='h-12 bg-gray-200 rounded'></div>
            </div>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
