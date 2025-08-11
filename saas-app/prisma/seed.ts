import { prisma } from '../src/lib/prisma'

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.log('Set ADMIN_EMAIL to seed an admin user')
    return
  }
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'admin' },
    create: { email: adminEmail, role: 'admin' },
  })
  console.log('Admin user ready:', user.email)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})