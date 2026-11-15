import Image from 'next/image'
import Link from 'next/link'

// Two-piece mark plus AUVERTA wordmark. Insets are the Figma ones (frame 26:2553, 190 x 30.77).
export default function Logo() {
  return (
    <Link href="/" aria-label="Auverta home" className="relative block h-[30.773px] w-[190px]">
      <span className="absolute" style={{ inset: '1.79% 87.16% 3.47% 0' }}>
        <Image src="/hero/logo-a.svg" alt="" fill unoptimized className="max-w-none" />
      </span>
      <span className="absolute" style={{ inset: '0 82.76% 5.52% 4.35%' }}>
        <Image src="/hero/logo-b.svg" alt="" fill unoptimized className="max-w-none" />
      </span>
      <span className="absolute left-[21.61%] top-[-1%] whitespace-nowrap font-display text-[22.012px] leading-normal text-logo-ink">AUVERTA</span>
    </Link>
  )
}
