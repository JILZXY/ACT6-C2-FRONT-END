import type { CharacterDTO } from '@/types/character'
import CharacterCard from './CharacterCard'
import '@/styles/characters.css'

interface CharacterGridProps {
  results: CharacterDTO[]
}

export default function CharacterGrid({ results }: CharacterGridProps) {
  if (results.length === 0) {
    return (
      <div className="character-grid--empty">
        <span className="character-grid--empty__icon">🔍</span>
        <p className="character-grid--empty__title">
          No se encontraron personajes
        </p>
        <p className="character-grid--empty__message">
          Intenta con otros filtros o términos de búsqueda.
        </p>
      </div>
    )
  }

  return (
    <section className="character-grid">
      {results.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </section>
  )
}
