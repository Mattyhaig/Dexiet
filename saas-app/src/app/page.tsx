import Link from 'next/link'
import { getButtonClasses } from '@/components/ui/Button'

export default function Page(){
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">SaaS Starter</h1>
      <p className="mt-2 text-gray-600">Build your product fast with auth, billing, and a clean UI.</p>
    </main>
  )
}
