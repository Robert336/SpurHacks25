'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  
  // Create Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4E6] via-[#E9D8C5] to-[#FFF4E6] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-8">
            <div className="bg-gradient-to-br from-[#9A7FF5] to-[#74A27E] px-10 py-4 rounded-3xl shadow-xl">
              <span className="text-white font-bold text-2xl">QuestFlat</span>
            </div>
          </Link>
          <h2 className="text-4xl font-bold text-[#3C6E57] mb-2">
            Welcome Back
          </h2>
          <p className="text-lg text-[#2E5744]/80">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-[#E9D8C5]">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-[#D4A6A6]/20 border-2 border-[#D4A6A6]/40 text-[#2E2E2E] px-6 py-4 rounded-2xl">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#3C6E57] mb-3">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 border-2 border-[#E9D8C5] rounded-2xl focus:ring-4 focus:ring-[#9A7FF5]/30 focus:border-[#9A7FF5] bg-[#FFF4E6] text-[#2E2E2E] placeholder-[#66615B] text-lg transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#3C6E57] mb-3">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 border-2 border-[#E9D8C5] rounded-2xl focus:ring-4 focus:ring-[#9A7FF5]/30 focus:border-[#9A7FF5] bg-[#FFF4E6] text-[#2E2E2E] placeholder-[#66615B] text-lg transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-[#9A7FF5] focus:ring-[#9A7FF5] border-2 border-[#E9D8C5] rounded-lg"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-[#2E5744] font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-[#9A7FF5] hover:text-[#74A27E] underline transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 py-4 px-6 border-4 border-transparent rounded-2xl shadow-xl text-xl font-bold text-white bg-gradient-to-r from-[#74A27E] to-[#9A7FF5] focus:outline-none focus:ring-4 focus:ring-[#9A7FF5]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#2E5744]/80">
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold text-[#9A7FF5] hover:text-[#74A27E] underline transition-colors duration-200">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link href="/" className="text-[#2E5744]/80 hover:text-[#3C6E57] font-medium underline transition-colors duration-200">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
} 