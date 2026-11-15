import { useSyncExternalStore } from 'react'

const store = (query: string) => ({
  subscribe: (cb: () => void) => {
    const m = matchMedia(query)
    m.addEventListener('change', cb)
    return () => m.removeEventListener('change', cb)
  },
  get: () => matchMedia(query).matches,
})

const reduced = store('(prefers-reduced-motion: reduce)')
const fine = store('(hover: hover) and (pointer: fine)')

export const useReducedMotion = () => useSyncExternalStore(reduced.subscribe, reduced.get, () => false)
export const useFinePointer = () => useSyncExternalStore(fine.subscribe, fine.get, () => false)
