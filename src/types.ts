export interface ToDo {
    id: number
    title: string
    is_complete: boolean
}

export interface ToDoItemProps {
    todo: ToDo
    onUpdate: (todo: ToDo) => void
    onDelete: (id: number) => void
}

export interface FormProps {
    addToDo: (title: string) => void
}
