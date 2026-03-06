import { Suspense } from 'react'
import { getCharacters } from '@/libs/api'
import CharacterGrid from '@/components/server/CharacterGrid'
import FilterBar from '@/components/client/FilterBar'
import Pagination from '@/components/client/Pagination'
import type { CharacterListResponse } from '@/types/character'

interface PageProps {
  searchParams: Promise<{
    name?: string
    status?: string
    species?: string
    page?: string
  }>
}

function LoadingSkeleton() {
  return (
    <section className="character-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton skeleton-card" />
      ))}
    </section>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="state-container">
      <span className="state-container__icon">⚠️</span>
      <p className="state-container__title">Algo salió mal</p>
      <p className="state-container__message">{message}</p>
      <a href="/characters" className="state-container__retry">
        Reintentar
      </a>
    </div>
  )
}

function CharactersResult({ data }: { data: CharacterListResponse }) {
  return (
    <>
      <CharacterGrid results={data.results} />
      <Pagination info={data.info} />
    </>
  )
}

async function CharactersContent({
  searchParams,
}: {
  searchParams: {
    name?: string
    status?: string
    species?: string
    page?: string
  }
}) {
  let data: CharacterListResponse

  try {
    data = await getCharacters(searchParams)
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error inesperado al cargar los personajes.'
    return <ErrorState message={message} />
  }

  return <CharactersResult data={data} />
}

export default async function CharactersPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams

  return (
    <>
      <header className="header">
        <span className="header__icon">👻</span>
        <h1 className="header__title">Rick and Morty Catalog</h1>
      </header>

      <main className="page-container">
        <FilterBar />

        <Suspense fallback={<LoadingSkeleton />}>
          <CharactersContent searchParams={resolvedParams} />
        </Suspense>
      </main>
    </>
  )
}
