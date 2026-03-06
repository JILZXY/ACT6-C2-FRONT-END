import { getCharacters } from '@/lib/api'
import CharacterGrid from '@/components/server/CharacterGrid'
import FilterBar from '@/components/client/FilterBar'
import Pagination from '@/components/client/Pagination'

interface PageProps {
  searchParams: {
    name?: string
    status?: string
    species?: string
    page?: string
  }
}

export default async function CharactersPage({ searchParams }: PageProps) {
  const data = await getCharacters(searchParams)

  return (
    <main>
      <FilterBar />                        {/* Client Component */}
      <CharacterGrid results={data.results} />  {/* Server Component */}
      <Pagination info={data.info} />      {/* Client Component */}
    </main>
  )
}
