import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import { ToDoItemProps } from '../types'

const Todo = ({ todo, onUpdate, onDelete }: ToDoItemProps) => {
    const handleUpdate = () => {
        onUpdate({ ...todo, is_complete: !todo.is_complete })
    }

    const handleDelete = () => {
        onDelete(todo.id)
    }

    return (
        <div className="flex justify-end">
            <button onClick={handleUpdate}>
                <CheckIcon />
            </button>
            <button onClick={handleDelete}>
                <DeleteIcon />
            </button>
        </div>
    )
}

export default Todo
