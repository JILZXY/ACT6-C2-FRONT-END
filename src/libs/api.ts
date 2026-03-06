import type { CharacterListResponse, ApiError } from '@/types/character'

const API_URL = process.env.BACKEND_URL

export class ApiRequestError extends Error {
  public code: string
  public statusCode: number
  public details?: Record<string, string>

  constructor(statusCode: number, error: ApiError) {
    super(error.message)
    this.name = 'ApiRequestError'
    this.code = error.code
    this.statusCode = statusCode
    this.details = error.details
  }
}

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

  if (!res.ok) {
    const errorBody: ApiError = await res.json().catch(() => ({
      code: 'UNKNOWN_ERROR',
      message: 'Error al conectar con el servidor',
    }))
    throw new ApiRequestError(res.status, errorBody)
  }

  return res.json()
}
