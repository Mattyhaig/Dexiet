export async function summarizeDomain(name: string, metrics: { score?: number; backlinks?: number; traffic?: number }) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  const prompt = `Summarize the potential value of the expired domain ${name}. Consider score=${metrics.score ?? 0}, backlinks=${metrics.backlinks ?? 0}, traffic=${metrics.traffic ?? 0}. Return one concise sentence.`
  // Minimal fetch to OpenAI-compatible endpoint; replace with official SDK if preferred
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }] }),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim?.() || null
}
