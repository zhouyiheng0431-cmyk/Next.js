import { getAllTodos } from './lib/api'
import TodoList from './components/TodoList'
import Link from 'next/link'

export const instant = false

export default async function Home() {
  const todos = await getAllTodos()

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <section className="mx-auto max-w-xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">My To-Do List</h1>
        <TodoList initialTodos={todos} />
        <Link className="mt-6 inline-block font-medium text-blue-600 hover:text-blue-800" href="/about">
          About this app
        </Link>
      </section>
    </main>
  )
}
