// Resolves once the HomeEffects island has created its ScrollTriggers (pin spacers exist, layout is final).
// Code that scrolls to a section can await this so it never measures the page before the pins are in place.
let resolve!: () => void
export const homeEffectsReady = new Promise<void>((r) => {
  resolve = r
})
export const markHomeEffectsReady = () => resolve()
