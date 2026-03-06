export interface CharacterDTO {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  image: string
}

export interface CharacterListResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: CharacterDTO[]
}
