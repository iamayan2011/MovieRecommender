/* src/components/Card.tsx */
import React from 'react';

export interface CardType {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  director?: string;
}

interface CardProps {
  movie: CardType;
  isSelected?: boolean;
  toggleMovie?: (movie: CardType) => void;
  showCheckbox?: boolean;
}

const Card: React.FC<CardProps> = ({
  movie,
  isSelected = false,
  toggleMovie = () => {},
  showCheckbox = true,
}) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : 'https://via.placeholder.com/342x513?text=No+Image';

  return (
    <div className="relative card bg-[#0C0E23] w-56 h-72 shadow-sm">
      <figure className="">
        {showCheckbox && (
          <input
            type="checkbox"
            className="w-6 h-6 absolute top-4 right-4 accent-[#CBACF9]"
            onChange={() => toggleMovie(movie)}
            checked={isSelected}
          />
        )}
        <img
          src={imageUrl}
          alt={movie.title}
          className="h-56 w-full object-cover rounded-2xl"
        />
      </figure>
      <div className="card-body px-0 items-center pt-3 py-0 text-center">
        <h2 className="card-title text-sm text-white">{movie.title}</h2>
        <p className="text-gray-400 text-sm">{movie.release_date?.slice(0, 4)}</p>
      </div>
    </div>
  );
};

export default Card;