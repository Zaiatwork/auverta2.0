import Link from 'next/link'

/** Placeholder service page, flagged so it cannot be mistaken for final content. */
export default function ServicePlaceholder({ title }: { title: string }) {
  return (
    <main id="main" className="grid min-h-svh place-content-center gap-8 bg-night px-[5vw] py-24 text-white">
      <h1 className="font-display text-[9vw] uppercase leading-none md:text-[5vw]">{title}</h1>
      <p className="max-w-xl rounded-2xl border border-dashed border-white/40 p-5 text-sm text-white/70">
        PLACEHOLDER: the {title} page is not written yet. Copy and visuals arrive in a later step.
      </p>
      <Link href="/contact/" className="w-fit rounded-full bg-pink px-6 py-3 font-medium text-fog">
        Let’s Connect
      </Link>
    </main>
  )
}
