'use client'

import { loginWithGoogle, sendOTP, verifyOTP } from '@/app/auth/action'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSendOtp(formData: FormData) {
    const res = await sendOTP(formData)
    if (res?.error) {
      setMessage(res.error)
    } else {
      setMessage('OTP sent! Check your email.')
      setIsOtpSent(true)
    }
  }

  async function handleVerifyOtp(formData: FormData) {
    const res = await verifyOTP(formData)
    if (res?.error) setMessage(res.error)
  }

  return (
    // MAIN CONTAINER: Dark gray background, white text
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-2 text-gray-400">Test Supabase Auth</p>
        </div>

        {/* GOOGLE LOGIN */}
        <form action={loginWithGoogle}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition">
            Sign in with Google
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400">Or with Email</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* EMAIL OTP LOGIN */}
        {!isOtpSent ? (
          <form action={handleSendOtp} className="flex flex-col gap-4">
            <label className="text-sm font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              // INPUT STYLE: Explicitly White background, Black text
              className="w-full p-3 rounded bg-white text-black border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition">
              Send Code
            </button>
          </form>
        ) : (
          <form action={handleVerifyOtp} className="flex flex-col gap-4">
            <p className="text-center text-sm text-gray-300">Enter the code sent to {email}</p>
            <input type="hidden" name="email" value={email} />
            <input
              name="token"
              type="text"
              placeholder="123456"
              // INPUT STYLE: Explicitly White background, Black text
              className="w-full p-3 rounded bg-white text-black border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center tracking-widest text-xl"
              required
            />
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition">
              Verify Code
            </button>
          </form>
        )}

        {message && (
          <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}