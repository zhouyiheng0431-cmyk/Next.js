import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <section className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">About this task</h1>
        <p className="mb-6 text-gray-600">
          This is a beginner to-do app built with Next.js, React, TypeScript, and Tailwind CSS.
        </p>
        <Link className="font-medium text-blue-600 hover:text-blue-800" href="/">
          Back to my to-do list
        </Link>
      </section>
    </main>
  )
}
