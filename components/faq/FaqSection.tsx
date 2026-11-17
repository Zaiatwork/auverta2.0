import { FAQS } from '@/content/faq'

/** Native <details>: keyboard and screen-reader complete without any script. */
export default function FaqSection() {
  return (
    <section id="faq" className="bg-white px-5 py-[12vh] text-night md:px-[10.8vw]">
      <h2 className="rise font-display text-[8.5vw] uppercase leading-[1.25] tracking-[-0.02em] text-violet md:text-[4.1vw]">FAQs</h2>

      <div className="mt-[6vh] border-t border-night/15">
        {FAQS.map((f, i) => (
          <details key={f.q} className="rise group border-b border-night/15">
            <summary className="flex cursor-pointer list-none items-center gap-5 py-6 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet md:gap-[2vw] md:py-[1.8vw] [&::-webkit-details-marker]:hidden">
              <span className="w-8 shrink-0 text-xs tabular-nums text-night/50">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 text-xl font-semibold leading-tight tracking-tight md:text-[max(1.8vw,20px)]">{f.q}</span>
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-night/25 text-xl leading-none transition-transform duration-300 group-open:rotate-45 group-open:bg-night group-open:text-white md:size-[max(2.6vw,36px)] md:text-[max(1.6vw,20px)]">+</span>
            </summary>
            <p className="max-w-[70ch] pb-8 pl-[3.25rem] text-base leading-relaxed text-night/70 md:pl-[calc(2vw+2rem)] md:text-[max(1.1vw,15px)]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
