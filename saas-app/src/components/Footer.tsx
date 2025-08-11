export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
        <p>© {year} SaaS. All rights reserved.</p>
        <nav className="flex gap-4">
          <a className="hover:underline" href="/pricing">Pricing</a>
          <a className="hover:underline" href="/dashboard">Dashboard</a>
        </nav>
      </div>
    </footer>
  )
}