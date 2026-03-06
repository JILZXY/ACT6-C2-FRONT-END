import Image from 'next/image'
import type { CharacterDTO } from '@/types/character'
import '@/styles/characters.css'

interface CharacterCardProps {
  character: CharacterDTO
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const statusClass =
    character.status === 'Alive'
      ? 'status-dot--alive'
      : character.status === 'Dead'
        ? 'status-dot--dead'
        : 'status-dot--unknown'

  return (
    <article className="character-card">
      <div className="character-card__image-wrapper">
        <Image
          className="character-card__image"
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div className="character-card__body">
        <h3 className="character-card__name">{character.name}</h3>
        <p className="character-card__meta">
          <span className={`status-dot ${statusClass}`} />
          {character.status} - {character.species}
        </p>
      </div>
    </article>
  )
}
