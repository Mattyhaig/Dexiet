export default function PricingPage() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="mt-6 grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Basic</h2>
          <p className="mt-2 text-muted-foreground">All the essentials to get started.</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-2xl font-bold">$9</span>
            <span className="text-sm opacity-70">/month</span>
          </div>
          <form action="/api/stripe/checkout" method="POST" className="mt-6">
            <button className="btn" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </main>
  )
}
