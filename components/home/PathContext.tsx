'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Segment } from '@/types/content'

interface PathApi {
  path: Segment | null
  setPath: (s: Segment) => void
}

const PathContext = createContext<PathApi | null>(null)

/** The visitor's chosen audience, shared by the hero picker, the paths and "One idea. Every format." */
export function PathProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<Segment | null>(null)
  const value = useMemo(() => ({ path, setPath }), [path])
  return <PathContext.Provider value={value}>{children}</PathContext.Provider>
}

export function usePath(): PathApi {
  const ctx = useContext(PathContext)
  if (!ctx) throw new Error('usePath must be used inside <PathProvider>')
  return ctx
}
