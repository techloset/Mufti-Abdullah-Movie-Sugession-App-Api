import React, { useState } from "react";

interface SeasonCardProps {
  imageUrl: string;
  movieId?: number;
  rating: number;
  name: string;
}

const SeasonCard: React.FC<SeasonCardProps> = ({
  imageUrl,
  movieId,
  name,
  rating,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        className="relative rounded-tl-lg rounded-tr-lg cursor-pointer overflow-hidden transition-transform transform-gpu mb-5 hover:scale-105"
        style={{ animationDuration: "0ms" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${imageUrl}`}
          alt="Movie Poster"
          className="w-full h-full object-cover"
        />

        <div
          className={`absolute top-0 left-0 flex items-center space-x-1 p-2 bg-black bg-opacity-75 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="text-white font-FONTSPRING-DEMO-Caros-Bold text-15px font-bold leading-9 letter-spacing-0"
            style={{ textAlign: "left" }}
          >
            ⭐ {Math.round(rating)}
          </span>
        </div>
        <h3 className="font-bold text-4l leading-9 mt-2">{name}</h3>
      </div>
    </>
  );
};

export default SeasonCard;
