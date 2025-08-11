import NextAuth, { type NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'

function makeProviders() {
  const providers: any[] = []
  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    )
  }
  // Dev fallback for easy sign-in without OAuth; do not use in production
  providers.push(
    CredentialsProvider({
      name: 'Email',
      credentials: { email: { label: 'Email', type: 'email' } },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase()
        if (!email) return null
        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: { email },
        })
        return { id: user.id, email: user.email ?? undefined, name: user.name ?? undefined }
      },
    })
  )
  return providers
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'database' },
  providers: makeProviders(),
}

export default NextAuth(authOptions)
