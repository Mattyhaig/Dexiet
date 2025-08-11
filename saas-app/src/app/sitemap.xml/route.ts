export function GET() {
  const urls = ['/', '/domains', '/pricing']
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${u}</loc></url>`).join('\n')}\n</urlset>`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
