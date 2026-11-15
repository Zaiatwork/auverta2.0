'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useSite } from '@/components/layout/SiteContext'
import type { Mood } from '@/types/content'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string; label?: string; mood?: Mood }

// No viewport prefetch (it fetched every route on load); the route is prefetched on hover instead.
export function TransitionLink({ href, label, mood, onClick, onPointerEnter, children, ...rest }: Props) {
  const { go, scrollTo } = useSite()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Link
      href={href}
      prefetch={false}
      {...rest}
      onPointerEnter={(e) => {
        onPointerEnter?.(e)
        router.prefetch(href)
      }}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        const url = new URL(href, location.href)
        e.preventDefault()
        if (url.pathname === pathname) {
          // Same page: smooth-scroll to the anchor, or back to the top.
          scrollTo(url.hash || 0, { duration: 1.4 })
          return
        }
        void go(href, label, mood)
      }}
    >
      {children}
    </Link>
  )
}
