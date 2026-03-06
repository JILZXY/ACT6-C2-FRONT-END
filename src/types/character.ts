export interface CharacterDTO {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  image: string
}

export interface PaginationInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface CharacterListResponse {
  info: PaginationInfo
  results: CharacterDTO[]
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string>
}
