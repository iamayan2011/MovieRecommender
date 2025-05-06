
import { useState, useEffect, useRef } from 'react';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

interface Props {
  onSelect: (movie: Movie) => void;
  onResults: (results: Movie[]) => void;
}

export default function SearchBar({ onResults }: Props) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number>(0);

  // 1s debounce
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDebouncedQuery(query), 1000);
    return () => clearTimeout(timer.current);
  }, [query]);

  // Fetch when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      onResults([]);
      return;
    }
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        debouncedQuery
      )}&language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          accept: 'application/json',
        },
      }
    )
      .then(res => res.json())
      .then(data => onResults(data.results || []))
      .finally(() => setLoading(false));
  }, [debouncedQuery, onResults]);

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      {loading && <p className="mt-2 text-sm text-gray-500">Searching...</p>}
    </div>
  );
}

