'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import '@/styles/filters.css'

const SPECIES_OPTIONS = ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological Creature', 'Animal', 'Robot', 'Cronenberg', 'Disease', 'Planet', 'unknown'] as const

export default function SpeciesFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('species') ?? ''
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === current) {
      params.delete('species')
    } else {
      params.set('species', value)
    }
    params.delete('page')
    setOpen(false)
    router.push(`/characters?${params.toString()}`)
  }

  return (
    <div className="filter-dropdown" ref={ref}>
      <button
        id="filter-species"
        className={`filter-dropdown__button ${current ? 'filter-dropdown__button--active' : ''}`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {current && <span className="status-dot status-dot--dead" />}
        Specie: {current || 'All'}
        <span className={`filter-dropdown__chevron ${open ? 'filter-dropdown__chevron--open' : ''}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="filter-dropdown__menu">
          <button
            className={`filter-dropdown__option ${!current ? 'filter-dropdown__option--selected' : ''}`}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString())
              params.delete('species')
              params.delete('page')
              setOpen(false)
              router.push(`/characters?${params.toString()}`)
            }}
            type="button"
          >
            All
          </button>
          {SPECIES_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`filter-dropdown__option ${current === opt ? 'filter-dropdown__option--selected' : ''}`}
              onClick={() => handleSelect(opt)}
              type="button"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
