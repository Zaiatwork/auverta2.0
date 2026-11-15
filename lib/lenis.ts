import type Lenis from 'lenis'

// The single Lenis instance. It is created by the lazily loaded Enhancements, so callers must tolerate null.
let instance: Lenis | null = null

export const getLenis = () => instance
export const setLenis = (l: Lenis | null) => {
  instance = l
}
