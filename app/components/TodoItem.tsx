import type { Todo } from '../types'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'

interface TodoItemProps {
  todo: Todo
  onToggle: (todo: Todo) => void
  onDelete: (id: Todo['id']) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <Card>
        <CardContent className="flex items-center gap-3">
          <input
            className="h-4 w-4 accent-blue-600"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
          />
          <span className={todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}>
            {todo.title}
          </span>
          <Button
            className="ml-auto"
            variant="outline"
            size="sm"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </li>
  )
}
