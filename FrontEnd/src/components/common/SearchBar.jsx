import { useState } from 'react';

// Barre de recherche pour filtrer les messages
// Utilise la fonction onSearch fournie en prop pour transmettre la requête
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  // Gestionnaire pour soumettre la recherche
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search messages..."
        aria-label="Search messages"
      />
      <button type="submit" aria-label="Search">🔍</button>
    </form>
  );
}

export default SearchBar;