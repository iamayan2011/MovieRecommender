
import { Movie } from './SearchBar';
import Card from './Card';
import { CardType } from './Card';

interface SelectedListProps {
  movies: CardType[];
  onRemove: (id: number) => void;
}

export default function SelectedList({ movies, onRemove }: SelectedListProps) {
  if (movies.length === 0) {
    return <p className="text-gray-500">No movies selected yet.</p>;
  }

  // when you click the checkbox on a selected card, remove it
  const toggleMovie = (movie: Movie) => {
    onRemove(movie.id);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Selected Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <Card
            key={movie.id}
            movie={movie}
            isSelected={true}
            toggleMovie={toggleMovie}
          />
        ))}
      </div>
    </div>
  );
}
