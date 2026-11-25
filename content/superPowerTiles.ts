// Super Power tunnel tiles. PLACEHOLDER media: local site images stand in until the real
// reels / clips / memes / AI visuals / UGC ads are supplied. Edit only this array.
// For a video tile: { type: 'video', src: '/video/x.mp4', poster: '/images/x.webp', category }.
export type Category = 'reel' | 'meme' | 'ai' | 'business' | 'ugc'
export type Tile = { type: 'video' | 'image'; category: Category; src: string; poster?: string }

const ORDER: Category[] = ['reel', 'meme', 'ai', 'business', 'ugc'] // cycled, so neighbours never match
const PLACEHOLDERS = [
  '/images/super-power/web.webp', '/images/super-power/ai-content.webp', '/images/super-power/digital-marketing.webp',
  '/images/super-power/creative.webp', '/images/super-power/seo.webp', '/images/flow/discovery.webp',
  '/images/flow/strategy.webp', '/images/flow/build.webp', '/images/flow/launch.webp', '/images/flow/grow.webp',
  '/images/articles/art-01.jpg', '/images/articles/art-02.jpg', '/images/articles/art-03.jpg',
]

export const TILES: Tile[] = Array.from({ length: 32 }, (_, i) => ({
  type: 'image',
  category: ORDER[i % ORDER.length],
  src: PLACEHOLDERS[i % PLACEHOLDERS.length],
}))
