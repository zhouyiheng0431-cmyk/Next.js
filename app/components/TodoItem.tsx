import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (todo: Todo) => void
  onDelete: (id: Todo['id']) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
      <input
        className="h-4 w-4 accent-blue-600"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />
      <span className={todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}>
        {todo.title}
      </span>
      <button
        className="ml-auto rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
        type="button"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  )
}
