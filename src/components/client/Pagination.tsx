'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import type { PaginationInfo } from '@/types/character'
import '@/styles/pagination.css'

interface PaginationProps {
  info: PaginationInfo
}

function PaginationContent({ info }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? '1')
  const totalPages = info.pages

  if (totalPages <= 1) return null

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    router.push(`/characters?${params.toString()}`)
  }

  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    pages.push(totalPages)

    return pages
  }

  return (
    <nav className="pagination" aria-label="Paginación de personajes">
      <button
        className="pagination__btn pagination__btn--arrow"
        onClick={() => goToPage(currentPage - 1)}
        disabled={!info.prev}
        aria-label="Página anterior"
        type="button"
      >
        ‹
      </button>

      {getPageNumbers().map((item, idx) =>
        item === '...' ? (
          <span key={`ellipsis-${idx}`} className="pagination__ellipsis">
            …
          </span>
        ) : (
          <button
            key={item}
            className={`pagination__btn ${item === currentPage ? 'pagination__btn--active' : ''}`}
            onClick={() => goToPage(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            type="button"
          >
            {item}
          </button>
        )
      )}

      <button
        className="pagination__btn pagination__btn--arrow"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!info.next}
        aria-label="Página siguiente"
        type="button"
      >
        ›
      </button>
    </nav>
  )
}

export default function Pagination({ info }: PaginationProps) {
  return (
    <Suspense fallback={null}>
      <PaginationContent info={info} />
    </Suspense>
  )
}
