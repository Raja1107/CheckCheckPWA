import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState } from 'react'
import { FormProps } from '../types'

const Form = ({ addToDo }: FormProps) => {
    const [title, setTitle] = useState('')

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (title.trim() !== '') {
            addToDo(title)
        }
        setTitle('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-between bg-sky-400 p-4 rounded-lg items-center mb-4"
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl rounded-lg p-[3px] text-gray-800"
                placeholder="Add a new task"
            />
            <button type="submit" className="ml-2 rounded-lg text-gray-800">
                <AddCircleIcon />
            </button>
        </form>
    )
}

export default Form
