'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTodo, updateTodo } from '../lib/api'
import type { Todo } from '../types'
import { Button } from '../../components/ui/button'
import TodoItem from './TodoItem'

interface TodoListProps {
  initialTodos: Todo[]
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const router = useRouter()
  const [todos, setTodos] = useState(initialTodos)

  async function handleToggle(todo: Todo) {
    const updatedTodo = await updateTodo(todo.id, !todo.completed)
    setTodos((currentTodos) =>
      currentTodos.map((currentTodo) =>
        currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
      ),
    )
  }

  async function handleDelete(id: Todo['id']) {
    await deleteTodo(id)
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <>
      <Button
        className="mb-6 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        onClick={() => router.push('/add-task')}
      >
        Add Task
      </Button>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </ul>
    </>
  )
}
