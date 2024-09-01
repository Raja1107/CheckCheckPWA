import SyncIcon from '@mui/icons-material/Sync'
import { useEffect, useState } from 'react'
import { ToDo } from '../types'
import Form from './Form'
import { supabase } from './Supabase'
import Todo from './Todo'
const ToDoList = () => {
    const [todos, setTodos] = useState<ToDo[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('ToDo_Table')
                .select('*')
            if (error) {
                throw new Error('Error fetching ToDos:' + error)
            }

            if (!data) {
                throw new Error('No data received when fetching ToDos')
            }
            setTodos(() => {
                const updatedTodos = data as ToDo[]
                setLoading(false)
                return updatedTodos
            })
        } catch (error) {
            console.error('Failed to fetch ToDos: ' + error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log('Todos updated:', todos)
    }, [todos])

    const addToDo = async (title: string) => {
        try {
            const { data, error } = await supabase
                .from('ToDo_Table')
                .insert([{ title, is_complete: false }])
                .select('*')

            if (error) {
                throw new Error('Error adding ToDo: ${error.message}')
            }
            if (!data) {
                throw new Error('No data received when adding ToDo')
            }
            console.log('Newly added todo data:', data)
            setTodos((prevTodos) => [...prevTodos, ...data])
        } catch (error) {
            console.error('Failed to add ToDo:', error)
        }
    }

    const updateToDo = async (todo: ToDo) => {
        try {
            // Attempt to update the todo in the database by id
            const { data, error } = (await supabase
                .from('ToDo_Table')
                .update(todo)
                .eq('id', todo.id)
                .select('*')) as { data: ToDo[] | null; error: Error | null }

            if (error) {
                throw new Error(
                    'Error updating ToDo (ID: ${todo.id}): ${error.message}'
                )
            }

            // Ensure data is properly typed and not empty
            if (!data || data.length === 0) {
                throw new Error(
                    `No data received when updating ToDo (ID: ${todo.id})`
                )
            }

            // Update the state with the updated todo
            setTodos((prevTodos) =>
                prevTodos.map((t) => (t.id === todo.id ? data[0] : t))
            )
        } catch (error) {
            console.error('Failed to update ToDo (ID: ${todo.id}):', error)
        }
    }

    const deleteToDo = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from('ToDo_Table')
                .delete()
                .eq('id', id)
                .select('*')

            if (error) {
                throw new Error(
                    'Error deleting ToDo (ID: ${id}): ${error.message}'
                )
            }

            if (!data) {
                throw new Error(
                    'No data received when deleting ToDo (ID: ${id})'
                )
            }

            // Remove the deleted todo from the state
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id))
        } catch (error) {
            console.log('Failed to delete ToDo (ID: ${id}:', error)
        }
    }

    return (
        <div>
            <Form addToDo={addToDo} />
            {loading ? (
                <div className="text-center mt-5 mb-5 text-gray-700">
                    <SyncIcon fontSize="large" />
                </div>
            ) : (
                <div>
                    <ul>
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className={`flex items-center p-2 mb-2 bg-sky-800 even:bg-sky-600 rounded ${
                                    todo.is_complete
                                        ? 'line-through text-gray-400'
                                        : ''
                                }`}
                            >
                                <span className="flex-grow justify-start">
                                    {todo.title}
                                </span>
                                <Todo
                                    onUpdate={updateToDo}
                                    onDelete={deleteToDo}
                                    todo={todo}
                                />
                            </li>
                        ))}
                    </ul>
                    <p className="text-center">
                        You have {todos.length}{' '}
                        {todos.length > 1 ? 'Things' : 'Thing'} to complete!
                    </p>
                </div>
            )}
        </div>
    )
}
export default ToDoList
