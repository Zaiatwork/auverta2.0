import { useSyncExternalStore } from 'react'

// Flips to true on the visitor's first pointer, scroll or key event. Motion code loads then, not at page load.
const EVENTS = ['pointermove', 'pointerdown', 'wheel', 'scroll', 'keydown', 'touchstart'] as const
const subs = new Set<() => void>()
let active = false
let listening = false

function activate() {
  if (active) return
  active = true
  EVENTS.forEach((e) => removeEventListener(e, activate))
  subs.forEach((f) => f())
}

function subscribe(cb: () => void) {
  subs.add(cb)
  if (!listening && !active) {
    listening = true
    EVENTS.forEach((e) => addEventListener(e, activate, { passive: true }))
  }
  return () => {
    subs.delete(cb)
  }
}

export const useInteracted = () => useSyncExternalStore(subscribe, () => active, () => false)
