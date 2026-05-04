export default function SearchBar({ value, onChange, onSubmit, disabled }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        className="search-bar__input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar películas o series…"
        disabled={disabled}
        autoComplete="off"
        enterKeyHint="search"
        aria-label="Buscar por título"
      />
      <button className="search-bar__button" type="submit" disabled={disabled}>
        Buscar
      </button>
    </form>
  )
}
