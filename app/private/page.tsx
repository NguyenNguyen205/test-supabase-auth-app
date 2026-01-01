import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/auth/action'

export default async function PrivatePage() {
    const supabase = await createClient()

    // 1. SINGLE SOURCE OF TRUTH: Get everything from getSession
    // This ensures the token is fresh and gives us the user object together.
    const { data: { session }, error } = await supabase.auth.getSession()

    // 2. Safe Check: If no session exists, kick them out
    if (error || !session) {
        console.log('Session missing or error:', error)
        redirect('/')
    }

    // 3. Extract what you need
    const user = session.user
    const accessToken = session.access_token

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 bg-gray-50 text-black">

            <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-green-700">Login Successful</h1>

                {/* SECTION 1: USER INFO (From session.user) */}
                <div className="space-y-2 border-b pb-4">
                    <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
                    <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                        <span className="font-bold text-gray-500">Email:</span>
                        <span>{user.email}</span>

                        <span className="font-bold text-gray-500">User ID:</span>
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded select-all">
                            {user.id}
                        </span>

                        <span className="font-bold text-gray-500">Provider:</span>
                        <span className="capitalize">{user.app_metadata.provider || 'email'}</span>
                    </div>
                </div>

                {/* SECTION 2: ACCESS TOKEN (From session.access_token) */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800 flex justify-between items-center">
                        API Access Token
                        <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded">
                            Pass this in headers
                        </span>
                    </h2>
                    <p className="text-xs text-gray-500">
                        Copy this token to call your separate Supabase endpoints.
                    </p>
                    {/* This block is scrollable and selectable for easy copying */}
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs break-all max-h-48 overflow-y-auto select-all border border-slate-700 shadow-inner">
                        {accessToken}
                    </div>
                </div>

                {/* LOGOUT BUTTON */}
                <form action={signOut} className="pt-4 text-center">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition shadow-md">
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    )
}