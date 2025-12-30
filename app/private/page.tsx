import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/auth/action'

export default async function PrivatePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-bold">Success! You are logged in.</h1>
            <p>User Email: {user.email}</p>
            <form action={signOut}>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Sign Out
                </button>
            </form>
        </div>
    )
}