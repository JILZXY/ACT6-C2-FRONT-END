'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import '@/styles/filters.css'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('name') ?? '')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)

      if (debounceRef.current) clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(() => {
        debounceRef.current = null
        const params = new URLSearchParams(searchParams.toString())
        if (newValue.trim()) {
          params.set('name', newValue.trim())
        } else {
          params.delete('name')
        }
        params.delete('page')
        router.push(`/characters?${params.toString()}`)
      }, 400)
    },
    [router, searchParams]
  )

  return (
    <div className="search-bar">
      <span className="search-bar__icon">🔍</span>
      <input
        id="search-characters"
        className="search-bar__input"
        type="text"
        placeholder="Search characters across the multiverse..."
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
