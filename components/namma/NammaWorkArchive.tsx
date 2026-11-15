'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types'
import NammaCTASection from './NammaCTASection'

const CATEGORIES = ['ALL', 'WEB', 'BRAND', '3D', 'GROWTH']

export default function NammaWorkArchive({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('ALL')
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('grid')

  const filtered = filter === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toUpperCase() === filter)

  return (
    <div className="relative w-full bg-abyss text-ghost-white">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[60vh] flex-col justify-center px-6 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
            <span>[ 01 · ARCHIVE OF COMMISSIONS ]</span>
          </div>
          <h1 className="mt-8 font-display text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            SELECTED <br />
            <span className="text-toxic-lime">WORK &amp;</span> PLAYGROUND.
          </h1>
        </div>
      </section>

      {/* 2. FILTER & VIEW BAR */}
      <section className="sticky top-16 z-30 border-y border-ghost-white/10 bg-abyss/85 px-6 py-4 backdrop-blur-xl sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] sm:flex-row sm:items-center">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-1.5 transition-all ${
                  filter === cat
                    ? 'bg-toxic-lime font-bold text-abyss shadow-[0_0_15px_rgba(196,255,0,0.3)]'
                    : 'text-ghost-white/60 hover:text-ghost-white hover:bg-ghost-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 transition-colors ${
                viewMode === 'grid' ? 'text-toxic-lime font-bold' : 'text-ghost-white/40 hover:text-ghost-white'
              }`}
            >
              [GRID]
            </button>
            <span className="text-ghost-white/20">/</span>
            <button
              type="button"
              onClick={() => setViewMode('index')}
              className={`px-3 py-1 transition-colors ${
                viewMode === 'index' ? 'text-toxic-lime font-bold' : 'text-ghost-white/40 hover:text-ghost-white'
              }`}
            >
              [INDEX]
            </button>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS DISPLAY */}
      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {viewMode === 'grid' ? (
            /* Visual Grid */
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {filtered.map((project, i) => (
                <div key={project.id} className="group flex flex-col">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-ghost-white/10 bg-deep-layer transition-all duration-500 ease-out group-hover:scale-[0.98] group-hover:border-electric-violet"
                  >
                    <Image
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[4px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/20 to-transparent transition-opacity group-hover:opacity-40" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="rounded-full bg-toxic-lime px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-abyss shadow-[0_0_25px_rgba(196,255,0,0.5)]">
                        VIEW CASE ↗
                      </span>
                    </div>

                    <div className="absolute left-6 top-6 flex items-center gap-3">
                      <span className="rounded-full border border-ghost-white/20 bg-abyss/80 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ghost-white backdrop-blur-md">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-ghost-white/60">
                        0{i + 1}
                      </span>
                    </div>
                  </Link>

                  <div className="mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em]">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ghost-white transition-colors group-hover:text-toxic-lime sm:text-3xl">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <span className="text-ghost-white/40">{project.client_name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Typographic Index List */
            <div className="divide-y divide-ghost-white/10 border-y border-ghost-white/10 font-mono text-xs uppercase tracking-[0.18em]">
              {filtered.map((project, i) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col items-start justify-between py-6 transition-colors hover:bg-deep-layer/30 sm:flex-row sm:items-center sm:py-8"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-toxic-lime">0{i + 1}</span>
                    <span className="font-display text-2xl font-bold uppercase tracking-tight text-ghost-white group-hover:text-toxic-lime sm:text-3xl">
                      {project.title}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-8 text-ghost-white/50 sm:mt-0">
                    <span>{project.category}</span>
                    <span>{project.client_name}</span>
                    <span className="transition-transform group-hover:translate-x-1">↗</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA */}
      <NammaCTASection />
    </div>
  )
}
