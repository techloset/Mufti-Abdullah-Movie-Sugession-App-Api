import React, { useState } from "react";
import { CardProps } from "../../constants/Types";

const SeasonCard: React.FC<CardProps> = ({ imageUrl, name, rating }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        className="relative md:bg-[white] sm:bg-[#EBEAEA]  rounded-[1.5rem]  cursor-pointer overflow-hidden transition-transform transform-gpu mb-5 hover:scale-105 sm:h-[202px] h-auto sm:w-[305px] w-[w-[305px]]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${imageUrl}`}
          alt="Movie Poster"
          className="w-full h-2/3 object-cover  rounded-[1.5rem]"
        />
        <h3 className="font-bold text-[20px] ps-2 leading-9 mt-2">
          {name?.slice(0, 20) + ".."}
        </h3>

        <div
          className={`absolute top-0 left-0 flex items-center space-x-1 p-2 bg-black bg-opacity-75 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white font-FONTSPRING-DEMO-Caros-Bold text-15px font-bold leading-9 letter-spacing-0 text-[white]">
            ⭐ {Math.round(rating)}
          </span>
        </div>
      </div>
    </>
  );
};

export default SeasonCard;
