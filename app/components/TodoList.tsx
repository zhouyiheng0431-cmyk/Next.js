'use client'

import { useState } from 'react'
import { createTodo, deleteTodo, updateTodo } from '../lib/api'
import type { Todo } from '../types'
import TodoItem from './TodoItem'

interface TodoListProps {
  initialTodos: Todo[]
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [title, setTitle] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    const newTodo = await createTodo({
      title: title.trim(),
      completed: false,
    })

    setTodos((currentTodos) => [...currentTodos, newTodo])
    setTitle('')
    setIsDialogOpen(false)
  }

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
      <button
        className="mb-6 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        type="button"
        onClick={() => setIsDialogOpen(true)}
      >
        Add Task
      </button>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </ul>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-6">
          <form
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Add a task</h2>
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="title">
              Task name
            </label>
            <input
              className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-blue-600"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Read Next.js docs"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                type="button"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                type="submit"
                disabled={!title.trim()}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
