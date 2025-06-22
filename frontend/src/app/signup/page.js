'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const router = useRouter();
  
  // Create Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for a magical invitation link!');
        // Optionally redirect after a delay
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4E6] via-[#E9D8C5] to-[#FFF4E6] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Whimsical Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-4xl animate-bounce delay-200">🌟</div>
        <div className="absolute top-40 right-32 text-3xl animate-pulse delay-400">🦋</div>
        <div className="absolute bottom-32 left-16 text-2xl animate-bounce delay-600">🌸</div>
        <div className="absolute bottom-20 right-20 text-3xl animate-pulse delay-800">🏠</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-bounce delay-1000">✨</div>
        <div className="absolute top-1/4 right-1/4 text-2xl animate-pulse delay-1200">🍄</div>
        <div className="absolute top-3/4 left-3/4 text-2xl animate-bounce delay-1400">🌿</div>
      </div>

      <div className="relative max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-8 group">
            <div className="bg-gradient-to-br from-[#FFD972] to-[#9A7FF5] px-10 py-4 rounded-3xl shadow-xl transform group-hover:scale-105 transition-all duration-200">
              <span className="text-white font-bold text-2xl">🏘️ QuestFlat</span>
            </div>
          </Link>
          <div className="mb-4">
            <span className="text-6xl animate-bounce">🌟</span>
          </div>
          <h2 className="text-4xl font-bold text-[#3C6E57] mb-2">
            Join Our Cozy Village!
          </h2>
          <p className="text-lg text-[#2E5744]/80">
            Begin your magical household adventure ✨
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-[#E9D8C5]">
          <form onSubmit={handleSignUp} className="space-y-6">
            {error && (
              <div className="bg-[#D4A6A6]/20 border-2 border-[#D4A6A6]/40 text-[#2E2E2E] px-6 py-4 rounded-2xl flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div className="bg-[#74A27E]/20 border-2 border-[#74A27E]/40 text-[#2E2E2E] px-6 py-4 rounded-2xl flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <span>{message}</span>
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-sm font-bold text-[#3C6E57] mb-3 flex items-center gap-2">
                🧙‍♀️ Your Magical Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-6 py-4 border-2 border-[#E9D8C5] rounded-2xl focus:ring-4 focus:ring-[#FFD972]/30 focus:border-[#FFD972] bg-[#FFF4E6] text-[#2E2E2E] placeholder-[#66615B] text-lg transition-all duration-200 hover:shadow-lg"
                placeholder="What shall we call you?"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#3C6E57] mb-3 flex items-center gap-2">
                📧 Village Mail Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 border-2 border-[#E9D8C5] rounded-2xl focus:ring-4 focus:ring-[#9A7FF5]/30 focus:border-[#9A7FF5] bg-[#FFF4E6] text-[#2E2E2E] placeholder-[#66615B] text-lg transition-all duration-200 hover:shadow-lg"
                placeholder="your@village.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#3C6E57] mb-3 flex items-center gap-2">
                🔑 Secret Spell (Password)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 border-2 border-[#E9D8C5] rounded-2xl focus:ring-4 focus:ring-[#9A7FF5]/30 focus:border-[#9A7FF5] bg-[#FFF4E6] text-[#2E2E2E] placeholder-[#66615B] text-lg transition-all duration-200 hover:shadow-lg"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-[#3C6E57] mb-3 flex items-center gap-2">
                🔮 Confirm Your Spell
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-6 py-4 border-2 border-[#E9D8C5] rounded-2xl focus:ring-4 focus:ring-[#9A7FF5]/30 focus:border-[#9A7FF5] bg-[#FFF4E6] text-[#2E2E2E] placeholder-[#66615B] text-lg transition-all duration-200 hover:shadow-lg"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-5 w-5 text-[#FFD972] focus:ring-[#FFD972] border-2 border-[#E9D8C5] rounded-lg mt-1"
              />
              <label htmlFor="agree-terms" className="ml-3 block text-sm text-[#2E5744] font-medium leading-relaxed">
                🌟 I agree to be a kind and helpful villager, following our{' '}
                <a href="#" className="text-[#9A7FF5] hover:text-[#74A27E] underline transition-colors duration-200">
                  Village Code
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#9A7FF5] hover:text-[#74A27E] underline transition-colors duration-200">
                  Privacy Scroll
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex justify-center items-center gap-3 py-4 px-6 border-4 border-transparent rounded-2xl shadow-xl text-xl font-bold text-white bg-gradient-to-r from-[#FFD972] to-[#74A27E] hover:from-[#9A7FF5] hover:to-[#FFD972] focus:outline-none focus:ring-4 focus:ring-[#FFD972]/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            >
              {loading ? (
                <>
                  <span className="animate-spin">🌀</span>
                  Creating your village home...
                </>
              ) : (
                <>
                  <span className="group-hover:animate-bounce">🏡</span>
                  Join the Village
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#2E5744]/80">
              Already a villager?{' '}
              <Link href="/login" className="font-bold text-[#9A7FF5] hover:text-[#74A27E] underline transition-colors duration-200">
                🏠 Return to your village
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#2E5744]/80 hover:text-[#3C6E57] font-medium underline transition-colors duration-200">
            <span className="hover:animate-bounce">🏘️</span>
            Back to village square
          </Link>
        </div>
      </div>
    </div>
  );
} 