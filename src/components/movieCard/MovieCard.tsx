import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  imageUrl: string;
  movieId: number;
  rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ imageUrl, movieId, rating }) => {
  const history = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Navigate to the Movie Page when the card is clicked
    history(`/movie/${movieId}`);
  }

  return (
    <div
      className="relative rounded-md cursor-pointer overflow-hidden transition-transform transform-gpu hover:scale-105"
      style={{ animationDuration: '0ms' }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${imageUrl}`}
        alt="Movie Poster"
        className="w-full h-full object-cover"
      />
      {/* Star Rating Overlay */}
      <div
        className={`absolute top-0 left-0 flex items-center space-x-1 p-2 bg-black bg-opacity-75 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span
          className="text-white font-FONTSPRING-DEMO-Caros-Bold text-15px font-bold leading-9 letter-spacing-0"
          style={{ textAlign: 'left' }}
        >
          ⭐ {Math.round(rating)}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
