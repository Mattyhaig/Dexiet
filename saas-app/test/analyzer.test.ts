import { describe, it, expect } from 'vitest'
import { analyzeDomains } from '../src/lib/scraper/analyzer'

describe('analyzeDomains', () => {
  it('computes score and aiSummary', () => {
    const out = analyzeDomains([{ name: 'foo.com', tld: 'com', score: 10, backlinks: 100, traffic: 50 }])
    expect(out[0].score).toBeGreaterThan(10)
    expect(out[0].data.aiSummary).toContain('Estimated score')
  })
})
