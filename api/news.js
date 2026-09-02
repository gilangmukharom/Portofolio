// Vercel Serverless Function. The project is `"type": "module"`, so this file
// must be ESM — Node 20 also gives us global fetch, no HTTP client needed.

// Accept the legacy Vue-era variable so an existing Vercel env var keeps working.
const API_KEY = process.env.NEWS_API_KEY || process.env.VUE_APP_NEWS_API_KEY

export default async function handler(req, res) {
  const topic = req.query?.topic || 'technology'

  if (!API_KEY) {
    return res.status(500).json({ error: 'NEWS_API_KEY is not configured' })
  }

  const url = new URL('https://newsapi.org/v2/everything')
  url.searchParams.set('q', topic)
  url.searchParams.set('language', 'en')
  url.searchParams.set('sortBy', 'publishedAt')
  url.searchParams.set('pageSize', '12')

  try {
    const response = await fetch(url, {
      // NewsAPI rejects the header-less default UA from some hosts.
      headers: { 'X-Api-Key': API_KEY, 'User-Agent': 'gilangmukharom-portfolio' },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      console.error(`[api/news] ${topic}: upstream responded ${response.status}`)
      return res.status(response.status === 429 ? 429 : 502).json({ error: 'Failed to fetch news' })
    }

    const data = await response.json()

    // Cache at the edge so repeat visits don't burn through the API quota.
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600')
    return res.status(200).json({ articles: data.articles ?? [] })
  } catch (error) {
    console.error(`[api/news] ${topic}: ${error.message}`)
    return res.status(502).json({ error: 'Failed to fetch news' })
  }
}
