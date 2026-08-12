'use client';

import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorQuery = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    errorQuery === 'unauthorized'
      ? 'Your admin account is inactive or unauthorized.'
      : null,
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        throw new Error(error?.message || 'Invalid login credentials.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials.';
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Error Feedback */}
      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3.5 text-center text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label
            htmlFor="admin-email"
            className="block text-xs font-bold tracking-wider text-slate-700 uppercase"
          >
            Email Address
          </label>
          <div className="relative mt-1.5 rounded-lg shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="admin-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="admin@ultronfinancials.com"
              className="block w-full rounded-lg border border-slate-300 bg-slate-50/50 py-2.5 pr-3 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#035551] focus:bg-white focus:ring-2 focus:ring-[#035551]/20 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="block text-xs font-bold tracking-wider text-slate-700 uppercase"
          >
            Password
          </label>
          <div className="relative mt-1.5 rounded-lg shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="admin-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="block w-full rounded-lg border border-slate-300 bg-slate-50/50 py-2.5 pr-10 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#035551] focus:bg-white focus:ring-2 focus:ring-[#035551]/20 focus:outline-hidden"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? 'Hide password' : 'Show password'}
              </span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-display flex h-11 w-full items-center justify-center rounded-lg bg-[#035551] px-4 text-sm font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#023c39] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCCB8E] active:scale-[0.99] disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              VERIFYING...
            </span>
          ) : (
            'SIGN IN TO DASHBOARD'
          )}
        </button>
      </form>
    </>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDFBEE] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-[#035551]/15 bg-white p-8 shadow-xl sm:p-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#035551] text-[#FDFBEE] shadow-md">
            <span className="font-display text-2xl font-bold tracking-wider">
              UF
            </span>
          </div>

          <span className="mt-4 text-[12px] font-bold tracking-widest text-[#035551] uppercase">
            ULTRON ADMINISTRATION
          </span>

          <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Sign in to manage website enquiries and follow-up activity.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center p-6 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-[#035551]" />
            </div>
          }
        >
          <AdminLoginForm />
        </Suspense>

        <div className="pt-2 text-center text-xs text-slate-500">
          Strictly for authorized Ultron Financials administrators.
        </div>
      </div>
    </main>
  );
}
