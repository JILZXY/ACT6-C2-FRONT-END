import type { CharacterListResponse } from '@/types/character'

const API_URL = process.env.BACKEND_URL

export const getCharacters = async (params: {
  name?: string
  status?: string
  species?: string
  page?: string
}): Promise<CharacterListResponse> => {
  const query = new URLSearchParams()
  if (params.name)    query.append('name', params.name)
  if (params.status)  query.append('status', params.status)
  if (params.species) query.append('species', params.species)
  if (params.page)    query.append('page', params.page)

  const res = await fetch(`${API_URL}/api/characters?${query.toString()}`, {
    next: { revalidate: 60 }
  })

  if (!res.ok) throw new Error('Error al obtener personajes')

  return res.json()
}
