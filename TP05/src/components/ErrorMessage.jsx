export default function ErrorMessage({ message, onRetry, retryLabel = 'Reintentar' }) {
  if (!message) return null
  return (
    <div className="error-message" role="alert">
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button type="button" className="error-message__retry" onClick={onRetry}>
          {retryLabel}
        </button>
      )}
    </div>
  )
}
