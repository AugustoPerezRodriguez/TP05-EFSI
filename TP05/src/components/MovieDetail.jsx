import { useEffect } from 'react'
import Loader from './Loader.jsx'
import ErrorMessage from './ErrorMessage.jsx'

function textOrDash(value) {
  if (value == null || value === '' || value === 'N/A') return '—'
  return String(value)
}

export default function MovieDetail({ open, detail, status, errorMessage, onClose, onRetryDetail }) {
  useEffect(() => {
    if (!open) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-detail-title"
    >
      <button
        type="button"
        className="modal-overlay__backdrop"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <header className="modal-panel__header">
          <h2 id="movie-detail-title" className="modal-panel__title">
            {detail ? textOrDash(detail.Title) : 'Detalle'}
          </h2>
          <button type="button" className="modal-panel__close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </header>

        <div className="modal-panel__body">
          {status === 'loading' && <Loader label="Cargando detalle…" />}

          {status === 'error' && (
            <ErrorMessage message={errorMessage} onRetry={onRetryDetail} />
          )}

          {status === 'success' && detail && (
            <div className="movie-detail">
              <div className="movie-detail__poster">
                {detail.Poster && detail.Poster !== 'N/A' ? (
                  <img
                    src={detail.Poster}
                    alt=""
                    className="movie-detail__poster-img"
                  />
                ) : (
                  <div className="movie-detail__poster-placeholder">Sin póster</div>
                )}
              </div>
              <dl className="movie-detail__fields">
                <div className="movie-detail__row">
                  <dt>Año</dt>
                  <dd>{textOrDash(detail.Year)}</dd>
                </div>
                <div className="movie-detail__row">
                  <dt>Género</dt>
                  <dd>{textOrDash(detail.Genre)}</dd>
                </div>
                <div className="movie-detail__row">
                  <dt>Director</dt>
                  <dd>{textOrDash(detail.Director)}</dd>
                </div>
                <div className="movie-detail__row">
                  <dt>Actores</dt>
                  <dd>{textOrDash(detail.Actors)}</dd>
                </div>
                <div className="movie-detail__row movie-detail__row--block">
                  <dt>Sinopsis</dt>
                  <dd>{textOrDash(detail.Plot)}</dd>
                </div>
                <div className="movie-detail__row">
                  <dt>Duración</dt>
                  <dd>{textOrDash(detail.Runtime)}</dd>
                </div>
                <div className="movie-detail__row">
                  <dt>Idioma</dt>
                  <dd>{textOrDash(detail.Language)}</dd>
                </div>
                <div className="movie-detail__row">
                  <dt>País</dt>
                  <dd>{textOrDash(detail.Country)}</dd>
                </div>
                {detail.imdbRating && detail.imdbRating !== 'N/A' && (
                  <div className="movie-detail__row">
                    <dt>IMDb</dt>
                    <dd>{textOrDash(detail.imdbRating)}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
