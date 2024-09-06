import { useState } from 'react'
import { supabase } from './components/Supabase'

const Login = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
            onLogin()
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unknown error occurred')
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
            <div className="w-full max-w-md bg-sky-950 rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-center text-sky-50 mb-8">
                    Login to CheckCheckPWA
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-sky-50"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-sky-900 border border-sky-700 rounded-md text-sky-50 placeholder-sky-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-sky-50"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-sky-900 border border-sky-700 rounded-md text-sky-50 placeholder-sky-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
