import axios from 'axios'

const BASE_URL = 'https://www.omdbapi.com/'

function toFriendlyAxiosErrorMessage(err) {
  if (!axios.isAxiosError(err)) return null

  const status = err.response?.status
  if (status === 401 || status === 403) {
    return 'Clave de OMDb inválida o no activada. Revisá `VITE_OMDB_API_KEY` en `.env.local` y reiniciá `npm run dev`.'
  }

  if (status === 429) {
    return 'Se alcanzó el límite de consultas de la API (429). Probá más tarde.'
  }

  if (typeof err.message === 'string' && err.message.trim()) return err.message
  return 'Error de red al consultar la API.'
}

function getApiKey() {
  const key = import.meta.env.VITE_OMDB_API_KEY
  if (!key || !String(key).trim()) {
    throw new Error(
      'Falta VITE_OMDB_API_KEY: abrí .env.local en la raíz del proyecto, pegá tu clave de omdbapi.com y reiniciá el servidor (npm run dev). Ver README.md.',
    )
  }
  return String(key).trim()
}

function isNoMatchesMessage(message) {
  if (!message) return false
  const m = message.toLowerCase()
  return m.includes('not found') || m.includes('no results')
}

/**
 * @param {string} query
 * @returns {Promise<Array<{ imdbID: string; Title: string; Year: string; Type: string; Poster: string }>>}
 */
export async function searchByTitle(query) {
  const s = String(query ?? '').trim()
  if (!s) return []

  let data
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        apikey: getApiKey(),
        s,
        r: 'json',
      },
    })
    data = res.data
  } catch (err) {
    throw new Error(toFriendlyAxiosErrorMessage(err) || 'No se pudo completar la búsqueda.')
  }

  if (data.Response === 'True' && Array.isArray(data.Search)) {
    return data.Search
  }

  if (data.Response === 'False') {
    const msg = data.Error || ''
    if (isNoMatchesMessage(msg)) return []
    const lower = msg.toLowerCase()
    if (lower.includes('too many results')) {
      throw new Error('Demasiados resultados. Probá con un título más específico.')
    }
    throw new Error(msg || 'No se pudo completar la búsqueda.')
  }

  return []
}

/**
 * @param {string} imdbId
 * @returns {Promise<Record<string, string>>}
 */
export async function getDetailById(imdbId) {
  if (!imdbId || !String(imdbId).trim()) {
    throw new Error('Identificador de película inválido.')
  }

  let data
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        apikey: getApiKey(),
        i: String(imdbId).trim(),
        plot: 'full',
        r: 'json',
      },
    })
    data = res.data
  } catch (err) {
    throw new Error(toFriendlyAxiosErrorMessage(err) || 'No se pudo cargar el detalle.')
  }

  if (data.Response === 'True') return data
  throw new Error(data.Error || 'No se pudo cargar el detalle.')
}
