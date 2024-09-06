import { useState, useEffect } from 'react'
import ToDoList from './components/ToDoList'
import Login from './Login'
import { supabase } from './components/Supabase'
import { Session } from '@supabase/supabase-js'

const App = () => {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setSession(null)
    }

    return (
        <div className="h-screen w-screen p-4 bg-zinc-900">
            {!session ? (
                <Login onLogin={() => {}} />
            ) : (
                <div className="bg-sky-950 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 text-sky-50">
                    <div className="relative mb-4">
                        <h1 className="text-3xl font-bold text-center">
                            INBOX
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                        >
                            Logout
                        </button>
                    </div>
                    <ToDoList />
                </div>
            )}
        </div>
    )
}

export default App
