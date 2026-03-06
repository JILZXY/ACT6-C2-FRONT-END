'use client'

import { Suspense } from 'react'
import SearchBar from './SearchBar'
import StatusFilter from './StatusFilter'
import SpeciesFilter from './SpeciesFilter'
import '@/styles/filters.css'

function FilterBarContent() {
  return (
    <>
      <SearchBar />
      <div className="filter-container">
        <StatusFilter />
        <SpeciesFilter />
      </div>
    </>
  )
}

export default function FilterBar() {
  return (
    <Suspense fallback={
      <div>
        <div className="search-bar">
          <span className="search-bar__icon">🔍</span>
          <input
            className="search-bar__input"
            type="text"
            placeholder="Search characters across the multiverse..."
            disabled
          />
        </div>
        <div className="filter-container">
          <span className="filter-dropdown__button" style={{ opacity: 0.5 }}>Status: All ▼</span>
          <span className="filter-dropdown__button" style={{ opacity: 0.5 }}>Specie: All ▼</span>
        </div>
      </div>
    }>
      <FilterBarContent />
    </Suspense>
  )
}
