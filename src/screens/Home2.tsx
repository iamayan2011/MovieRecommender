import { useState } from "react";
import Carousel from "../components/Carousel";
import SearchBar, { Movie } from "../components/SearchBar";
import Card , {CardType} from "../components/Card";

export interface RecommendationResponse {
  results: { movie_id: number; recommendations: number[] }[];
}

export default function Home() {
  const [selected, setSelected] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [recMovies, setRecMovies] = useState<Movie[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const toggleMovie = (movie: Movie) => {
    setSelected((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const getSuggestions = async () => {
    if (selected.length === 0) return;
    setLoadingRecs(true);

    try {
      const response = await fetch("http://localhost:8000/recommend_by_id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie_ids: selected.map((m) => m.id),
          n_recommendations: 5,
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      const json: RecommendationResponse = await response.json();
      const recIds = json.results.flatMap((r) => r.recommendations);

      // fetch details for each recommendation
      const details = await Promise.all(
        recIds.map((id) =>
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              accept: "application/json",
            },
          }).then((res) => res.json())
        )
      );

      const recList: Movie[] = details.map((m: CardType) => ({
        id: m.id,
        title: m.title,
        release_date: m.release_date,
        poster_path: m.poster_path,
      }));

      setRecMovies(recList);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecMovies([]);
    } finally {
      setLoadingRecs(false);
    }
  };

  return (
    <div className="mx-auto space-y-8">
      <Carousel />

      <div id="recommender" className="p-8 space-y-8 mx-auto">
        {/* Search bar */}
        <SearchBar onSelect={toggleMovie} onResults={setSearchResults} />

        {/* Selected movies container */}
        {selected.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              Selected Movies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selected.map((movie) => (
                <Card
                  key={movie.id}
                  movie={{ ...movie, director: "" }}
                  isSelected={true}
                  toggleMovie={toggleMovie}
                  showCheckbox={true}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={getSuggestions}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {loadingRecs ? "Loading..." : "Get Recommendations"}
              </button>
            </div>
          </div>
        )}
        {/* Recommendations container */}
        {recMovies.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recommended Movies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recMovies.map((movie) => (
                <Card
                  key={movie.id}
                  movie={{ ...movie, director: "" }}
                  showCheckbox={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search results */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {searchResults.length === 0 ? (
            <p className="text-gray-500">Type to search for movies.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((movie) => (
                <Card
                  key={movie.id}
                  movie={{ ...movie, director: "" }}
                  isSelected={selected.some((m) => m.id === movie.id)}
                  toggleMovie={toggleMovie}
                  showCheckbox={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
