import { useCallback, useEffect, useState } from 'react'
import { searchByTitle, getDetailById } from './api/omdbClient.js'
import { DEFAULT_GRID_QUERY } from './constants/omdb.js'
import SearchBar from './components/SearchBar.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetail from './components/MovieDetail.jsx'
import './App.css'

export default function App() {
  const [searchInput, setSearchInput] = useState('')
  const [movies, setMovies] = useState([])
  const [listStatus, setListStatus] = useState('loading')
  const [listError, setListError] = useState('')
  const [emptyHint, setEmptyHint] = useState('')

  const [selectedImdbId, setSelectedImdbId] = useState(null)
  const [detailRetryTick, setDetailRetryTick] = useState(0)
  const [detail, setDetail] = useState(null)
  const [detailStatus, setDetailStatus] = useState('idle')
  const [detailError, setDetailError] = useState('')

  const loadMovies = useCallback(async (query, options = {}) => {
    const { emptyMessageOnBlank } = options
    const q = String(query ?? '').trim()

    if (emptyMessageOnBlank && !q) {
      setMovies([])
      setListStatus('empty')
      setListError('')
      setEmptyHint('Ingresá un título para buscar.')
      return
    }

    setListStatus('loading')
    setListError('')
    setEmptyHint('')

    try {
      const results = await searchByTitle(q)
      setMovies(results)
      setListStatus(results.length === 0 ? 'empty' : 'success')
      if (results.length === 0) {
        setEmptyHint('No hay coincidencias para esa búsqueda.')
      }
    } catch (err) {
      setListStatus('error')
      setListError(err instanceof Error ? err.message : 'Error al cargar la lista.')
      setMovies([])
    }
  }, [])

  useEffect(() => {
    loadMovies(DEFAULT_GRID_QUERY)
  }, [loadMovies])

  useEffect(() => {
    if (!selectedImdbId) {
      setDetail(null)
      setDetailStatus('idle')
      setDetailError('')
      return undefined
    }

    let cancelled = false
    setDetail(null)
    setDetailStatus('loading')
    setDetailError('')

    getDetailById(selectedImdbId)
      .then((data) => {
        if (!cancelled) {
          setDetail(data)
          setDetailStatus('success')
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setDetailStatus('error')
          setDetailError(err instanceof Error ? err.message : 'Error al cargar el detalle.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [selectedImdbId, detailRetryTick])

  function handleSearchSubmit() {
    loadMovies(searchInput, { emptyMessageOnBlank: true })
  }

  function handleCloseDetail() {
    setSelectedImdbId(null)
  }

  function handleRetryList() {
    const q = searchInput.trim() || DEFAULT_GRID_QUERY
    loadMovies(q)
  }

  function handleRetryDetail() {
    setDetailRetryTick((n) => n + 1)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__brand">Catálogo OMDb</h1>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={handleSearchSubmit}
          disabled={listStatus === 'loading'}
        />
      </header>

      <main className="app__main">
        <MovieList
          movies={movies}
          listStatus={listStatus}
          listError={listError}
          emptyHint={emptyHint}
          onSelectMovie={(imdbId) => setSelectedImdbId(imdbId)}
          onRetry={listStatus === 'error' ? handleRetryList : undefined}
        />
      </main>

      <MovieDetail
        open={selectedImdbId != null}
        detail={detail}
        status={detailStatus}
        errorMessage={detailError}
        onClose={handleCloseDetail}
        onRetryDetail={detailStatus === 'error' ? handleRetryDetail : undefined}
      />
    </div>
  )
}
