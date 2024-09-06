import ToDoList from './components/ToDoList'

const App = () => {
    return (
        <div className="h-screen w-screen p-4 bg-zinc-900">
            <div className="bg-sky-950 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 text-sky-50">
                <h1 className="text-3xl font-bold text-center p-2">INBOX</h1>
                <ToDoList />
            </div>
        </div>
    )
}

export default App
