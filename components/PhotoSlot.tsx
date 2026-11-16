type Props = { className?: string; label?: string; src?: string; tone?: string }

export default function PhotoSlot({ className = '', label = 'Image', src, tone = 'from-violet to-night' }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br md:rounded-[0.8vw] ${tone} ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- optional photo, no image set yet
        <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span className="absolute inset-2 grid place-items-center rounded-lg border border-dashed border-white/40 text-center text-[10px] uppercase tracking-widest text-white/60">
          Placeholder · {label}
        </span>
      )}
    </div>
  )
}
