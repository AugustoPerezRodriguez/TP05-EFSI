import MovieCard from './MovieCard.jsx'
import Loader from './Loader.jsx'
import ErrorMessage from './ErrorMessage.jsx'

/**
 * @param {object} props
 * @param {Array<{ imdbID: string; Title: string; Year: string; Type: string; Poster: string }>} props.movies
 * @param {'loading'|'error'|'empty'|'success'} props.listStatus
 * @param {string} [props.listError]
 * @param {string} [props.emptyHint]
 * @param {(imdbId: string) => void} props.onSelectMovie
 * @param {() => void} [props.onRetry]
 */
export default function MovieList({
  movies,
  listStatus,
  listError,
  emptyHint,
  onSelectMovie,
  onRetry,
}) {
  if (listStatus === 'loading') {
    return <Loader label="Buscando películas…" />
  }

  if (listStatus === 'error') {
    return <ErrorMessage message={listError} onRetry={onRetry} />
  }

  if (listStatus === 'empty' || movies.length === 0) {
    return (
      <p className="movie-list__empty" role="status">
        {emptyHint ?? 'No hay resultados para mostrar.'}
      </p>
    )
  }

  return (
    <ul className="movie-list">
      {movies.map((item) => (
        <li key={item.imdbID} className="movie-list__item">
          <MovieCard
            title={item.Title}
            year={item.Year}
            type={item.Type}
            posterUrl={item.Poster}
            onClick={() => onSelectMovie(item.imdbID)}
          />
        </li>
      ))}
    </ul>
  )
}
