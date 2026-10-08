'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createTodo } from '../lib/api'
import { Input } from '../../components/ui/input'

export default function AddTaskPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    await createTodo({
      title: title.trim(),
      completed: false,
    })

    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <section className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Add a task</h1>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="title">
            Task name
          </label>
          <Input
            className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-blue-600"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Read Next.js docs"
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <Link className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100" href="/">
              Cancel
            </Link>
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              type="submit"
              disabled={!title.trim()}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
