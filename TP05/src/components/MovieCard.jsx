import { useState } from 'react'

export default function MovieCard({ title, year, type, posterUrl, onClick }) {
  const [posterFailed, setPosterFailed] = useState(false)
  const hasPoster = Boolean(posterUrl && posterUrl !== 'N/A' && !posterFailed)

  return (
    <button type="button" className="movie-card" onClick={onClick}>
      <div className="movie-card__poster">
        {hasPoster ? (
          <img
            src={posterUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setPosterFailed(true)}
          />
        ) : (
          <div className="movie-card__poster-placeholder" aria-hidden>
            Sin póster
          </div>
        )}
      </div>
      <div className="movie-card__meta">
        <h2 className="movie-card__title">{title || '—'}</h2>
        <p className="movie-card__sub">
          {(year && year !== 'N/A' ? year : '—') +
            ' · ' +
            (type && type !== 'N/A' ? type : '—')}
        </p>
      </div>
    </button>
  )
}
