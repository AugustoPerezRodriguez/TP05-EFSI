export default function Loader({ label = 'Cargando…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden />
      <span className="loader__text">{label}</span>
    </div>
  )
}
